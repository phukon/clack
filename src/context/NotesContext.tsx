'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { type NoteValue } from '@/types';
import { wordCountRef } from '@/actions/wordCountRef';

type NotesContextValue = {
    kv: [string, NoteValue][];
    loading: boolean;
    deleteNote: (keyToDelete: string) => Promise<void>;
    revalidateNotes: () => Promise<[string, NoteValue][]>;
    wordCountReference: number  | undefined | null;
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
    const [kv, setKv] = useState<[string, NoteValue][]>([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [wordCountReference, setWordCountReference] = useState<number | undefined | null>(0)


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

    // Function to fetch data from cloud
    const fetchCloudData = async () => {
        try {
            await wordCountRef().then(n => setWordCountReference(n)).catch(e => console.log(e)) // TODO: optimize return types!!
            const response = await fetch("/api/fetchPosts");
            if (response.status != 200) {
                return [];
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return data as [string, NoteValue][];
        } catch (error) {
            console.error("Error fetching cloud data:", error);
            return [];
        }
    };

    // Function to combine and set data from both sources
    const combineData = async () => {
        setLoading(true); // Set loading state to true when data fetching starts
        const [localData, cloudData] = await Promise.all([fetchLocalStorageData(), fetchCloudData()]);
        // Process cloud data to match local data format
        const processedCloudData = cloudData?.map(
            ([key, value]: [key: string, value: NoteValue]) => {
                const id = key.split("-").pop(); // Extracts the id from [email]-id format
                return [id, value] as [string, NoteValue];
            },
        );

        const newData = [...localData, ...processedCloudData]
            .filter(([_, value]: [string, NoteValue]) => {
                return value !== null;
            })
            .sort((a, b) => {
                return Number(b[0]) - Number(a[0]);
            });

        const uniqueKeys = Array.from(new Set(newData.map(([key, _]) => key)));

        const uniqueData = uniqueKeys.map((key) => {
            return newData.find(([k, _]) => k === key)!;
        });

        // Combine and set data
        setKv(uniqueData)
        setLoading(false); // Set loading state to false when data fetching is complete

        return kv;
    };


    useEffect(() => {
        void combineData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteNote = async (keyToDelete: string) => {
        const newKey = "archived-" + keyToDelete;
        const newValue = localStorage.getItem(keyToDelete);
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
    }

    return (
        <NotesContext.Provider value={{ kv, loading, deleteNote, revalidateNotes, wordCountReference }}>
            {children}
        </NotesContext.Provider>
    );
};

export default useNotes;
