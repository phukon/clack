import { currentUser } from "@/lib/auth";
import { decryptData } from "@/lib/encryptData";

export async function GET(_: Request): Promise<Response> {
  const user = await currentUser();

  if (!user?.email) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

  // save to cloudflare
  const getResponse = await fetch(`${process.env.WORKER_BASE_URL}?getAllFromUser=${user.email}`, {
    method: "GET",
    headers: {
      "X-Custom-Auth-Key": `${process.env.SECURITY_KEY}`,
    },
  });

  const rawResponse = await getResponse.text();
  // console.log("Raw Worker Response:", rawResponse);

  if (getResponse.status !== 200) {
    return new Response("Failed to get", {
      status: 500,
    });
  }

  const data = JSON.parse(rawResponse);


  const keys = Object.keys(data);

  // const values = Object.values(data);

  const decryptedValuesArray: any = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const encryptedValue = data[key];
      if (encryptedValue && typeof encryptedValue === "string") {
        const decryptedValue = decryptData({
          encryptedData: encryptedValue,
          enKey: process.env.ENCRYPTION_KEY!,
          initVector: process.env.INITIALIZATION_VECTOR!,
        });
        decryptedValuesArray.push(decryptedValue);
      }
    }
  }

  // convert to list of [key, value] pairs
  const result = keys.map((key, index) => {
    return [key, decryptedValuesArray[index]];
  });

  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
