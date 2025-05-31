import { Github, Linkedin, Mail, StickyNote, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Projects from "@/components/sections/Projects"

export default function Home() {

  const socials = [
    {
      title: "GitHub",
      href: "https://github.com/iamNIKHIL-dotcom",
      icon: <Github className="w-4 h-4" />
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/nikhil-ummidi-4b130027a/",
      icon: <Linkedin className="w-4 h-4" />
    },
    {
      title: "Medium",
      href: "https://medium.com/@no-non-sense-guy",
      icon: <StickyNote className="w-4 h-4" />
    },
    {
    title: "Gmail",
    href: "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=ummidinikhil@gmail.com",
    icon: <Mail className="w-4 h-4" /> // Replace with a mail icon
  }

  ]

  return (
    <div className="space-y-6">
      <h1 className="text-purple-blue text-2xl md:text-3xl">Hello, World! 👋</h1>
      <p className="text-lg text-gray-white">

          21, i break things, learn fast, and make shit happen. deep into code and cs; anything that pushes the limits. history, curiosity, cricket, and great books shaped me. still chasing mastery.
          If you&apos;re working on something real, let&apos;s talk.
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
