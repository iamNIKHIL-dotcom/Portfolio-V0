// app/blog/page.tsx
"use client"; // Convert to client component

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import BlogImage from "@/components/BlogImage";
import { Skeleton } from "@/components/ui/skeleton";

interface MediumPost {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  categories: string[];
  description: string;
}

function extractFirstImage(html: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const match = imgRegex.exec(html);
  if (!match) return null;
  
  const url = match[1];
  
  // Skip tracking images and non-image URLs
  if (url.includes('medium.com/_/stat') || 
      url.includes('medium.com%2F_%2Fstat') ||
      !url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
    return null;
  }
  
  return url;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const MEDIUM_USERNAME = "no-non-sense-guy";
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
        );
        
        if (!res.ok) {
          throw new Error(`Failed to fetch posts: ${res.status}`);
        }
        
        const data = await res.json();

        if (!data.items) {
          throw new Error("Unexpected Medium API response");
        }

        const formattedPosts = data.items.map((post: MediumPost) => {
          let thumbnail = extractFirstImage(post.description);
          
          // If no valid image found, use default
          if (!thumbnail || !thumbnail.startsWith("http")) {
            thumbnail = "/default-blog.jpg";
          }
          
          return {
            title: post.title,
            pubDate: post.pubDate,
            link: post.link,
            thumbnail,
            categories: post.categories || [],
            description: post.description.replace(/<[^>]+>/g, "").substring(0, 100) + "..."
          };
        });
        
        setPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-gray-white p-4 md:p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-purple-blue text-3xl font-bold mb-8 flex flex-row w-full justify-between">
          <Link href="/"><ChevronLeft className="w-8 h-8 text-gray-white"/></Link>
          ~/blog
        </h1>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-700/50 hover:bg-red-700 rounded-md transition-colors"
            >
              Retry
            </button>
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-full flex flex-col bg-card border-card-border overflow-hidden">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </div>
                  <Skeleton className="h-7 w-4/5 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-4 w-20 mt-2" />
                </div>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-purple-blue">No blog posts found</p>
            <p className="mt-2 text-gray-400">Check back later for new content</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link 
                href={post.link} 
                key={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full flex flex-col bg-card border-card-border overflow-hidden">
                  <div className="relative h-48">
                    <BlogImage 
                      src={post.thumbnail} 
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.slice(0, 3).map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 text-xs rounded-md bg-tag-background text-purple"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-purple-blue mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-white text-sm mb-4 flex-grow line-clamp-3">
                      {post.description}
                    </p>
                    <time className="text-sm text-muted">
                      {new Date(post.pubDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}