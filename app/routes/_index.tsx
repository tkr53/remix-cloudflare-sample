import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";


type Book = {
  id: number;
  title: string;
  author: string;
}
export const loader = async ({context}: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  const {results} = await env.DB.prepare(
    "SELECT * FROM books;"
  ).all<Book>()
  return json({results})
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
  const { results } = useLoaderData<typeof loader>();

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
        {results.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
