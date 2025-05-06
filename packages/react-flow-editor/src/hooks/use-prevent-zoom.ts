import { useEffect } from "react"

export const usePreventZoom = () => {
  useEffect(() => {
    const zoomHandler = (e: MouseEvent) => window.visualViewport?.scale === 1 && e.ctrlKey && e.preventDefault()

    window.addEventListener("wheel", zoomHandler, { passive: false })

    return () => window.removeEventListener("wheel", zoomHandler)
  }, [])
}
