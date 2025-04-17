"use client"

import { AlertTriangle, X } from "lucide-react"

interface Notification {
  id: number
  message: string
  type: string
}

interface NotificationsProps {
  notifications: Notification[]
  onRemove: (id: number) => void
}

export default function Notifications({ notifications, onRemove }: NotificationsProps) {
  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div key={notification.id} className={`notification ${notification.type === "error" ? "corrupted" : ""}`}>
          <AlertTriangle className="notification-icon" size={16} />
          <div className="notification-message">{notification.message}</div>
          <button className="notification-close" onClick={() => onRemove(notification.id)}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
