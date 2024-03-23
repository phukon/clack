import { Button } from "@/components/ui/button";
import Navbar from "../navbar";
import Link from "next/link";
import { RiNotionFill } from "react-icons/ri";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";

const AUTH_URL = process.env.NOTION_AUTH_URL;

export default async function Integrations() {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("Unauthorized");
  const dbUser = await getUserById(user.id);
  if (!dbUser) throw new Error("Unauthorized");

  const isConnected: boolean = dbUser.notionDetails ? true : false;

  return (
    <>
      <Navbar userImage={user?.image} current="Integrations" />
      <div className="p-4 sm:p-4 sm:m-4 flex items-center justify-between mb-4 md:mb-8 lg:mb-12">
        <div className="space-y-1">
          <h3 className="text-2xl text-foreground font-semibold tracking-tight">General</h3>
          <p className="text-sm text-muted-foreground">Manage your Notion integration</p>
        </div>
      </div>
      <div className=" px-4 sm:mx-4">
        {isConnected ? (
          <p className=" mb-5"> The Clack integration is connected with your workspace.</p>
        ) : (
          <p className=" mb-5">
            Connect Clack integration with your Notion workspace.{" "}
            <span className=" text-gray-500">
              Don&apos;t know how?{" "}
              <Link target="_blank" className=" underline-offset-4 underline" href="/tutorials">
                Click here
              </Link>
            </span>
          </p>
        )}
        {isConnected ? (
          <Link href="/auth/unlinkNotion">
            <Button className="w-full md:w-56">
              Unlink integration <RiNotionFill className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        ) : (
          AUTH_URL && (
            <Link href={AUTH_URL}>
              <Button className="w-full md:w-56">
                Connect <RiNotionFill className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          )
        )}
      </div>
    </>
  );
}
