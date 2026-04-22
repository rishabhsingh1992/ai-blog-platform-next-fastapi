// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content: string[]; // each item is one paragraph
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns an estimated reading time in minutes based on word count. */
export function estimateReadTime(paragraphs: string[]): number {
  const WORDS_PER_MINUTE = 200;
  const totalWords = paragraphs.join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const posts: Post[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    date: "2026-04-15",
    tag: "Tutorial",
    excerpt:
      "A comprehensive guide to building modern web applications with Next.js and the App Router.",
    content: [
      "Next.js is a React framework that gives you everything you need to build fast, production-ready web applications. It handles routing, data fetching, bundling, and server rendering out of the box — so you can focus on writing features instead of configuring tools.",

      "The App Router, introduced in Next.js 13 and now the default, organises your app through the file system. Every folder inside the app/ directory can become a route. Add a page.tsx file to a folder and it becomes a publicly accessible page. Add a layout.tsx and it wraps all pages in that folder with shared UI.",

      "One of the biggest ideas in the App Router is that components are Server Components by default. A Server Component runs on the server, can read from a database or call an API, and sends only the finished HTML to the browser. This cuts down on the JavaScript your users have to download. When you need interactivity — click handlers, state, browser APIs — you opt in to a Client Component by adding 'use client' at the top of the file.",

      "To create your first project, run: npx create-next-app@latest. Choose TypeScript, Tailwind CSS, and the App Router when prompted. Once the install finishes, open app/page.tsx and start editing. The browser updates instantly thanks to Fast Refresh. That's really all you need to get started.",
    ],
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS v4",
    date: "2026-04-10",
    tag: "CSS",
    excerpt:
      "Explore the powerful new features in Tailwind CSS v4 including the @theme directive and improved performance.",
    content: [
      "Tailwind CSS v4 is a major release that rethinks how you configure and use the framework. The biggest change is that configuration has moved from a JavaScript file (tailwind.config.js) into CSS itself. You now define design tokens — colours, fonts, spacing — directly in your stylesheet using the @theme directive.",

      "Instead of writing a long configuration object, you declare variables like --color-accent: #6366f1 inside an @theme block. Tailwind picks these up and automatically generates utility classes for them. So text-accent, bg-accent, and border-accent all just work. The @theme inline variant inlines the values as CSS custom properties, which means your tokens are available to plain CSS too.",

      "Another welcome change is the import syntax. You no longer need separate @tailwind base, @tailwind components, and @tailwind utilities lines. A single @import 'tailwindcss' at the top of your CSS file does everything. It is simpler and easier to explain to newcomers.",

      "Performance is dramatically better in v4. The new Rust-based engine scans your files and generates CSS much faster than before. In large projects the difference is noticeable. On smaller projects you will mostly appreciate the cleaner setup — less config, fewer files to maintain, and a design system that lives right where your styles are.",
    ],
  },
  {
    slug: "react-server-components",
    title: "Understanding React Server Components",
    date: "2026-04-02",
    tag: "React",
    excerpt:
      "Deep dive into React Server Components and how they change the way we build full-stack React applications.",
    content: [
      "React Server Components (RSC) let you write components that run exclusively on the server. They can read from a database, call a private API, or access the file system — all without any of that logic ever reaching the browser. The server renders the component and sends the result to the client as a compact description of the UI.",

      "The most immediate benefit is performance. A Server Component sends zero JavaScript to the browser. There is nothing to download, parse, or hydrate. For content-heavy pages like blog posts, product listings, or dashboards, this can cut bundle sizes dramatically. The user sees content sooner because the browser has less work to do.",

      "The important rule to remember is that Server Components cannot use state, event handlers, or browser APIs. If you need any of those things, you need a Client Component. You mark a file as a Client Component by adding 'use client' at the very top. Client Components still render on the server for the initial page load — the difference is that they also ship JavaScript to the client so they can be interactive.",

      "In practice, a good pattern is to keep most of your app as Server Components and push 'use client' down to the leaves of the component tree — only the small pieces that actually need interactivity. A like button, a dropdown menu, a form with live validation — those are good candidates. The surrounding page, the layout, the static copy — those can all stay on the server.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export function getAllPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
