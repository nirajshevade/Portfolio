"use client";

import { useState, useEffect, useRef } from "react";

export function useImagePreloader(
  frameCount: number,
  pathResolver: (index: number) => string
) {
  const [loadedCount, setLoadedCount] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Important: Use priority fetching to jump the queue
      img.fetchPriority = "high";
      img.src = pathResolver(i);
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsReady(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, [frameCount, pathResolver]);

  const loadProgress = frameCount > 0 ? loadedCount / frameCount : 0;

  return {
    images: imagesRef.current,
    isReady,
    loadProgress,
  };
}
