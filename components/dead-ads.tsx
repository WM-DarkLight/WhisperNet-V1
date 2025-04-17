"use client"

import { useState, useEffect } from "react"

interface Ad {
  id: number
  title: string
  subtitle: string
  smallText: string
  buttonText: string
  corrupted?: boolean
  blinking?: boolean
}

export default function DeadAds() {
  const [ads, setAds] = useState<Ad[]>([])
  const [adClicked, setAdClicked] = useState<number | null>(null)

  useEffect(() => {
    setAds([
      {
        id: 1,
        title: "ANTI-SIGNAL PILLS",
        subtitle: "PROTECT YOUR MIND",
        smallText: "Order before collapse",
        buttonText: "ORDER NOW",
        blinking: true,
      },
      {
        id: 2,
        title: "YOU ARE BEING WATCHED",
        subtitle: "But we can help you disappear",
        smallText: "Signal-blocking technology - 98% effective",
        buttonText: "HIDE NOW",
        corrupted: true,
      },
      {
        id: 3,
        title: "RECONNECT TO THE CORE NODE",
        subtitle: "SALVATION AWAITS",
        smallText: "The signal will guide you home",
        buttonText: "JOIN US",
        corrupted: true,
      },
    ])

    // Rotate ads occasionally
    const rotateInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setAds((prev) => {
          const newAds = [...prev]
          // Swap a random ad with a new one
          const randomIndex = Math.floor(Math.random() * newAds.length)

          const newAdOptions = [
            {
              id: Date.now(),
              title: "MEMORY PURIFICATION",
              subtitle: "FORGET WHAT HURTS YOU",
              smallText: "Government approved treatment - 100% effective",
              buttonText: "CLEANSE NOW",
              corrupted: Math.random() > 0.5,
            },
            {
              id: Date.now() + 1,
              title: "EMERGENCY SUPPLIES",
              subtitle: "PREPARE FOR THE INEVITABLE",
              smallText: "Limited stock available - Act now",
              buttonText: "SURVIVE",
              blinking: true,
            },
            {
              id: Date.now() + 2,
              title: "SIGNAL AMPLIFIERS",
              subtitle: "ENHANCE YOUR CONNECTION",
              smallText: "Feel the Signal's embrace like never before",
              buttonText: "AMPLIFY",
              corrupted: Math.random() > 0.5,
            },
          ]

          newAds[randomIndex] = newAdOptions[Math.floor(Math.random() * newAdOptions.length)]
          return newAds
        })
      }
    }, 45000)

    return () => clearInterval(rotateInterval)
  }, [])

  const handleAdClick = (id: number) => {
    setAdClicked(id)

    // Reset after showing error
    setTimeout(() => {
      setAdClicked(null)
    }, 3000)
  }

  return (
    <aside className="banner-ads">
      {ads.map((ad) => (
        <div key={ad.id} className={`ad-banner ${ad.corrupted ? "corrupted" : ""} ${ad.blinking ? "blink-slow" : ""}`}>
          <h3>{ad.title}</h3>
          <p>{ad.subtitle}</p>
          <p className={`small-text ${ad.corrupted ? "corrupted" : ""}`}>{ad.smallText}</p>

          {adClicked === ad.id ? (
            <p className="ad-error corrupted blink">ERROR: Service unavailable</p>
          ) : (
            <a
              href="#"
              className={`ad-button glitch-hover ${ad.corrupted ? "corrupted" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                handleAdClick(ad.id)
              }}
            >
              {ad.buttonText}
            </a>
          )}
        </div>
      ))}
    </aside>
  )
}
