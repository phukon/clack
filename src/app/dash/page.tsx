"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";
import { RiNotionFill, RiGoogleFill } from "react-icons/ri";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { RiQuillPenFill } from "react-icons/ri";
import GraphLayout from "../../components/graph/layout";
import useNotes from "@/context/NotesContext";
import { exportContentAsText } from "@/lib/extractText";
import { NoteValue as Value } from "@/types";
import { extractTitle } from "@/lib/extractTitle";
import Link from "next/link";
import { addContribution } from "@/actions/addContribution";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddDocumentButton } from "@/components/document/AddDocumentButton";
import { removeDocument } from "@/actions/document/removeDocument";
import { useToast } from "@/components/ui/use-toast";

const Dash = () => {
  const { toast } = useToast();
  const { kv, deleteNote, notion, setNotion, google, setGoogle, revalidateNotes } = useNotes();
  const [isUpdating, setIsupdating] = useState<boolean>(false);

  const onClick = () => {
    setIsupdating(true);
    addContribution()
      .then(() => setIsupdating(false))
      .catch((e) => {
        console.log(e);
        toast({
          title: "Couldn't perform an update!",
          description:
            "Did you recently delete documents before unlinking them? Check console for more info.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsupdating(false);
      });
  };
  return (
    // pt-[calc(10vh)]
    <div className="mb-12 ml-3 p-4 flex min-h-[100svh] flex-col items-center sm:px-5 md:mb-0">
      <GraphLayout key={isUpdating.toString()} isPreview={true} />

      <div className=" grid md:flex md:flex-row mt-3 gap-2">
        <Button disabled={isUpdating} className=" col-span-1" variant="outline" onClick={onClick}>
          {isUpdating ? (
            "Updating..."
          ) : (
            <>
              Update heatmap
              <BsStars className="ml-1 w-4 h-4" />
            </>
          )}
        </Button>

        <AddDocumentButton>
          Link Document <IoDocumentAttachOutline className="ml-1 w-4 h-4" />
        </AddDocumentButton>
        <motion.div className=" col-span-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/note/new">
            <Button className="w-full">
              Write <RiQuillPenFill className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
      {kv.length === 0 && notion.length === 0 && google.length === 0 ? (
        <h2 className="text-2xl mt-14 -mb-9 font-bold">No documents to show</h2>
      ) : (
        <h2 className="text-2xl mt-14 -mb-9 font-bold">Your documents</h2>
      )}
      {notion && (
        <div className="mt-8 md:px-12 ">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-8 gap-4 mt-4">
            {notion.map((v) => (
              <Link target="_blank" key={v[0]} href={v[0]} className="rounded-md p-2 group  col-span-1">
                <Card className="group-hover:scale-105 duration-150 ease-out">
                  <CardHeader className="rounded-t-lg bg-gray-300 dark:bg-gray-800 group-hover:bg-stone-100 group-active:bg-stone-200 py-2">
                    <CardTitle className="text-sm flex flex-row font-semibold">
                      <RiNotionFill className=" -mt-1 w-6 h-6" />
                      Notion document
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative overflow-hidden h-40">
                    <RiNotionFill className="w-[300px] h-[200px]" />
                    {/* <p className="text-sm mt-4">{v[1]}</p> */}
                    <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900" />

                    <div className="absolute bottom-4 right-4 z-10">
                      <Button
                        variant="outline"
                        onClick={async (e) => {
                          e.preventDefault();
                          removeDocument(v[0])
                            .then(() => revalidateNotes())
                            .then(() => {
                              toast({
                                title: "Success",
                                description: "Removed document!",
                                variant: "success",
                              });
                            });
                          setNotion((prevNotion: [string, string][]) =>
                            prevNotion.filter(([id, _]: [id: string, _: string]) => id !== v[0])
                          );
                        }}
                      >
                        Unlink
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="md:px-12">
        {kv && (
          <div className="mt-8 md:px-12 ">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-8 gap-4 mt-4">
              {kv.map(([key, value]: [string, Value]) => (
                <Link
                  key={key}
                  href={`/note?id=${key}`}
                  className="rounded-md p-2 group  col-span-1"
                >
                  <Card className="group-hover:scale-105 duration-150 ease-out ">
                    <CardHeader className="rounded-t-lg bg-gray-300 dark:bg-gray-800 group-hover:bg-stone-100 group-active:bg-stone-200 py-2">
                      <CardTitle className="text-sm font-semibold">
                        {value ? extractTitle(value) : "untitled"}
                      </CardTitle>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4"
                          >
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
      {google && (
        <div className="mt-8 md:px-12 ">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-8 gap-4 mt-4">
            {google.map((v) => (
              <Link target="_blank" key={v[0]} href={v[0]} className="rounded-md p-2 group  col-span-1">
                <Card className="group-hover:scale-105 duration-150 ease-out">
                  <CardHeader className="rounded-t-lg bg-gray-300 dark:bg-gray-800 group-hover:bg-stone-100 group-active:bg-stone-200 py-2">
                    <CardTitle className="text-sm flex flex-row font-semibold">
                      <RiGoogleFill className=" -mt-1 w-6 h-6" />
                      {v[1]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative overflow-hidden h-40">
                    {/* <p className="text-sm mt-4">{v[1]}</p> */}
                    <RiGoogleFill className="w-[300px] h-[200px]" />
                    <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900" />

                    <div className="absolute bottom-4 right-4 z-10">
                      <Button
                        variant="outline"
                        onClick={async (e) => {
                          e.preventDefault();
                          removeDocument(v[0])
                            .then(() => revalidateNotes())
                            .then(() => {
                              toast({
                                title: "Success",
                                description: "Removed document!",
                                variant: "success",
                              });
                            });
                          setGoogle((prevGoogle: [string, string][]) =>
                            prevGoogle.filter(([id, _]: [id: string, _: string]) => id !== v[0])
                          );
                        }}
                      >
                        Unlink
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dash;
