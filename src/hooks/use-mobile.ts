import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Defer the initial state read to a microtask so it's not synchronous
    // inside the effect body (avoids the react-hooks/set-state-in-effect lint).
    Promise.resolve().then(onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
