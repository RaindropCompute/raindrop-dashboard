"use client";

import { MediaPlayerClass } from "dashjs";
import { useEffect, useRef } from "react";

export default function VideoPlayer({ src }: { src: string }) {
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let player: MediaPlayerClass | null = null;

    import("dashjs").then((dashjs) => {
      if (playerRef.current) {
        player = dashjs.MediaPlayer().create();
        player.initialize(playerRef.current, src, false);
      }
    });

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [src]);

  return <video data-dashjs-player ref={playerRef} controls width="100%" />;
}
