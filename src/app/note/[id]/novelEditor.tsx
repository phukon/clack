"use client";
/**
 * HEADS UP! i MADE A MISTAKE TO WHILE TRYING TO FORCE A RE-RENDER USING THE MD5HASH VALUE.
 * check the @parentCommit_41f7fcdb0566f790e4e6169a2a3d6d8b6ede9fec to study what I changed.
 *
 * In the first code snippet, the md5Hash variable is declared using the var keyword inside the useEffect hook.
 * This variable is assigned the result of the cryptographic hashing operation, but since it's not a state variable,
 * changes to its value don't trigger re-renders in React components. Therefore, the editor component doesn't rerender
 * when the md5Hash value changes, leading to the observed issue.
 *
 * In the second code snippet, the issue is addressed by replacing the var declaration of md5Hash with a state variable
 * created using the useState hook. This allows for updating md5Hash using setMd5Hash, which triggers a re-render
 * whenever its value changes. Since state updates trigger re-renders in React components, this approach ensures that
 * the editor component properly re-renders when the md5Hash value changes, resolving the initial issue.
 * ~ Riki {@Github https://github.com/phukon}
 */

import Warning from "@/components/warning";
import useNotes from "@/context/NotesContext";
import { Editor } from "novel";
import { useEffect, useState } from "react";
import { type JSONContent } from "@tiptap/core";
import crypto from "crypto";
// import {placeholder} from './defaultData';

function NovelEditor({ id }: { id: string }) {
  const [data, setData] = useState<JSONContent | string>("");
  const [cloudData, setCloudData] = useState<JSONContent | string>("");
  const [syncWithCloudWarning, setSyncWithCloudWarning] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [md5Hash, setMd5Hash] = useState("");

  const { revalidateNotes, kv } = useNotes();

  const loadData = async () => {
    try {
      const response = await fetch(`/api/note?id=${id}`);

      if (response.status === 404) {
        return null;
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = (await response.json()) as JSONContent;
      return jsonData;
    } catch (error) {
      console.error("Error loading data from cloud:", error);
      return null;
    }
  };

  // Effect to synchronize data
  useEffect(() => {
    const synchronizeData = async () => {
      const cloud = await loadData();
      if (cloud) {
        setCloudData(cloud);

        const local = localStorage.getItem(id);
        if (local) {
          setData(local);
          if (local !== JSON.stringify(cloud)) {
            setSyncWithCloudWarning(true);
          }
        } else {
          setData(cloud);
          localStorage.setItem(id, JSON.stringify(cloud));
        }
      }
    };

    void synchronizeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setMd5Hash(crypto.createHash("md5").update(JSON.stringify(data)).digest("hex"));
  }, [data]);

  const handleKeepLocalStorage = () => {
    setSyncWithCloudWarning(false);
  };

  const handleKeepCloudStorage = () => {
    localStorage.setItem(id, JSON.stringify(cloudData));
    setData(cloudData);
    setSyncWithCloudWarning(false);
  };

  return (
    <>
      {syncWithCloudWarning && (
        <Warning handleKeepLocalStorage={handleKeepLocalStorage} handleKeepCloudStorage={handleKeepCloudStorage} />
      )}
      <div className="relative w-full max-w-screen-lg pb-8">
        <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
          {saveStatus}
        </div>
        <Editor
        disableLocalStorage={true}
          debounceDuration={3000}
          key={md5Hash}
          defaultValue={data}
          storageKey={id}
          className="novel-relative novel-min-h-[500px] novel-w-full novel-max-w-screen-lg novel-border-stone-200 sm:novel-mb-[calc(20vh)] sm:novel-rounded-lg sm:novel-border sm:novel-shadow-lg"
          // TODO: UPLOAD IMAGES THROUGH /API/UPLOAD
          completionApi="/api/generate"
          onUpdate={(_) => {
            setSaveStatus("Unsaved");
          }}
          onDebouncedUpdate={async (value) => {
            if (!value) return;
            const kvValue = kv.find(([key]) => key === id);
            const kvValueFirstLine = kvValue?.[1].content?.[0].content[0].text.split("\n")[0];

            // if first line edited, revalidate notes
            if (value.getText().split("\n")[0] !== kvValueFirstLine) {
              void revalidateNotes();
            }

            setSaveStatus("Saving...");
            const response = await fetch("/api/note", {
              method: "POST",
              body: JSON.stringify({ id, data: value.getJSON() }),
            });
            const res = await response.text();
            setSaveStatus(res);
          }}
        />
      </div>
    </>
  );
}

export default NovelEditor;
