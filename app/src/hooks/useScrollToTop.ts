import { useEffect } from "react";

export function useScrollToTop(behavior: ScrollBehavior = "smooth") {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [behavior]);
}

