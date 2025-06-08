interface Project {
  title: string
  description: string
  tags: string[]
  liveLink: string
  devLink: string
}


const projects: Project[] = [
  {
    title: "SkyTunes",
    description: "Web application that provides weather information and music playlists based on the city name entered by the user.",
    tags: ["ReactJs", "expressJs", "NodeJs"],
    liveLink: "https://sky-tunes.vercel.app/",
    devLink: "https://github.com/iamNIKHIL-dotcom/SkyTunes",
  },
  {
    title: "Real-time-chat",
    description: "A real-time chat application built using sockets with the shadCN UI library, leveraging a TurboRepo build system for efficient project management and a powerful orchestrator",
    tags: ["ReactJs", "expressJs", "NodeJs", "TypeScript"],
    liveLink: "https://chat-room-web-six.vercel.app/",
    devLink: "https://github.com/iamNIKHIL-dotcom/chat-room",
  },
  {
    title: "Collab-draw",
    description: "A collabrative drawing application using canvas similar to excalidraw, leveraging a TurboRepo build system for efficient project management",
    tags: ["TypeScript", "PostGressql", "prisma", "WebSocket", "expressJS"],
    liveLink: "",
    devLink: "https://github.com/iamNIKHIL-dotcom/collab-draw",
  },
  {
    title: "Meme-hub",
    description:"MemeHub is a dynamic web application designed for effortless meme creation using custom templates.",
    tags:["TypeScript","NextJs", "canvas"],
    liveLink:"https://github.com/iamNIKHIL-dotcom/meme-hub",
    devLink:"https://meme-hub-g4ad.vercel.app/",
  }


]

export default projects