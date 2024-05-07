import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client"
import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";


export const loader = async ({context}: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  const adapter = new PrismaD1(env.DB)
  const prisma = new PrismaClient({adapter})
  const books = await prisma.book.findMany()
  return json({books})
}

export const meta: MetaFunction = () => {
  return [
    { title: "Remix with Cloudflare Sample" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export default function Index() {
  const { books } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>RemixプロジェクトをCloudflare Pagesにデプロイするサンプルプロジェクト</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/"
            rel="noreferrer"
          >
            Cloudflare Pages Docs - Remix guide
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
