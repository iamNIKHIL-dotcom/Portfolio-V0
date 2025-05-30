import { Github, GithubIcon, Linkedin, StickyNote, Youtube } from "lucide-react"
import { Button } from "../ui/button"
import Projects from "./Projects"
import Link from "next/link"

const Home = () => {

    const socials = [
    {
      title: "GitHub",
      href: "https://github.com/iamNIKHIL-dotcom",
      icon: <GithubIcon className="w-4 h-4" />
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/nikhil-ummidi-4b130027a/",
      icon: <Linkedin className="w-4 h-4"/>
    },
    {
      title: "Medium",
      href: "https://medium.com/@no-non-sense-guy",
      icon: <StickyNote className="w-4 h-4" />
    }

  ]
  return (
    <div className="space-y-6">
      <h1 className="text-purple-blue text-2xl md:text-3xl">Hello, World! 👋</h1>
      <p className="text-lg text-gray-white">
        Web and systems enthusiast
      </p>
      <div className="flex gap-4 flex-wrap">
        {socials.map((social) => (
          <Link href={social.href} key={social.title}>
            <Button variant="outline" className="gap-2 text-purple border-muted hover:border-gray-white">
              {social.icon}
              {social.title}
            </Button>
          </Link>
        ))}
      </div>
      <Projects />
    </div>
  )
}

export default Home