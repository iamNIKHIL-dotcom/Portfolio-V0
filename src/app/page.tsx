"use client"

import { useState } from "react"
import { Terminal, User, Code, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Home from "@/components/sections/Home"
import About from "@/components/sections/About"
import Projects from "@/components/sections/Projects"
import { asciiArt } from "./asciiArt"
import TypedText from "@/components/Typed-Text"

export default function Portfolio() {
  const [selectedSection, setSelectedSection] = useState("home")

  const tabs = {
    home: {
      title: "home",
      content: <Home />,
    },
    about: {
      title: "about",
      content: <About />,
    },
    projects: {
      title: "projects",
      content: <Projects />,
    },
    blog: {
      title: "blog",
      content: undefined,
    }
  }

  return (
    <div className="min-h-screen bg-background text-purple-blue p-4 md:p-8 font-mono">
      <div className="flex flex-row flex-wrap sm:justify-start justify-center">
        <div className="text-green text-xs md:text-sm lg:text-base">
          <div className="w-full text-left text-xs sm:text-sm md:text-base lg:text-lg">

            <pre className="whitespace-pre">{asciiArt}</pre>
          </div>
          <div className="text-yellow-200 text-left text-xs sm:text-sm md:text-base lg:text-lg w-full">

            <TypedText
              strings={[
                'I build <span class="text-red-500 font-semibold">full-stack</span> projects.',
                '私は <span class="text-red-500 font-semibold">フルスタック</span> プロジェクトを構築します。',
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
              showCursor
              smartBackspace
              contentType="html"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="my-8 flex flex-wrap gap-4">
        <Button
          variant="ghost"
          className={`gap-2 ${selectedSection === "home" ? "text-purple" : ""}`}
          onClick={() => setSelectedSection("home")}
        >
          <Terminal className="w-4 h-4" />
          ~/home
        </Button>
        <Button
          variant="ghost"
          className={`gap-2 ${selectedSection === "about" ? "text-purple" : ""}`}
          onClick={() => setSelectedSection("about")}
        >
          <User className="w-4 h-4" />
          ~/about
        </Button>
        <Button
          variant="ghost"
          className={`gap-2 ${selectedSection === "projects" ? "text-purple" : ""}`}
          onClick={() => setSelectedSection("projects")}
        >
          <Code className="w-4 h-4" />
          ~/projects
        </Button>
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <BookOpen className="w-4 h-4" />
            ~/blog
          </Button>
        </Link>
      </nav>

      {/* Content */}
      <motion.div
        key={selectedSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedSection === "home" && tabs.home.content}
        {selectedSection === "about" && tabs.about.content}
        {selectedSection === "projects" && (
          <div className="space-y-6">
            {tabs.projects.content}
          </div>
        )}
      </motion.div>
    </div>
  )
}


