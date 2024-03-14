// import { env } from "@/env"; // for edge runtime
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { exportContentAsText } from "@/lib/extractText";
import { decryptData, encryptData } from "@/lib/encryptData";

// export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const user = await currentUser();

  if (!user) {
    return new Response("Saved locally | Upgrade for Notion integration", {
      status: 401,
    });
  }

  // get request body
  const body = await req.json();

  const { id, data } = body;

  if (!id || !data) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  const userNote = await db.note.findFirst({
    where: {
      userId: user.id,
      id: id,
    },
  });

  if (!userNote) {
    return new Response("Unauthorized", { status: 401 });
  }

  const ENCRYPTEDDATA = encryptData({
    data: data,
    enKey: process.env.ENCRYPTION_KEY!,
    initVector: process.env.INITIALIZATION_VECTOR!,
  });

  const key = `${user.email}-${id}`;

  /**
   * save meta-data to postgress db
   * Since I receive an array for words grouped together by a type, we have multiple words per elements.
   * Therefore I transform the array to have one word per element and get the word count.
   */
  const wordCount = exportContentAsText(data).join(" ").split(/\s+/).length;

  await db.note.update({ where: { id: id }, data: { wordCount: wordCount } });

  // save to cloudflare
  const putResponse = await fetch(`${process.env.WORKER_BASE_URL}?key=${key}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Auth-Key": `${process.env.SECURITY_KEY}`,
    },
    body: ENCRYPTEDDATA,
  });

  if (putResponse.status !== 200) {
    return new Response("Failed to save", {
      status: 500,
    });
  }

  return new Response("Saved", {
    status: 200,
  });
}

export async function GET(req: Request): Promise<Response> {
  const id = new URL(req.url).searchParams.get("id");
  const user = await currentUser();

  if (!user?.email) {
    return new Response("Saved locally", {
      status: 401,
    });
  }
  if (!id) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  const userNote = await db.note.findFirst({
    where: {
      userId: user.id,
      id: id,
    },
  });

  if (!userNote) {
    return new Response("Unauthorized", { status: 401 });
  }

  const key = `${user.email}-${id}`;

  // save to cloudflare
  const getResponse = await fetch(`${process.env.WORKER_BASE_URL}?key=${key}`, {
    method: "GET",
    headers: {
      "X-Custom-Auth-Key": `${process.env.SECURITY_KEY}`,
    },
  });

  if (getResponse.status !== 200) {
    return new Response(await getResponse.text(), {
      status: getResponse.status,
    });
  }

  const data = await getResponse.text();
  const DECRYPTEDDATA = decryptData({
    encryptedData: data,
    enKey: process.env.ENCRYPTION_KEY!,
    initVector: process.env.INITIALIZATION_VECTOR!,
  });

  return new Response(DECRYPTEDDATA, {
    status: 200,
  });
}

export async function DELETE(req: Request): Promise<Response> {
  const id = new URL(req.url).searchParams.get("id");
  const user = await currentUser();

  if (!user?.email) {
    return new Response("Saved locally", {
      status: 401,
    });
  }
  if (!id) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  await db.note.delete({ where: { id: id } });

  const key = `${user.email}-${id}`;

  // cloudflare
  const deleteResponse = await fetch(`${process.env.WORKER_BASE_URL}?key=${key}`, {
    method: "DELETE",
    headers: {
      "X-Custom-Auth-Key": `${process.env.SECURITY_KEY}`,
    },
  });

  const data = await deleteResponse.text();
  console.log(data);
  if (deleteResponse.status !== 200) {
    return new Response(data, {
      status: 404,
    });
  }

  return new Response("Deleted", {
    status: 200,
  });
}
