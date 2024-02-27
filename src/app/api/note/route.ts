// import { env } from "@/env";
import {currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { exportContentAsText } from "@/lib/extractText";

// export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const user = await currentUser();

  if (!user) {
    return new Response("Saved locally | Login for Cloud Sync", {
      status: 401,
    });
  }

  // get request body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await req.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { id, data } = body;

  if (!id || !data) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  const key = `${user.email}-${id}`;

  /**
   * save meta-data to postgress db
   * Since I receive an array for words grouped together by a type, we have multiple words per elements.
   * Therefore I transform the array to have one word per element and get the word count.
   */
  const wordCount = exportContentAsText(data).join(' ').split(/\s+/).length

  await db.note.update({where: {id: id}, data: {wordCount: wordCount}} )

  // save to cloudflare
  const putResponse = await fetch(`${process.env.WORKER_BASE_URL}?key=${key}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Auth-Key": `${process.env.SECURITY_KEY}`,
    },
    body: JSON.stringify(data),
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
    return new Response("Saved locally | Login for Cloud Sync", {
      status: 401,
    });
  }
  if (!id) {
    return new Response("Invalid request", {
      status: 400,
    });
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await getResponse.json();

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

export async function DELETE(req: Request): Promise<Response> {
  const id = new URL(req.url).searchParams.get("id");
  const user = await currentUser();

  if (!user?.email) {
    return new Response("Saved locally | Login for Cloud Sync", {
      status: 401,
    });
  }
  if (!id) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  const key = `${user.email}-${id}`;

  // save to cloudflare
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
