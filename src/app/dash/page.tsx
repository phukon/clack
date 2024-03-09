"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrUpdate } from "react-icons/gr";
import GraphLayout from "../../components/graph/layout";
// import Card from "./_components/Card";
import useNotes from "@/context/NotesContext";
import { exportContentAsText } from "@/lib/extractText";
import { NoteValue as Value } from "@/types";
import { extractTitle } from "@/lib/extractTitle";
import Link from "next/link";
import { addContribution } from "@/actions/addContribution";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Dash = () => {
  const { kv, deleteNote } = useNotes();
  const [isUpdating, setIsupdating] = useState<boolean>(false);

  const onClick = () => {
    setIsupdating(true);
    addContribution()
      .then(() => setIsupdating(false))
      .catch((e) => console.log(e));
  };
  return (
    // pt-[calc(10vh)]
    <div className="mb-12 p-4 flex min-h-[100svh] flex-col items-center sm:px-5 md:mb-0">
      <GraphLayout isPreview={true} />
      <Button disabled={isUpdating} variant="secondary" onClick={onClick}>
        {isUpdating ? (
          "Updating..."
        ) : (
          <>
            Update heatmap
            <GrUpdate className="ml-3 w-4 h-4" />
          </>
        )}
      </Button>

      <div className="md:px-12">
        {kv.length === 0 ? (
          <h2 className="text-2xl mt-8 font-bold">No documents to show</h2>
        ) : (
          <div className="mt-8 md:px-12 ">
            <h2 className="text-2xl font-bold">Your Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-8 gap-4 mt-4">
              {kv.map(([key, value]: [string, Value]) => (
                <Link key={key} href={`/note?id=${key}`} className="rounded-md p-2 group  col-span-1">
                  <Card className="group-hover:scale-105 duration-150 ease-out">
                    <CardHeader className="rounded-t-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-stone-100 group-active:bg-stone-200 py-2">
                      <CardTitle className="text-sm font-semibold">{value ? extractTitle(value) : "untitled"}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative overflow-hidden h-40">
                      <p className="text-sm mt-4">{exportContentAsText(value)}</p>
                      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900" />

                      <div className="absolute bottom-4 right-4 z-10">
                        <button
                          className="flex h-10 w-10 items-center justify-center rounded-md p-2 bg-white hover:bg-stone-100 active:bg-stone-200"
                          onClick={async (e) => {
                            e.preventDefault();
                            await deleteNote(key);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                            <path
                              fillRule="evenodd"
                              d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dash;
