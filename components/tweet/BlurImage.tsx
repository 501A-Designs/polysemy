"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export const BlurImage: React.FC<ImageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]);

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={`${props.className} ${loading ? "blur-[2px]" : "blur-0"}`}
      onLoadingComplete={async () => {
        setLoading(false);
      }}
      onError={() => {
        setSrc(`https://avatar.vercel.sh/${props.alt}`);
      }}
    />
  );
};
