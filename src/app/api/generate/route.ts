import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserSubscriptionPlan } from "@/lib/stripe";

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
// export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const ip = req.headers.get("x-forwarded-for");
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(1, "5 s"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(`notty_ratelimit_${ip}`);

    if (!success) {
      return new Response("You have reached your request limit for the day.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized bruh", {
      status: 200,
    });
  }

  if (!user.id) {
    return new Response("Invalid user ID bruh", {
      status: 200,
    });
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return new Response("Unauthorized", {
      status: 200,
    });
  }

  const subscriptionPlan = await getUserSubscriptionPlan();

  if ("error" in subscriptionPlan) {
    return new Response("Error getting subscription plan", {
      status: 200,
    });
  }

  const userPlan = subscriptionPlan.isSubscribed ? "pro" : "free";
  if (userPlan === "free") {
    return new Response("Upgrade to Clack Pro to use the AI writing assistant ✨", {
      status: 200,
    });
  }

  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI writing assistant that continues existing text based on context from prior text. " +
          "Give more weight/priority to the later characters than the beginning ones. " +
          "Limit your response to no more than 200 characters, but make sure to construct complete sentences. Just output in text format.",
        // we're disabling markdown for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
        // "Use Markdown formatting when appropriate.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
