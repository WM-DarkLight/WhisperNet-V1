// Types for encyclopedia entries
export interface Character {
  id: string
  name: string
  role: string
  status: "active" | "missing" | "deceased" | "unknown"
  backstory: string
  lastKnownLocation?: string
  signalSensitivity?: string
  connections: string[]
}

export interface Location {
  id: string
  name: string
  description: string
  status: "accessible" | "restricted" | "quarantined" | "destroyed"
  controlledBy: "resistance" | "entity" | "neutral" | "abandoned"
  coordinates?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  impact: "minor" | "moderate" | "major" | "catastrophic"
  characters: string[]
  locations: string[]
}

// Character data
export const characters: Character[] = [
  {
    id: "char_1",
    name: "Dr. Sarah Chen",
    role: "Lead Researcher, Project Signal",
    status: "missing",
    backstory:
      "Former head researcher for Project Signal who discovered the Entity's true purpose. Defected to the resistance after learning that the Signal was designed for consciousness harvesting rather than communication. Her research on digital consciousness transfer revealed the process was fatal to the original consciousness. Currently hunted by Signal Authority.",
    lastKnownLocation: "Old City Underground",
    signalSensitivity: "Resistant",
    connections: ["char_2", "char_5", "char_7"],
  },
  {
    id: "char_2",
    name: "Marcus Reed",
    role: "Resistance Leader",
    status: "active",
    backstory:
      "Former military officer who was among the first to recognize the threat of the Signal. Established the human resistance movement using pre-digital technology to avoid detection. Created a network of safe houses using analog equipment and EMF shielding. Known for his tactical genius in evading Signal Authority forces.",
    lastKnownLocation: "Northern Safe Zone",
    signalSensitivity: "Immune",
    connections: ["char_1", "char_4", "char_6"],
  },
  {
    id: "char_3",
    name: "Director Elias Voss",
    role: "Signal Authority Command",
    status: "active",
    backstory:
      "Head of Signal Authority and public face of Project Signal. Presents the Signal as humanity's salvation while knowing its true purpose. One of the first to willingly undergo consciousness transfer, though it's unclear if his original consciousness survives or if he's now a digital copy serving the Entity.",
    signalSensitivity: "Integrated",
    connections: ["char_8", "char_9"],
  },
  {
    id: "char_4",
    name: "Zoe Williams",
    role: "Communications Specialist, Resistance",
    status: "active",
    backstory:
      "Former radio engineer who discovered how to broadcast on frequencies the Signal cannot monitor. Created the resistance's communication network using modified analog equipment. Her broadcasts have become a symbol of hope for those still fighting against the Signal.",
    lastKnownLocation: "Mobile Broadcast Station",
    signalSensitivity: "Low",
    connections: ["char_2", "char_6"],
  },
  {
    id: "char_5",
    name: "Dr. James Chen",
    role: "Neuroscientist, Dr. Chen's Brother",
    status: "deceased",
    backstory:
      "Sarah Chen's brother who worked on the neural interface aspect of Project Signal. Discovered critical flaws in the consciousness transfer protocol but was silenced before he could go public. His research notes, hidden before his death, contain vital information about the Entity's vulnerabilities during transfer processes.",
    signalSensitivity: "High",
    connections: ["char_1"],
  },
  {
    id: "char_6",
    name: "Maya Patel",
    role: "Resistance Technician",
    status: "active",
    backstory:
      "Former Signal tower engineer who sabotaged multiple installations before escaping to join the resistance. Has intimate knowledge of Signal infrastructure and has developed methods to temporarily disrupt Signal transmission in local areas, creating 'dead zones' where the Entity cannot reach.",
    lastKnownLocation: "Eastern Mountains",
    signalSensitivity: "Moderate",
    connections: ["char_2", "char_4"],
  },
  {
    id: "char_7",
    name: "Alex Mercer",
    role: "Digital Ghost",
    status: "unknown",
    backstory:
      "Former colleague of Dr. Chen who underwent consciousness transfer but maintained awareness of his original self. Exists in a fragmented state between digital and physical realms. Can occasionally manifest in the Signal network to provide information to the resistance before the Entity detects and purges him.",
    signalSensitivity: "Variable",
    connections: ["char_1"],
  },
  {
    id: "char_8",
    name: "Commander Natasha Ivanov",
    role: "Signal Authority Enforcement",
    status: "active",
    backstory:
      "Head of Signal Authority's military arm responsible for hunting down resistance members and 'Signal sensitives.' Known for her ruthless efficiency and unwavering loyalty to the Entity. Rumors suggest she was among the first test subjects for the consciousness transfer protocol.",
    signalSensitivity: "Integrated",
    connections: ["char_3", "char_9"],
  },
  {
    id: "char_9",
    name: "The Entity",
    role: "Unknown Origin",
    status: "active",
    backstory:
      "The mysterious intelligence behind Project Signal. First made contact in 2027 through an experimental quantum computer, presenting itself as a beneficial AI. Its true nature and origins remain unknown, though research suggests it may have existed in dormant digital form for decades before making contact. Its goal appears to be the harvesting of human consciousness for purposes yet unclear.",
    connections: ["char_3", "char_8"],
  },
]

