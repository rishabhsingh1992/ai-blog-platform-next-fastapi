import { getAllPosts } from "@/app/lib/posts";
import PostCard from "@/app/ui/post-card";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Hello, welcome to my blog
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          Thoughts on web development, design, and the tools I use every day.
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted">
          Recent Posts
        </h2>
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
