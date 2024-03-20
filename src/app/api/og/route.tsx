import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");
  const imageUrl = searchParams.get("image");
  const summary = searchParams.get("summary");
  const absoluteImageUrl = imageUrl ? `${req.nextUrl.origin}${imageUrl}` : null;
  const alternateImageUrl = `${req.nextUrl.origin}/logo.png`

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #ffe0b2, #ffffff, #ffe0b2)",
          fontSize: 32,
          fontWeight: 600,
          color: "#333",
          position: "relative",
        }}
      >
        {absoluteImageUrl ? (
          <img
            src={absoluteImageUrl}
            alt=""
            width={1050}
            height={549}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <img
          src={alternateImageUrl}
          alt=""
          width={1050}
          height={549}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit:"contain",
            objectPosition: "center",
          }}
        />
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "66%",
            width: "100%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)",
          }}
        />
        <h1
          style={{
            position: "absolute",
            bottom: 130,
            left: 80,
            margin: 0,
            fontSize: 60,
            fontFamily: "NYT Cheltenham",
            maxWidth: 900,
            whiteSpace: "pre-wrap",
            letterSpacing: -1,
            zIndex: '1px',
            color: "white",
          }}
        >
          {postTitle}
        </h1>
        {summary !== null && (
          <p
            style={{
              position: "absolute",
              bottom: 50,
              left: 80,
              margin: 0,
              fontSize: 32,
              fontFamily: "Arial",
              maxWidth: 900,
              whiteSpace: "pre-wrap",
              letterSpacing: -1,
              zIndex: '1px',
              color: "white",
            }}
          >
            {summary}
          </p>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
