import {currentUser } from "@/lib/auth";

export async function GET(_: Request): Promise<Response> {
  const user = await currentUser()

  if (!user?.email) {
    return new Response(JSON.stringify({
      message: "Unauthorized",
    }), {
      status: 401,
    });
  }

  // save to cloudflare
  const getResponse = await fetch(
    `${process.env.WORKER_BASE_URL}?getAllFromUser=${user.email}`,
    {
      method: "GET",
      headers: {
        "X-Custom-Auth-Key": `${process.env.SECURITY_KEY}`,
      },
    },
  );

  if (getResponse.status !== 200) {
    return new Response("Failed to get", {
      status: 500,
    });
  }

  const data = await getResponse.json();

  const keys = Object.keys(data);

  const values = Object.values(data);

  // convert to list of [key, value] pairs
  const result = keys.map((key, index) => {
    return [key, values[index]];
  });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
