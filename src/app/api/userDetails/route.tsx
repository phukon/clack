import { db } from "@/lib/db";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')
  
  if (!query) {
    return new Response("No id provided", {
      status: 404,
    });
  }

  const user = await db.user.findFirst({
    where: {
      id: query
    }
  })


  return new Response(user?.name, {
    status: 200,
  });
}