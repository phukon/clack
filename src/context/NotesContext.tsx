"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type NoteValue } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getNotionToken } from "@/actions/getNotionToken";

type NotesContextValue = {
  kv: [string, NoteValue][];
  notion: [string, string][];
  google: [string, string][];
  loading: boolean;
  setNotion: React.Dispatch<React.SetStateAction<[string, string][]>>;
  setGoogle: React.Dispatch<React.SetStateAction<[string, string][]>>;
  deleteNote: (keyToDelete: string) => Promise<void>;
  revalidateNotes: () => Promise<[string, NoteValue][]>;
  wordCount: number;
  token: string | undefined
};

const NotesContext = createContext<NotesContextValue | null>(null);

export const useNotes = () => {
  const contextValue = useContext(NotesContext);

  if (contextValue === null) {
    throw new Error("useNotes must be used within a NotesProvider");
  }

  return contextValue;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useCurrentUser();
  const [kv, setKv] = useState<[string, NoteValue][]>([]);
  const [notion, setNotion] = useState<[string, string][]>([]);
  const [google, setGoogle] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | undefined>();
  const wordCount: number = 0;
  // const [wordCount, setWordCount] = useState<number>(0);

  const fetchToken = async () => {
    await getNotionToken().then((d) => {
      if (d.error) {
        console.log(d.error);
      } else {
        d.token && setToken(d.token);
      }
    });
  };

  const fetchLocalStorageData = async () => {
    const entries = Object.entries(localStorage);
    const keyVal = entries
      .map(([key, value]: [key: string, value: string]) => {
        if (value && key.length === 10 && key.match(/^\d+$/)) {
          return [key, JSON.parse(value)] as [string, NoteValue];
        }
        return undefined;
      })
      .filter((kv) => kv !== undefined);

    setKv(keyVal as [string, NoteValue][]);

    return keyVal as [string, NoteValue][];
  };

  const fetchNotionData = async () => {
    try {
      const response = await fetch("/api/notion");
      if (response.status != 200) {
        return [];
      }
      const data = await response.json();
      return data as [string, string][];
    } catch (error) {
      console.error("Error fetching Notion data:", error);
      return [];
    }
  };

  const fetchGoogleData = async () => {
    try {
      const response = await fetch("/api/google");
      if (response.status != 200) {
        return [];
      }
      const data = await response.json();
      return data as [string, string][];
    } catch (error) {
      console.error("Error fetching Notion data:", error);
      return [];
    }
  };

  const fetchCloudData = async () => {
    try {
      // Might use later
      // await fetch("api/fetchMetaData")
      //   .then((r) => r.text())
      //   .then((count) => setWordCount(Number(count)));
      const response = await fetch("/api/fetchPosts");
      if (response.status != 200) {
        return [];
      }
      const data = await response.json();
      return data as [string, NoteValue][];
    } catch (error) {
      console.error("Error fetching cloud data:", error);
      return [];
    }
  };

  // Function to combine and set data from both sources
  const combineData = async () => {
    setLoading(true); // Set loading state to true when data fetching starts
    const [localData, cloudData, notionData, googleData] = await Promise.all([
      fetchLocalStorageData(),
      fetchCloudData(),
      fetchNotionData(),
      fetchGoogleData(),
    ]);
    // Process cloud data to match local data format
    const processedCloudData = cloudData?.map(([key, value]: [key: string, value: NoteValue]) => {
      const id = key.split("-").pop(); // Extracts the id from [email]-id format
      return [id, value] as [string, NoteValue];
    });

    const newData = [...localData, ...processedCloudData].filter(
      ([_, value]: [string, NoteValue]) => {
        return value !== null;
      }
    );
    // .sort((a, b) => {
    //   return Number(b[0]) - Number(a[0]);
    // });

    const uniqueKeys = Array.from(new Set(newData.map(([key, _]) => key)));

    const uniqueData = uniqueKeys.map((key) => {
      return newData.find(([k, _]) => k === key)!;
    });

    // Combine and set data
    setNotion(notionData as [string, string][]);
    setGoogle(googleData as [string, string][]);
    setKv(uniqueData);
    setLoading(false);
    return kv;
  };

  useEffect(() => {
    if (currentUser) {
      void combineData();
      void fetchToken();
    }
  }, []); // I'm removing the currentuser as a dependency for now. too many api calls!

  const deleteNote = async (keyToDelete: string) => {
    // const newKey = "archived-" + keyToDelete;
    // const newValue = localStorage.getItem(keyToDelete);
    localStorage.removeItem(keyToDelete);
    // localStorage.setItem(newKey, JSON.stringify(newValue));

    try {
      await fetch(`/api/note?id=${keyToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    void combineData();
  };

  const revalidateNotes = async () => {
    return await combineData();
  };

  return (
    <NotesContext.Provider
      value={{
        kv,
        notion,
        setNotion,
        google,
        setGoogle,
        loading,
        deleteNote,
        revalidateNotes,
        wordCount,
        token
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default useNotes;

/**
 * DO NOT DELETE
 * SCRAP YARD 01-MARCH-2024
 */
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { type NoteValue } from "@/types";
// import { wordCountRef } from "@/actions/wordCountRef";
// import { useCurrentUser } from "@/hooks/use-current-user";

// type NotesContextValue = {
//   kv: [string, NoteValue][];
//   loading: boolean;
//   deleteNote: (keyToDelete: string) => Promise<void>;
//   revalidateNotes: () => Promise<[string, NoteValue][]>;
//   wordCountReference: number | undefined | null;
// };

// const NotesContext = createContext<NotesContextValue | null>(null);

// export const useNotes = () => {
//   const contextValue = useContext(NotesContext);
//   if (!contextValue) {
//     throw new Error("useNotes must be used within a NotesProvider");
//   }
//   return contextValue;
// };

// export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const currentUser = useCurrentUser();
//   const [kv, setKv] = useState<[string, NoteValue][]>([]);
//   const [loading, setLoading] = useState(true);
//   const [wordCountReference, setWordCountReference] = useState<number | undefined | null>(0);

//   const fetchLocalStorageData = async (): Promise<[string, NoteValue][]> => {
//     const entries = Object.entries(localStorage);
//     return entries.filter(([key, value]) => value && key.length === 10 && key.match(/^\d+$/)).map(([key, value]) => [key, JSON.parse(value)] as [string, NoteValue]);
//   };

//   const fetchCloudData = async (): Promise<[string, NoteValue][]> => {
//     try {
//       await wordCountRef().then(setWordCountReference).catch(console.error);
//       const response = await fetch("/api/fetchPosts");
//       if (!response.ok) return [];
//       return (await response.json()) as [string, NoteValue][];
//     } catch (error) {
//       console.error("Error fetching cloud data:", error);
//       return [];
//     }
//   };

//   const combineData = async (): Promise<[string, NoteValue][]> => {
//     setLoading(true);
//     const [localData, cloudData] = await Promise.all([fetchLocalStorageData(), fetchCloudData()]);
//     const processedCloudData = cloudData.map(([key, value]) => {
//       const id = key.split("-").pop();
//       return [id, value] as [string, NoteValue];
//     });

//     const newData = [...localData, ...processedCloudData].filter(([_, value]) => value !== null).sort((a, b) => Number(b[0]) - Number(a[0]));

//     const uniqueData = Array.from(new Set(newData.map(([key, _]) => key))).map((key) => newData.find(([k, _]) => k === key)!);

//     setKv(uniqueData);
//     setLoading(false);
//     return uniqueData;
//   };

//   useEffect(() => {
//     if (currentUser) {
//       void combineData();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentUser]);

//   const deleteNote = async (keyToDelete: string): Promise<void> => {
//     localStorage.removeItem(keyToDelete);
//     try {
//       await fetch(`/api/note?id=${keyToDelete}`, { method: "DELETE" });
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//     void combineData();
//   };

//   const revalidateNotes = async (): Promise<[string, NoteValue][]> => {
//     return await combineData();
//   };

//   return <NotesContext.Provider value={{ kv, loading, deleteNote, revalidateNotes, wordCountReference }}>{children}</NotesContext.Provider>;
// };

// export default useNotes;
