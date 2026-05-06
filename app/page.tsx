import { getAllPosts } from "@/app/lib/posts";
import PostCard from "@/app/ui/post-card";
import HomeCTA from "@/app/ui/home-cta";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground">
          Hello, welcome to my blog
        </h1>
        <p className="text-lg leading-relaxed text-muted max-w-2xl">
          Thoughts on web development, design, and the tools I use every day. 
          Join our community of developers and designers.
        </p>
        <HomeCTA />
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
