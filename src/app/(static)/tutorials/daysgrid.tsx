import Image from "next/image";
import Link from "next/link";
import oneImg from "/public/showcase/cat.png";
import bg from "/public/showcase/bg.png";

const posts = [
  {
    id: 1,
    title: "Adding a Notion page",
    href: "/link-notion-page",
    imageUrl: oneImg,
    description: "Learn how to connect the Clack integration on Notion and link pages in Clack.",
  },
  {
    id: 2,
    title: "Adding a Google doc",
    href: "/link-google-doc",
    imageUrl: bg,
    description: "Learn how to connect the Clack integration on Notion and link pages in Clack.",
  },
];

export default function DaysGrid() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-12 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <Image
                src={post.imageUrl}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
                fill
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-col gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <div className="flex items-center gap-x-4">
                  <div className="flex gap-x-2.5">{post.description}</div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
