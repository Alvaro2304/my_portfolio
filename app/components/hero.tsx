"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
      <div className="relative z-10 flex h-full items-center px-4 pt-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Name */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-400">I am</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-2">Alvaro</h1>
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-4">Palero</h1>
              <p className="text-xl text-gray-400 font-medium">Bsc. Mechatronics</p>
            </motion.div>

            {/* Right side - Description */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Mechatronics Engineering graduate with practical experience in mobile robotics. I specialize in
                localization, path planning, and perception, and I'm passionate about contributing to teams developing
                autonomous navigation, SLAM, and sensor fusion systems.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-8">
                <a
                  href="https://www.linkedin.com/in/alvaropaleroramirez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gray-600 rounded-lg hover:border-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/Alvaro2304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-gray-600 rounded-lg hover:border-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>

              {/* View CV Button */}
              <a
                href="/uploads/Resume-Alvaro-Palero.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3">
                  <FileText className="w-4 h-4 mr-2" />
                  View CV
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