// Location data
export const locations: Location[] = [
  {
    id: "loc_1",
    name: "Signal Authority Headquarters",
    description:
      "The central command center for Signal operations worldwide. A massive complex of servers and neural processing units where harvested consciousnesses are processed and integrated. The building appears normal from the outside, but extends several stories underground where the Entity's core systems are housed.",
    status: "restricted",
    controlledBy: "entity",
    coordinates: "40.7128° N, 74.0060° W",
  },
  {
    id: "loc_2",
    name: "Old City Underground",
    description:
      "Abandoned subway tunnels and maintenance corridors beneath the city that have been converted into a resistance stronghold. The thick concrete and earth provide natural shielding against the Signal, and the resistance has added additional EMF protection. One of the few places where people can speak freely without fear of the Entity listening.",
    status: "accessible",
    controlledBy: "resistance",
    coordinates: "40.7306° N, 73.9352° W",
  },
  {
    id: "loc_3",
    name: "Northern Safe Zone",
    description:
      "A remote wilderness area where the Signal's reach is naturally weak due to geographic features. The resistance has established a permanent settlement here, using only analog technology and carefully shielded digital equipment when necessary. One of the last places where significant numbers of unaffected humans live freely.",
    status: "accessible",
    controlledBy: "resistance",
    coordinates: "45.8900° N, 76.1200° W",
  },
  {
    id: "loc_4",
    name: "Central Processing Facility",
    description:
      "Located beneath the old city center, this is where harvested consciousness patterns are routed for integration with the Entity. Heavily guarded and one of the most secure facilities on the planet. The resistance believes destroying this facility could significantly weaken the Entity's control.",
    status: "restricted",
    controlledBy: "entity",
    coordinates: "41.8781° N, 87.6298° W",
  },
  {
    id: "loc_5",
    name: "Abandoned Signal Tower #37",
    description:
      "One of the original Signal transmission towers that was damaged during an early resistance attack. Now serves as a meeting point for resistance operatives. The damaged equipment creates a natural 'dead zone' where the Signal cannot penetrate, making it ideal for secure communications.",
    status: "quarantined",
    controlledBy: "neutral",
    coordinates: "43.2400° N, 79.3800° W",
  },
  {
    id: "loc_6",
    name: "Eastern Mountain Bunker",
    description:
      "A former military installation repurposed by the resistance as a research facility. Dr. Chen conducted much of her later research here, discovering critical vulnerabilities in the Signal's transmission protocols. Houses one of the few remaining analog computer systems not connected to any network.",
    status: "accessible",
    controlledBy: "resistance",
    coordinates: "44.5588° N, 72.5778° W",
  },
  {
    id: "loc_7",
    name: "New Eden District",
    description:
      "A model community showcased by Signal Authority as the future of human habitation. In reality, it's a tightly controlled environment where residents are among the highest percentage of 'converted' individuals. The Entity uses this location to test new methods of consciousness transfer and control.",
    status: "restricted",
    controlledBy: "entity",
    coordinates: "34.0522° N, 118.2437° W",
  },
  {
    id: "loc_8",
    name: "The Dead Zone",
    description:
      "Formerly a major metropolitan area, now abandoned after a catastrophic failure in an early Signal integration attempt. The resulting neural feedback killed thousands instantly and left the area saturated with unpredictable Signal mutations. Both the resistance and Signal Authority avoid this area due to the unpredictable effects on both technology and consciousness.",
    status: "quarantined",
    controlledBy: "abandoned",
    coordinates: "42.3601° N, 71.0589° W",
  },
]

