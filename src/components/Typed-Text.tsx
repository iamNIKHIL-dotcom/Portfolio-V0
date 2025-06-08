"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  smartBackspace?: boolean;
  showCursor?: boolean;
  contentType?: 'html' | 'null'; // support HTML content
}

const TypedText: React.FC<TypedTextProps> = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  smartBackspace = true,
  showCursor = true,
  contentType = 'html',
}) => {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        loop,
        smartBackspace,
        showCursor,
        contentType, // enables HTML parsing
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, [strings, typeSpeed, backSpeed, loop, smartBackspace, showCursor, contentType]);

  return <span ref={el}></span>;
};

export default TypedText;
