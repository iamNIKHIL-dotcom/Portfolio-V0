
// app/components/BlogImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function BlogImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc("/default-blog.jpg")}
    />
  );
}