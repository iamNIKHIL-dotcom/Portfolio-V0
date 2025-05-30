import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

// Replace with your actual Medium username
const MEDIUM_USERNAME = "no-non-sense-guy"

interface MediumPost {
  title: string
  pubDate: string
  link: string
  thumbnail: string
  categories: string[]
  description: string
}

async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
    )
    const data = await res.json()

    if (!data.items) {
      console.error("Unexpected Medium API response:", data)
      return []
    }

    return data.items.map((post: any) => ({
      title: post.title,
      pubDate: post.pubDate,
      link: post.link,
      thumbnail: post.thumbnail || post.featuredImage || "/default-blog.jpg",
      categories: post.categories,
      description: post.description.replace(/<[^>]+>/g, "").substring(0, 100) + "..."
    }))
  } catch (error) {
    console.error("Error fetching Medium posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getMediumPosts()

  return (
    <div className="min-h-screen bg-background text-gray-white p-4 md:p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-purple-blue text-3xl font-bold mb-8 flex flex-row w-full justify-between">
          <Link href="/"><ChevronLeft className="w-8 h-8 text-gray-white"/></Link>
          ~/blog
        </h1>
        
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
                  <Image 
                    src={post.thumbnail} 
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
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
      </div>
    </div>
  )
}