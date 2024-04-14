import { useEffect } from 'react'

const useResponsive = () => {
  useEffect(() => {
    const designWidth = 1280
    const handleResize = () => {
      const browserWidth = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      )
      const minScale = Math.max(0.5, (browserWidth / designWidth) * ((window.outerHeight - 120) / window.innerHeight))
      const maxScale = Math.min(minScale, 7.5)
      document.documentElement.style.setProperty('--scale', maxScale)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
}

export default useResponsive
