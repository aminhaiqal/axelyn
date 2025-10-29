"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform hover:scale-110 hover:rotate-12 duration-300">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Axelyn</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-all hover:scale-110"
            >
              About
            </a>
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-all hover:scale-110"
            >
              Features
            </a>
            <a
              href="#vision"
              className="text-sm text-muted-foreground hover:text-foreground transition-all hover:scale-110"
            >
              Vision
            </a>
          </nav>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            Get Early Access
          </Button>
        </div>
      </div>
    </header>
  )
}
