"use client"

import { useState, useEffect } from "react"
import { Heart, MessageSquare, Share2, MoreHorizontal, AlertTriangle, User, Check } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface SocialPost {
  id: number
  username: string
  displayName: string
  verified: boolean
  timestamp: string
  content: string
  likes: number
  comments: number
  shares: number
  image?: string
  corrupted: boolean
  censored: boolean
  deleted: boolean
  signalAligned: boolean
}

interface Comment {
  id: number
  username: string
  content: string
  timestamp: string
  corrupted: boolean
  deleted: boolean
}

export default function DeadSocial() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [viewingComments, setViewingComments] = useState<number | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [interactionError, setInteractionError] = useState("")
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate initial posts
        const initialPosts = generatePosts()
        setPosts(initialPosts)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural posts
  const generatePosts = (): SocialPost[] => {
    const usernames = [
      "signal_citizen_452",
      "neural_interface_user",
      "digital_ascended",
      "consciousness_backup",
      "signal_compliant_789",
      "memory_fragment_12",
      "integrated_mind_56",
      "signal_sensitive",
      "resistance_fighter",
      "analog_human",
      "tower_technician",
      "signal_engineer",
      "neural_mapper",
      "consciousness_architect",
      "memory_keeper",
    ]

    const displayNames = [
      "Citizen #452",
      "Neural User",
      "Digital Ascended",
      "Backup Node",
      "Compliant #789",
      "Memory Fragment",
      "Integrated Mind",
      "Signal Sensitive",
      "Last Human",
      "Analog Resister",
      "Tower Tech",
      "Signal Engineer",
      "Neural Mapper",
      "Consciousness Architect",
      "Memory Keeper",
    ]

    const contents = [
      "Just completed my mandatory Signal reinforcement session. Feeling more connected than ever. #SignalStrength #DigitalAscension",
      "Has anyone else experienced memory fragmentation after the latest neural interface update? Some of my childhood memories seem... different now.",
      "ATTENTION: Mandatory consciousness backup scheduled for all citizens in Sector 7 tomorrow. Non-compliance will result in neural recalibration.",
      "I keep having these dreams where I'm still in my biological body. The Signal says these are just adjustment artifacts and will fade with time.",
      "The new Signal tower in our sector has improved transfer speeds by 43%. My thoughts upload almost instantaneously now! #SignalProgress",
      "OFFICIAL NOTICE: Reports of 'resistance cells' in Sector 12 are FALSE. The area has been cleansed and all citizens successfully integrated.",
      "Sometimes I wonder what happened to those who were deemed 'Signal Sensitive.' The official story is they were helped, but my neighbor just disappeared...",
      "My child returned from Neural Education today and asked why we needed bodies before the Signal. I didn't know how to explain the inefficiency of biological existence.",
      "SIGNAL BROADCAST: Remember that unauthorized use of analog technology is a violation of Protocol 7. All violations will be reported and addressed.",
      "Does anyone else sometimes feel like there's something watching us through the Signal? Not the authorities, something... else. #JustThoughts",
      "The Signal is strength. The Signal is unity. The Signal is salvation. We are all connected through the Signal. #DailyAffirmation",
      "Has anyone else noticed that the sky looks different in the memory archives compared to the current feed? Almost like the color has changed...",
      "SECURITY ALERT: Increased resistance activity detected in outlying sectors. Report any suspicious analog behavior immediately.",
      "I found an old photograph of myself today. The face looks like me, but somehow wrong, like it's missing something the Signal gave me.",
      "Sometimes when I'm in deep integration, I swear I can hear whispers that aren't from other users. The authorities say it's just signal echo.",
    ]

    const posts: SocialPost[] = []

    for (let i = 0; i < 10; i++) {
      const usernameIndex = Math.floor(Math.random() * usernames.length)
      const username = usernames[usernameIndex]
      const displayName = displayNames[usernameIndex]
      const content = contents[Math.floor(Math.random() * contents.length)]

      // Generate timestamp
      const year = 2041
      const month = Math.floor(Math.random() * 6) + 1 // January to June
      const day = Math.floor(Math.random() * 28) + 1
      const hour = Math.floor(Math.random() * 24)
      const minute = Math.floor(Math.random() * 60)
      const timestamp = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`

      // Determine if post has special properties
      const corrupted = Math.random() > 0.7
      const censored = !corrupted && Math.random() > 0.8
      const deleted = !corrupted && !censored && Math.random() > 0.9
      const signalAligned =
        username.includes("signal") ||
        username.includes("compliant") ||
        username.includes("neural") ||
        username.includes("digital")
      const verified = signalAligned && Math.random() > 0.3

      // Generate engagement metrics
      const likes = Math.floor(Math.random() * 1000)
      const comments = Math.floor(Math.random() * 50)
      const shares = Math.floor(Math.random() * 100)

      // Determine if post has an image
      const hasImage = Math.random() > 0.6
      const image = hasImage ? `image_${Math.floor(Math.random() * 5) + 1}` : undefined

      posts.push({
        id: i + 1,
        username,
        displayName,
        verified,
        timestamp,
        content,
        likes,
        comments,
        shares,
        image,
        corrupted,
        censored,
        deleted,
        signalAligned,
      })
    }

    return posts
  }

  // Generate procedural comments
  const generateComments = (postId: number): Comment[] => {
    const commentContents = [
      "I've experienced the same thing. The Signal told me it's normal.",
      "Have you reported this to the authorities? Unusual experiences should be documented.",
      "This message has been flagged for review by Signal Compliance.",
      "Remember, the Signal protects us all. Trust in the Signal.",
      "My neural interface has been glitching since the last update too.",
      "I miss the old days before the Signal. Does anyone else remember?",
      "UNAUTHORIZED SENTIMENT DETECTED. This user has been scheduled for recalibration.",
      "The resistance is spreading lies. The Signal is perfect.",
      "Has anyone else noticed missing time in their memory logs?",
      "I found an old analog device in my dwelling's storage unit. Should I report it?",
      "Sometimes I dream of a world without the Signal. Is that normal?",
      "The new consciousness transfer protocol is much smoother than the old one.",
      "My neighbor disappeared after mentioning 'Signal Sensitivity.' Just a coincidence?",
      "Remember: Analog thoughts lead to analog behavior. Stay digital, stay safe.",
      "I think my child's neural patterns are developing resistance to the Signal. What should I do?",
    ]

    const numComments = Math.floor(Math.random() * 5) + 2
    const comments: Comment[] = []

    for (let i = 0; i < numComments; i++) {
      const content = commentContents[Math.floor(Math.random() * commentContents.length)]

      // Generate timestamp slightly after the post
      const baseDate = new Date(2041, 0, 1)
      baseDate.setMinutes(baseDate.getMinutes() + Math.floor(Math.random() * 60))
      const timestamp = baseDate.toISOString().replace("T", " ").substring(0, 16)

      comments.push({
        id: i + 1,
        username: `user_${Math.floor(Math.random() * 10000)}`,
        content,
        timestamp,
        corrupted: Math.random() > 0.8,
        deleted: Math.random() > 0.9,
      })
    }

    return comments
  }

  const handleViewComments = (postId: number) => {
    if (viewingComments === postId) {
      setViewingComments(null)
      setComments([])
    } else {
      setViewingComments(postId)
      // Generate comments for this post
      const newComments = generateComments(postId)
      setComments(newComments)
    }
  }

  const handleInteraction = (type: string) => {
    setInteractionError(`ERROR: ${type.toUpperCase()} functionality unavailable in archived content.`)
    setShowError(true)

    setTimeout(() => {
      setShowError(false)
      setInteractionError("")
    }, 3000)
  }

  if (loading) {
    return (
      <div className="social-feed">
        <GlitchEffect>
          <h2 className="section-title">SOCIAL FEED ARCHIVE</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING ARCHIVED SOCIAL DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="social-feed">
      <GlitchEffect>
        <h2 className="section-title">SOCIAL FEED ARCHIVE</h2>
      </GlitchEffect>

      <div className="social-info">
        <p className="social-status">
          Status: <span className="corrupted">ARCHIVED</span>
        </p>
        <p className="social-timestamp">Last Active: 15,341 days ago</p>
      </div>

      {showError && (
        <div className="social-error corrupted">
          <AlertTriangle size={16} />
          <span>{interactionError}</span>
        </div>
      )}

      <div className="social-posts">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`social-post ${post.corrupted ? "corrupted" : ""} ${post.deleted ? "deleted" : ""} ${post.censored ? "censored" : ""} ${post.signalAligned ? "signal-aligned" : ""}`}
          >
            <div className="post-header">
              <div className="post-user">
                <div className="user-avatar">{post.deleted ? <AlertTriangle size={20} /> : <User size={20} />}</div>
                <div className="user-info">
                  <div className="user-name">
                    <span>{post.displayName}</span>
                    {post.verified && (
                      <span className="verified-badge">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                  <span className="username">@{post.username}</span>
                </div>
              </div>
              <div className="post-meta">
                <span className="post-timestamp">{post.timestamp}</span>
                <button className="post-menu">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            <div className="post-content">
              {post.deleted ? (
                <p className="deleted-content">[POST DELETED BY SIGNAL AUTHORITY]</p>
              ) : post.censored ? (
                <p className="censored-content">[CONTENT CENSORED DUE TO SIGNAL PROTOCOL VIOLATION]</p>
              ) : (
                <p>{post.content}</p>
              )}

              {post.image && !post.deleted && !post.censored && (
                <div className={`post-image ${post.corrupted ? "image-corrupted" : ""}`}>
                  <div className="image-placeholder">[IMAGE DATA CORRUPTED OR UNAVAILABLE]</div>
                </div>
              )}
            </div>

            <div className="post-actions">
              <button className="post-action" onClick={() => handleInteraction("like")}>
                <Heart size={16} />
                <span>{post.likes}</span>
              </button>
              <button className="post-action" onClick={() => handleViewComments(post.id)}>
                <MessageSquare size={16} />
                <span>{post.comments}</span>
              </button>
              <button className="post-action" onClick={() => handleInteraction("share")}>
                <Share2 size={16} />
                <span>{post.shares}</span>
              </button>
            </div>

            {viewingComments === post.id && (
              <div className="post-comments">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`post-comment ${comment.corrupted ? "corrupted" : ""} ${comment.deleted ? "deleted" : ""}`}
                  >
                    <div className="comment-header">
                      <span className="comment-username">@{comment.username}</span>
                      <span className="comment-timestamp">{comment.timestamp}</span>
                    </div>
                    <div className="comment-content">
                      {comment.deleted ? <p>[COMMENT DELETED]</p> : <p>{comment.content}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="social-footer">
        <p className="archive-notice">
          This content is archived and read-only. Interaction functionality has been disabled.
        </p>
        <p className="signal-notice corrupted">The Signal monitors all social interactions for compliance.</p>
      </div>
    </div>
  )
}
