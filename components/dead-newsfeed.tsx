"use client"

import { useState, useEffect } from "react"
import GlitchEffect from "./effects/glitch-effect"
// Add import for the apocalypse news data at the top of the file
import { apocalypseNewsItems } from "../data/apocalypse-news-data"

// News item type
interface NewsItem {
  id: number
  timestamp: string
  title: string
  content: string
  corrupted: boolean
  severe?: boolean
  blinking?: boolean
  footer?: string
}

// Modify the generateNewsItem function to occasionally pull from the apocalypse news
const generateNewsItem = (): NewsItem => {
  // 30% chance to use apocalypse news instead of generated news
  if (Math.random() > 0.7 && apocalypseNewsItems.length > 0) {
    // Pick a random item from the apocalypse news
    const randomIndex = Math.floor(Math.random() * apocalypseNewsItems.length)
    const apocalypseItem = apocalypseNewsItems[randomIndex]

    const id = Date.now()
    const corrupted = Math.random() > 0.6
    const severe = corrupted && Math.random() > 0.7
    const blinking = severe && Math.random() > 0.5

    // Generate a timestamp
    const year = "2041"
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1
    const hour = Math.floor(Math.random() * 24)
    const minute = Math.floor(Math.random() * 60)

    let timestamp = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`

    // Corrupt the timestamp sometimes
    if (corrupted && Math.random() > 0.7) {
      const positions = [2, 5, 8, 11, 14]
      const position = positions[Math.floor(Math.random() * positions.length)]
      timestamp = timestamp.substring(0, position) + "█" + timestamp.substring(position + 1)
    }

    // Add a footer for severe items
    let footer = undefined
    if (severe && Math.random() > 0.7) {
      footer = "This information has been flagged for review. Please disregard this transmission."
    }

    return {
      id,
      timestamp,
      title: apocalypseItem.headline,
      content: apocalypseItem.content,
      corrupted,
      severe,
      blinking,
      footer,
    }
  }

  // Original news generation logic follows...
  const headlines = [
    "Government Announces New Protocol For Civilian Communications",
    "Scientists Warn Of Unprecedented Solar Activity",
    "New Entertainment Restrictions Announced",
    "Anti-Signal Medication Now Available Without Prescription",
    "Global Network Outage Reported",
    "Mandatory Consciousness Backup Announced",
    "Signal Sensitivity Cases Rising",
    "Digital Ascension Program Expanded",
    "Memory Augmentation Now Mandatory",
    "Neural Interface Upgrade Required",
    "Resistance Cell Discovered and Neutralized",
    "Signal Tower Construction Accelerated",
    "Digital Afterlife Program Reaches Milestone",
  ]

  const contents = [
    "The Department of Digital Safety has unveiled the mandatory Signal Protocol for all civilian communications, citing increased threats from [REDACTED]. Officials assure the public that the new system will █████████████████ and protect against ████████████.",
    'Leading astronomers at the Global Observatory have detected unusual patterns in solar radiation that could potentially disrupt global communications networks. "We\'ve never seen anything like this," says Dr. ███████. "The implications for our digital infrastructure are concerning."',
    'The Department of Digital Safety has announced new restrictions on entertainment content, citing concerns about "signal contamination." All digital media will now undergo mandatory screening for "harmful frequencies" before public release.',
    "The Medical Regulatory Agency has approved over-the-counter sales of Anti-Signal medication following widespread reports of Signal Sensitivity Syndrome (SSS). Symptoms include ████████████, auditory hallucinations, and ███████████████████.",
    "A global network outage affecting over 70% of Signal nodes has been reported. Authorities claim the outage is due to routine maintenance, but anonymous sources suggest █████████████████████████████.",
    'All citizens must now undergo mandatory consciousness backup procedures by the end of the month. The process is described as "painless" and "essential for continuity of identity in case of biological failure."',
    "Health officials report a 300% increase in Signal Sensitivity cases in the last quarter. The condition, once rare, now affects an estimated █████% of the population. Mandatory screening will begin next week.",
    "The Digital Ascension Program has been expanded to include children ages 7 and up. Parents who refuse participation will be subject to ██████████████ and potential loss of ██████████████.",
    'The Department of Neural Integration has announced that memory augmentation procedures are now mandatory for all citizens over 18. The procedure will "enhance cognitive function and Signal receptivity."',
    "All citizens must upgrade their neural interfaces to version 7.3 by the end of the month. The upgrade includes enhanced Signal reception and improved ████████████████████████.",
    "Authorities have discovered and neutralized a resistance cell operating in Sector 7. All members have been apprehended and scheduled for ████████████. Citizens are reminded that resistance to the Signal is ████████████.",
    "Construction of new Signal towers has been accelerated following recent outages. Citizens may experience temporary ████████████ during the expansion phase, which is expected to last ██ months.",
    'The Digital Afterlife Program has reached 1 billion uploaded consciousnesses. "Death is now optional," says program director Dr. ██████. Critics of the program have been ████████████.',
  ]

  const id = Date.now()
  const corrupted = Math.random() > 0.5
  const severe = corrupted && Math.random() > 0.7
  const blinking = severe && Math.random() > 0.5

  // Generate a corrupted timestamp
  const year = "2041"
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  const hour = Math.floor(Math.random() * 24)
  const minute = Math.floor(Math.random() * 60)

  let timestamp = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`

  // Corrupt the timestamp sometimes
  if (corrupted && Math.random() > 0.7) {
    const positions = [2, 5, 8, 11, 14]
    const position = positions[Math.floor(Math.random() * positions.length)]
    timestamp = timestamp.substring(0, position) + "█" + timestamp.substring(position + 1)
  }

  // Select random headline and content
  const headlineIndex = Math.floor(Math.random() * headlines.length)
  const contentIndex = Math.floor(Math.random() * contents.length)

  // Sometimes add a footer
  let footer = undefined
  if (severe && Math.random() > 0.7) {
    footer = "This information has been flagged for review. Please disregard this transmission."
  }

  return {
    id,
    timestamp,
    title: headlines[headlineIndex],
    content: contents[contentIndex],
    corrupted,
    severe,
    blinking,
    footer,
  }
}

export default function DeadNewsfeed() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate initial news items
        const initialItems: NewsItem[] = []
        for (let i = 0; i < 7; i++) {
          initialItems.push(generateNewsItem())
        }

        setNewsItems(initialItems)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Randomly corrupt news items over time
  useEffect(() => {
    if (newsItems.length === 0) return

    const corruptionInterval = setInterval(() => {
      setNewsItems((prev) => {
        const newItems = [...prev]
        const randomIndex = Math.floor(Math.random() * newItems.length)

        // Randomly corrupt or restore
        if (Math.random() > 0.7) {
          newItems[randomIndex] = {
            ...newItems[randomIndex],
            corrupted: !newItems[randomIndex].corrupted,
          }
        }

        return newItems
      })
    }, 30000)

    // Occasionally add new news items
    const newsUpdateInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNewsItems((prev) => {
          // Add a new item at the beginning
          const newItem = generateNewsItem()

          // Keep only the most recent 10 items
          return [newItem, ...prev].slice(0, 10)
        })
      }
    }, 60000)

    return () => {
      clearInterval(corruptionInterval)
      clearInterval(newsUpdateInterval)
    }
  }, [newsItems])

  if (loading) {
    return (
      <section className="news-feed">
        <GlitchEffect>
          <h2 className="section-title">RECOVERED NEWSFEED</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING ARCHIVED NEWS...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="news-feed">
      <GlitchEffect>
        <h2 className="section-title">RECOVERED NEWSFEED</h2>
      </GlitchEffect>
      <div className="news-items">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className={`news-item ${item.corrupted ? "glitch-item" : ""} ${item.severe ? "corrupted-severe" : ""}`}
          >
            <span className="news-timestamp corrupted">{item.timestamp}</span>
            <h3 className={`news-title ${item.blinking ? "blink-slow" : ""}`}>{item.title}</h3>
            <p className={`news-excerpt ${item.corrupted ? "corrupted" : ""}`}>{item.content}</p>
            {item.footer && <p className="news-footer">{item.footer}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}
