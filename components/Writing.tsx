import { blogPosts } from "@/lib/data";

export default function Writing() {
  return (
    <section id="writing" className="section">
      <div className="wrap">
        <header className="section-head">
          <span className="label">06 — Writing</span>
          <h2 className="h2" data-split data-perch="text">
            Notes on physics, <em>code and Skardu.</em>
          </h2>
        </header>

        <div className="posts" data-perch>
          {blogPosts.map((post) => (
            <details key={post.id} className="post" data-reveal>
              <summary>
                <span className="label when">{post.date}</span>
                <h3 className="post-title">{post.title}</h3>
                <span className="toggle" aria-hidden="true">
                  +
                </span>
                <p className="post-excerpt">{post.excerpt}</p>
              </summary>
              <div className="post-content">
                <p className="prose">{post.content}</p>
                <p className="label" style={{ marginTop: "1.25rem" }}>
                  {post.tags.join(" · ")}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
