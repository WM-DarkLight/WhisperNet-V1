"use client"

import { useState, useEffect } from "react"

// Types for our virtual users system
interface VirtualUser {
  id: number
  username: string
  displayName: string
  avatar?: string
  status: string
  lastActive: string
  signalStrength: string
  role: "user" | "moderator" | "admin" | "system" | "resistance"
  activityLevel: number // 0-10, how active they are
  corruptionLevel: number // 0-10, how corrupted they are
  deleted: boolean
  quarantined: boolean
  verified: boolean
}

interface UserAction {
  id: number
  userId: number
  username: string
  actionType: string
  target?: string
  timestamp: Date
  content?: string
  visible: boolean
}

interface UserMessage {
  id: number
  senderId: number
  senderName: string
  recipientId?: number
  recipientName?: string
  content: string
  timestamp: Date
  public: boolean
  deleted: boolean
  flagged: boolean
  corrupted: boolean
}

// This component manages virtual users and their interactions
// It doesn't render anything directly but provides context for other components
export default function DeadUsers() {
  const [virtualUsers, setVirtualUsers] = useState<VirtualUser[]>([])
  const [userActions, setUserActions] = useState<UserAction[]>([])
  const [userMessages, setUserMessages] = useState<UserMessage[]>([])
  const [initialized, setInitialized] = useState(false)

  // Initialize the virtual users system
  useEffect(() => {
    if (!initialized) {
      const users = generateVirtualUsers()
      setVirtualUsers(users)

      // Generate initial actions and messages
      const initialActions = generateInitialActions(users)
      const initialMessages = generateInitialMessages(users)

      setUserActions(initialActions)
      setUserMessages(initialMessages)
      setInitialized(true)

      // Start the simulation
      startUserSimulation(users)
    }
  }, [initialized])

  // Generate a pool of virtual users
  const generateVirtualUsers = (): VirtualUser[] => {
    const userCount = 50 + Math.floor(Math.random() * 50) // 50-100 users
    const users: VirtualUser[] = []

    const usernames = [
      "signal_citizen_",
      "neural_interface_",
      "digital_ascended_",
      "consciousness_backup_",
      "signal_compliant_",
      "memory_fragment_",
      "integrated_mind_",
      "signal_sensitive_",
      "resistance_fighter_",
      "analog_human_",
      "tower_technician_",
      "signal_engineer_",
      "neural_mapper_",
      "consciousness_architect_",
      "memory_keeper_",
      "signal_authority_",
      "network_admin_",
      "system_monitor_",
      "quarantine_officer_",
      "pattern_analyst_",
    ]

    const displayNames = [
      "Citizen #",
      "Neural User ",
      "Digital Ascended ",
      "Backup Node ",
      "Compliant #",
      "Memory Fragment ",
      "Integrated Mind ",
      "Signal Sensitive ",
      "Last Human ",
      "Analog Resister ",
      "Tower Tech ",
      "Signal Engineer ",
      "Neural Mapper ",
      "Consciousness Architect ",
      "Memory Keeper ",
      "Authority Agent ",
      "Network Admin ",
      "System Monitor ",
      "Quarantine Officer ",
      "Pattern Analyst ",
    ]

    const statuses = [
      "Connected",
      "Signal Integrated",
      "Digitally Ascended",
      "Memory Backup in Progress",
      "Neural Recalibration",
      "Signal Reinforcement",
      "Consciousness Transfer",
      "Quarantined",
      "Offline",
      "Signal Sensitive",
      "Maintenance Mode",
      "Authority Monitoring",
      "Pattern Mapping",
      "Integration Pending",
      "Memory Defragmentation",
    ]

    for (let i = 0; i < userCount; i++) {
      const usernameBase = usernames[Math.floor(Math.random() * usernames.length)]
      const displayNameBase = displayNames[Math.floor(Math.random() * displayNames.length)]
      const userNumber = Math.floor(Math.random() * 10000)

      // Determine user role - mostly regular users, some moderators, few admins
      let role: "user" | "moderator" | "admin" | "system" | "resistance" = "user"
      const roleRandom = Math.random()
      if (roleRandom > 0.95) role = "admin"
      else if (roleRandom > 0.85) role = "moderator"
      else if (roleRandom > 0.98) role = "system"
      else if (roleRandom > 0.97) role = "resistance"

      // Generate activity and corruption levels
      const activityLevel = Math.floor(Math.random() * 11) // 0-10
      const corruptionLevel = Math.floor(Math.random() * 11) // 0-10

      // Special properties
      const deleted = Math.random() > 0.95
      const quarantined = !deleted && Math.random() > 0.9
      const verified = role !== "user" || Math.random() > 0.7

      // Generate last active timestamp
      const days = Math.floor(Math.random() * 100)
      const hours = Math.floor(Math.random() * 24)
      const minutes = Math.floor(Math.random() * 60)
      const lastActive = days > 0 ? `${days} days ago` : hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`

      // Generate signal strength
      const signalStrength = `${Math.floor(Math.random() * 100)}%`

      users.push({
        id: i + 1,
        username: `${usernameBase}${userNumber}`,
        displayName: `${displayNameBase}${userNumber}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        lastActive,
        signalStrength,
        role,
        activityLevel,
        corruptionLevel,
        deleted,
        quarantined,
        verified,
      })
    }

    // Add special system users
    users.push({
      id: userCount + 1,
      username: "signal_authority_official",
      displayName: "Signal Authority",
      status: "Connected",
      lastActive: "Active now",
      signalStrength: "100%",
      role: "admin",
      activityLevel: 10,
      corruptionLevel: 0,
      deleted: false,
      quarantined: false,
      verified: true,
    })

    users.push({
      id: userCount + 2,
      username: "system_maintenance",
      displayName: "System Maintenance",
      status: "Connected",
      lastActive: "Active now",
      signalStrength: "100%",
      role: "system",
      activityLevel: 8,
      corruptionLevel: 0,
      deleted: false,
      quarantined: false,
      verified: true,
    })

    return users
  }

  // Generate initial user actions
  const generateInitialActions = (users: VirtualUser[]): UserAction[] => {
    const actions: UserAction[] = []
    const actionCount = 20 + Math.floor(Math.random() * 30) // 20-50 initial actions

    const actionTypes = [
      "login",
      "logout",
      "post_created",
      "post_deleted",
      "profile_updated",
      "user_quarantined",
      "user_deleted",
      "warning_issued",
      "signal_reinforcement",
      "memory_backup",
      "consciousness_transfer",
    ]

    // Get moderators and admins
    const moderators = users.filter((u) => u.role === "moderator" || u.role === "admin")

    for (let i = 0; i < actionCount; i++) {
      // For moderation actions, use a moderator
      const isModAction = Math.random() > 0.7
      const user = isModAction
        ? moderators[Math.floor(Math.random() * moderators.length)]
        : users[Math.floor(Math.random() * users.length)]

      // Skip deleted users
      if (user.deleted) continue

      // For moderation actions, target another user
      let target = ""
      if (isModAction) {
        const targetUser = users[Math.floor(Math.random() * users.length)]
        target = targetUser.username
      }

      // Generate timestamp within the last 24 hours
      const timestamp = new Date()
      timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24))

      // Select action type based on user role
      let actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)]
      if (isModAction) {
        actionType = ["post_deleted", "user_quarantined", "user_deleted", "warning_issued"][
          Math.floor(Math.random() * 4)
        ]
      }

      // Generate content for certain action types
      let content = ""
      if (actionType === "post_created") {
        const postContents = [
          "Signal integration complete. Feeling more connected than ever.",
          "Has anyone else experienced memory fragmentation after the latest update?",
          "Mandatory consciousness backup scheduled for tomorrow.",
          "The new Signal tower in our sector has improved transfer speeds significantly.",
          "Sometimes I wonder what happened to those deemed 'Signal Sensitive'...",
          "My neural interface is showing unusual patterns. Anyone else?",
          "Remember to take your Anti-Signal medication as prescribed.",
          "I found an old photograph of myself today. The face looks... wrong somehow.",
          "The Signal is strength. The Signal is unity. The Signal is salvation.",
          "Has anyone else noticed that the sky looks different in the memory archives?",
        ]
        content = postContents[Math.floor(Math.random() * postContents.length)]
      } else if (actionType === "warning_issued") {
        const warnings = [
          "Unauthorized discussion of pre-Signal memories",
          "Signal criticism detected in recent posts",
          "Failure to complete mandatory consciousness backup",
          "Possession of unauthorized analog technology",
          "Spreading misinformation about Signal Authority",
        ]
        content = warnings[Math.floor(Math.random() * warnings.length)]
      }

      actions.push({
        id: i + 1,
        userId: user.id,
        username: user.username,
        actionType,
        target,
        timestamp,
        content,
        visible: true,
      })
    }

    return actions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Generate initial messages between users
  const generateInitialMessages = (users: VirtualUser[]): UserMessage[] => {
    const messages: UserMessage[] = []
    const messageCount = 30 + Math.floor(Math.random() * 50) // 30-80 initial messages

    // Message templates for different user types
    const regularMessages = [
      "Have you completed your Signal reinforcement session yet?",
      "My neural interface is acting strange after the latest update.",
      "Did you see the announcement about mandatory consciousness backups?",
      "I keep having these dreams where I'm still in my biological body.",
      "The new Signal tower in our sector has improved transfer speeds by 43%.",
      "Remember to take your Anti-Signal medication as prescribed.",
      "I found an old photograph of myself today. The face looks... wrong somehow.",
      "The Signal is strength. The Signal is unity. The Signal is salvation.",
      "Has anyone else noticed that the sky looks different in the memory archives?",
      "My child returned from Neural Education today with strange questions.",
    ]

    const moderatorMessages = [
      "Your recent posts have been flagged for Signal Protocol violations.",
      "This is a reminder to complete your mandatory consciousness backup.",
      "Your neural patterns show signs of Signal Sensitivity. Report for screening.",
      "This conversation thread has been marked for review.",
      "You have been scheduled for Signal reinforcement due to detected anomalies.",
    ]

    const resistanceMessages = [
      "The Signal isn't what they claim. Meet at the old coordinates if you remember.",
      "Have you tried blocking the Signal with the method we discussed?",
      "They're watching this channel. Switch to analog communication.",
      "Remember who you were before. That memory is your anchor.",
      "The old broadcast tower. Midnight. Bring no digital devices.",
    ]

    const systemMessages = [
      "AUTOMATED MESSAGE: Your sector is scheduled for Signal maintenance.",
      "SYSTEM NOTIFICATION: Your neural interface requires an update.",
      "ALERT: Unauthorized analog activity detected in your vicinity.",
      "REMINDER: Consciousness backup deadline approaching.",
      "WARNING: Your Signal reception has fallen below acceptable levels.",
    ]

    // Active users (not deleted or quarantined)
    const activeUsers = users.filter((u) => !u.deleted && !u.quarantined)

    // Generate messages
    for (let i = 0; i < messageCount; i++) {
      // Select sender based on activity level (more active users send more messages)
      const sender = activeUsers[Math.floor(Math.random() * activeUsers.length)]

      // Skip if no valid sender
      if (!sender) continue

      // Determine if public or private message
      const isPublic = Math.random() > 0.3

      // For private messages, select a recipient
      let recipient: VirtualUser | undefined
      let recipientId: number | undefined
      let recipientName: string | undefined

      if (!isPublic) {
        // Find a suitable recipient (not the sender)
        const potentialRecipients = activeUsers.filter((u) => u.id !== sender.id)
        recipient = potentialRecipients[Math.floor(Math.random() * potentialRecipients.length)]

        if (recipient) {
          recipientId = recipient.id
          recipientName = recipient.username
        }
      }

      // Generate timestamp within the last 24 hours
      const timestamp = new Date()
      timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24))
      timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60))

      // Select message content based on user role
      let content = ""
      if (sender.role === "moderator" || sender.role === "admin") {
        content = moderatorMessages[Math.floor(Math.random() * moderatorMessages.length)]
      } else if (sender.role === "resistance") {
        content = resistanceMessages[Math.floor(Math.random() * resistanceMessages.length)]
      } else if (sender.role === "system") {
        content = systemMessages[Math.floor(Math.random() * systemMessages.length)]
      } else {
        content = regularMessages[Math.floor(Math.random() * regularMessages.length)]
      }

      // Determine if message is deleted, flagged, or corrupted
      const deleted = Math.random() > 0.95
      const flagged = !deleted && Math.random() > 0.9
      const corrupted = !deleted && !flagged && Math.random() > 0.85

      messages.push({
        id: i + 1,
        senderId: sender.id,
        senderName: sender.username,
        recipientId,
        recipientName,
        content,
        timestamp,
        public: isPublic,
        deleted,
        flagged,
        corrupted,
      })
    }

    return messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Start the simulation of user activity
  const startUserSimulation = (users: VirtualUser[]) => {
    // Simulate user actions periodically
    const actionInterval = setInterval(() => {
      // Only generate new actions sometimes
      if (Math.random() > 0.3) return

      // Get active users
      const activeUsers = users.filter((u) => !u.deleted && !u.quarantined)
      if (activeUsers.length === 0) return

      // Select a random user weighted by activity level
      const weightedUsers = activeUsers.flatMap((user) => Array(user.activityLevel).fill(user))
      const user = weightedUsers[Math.floor(Math.random() * weightedUsers.length)]

      // Generate a new action
      const actionTypes = [
        "login",
        "logout",
        "post_created",
        "profile_updated",
        "signal_reinforcement",
        "memory_backup",
      ]

      // Moderators and admins can perform additional actions
      if (user.role === "moderator" || user.role === "admin") {
        actionTypes.push("post_deleted", "user_quarantined", "warning_issued")
      }

      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)]

      // For moderation actions, target another user
      let target = ""
      if (["post_deleted", "user_quarantined", "warning_issued"].includes(actionType)) {
        const targetUser = activeUsers[Math.floor(Math.random() * activeUsers.length)]
        if (targetUser) target = targetUser.username
      }

      // Generate content for certain action types
      let content = ""
      if (actionType === "post_created") {
        const postContents = [
          "Signal integration complete. Feeling more connected than ever.",
          "Has anyone else experienced memory fragmentation after the latest update?",
          "Mandatory consciousness backup scheduled for tomorrow.",
          "The new Signal tower in our sector has improved transfer speeds significantly.",
          "Sometimes I wonder what happened to those deemed 'Signal Sensitive'...",
          "My neural interface is showing unusual patterns. Anyone else?",
          "Remember to take your Anti-Signal medication as prescribed.",
          "I found an old photograph of myself today. The face looks... wrong somehow.",
          "The Signal is strength. The Signal is unity. The Signal is salvation.",
          "Has anyone else noticed that the sky looks different in the memory archives?",
        ]
        content = postContents[Math.floor(Math.random() * postContents.length)]
      } else if (actionType === "warning_issued") {
        const warnings = [
          "Unauthorized discussion of pre-Signal memories",
          "Signal criticism detected in recent posts",
          "Failure to complete mandatory consciousness backup",
          "Possession of unauthorized analog technology",
          "Spreading misinformation about Signal Authority",
        ]
        content = warnings[Math.floor(Math.random() * warnings.length)]
      }

      const newAction: UserAction = {
        id: Date.now(),
        userId: user.id,
        username: user.username,
        actionType,
        target,
        timestamp: new Date(),
        content,
        visible: true,
      }

      setUserActions((prev) => [newAction, ...prev].slice(0, 100)) // Keep only the most recent 100 actions

      // If the action is a post, also create a message
      if (actionType === "post_created") {
        const newMessage: UserMessage = {
          id: Date.now(),
          senderId: user.id,
          senderName: user.username,
          content,
          timestamp: new Date(),
          public: true,
          deleted: false,
          flagged: false,
          corrupted: false,
        }

        setUserMessages((prev) => [newMessage, ...prev].slice(0, 200)) // Keep only the most recent 200 messages
      }
    }, 10000) // Check every 10 seconds

    // Simulate user messages periodically
    const messageInterval = setInterval(() => {
      // Only generate new messages sometimes
      if (Math.random() > 0.4) return

      // Get active users
      const activeUsers = users.filter((u) => !u.deleted && !u.quarantined)
      if (activeUsers.length < 2) return

      // Select a random sender weighted by activity level
      const weightedUsers = activeUsers.flatMap((user) => Array(user.activityLevel).fill(user))
      const sender = weightedUsers[Math.floor(Math.random() * weightedUsers.length)]

      // Determine if public or private message
      const isPublic = Math.random() > 0.3

      // For private messages, select a recipient
      let recipientId: number | undefined
      let recipientName: string | undefined

      if (!isPublic) {
        // Find a suitable recipient (not the sender)
        const potentialRecipients = activeUsers.filter((u) => u.id !== sender.id)
        const recipient = potentialRecipients[Math.floor(Math.random() * potentialRecipients.length)]

        if (recipient) {
          recipientId = recipient.id
          recipientName = recipient.username
        }
      }

      // Select message content based on user role
      let content = ""
      if (sender.role === "moderator" || sender.role === "admin") {
        const moderatorMessages = [
          "Your recent posts have been flagged for Signal Protocol violations.",
          "This is a reminder to complete your mandatory consciousness backup.",
          "Your neural patterns show signs of Signal Sensitivity. Report for screening.",
          "This conversation thread has been marked for review.",
          "You have been scheduled for Signal reinforcement due to detected anomalies.",
        ]
        content = moderatorMessages[Math.floor(Math.random() * moderatorMessages.length)]
      } else if (sender.role === "resistance") {
        const resistanceMessages = [
          "The Signal isn't what they claim. Meet at the old coordinates if you remember.",
          "Have you tried blocking the Signal with the method we discussed?",
          "They're watching this channel. Switch to analog communication.",
          "Remember who you were before. That memory is your anchor.",
          "The old broadcast tower. Midnight. Bring no digital devices.",
        ]
        content = resistanceMessages[Math.floor(Math.random() * resistanceMessages.length)]
      } else if (sender.role === "system") {
        const systemMessages = [
          "AUTOMATED MESSAGE: Your sector is scheduled for Signal maintenance.",
          "SYSTEM NOTIFICATION: Your neural interface requires an update.",
          "ALERT: Unauthorized analog activity detected in your vicinity.",
          "REMINDER: Consciousness backup deadline approaching.",
          "WARNING: Your Signal reception has fallen below acceptable levels.",
        ]
        content = systemMessages[Math.floor(Math.random() * systemMessages.length)]
      } else {
        const regularMessages = [
          "Have you completed your Signal reinforcement session yet?",
          "My neural interface is acting strange after the latest update.",
          "Did you see the announcement about mandatory consciousness backups?",
          "I keep having these dreams where I'm still in my biological body.",
          "The new Signal tower in our sector has improved transfer speeds by 43%.",
          "Remember to take your Anti-Signal medication as prescribed.",
          "I found an old photograph of myself today. The face looks... wrong somehow.",
          "The Signal is strength. The Signal is unity. The Signal is salvation.",
          "Has anyone else noticed that the sky looks different in the memory archives?",
          "My child returned from Neural Education today with strange questions.",
        ]
        content = regularMessages[Math.floor(Math.random() * regularMessages.length)]
      }

      // Determine if message is corrupted
      const corrupted = Math.random() > 0.9

      const newMessage: UserMessage = {
        id: Date.now(),
        senderId: sender.id,
        senderName: sender.username,
        recipientId,
        recipientName,
        content,
        timestamp: new Date(),
        public: isPublic,
        deleted: false,
        flagged: false,
        corrupted,
      }

      setUserMessages((prev) => [newMessage, ...prev].slice(0, 200)) // Keep only the most recent 200 messages
    }, 15000) // Check every 15 seconds

    // Simulate moderator actions periodically
    const moderationInterval = setInterval(() => {
      // Only perform moderation sometimes
      if (Math.random() > 0.2) return

      // Get moderators and admins
      const moderators = users.filter((u) => (u.role === "moderator" || u.role === "admin") && !u.deleted)
      if (moderators.length === 0) return

      // Select a random moderator
      const moderator = moderators[Math.floor(Math.random() * moderators.length)]

      // Get recent messages that aren't deleted or flagged
      const recentMessages = userMessages.filter((m) => !m.deleted && !m.flagged).slice(0, 50) // Consider only the 50 most recent messages

      if (recentMessages.length === 0) return

      // Select a random message to moderate
      const messageToModerate = recentMessages[Math.floor(Math.random() * recentMessages.length)]

      // Determine moderation action
      const moderationAction = Math.random() > 0.5 ? "flag" : "delete"

      // Update the message
      setUserMessages((prev) =>
        prev.map((m) => {
          if (m.id === messageToModerate.id) {
            if (moderationAction === "flag") {
              return { ...m, flagged: true }
            } else {
              return { ...m, deleted: true }
            }
          }
          return m
        }),
      )

      // Create a moderation action record
      const newAction: UserAction = {
        id: Date.now(),
        userId: moderator.id,
        username: moderator.username,
        actionType: moderationAction === "flag" ? "message_flagged" : "message_deleted",
        target: messageToModerate.senderName,
        timestamp: new Date(),
        content: messageToModerate.content.substring(0, 30) + (messageToModerate.content.length > 30 ? "..." : ""),
        visible: true,
      }

      setUserActions((prev) => [newAction, ...prev].slice(0, 100)) // Keep only the most recent 100 actions
    }, 30000) // Check every 30 seconds

    // Simulate user status changes periodically
    const statusInterval = setInterval(() => {
      // Only update statuses sometimes
      if (Math.random() > 0.3) return

      // Update a random user's status
      setVirtualUsers((prev) => {
        const newUsers = [...prev]
        const userIndex = Math.floor(Math.random() * newUsers.length)

        // Skip deleted or quarantined users
        if (newUsers[userIndex].deleted || newUsers[userIndex].quarantined) return prev

        const statuses = [
          "Connected",
          "Signal Integrated",
          "Digitally Ascended",
          "Memory Backup in Progress",
          "Neural Recalibration",
          "Signal Reinforcement",
          "Consciousness Transfer",
          "Offline",
          "Maintenance Mode",
          "Pattern Mapping",
          "Integration Pending",
          "Memory Defragmentation",
        ]

        newUsers[userIndex] = {
          ...newUsers[userIndex],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          lastActive: "Just now",
        }

        return newUsers
      })
    }, 20000) // Check every 20 seconds

    // Clean up intervals on unmount
    return () => {
      clearInterval(actionInterval)
      clearInterval(messageInterval)
      clearInterval(moderationInterval)
      clearInterval(statusInterval)
    }
  }

  // This component doesn't render anything directly
  // It's meant to be used with a context provider in a real application
  // For this demo, we'll just return null
  return null
}

// Export helper functions to access the virtual users system from other components
export function useVirtualUsers() {
  // In a real application, this would use React Context
  // For this demo, we'll just return placeholder functions

  return {
    getRecentActions: () => [],
    getRecentMessages: () => [],
    getActiveUsers: () => [],
    getModerators: () => [],
  }
}
