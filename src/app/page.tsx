"use client"


import {motion} from "framer-motion"

import About from "@/components/sections/About";
import Home from "@/components/sections/Home";
import Projects from "@/components/sections/Projects";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Terminal, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { asciiArt } from "./asciiArt";
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
        <pre className="text-green text-xs md:text-sm lg:text-base whitespace-pre overflow-x-auto">
          {asciiArt} 
        </pre>
      </div>
      {/* NAviagtion */}
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
    </div >
  );
}
