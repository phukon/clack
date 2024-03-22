"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

type TnotionOAuth = {
  code: string;
};

const clientId = process.env.NOTION_OAUTH_CLIENT_ID;
const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET;
const redirectUri = process.env.NOTION_OAUTH_REDIRECT_URI;

const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

// Utility function to handle fetching OAuth token
async function fetchOAuthToken(code: string): Promise<any> {
  try {
    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch OAuth token: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching OAuth token:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export const notionOAuth = async ({ code }: TnotionOAuth) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) throw new Error("Unauthorized");

    const dbUser = await getUserById(user.id);
    if (!dbUser) throw new Error("Unauthorized");

    const response = await fetchOAuthToken(code);

    await db.user.update({
      where: { id: dbUser.id },
      data: {
        notionDetails: response,
      },
    });

    return { success: "O-Auth success" };
  } catch (error) {
    return { error: "O-Auth error" };
  }
};