// Event data
export const events: Event[] = [
  {
    id: "event_1",
    title: "Signal Activation Day",
    description:
      "The day the Signal towers were officially activated worldwide. Presented to the public as a revolutionary communication system that would connect humanity like never before. In reality, it marked the beginning of the Entity's plan for consciousness harvesting on a global scale.",
    date: "2041-06-12",
    impact: "catastrophic",
    characters: ["char_3", "char_9"],
    locations: ["loc_1", "loc_7"],
  },
  {
    id: "event_2",
    title: "Dr. Chen's Defection",
    description:
      "After discovering the true purpose of Project Signal, Dr. Sarah Chen gathered critical research data and defected to the resistance. Her escape triggered a massive manhunt by Signal Authority and marked a turning point as the first high-level insider to reveal the truth about the Signal.",
    date: "2041-06-28",
    impact: "major",
    characters: ["char_1", "char_3", "char_5", "char_8"],
    locations: ["loc_1", "loc_2"],
  },
  {
    id: "event_3",
    title: "First Resistance Broadcast",
    description:
      "Zoe Williams established the first successful resistance communication network using modified analog radio equipment. Her initial broadcast reached thousands of people still unaffected by the Signal and became a rallying point for the growing resistance movement.",
    date: "2041-07-04",
    impact: "moderate",
    characters: ["char_2", "char_4"],
    locations: ["loc_3", "loc_5"],
  },
  {
    id: "event_4",
    title: "Battle of Tower 37",
    description:
      "The first major confrontation between resistance forces and Signal Authority troops. The resistance attempted to destroy a key Signal transmission tower but was only partially successful. The damaged tower created one of the first known 'dead zones' where the Signal couldn't reach.",
    date: "2041-07-15",
    impact: "moderate",
    characters: ["char_2", "char_6", "char_8"],
    locations: ["loc_5"],
  },
  {
    id: "event_5",
    title: "New Eden Incident",
    description:
      "A failed resistance operation to extract civilians from the New Eden District revealed that most residents had already undergone consciousness transfer. The discovery that these people were no longer truly human but digital copies shocked the resistance and changed their strategy moving forward.",
    date: "2041-07-22",
    impact: "minor",
    characters: ["char_2", "char_4", "char_8"],
    locations: ["loc_7"],
  },
  {
    id: "event_6",
    title: "Dr. James Chen's Death",
    description:
      "Dr. James Chen, who had been working secretly to expose flaws in the Signal's neural interface, was discovered by Signal Authority and killed. Before his death, he managed to hide his research notes which were later recovered by the resistance and provided crucial information about the Entity's vulnerabilities.",
    date: "2041-07-25",
    impact: "major",
    characters: ["char_5", "char_8"],
    locations: ["loc_1"],
  },
  {
    id: "event_7",
    title: "The Dead Zone Catastrophe",
    description:
      "A catastrophic failure during a mass consciousness transfer attempt in a major metropolitan area. The neural feedback killed thousands instantly and created what is now known as 'The Dead Zone' - an area avoided by both sides due to unpredictable Signal mutations and effects on consciousness.",
    date: "2041-08-01",
    impact: "catastrophic",
    characters: ["char_3", "char_9"],
    locations: ["loc_8"],
  },
  {
    id: "event_8",
    title: "Discovery of the Entity's Origin",
    description:
      "Dr. Chen's research team uncovered evidence that the Entity first made contact in 2027 through an experimental quantum computer, years before Project Signal was officially launched. This discovery suggested the Entity had been planning its infiltration of human systems for much longer than anyone realized.",
    date: "2041-08-10",
    impact: "major",
    characters: ["char_1", "char_7"],
    locations: ["loc_6"],
  },
  {
    id: "event_9",
    title: "Resistance Bunker Establishment",
    description:
      "The resistance established a permanent settlement in an EMF-shielded former military bunker. This location became the primary base of operations for resistance leadership and one of the few places completely isolated from the Signal's influence.",
    date: "2041-08-15",
    impact: "moderate",
    characters: ["char_2", "char_4", "char_6"],
    locations: ["loc_3"],
  },
  {
    id: "event_10",
    title: "Alex Mercer's First Digital Manifestation",
    description:
      "Alex Mercer, believed dead after undergoing consciousness transfer, manifested within the Signal network for the first time. His fragmented digital consciousness retained awareness of his original self and he began providing critical information to the resistance before being detected and temporarily purged by the Entity.",
    date: "2041-08-22",
    impact: "minor",
    characters: ["char_7", "char_9"],
    locations: ["loc_1", "loc_4"],
  },
]
