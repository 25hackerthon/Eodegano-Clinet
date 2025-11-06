import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollSnap(sections: string[]) {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    if (isScrolling.current) return;

    setCurrentSection((prev) => {
      if (e.deltaY > 0 && prev < sections.length - 1) {
        isScrolling.current = true;
        return prev + 1;
      } else if (e.deltaY < 0 && prev > 0) {
        isScrolling.current = true;
        return prev - 1;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e);
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    return () => window.removeEventListener("wheel", wheelHandler);
  }, [handleWheel]);

  useEffect(() => {
    const el = document.getElementById(sections[currentSection]);
    el?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  }, [currentSection, sections]);

  return currentSection;
}
