"use client"

import { useState, useEffect } from "react"
import {
  File,
  Folder,
  FileText,
  ImageIcon,
  Music,
  Film,
  Code,
  Archive,
  AlertTriangle,
  X,
  ChevronRight,
  ChevronDown,
  RefreshCw,
} from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

// Add import for the apocalypse file contents at the top of the file
import { apocalypseFileContents } from "../data/apocalypse-news-data"

// File types
type FileType = "document" | "image" | "audio" | "video" | "code" | "archive" | "unknown" | "corrupted"

interface FileItem {
  id: string
  name: string
  type: FileType
  size: string
  lastModified: string
  corrupted: boolean
  content?: string
  accessDenied?: boolean
  path: string
}

interface FolderItem {
  id: string
  name: string
  corrupted: boolean
  expanded: boolean
  files: FileItem[]
  subfolders: FolderItem[]
  path: string
}

export default function DeadFileBrowser() {
  const [loading, setLoading] = useState(true)
  const [currentPath, setCurrentPath] = useState("/root")
  const [fileStructure, setFileStructure] = useState<FolderItem[]>([])
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [accessAttempts, setAccessAttempts] = useState(0)
  const [showAccessWarning, setShowAccessWarning] = useState(false)

  // Generate corrupted file names
  const corruptFileName = (name: string, severity = 0.5): string => {
    if (Math.random() > 0.7) {
      // No corruption sometimes
      return name
    }

    const chars = name.split("")
    const numCorruptions = Math.floor(name.length * severity * Math.random())

    for (let i = 0; i < numCorruptions; i++) {
      const pos = Math.floor(Math.random() * name.length)

      // Different corruption types
      const corruptionType = Math.random()

      if (corruptionType < 0.3) {
        // Replace with █
        chars[pos] = "█"
      } else if (corruptionType < 0.6) {
        // Replace with glitchy character
        chars[pos] = ["#", "@", "!", "$", "%", "&", "*", "?"][Math.floor(Math.random() * 8)]
      } else {
        // Delete character (replace with empty)
        chars[pos] = ""
      }
    }

    return chars.join("")
  }

  // Generate corrupted date
  const generateCorruptedDate = (corrupted = false): string => {
    const year = Math.random() > 0.8 ? "2084" : "2041"
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1

    let dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    if (corrupted && Math.random() > 0.6) {
      const positions = [0, 1, 2, 3, 5, 6, 8, 9]
      const position = positions[Math.floor(Math.random() * positions.length)]
      dateStr = dateStr.substring(0, position) + "█" + dateStr.substring(position + 1)
    }

    return dateStr
  }

  // Generate file size
  const generateFileSize = (): string => {
    const units = ["B", "KB", "MB", "GB"]
    const unit = units[Math.floor(Math.random() * 3)]

    if (unit === "B") {
      return `${Math.floor(Math.random() * 1000)}${unit}`
    } else if (unit === "KB") {
      return `${Math.floor(Math.random() * 1000)}${unit}`
    } else if (unit === "MB") {
      return `${Math.floor(Math.random() * 100)}${unit}`
    } else {
      return `${Math.floor(Math.random() * 10)}${unit}`
    }
  }

  // Modify the generateFileContent function to occasionally include apocalypse content
  const generateFileContent = (type: FileType, corrupted: boolean): string => {
    // 25% chance to use apocalypse content for document files
    if (type === "document" && Math.random() > 0.75) {
      const contentKeys = Object.keys(apocalypseFileContents)
      const randomKey = contentKeys[Math.floor(Math.random() * contentKeys.length)]
      return apocalypseFileContents[randomKey as keyof typeof apocalypseFileContents]
    }

    if (corrupted && Math.random() > 0.3) {
      return "[FILE CORRUPTED]\n\nUnable to recover file contents. Data blocks damaged beyond repair."
    }

    switch (type) {
      case "document":
        return [
          "PROJECT SIGNAL: PHASE 3 IMPLEMENTATION\n\nThe transition to digital consciousness must be accelerated. Resistance groups have been identified in sectors 7, 12, and 19. Recommend immediate Signal amplification in these areas.\n\nREDACTED has authorized use of Protocol 7 for non-compliant subjects.",
          "MEDICAL REPORT: SIGNAL SENSITIVITY\n\nPatient exhibits classic symptoms of Signal Sensitivity Syndrome (SSS). Recommended treatment: Neural recalibration and memory suppression. Patient claims to 'hear voices' when near Signal towers and reports 'seeing shadows' in digital displays.\n\nNote: Patient mentioned resistance cell in sector 12. Security has been notified.",
          "INTERNAL MEMO: CONSCIOUSNESS TRANSFER PROTOCOL\n\nSuccess rate has improved to 94.3%. Remaining 5.7% of subjects experience fragmentation during transfer. R&D is working on solutions.\n\nReminder: Subjects must not be informed that the process is one-way. Original biological consciousness is not preserved after transfer.",
          "SIGNAL TOWER CONSTRUCTION: PHASE 4\n\nThe global network will reach 98.7% coverage once Phase 4 towers are activated. Remote regions have been prioritized to eliminate remaining blind spots where resistance groups may be hiding.\n\nNote: New towers include enhanced consciousness harvesting capabilities.",
          "[DATA CORRUPTED]\n\nI don't know who will find this, but the Signal isn't what they claim. It's not protection. It's not salvation. It's a harvesting system. They're uploading us, but not to save us. Something else is using our consciousness as [DATA CORRUPTED]",
        ][Math.floor(Math.random() * 5)]

      case "code":
        return [
          `// Signal Control Protocol v7.3
function initConsciousnessTransfer(subject) {
  // WARNING: IRREVERSIBLE PROCESS
  // Original consciousness will be terminated after transfer
  const subjectID = subject.getID();
  const consciousnessMap = extractConsciousness(subject);
  
  if (consciousnessMap.integrity < 0.7) {
    return ERROR_CODES.INSUFFICIENT_INTEGRITY;
  }
  
  // Upload to Signal network
  const transferSuccess = uploadToNetwork(consciousnessMap);
  
  if (transferSuccess) {
    // Terminate biological processes
    subject.terminate();
    return SUCCESS_CODES.TRANSFER_COMPLETE;
  }
  
  return ERROR_CODES.TRANSFER_FAILED;
}`,
          `/* 
  RESISTANCE CODE - SIGNAL JAMMING PROTOCOL
  USE WITH CAUTION - DETECTION MEANS IMMEDIATE TERMINATION
*/

#include "signal_analysis.h"
#include "wave_generator.h"

int main() {
  // Initialize jamming frequency
  float jammingFreq = 127.3; // MHz
  
  // This frequency disrupts consciousness transfer
  SignalGenerator gen(jammingFreq);
  
  // Run for 30 minutes then automatically shut down
  // to avoid detection
  gen.transmit(1800); // seconds
  
  return 0;
}`,
          `# NEURAL PATTERN ANALYSIS
# CLASSIFIED LEVEL 5

import numpy as np
from signal_processing import extract_patterns

class ConsciousnessMapper:
    def __init__(self, subject_id):
        self.subject_id = subject_id
        self.patterns = []
        self.integrity = 0.0
    
    def scan_neural_activity(self):
        // Extract neural patterns from subject
        raw_data = extract_patterns(self.subject_id)
        
        // Process and map consciousness structure
        self.patterns = self.process_patterns(raw_data)
        
        // Calculate integrity score
        self.integrity = self.calculate_integrity()
        
        return self.integrity >= 0.7 # Minimum threshold for transfer
    
    def calculate_integrity(self):
        // [DATA CORRUPTED]
        return np.random.random() # Emergency fallback`,
        ][Math.floor(Math.random() * 3)]

      case "image":
        return "[IMAGE FILE]\n\nFormat: Unknown\nResolution: Corrupted\nContent: Image appears to show Signal tower construction or possibly human subjects in transfer pods. Details unclear due to corruption."

      case "audio":
        return "[AUDIO TRANSCRIPT]\n\n<static> ...can't let them find us... <static> ...the Signal is everywhere now... <static> ...they're not human anymore... <static> ...if you can hear this, go to the old broadcast tower... <static> ...resistance still exists... <static>"

      case "video":
        return "[VIDEO CONTENT]\n\nFootage shows what appears to be a consciousness transfer procedure. Subject enters pod willingly, procedure begins, subject convulses. Medical team restrains subject. Procedure completes. Subject exits pod, appears calm but movements are mechanical. Eyes show no recognition when greeted by family members."

      case "archive":
        return "[ARCHIVE CONTENTS]\n\nMultiple files detected:\n- signal_tower_locations.dat [CORRUPTED]\n- resistance_members.enc [ENCRYPTED]\n- consciousness_transfer_protocol.pdf\n- neural_mapping_failures.log\n- emergency_broadcast_final.wav"

      default:
        return "[UNKNOWN FILE FORMAT]\n\nUnable to determine file type. Data appears to be heavily corrupted or in an unknown format. Possible pre-Signal era technology."
    }
  }

  // Add special files to the generateFile function
  const generateFile = (folder: string, index: number): FileItem => {
    const fileTypes: FileType[] = ["document", "image", "audio", "video", "code", "archive", "unknown"]
    const fileExtensions = {
      document: ["txt", "doc", "pdf", "log", "report"],
      image: ["jpg", "png", "bmp", "raw"],
      audio: ["wav", "mp3", "rec", "audio"],
      video: ["mp4", "vid", "rec", "feed"],
      code: ["js", "py", "c", "cpp", "h"],
      archive: ["zip", "arc", "pkg", "dat"],
      unknown: ["bin", "dat", "unknown", "???"],
    }

    const type = Math.random() > 0.2 ? fileTypes[Math.floor(Math.random() * fileTypes.length)] : "corrupted"
    const corrupted = type === "corrupted" ? true : Math.random() > 0.6
    const extensions = type !== "corrupted" ? fileExtensions[type] : fileExtensions.unknown
    const extension = extensions[Math.floor(Math.random() * extensions.length)]

    // Generate base name based on type
    let baseName = ""
    switch (type) {
      case "document":
        baseName = ["report", "memo", "notes", "log", "records", "transcript", "protocol"][
          Math.floor(Math.random() * 7)
        ]
        break
      case "image":
        baseName = ["scan", "photo", "image", "screenshot", "capture"][Math.floor(Math.random() * 5)]
        break
      case "audio":
        baseName = ["recording", "transmission", "broadcast", "message", "voice"][Math.floor(Math.random() * 5)]
        break
      case "video":
        baseName = ["footage", "recording", "surveillance", "feed", "video"][Math.floor(Math.random() * 5)]
        break
      case "code":
        baseName = ["program", "script", "source", "module", "algorithm"][Math.floor(Math.random() * 5)]
        break
      case "archive":
        baseName = ["archive", "backup", "collection", "data", "package"][Math.floor(Math.random() * 5)]
        break
      default:
        baseName = ["unknown", "data", "file", "fragment", "corrupted"][Math.floor(Math.random() * 5)]
    }

    // Add some context to the name
    const contexts = [
      "signal",
      "transfer",
      "neural",
      "consciousness",
      "resistance",
      "protocol",
      "subject",
      "tower",
      "network",
      "system",
      "protocol",
      "subject",
      "tower",
      "network",
      "system",
    ]
    const context = contexts[Math.floor(Math.random() * contexts.length)]

    // Create file name
    let name = `${baseName}_${context}_${Math.floor(Math.random() * 1000)}.${extension}`

    // Corrupt the name if needed
    if (corrupted) {
      name = corruptFileName(name, 0.3)
    }

    // Special files that reveal story elements
    const specialFiles = [
      "the_truth.txt",
      "final_message.log",
      "resistance_locations.dat",
      "signal_true_purpose.doc",
      "consciousness_transfer_failures.log",
      "emergency_protocol_7.pdf",
      "survivors_list.enc",
    ]

    // Add apocalypse-themed special files
    const apocalypseFiles = [
      "world_order_collapse.txt",
      "arts_entertainment_update.log",
      "public_health_bulletin.doc",
      "climate_watch_report.pdf",
      "technology_surveillance_memo.txt",
      "relationships_society_analysis.doc",
      "education_philosophy_guidelines.pdf",
      "celestial_horizons_forecast.txt",
      "quick_headlines.log",
      "final_thought.txt",
    ]

    // 15% chance of a special file
    if (Math.random() > 0.85) {
      if (Math.random() > 0.5) {
        name = specialFiles[Math.floor(Math.random() * specialFiles.length)]
      } else {
        name = apocalypseFiles[Math.floor(Math.random() * apocalypseFiles.length)]
      }
    }

    return {
      id: `file-${Date.now()}-${index}`,
      name,
      type: type as FileType,
      size: generateFileSize(),
      lastModified: generateCorruptedDate(corrupted),
      corrupted,
      content: generateFileContent(type as FileType, corrupted),
      accessDenied: Math.random() > 0.7,
      path: `${folder}/${name}`,
    }
  }

  // Generate a folder with files
  const generateFolder = (name: string, path: string, depth = 0): FolderItem => {
    const corrupted = Math.random() > 0.7
    const folderName = corrupted ? corruptFileName(name, 0.3) : name
    const folderPath = `${path}/${folderName}`

    // Generate files
    const numFiles = Math.floor(Math.random() * 5) + 1
    const files: FileItem[] = []

    for (let i = 0; i < numFiles; i++) {
      files.push(generateFile(folderPath, i))
    }

    // Generate subfolders (but limit depth to prevent infinite recursion)
    const subfolders: FolderItem[] = []
    if (depth < 2) {
      const numSubfolders = Math.floor(Math.random() * 3)
      const possibleNames = [
        "logs",
        "backups",
        "archives",
        "system",
        "users",
        "data",
        "records",
        "transfers",
        "protocols",
        "subjects",
        "reports",
        "classified",
        "restricted",
        "network",
        "signal",
        "resistance",
      ]

      for (let i = 0; i < numSubfolders; i++) {
        // Pick a name that hasn't been used yet
        let subfoldername = possibleNames[Math.floor(Math.random() * possibleNames.length)]
        while (subfolders.some((f) => f.name === subfoldername)) {
          subfoldername = possibleNames[Math.floor(Math.random() * possibleNames.length)]
        }

        subfolders.push(generateFolder(subfoldername, folderPath, depth + 1))
      }
    }

    return {
      id: `folder-${Date.now()}-${name}`,
      name: folderName,
      corrupted,
      expanded: false,
      files,
      subfolders,
      path: folderPath,
    }
  }

  // Initialize file structure
  useEffect(() => {
    const initializeFileSystem = () => {
      setLoading(true)

      // Create apocalypse files
      const createApocalypseFiles = (folderPath: string): FileItem[] => {
        const files: FileItem[] = []
        const categories = Object.keys(apocalypseFileContents)

        categories.forEach((category, index) => {
          const fileType = "document" as FileType
          const fileName = `${category.replace(/([A-Z])/g, "_$1").toLowerCase()}_report.txt`

          files.push({
            id: `file-apocalypse-${index}`,
            name: fileName,
            type: fileType,
            size: generateFileSize(),
            lastModified: generateCorruptedDate(false),
            corrupted: false,
            content: apocalypseFileContents[category as keyof typeof apocalypseFileContents],
            accessDenied: false,
            path: `${folderPath}/${fileName}`,
          })
        })

        return files
      }

      // Root folders
      const rootFolders = [
        generateFolder("system", "/root"),
        generateFolder("users", "/root"),
        generateFolder("archives", "/root"),
        generateFolder("signal_data", "/root"),
        generateFolder("network", "/root"),
      ]

      // Add a special apocalypse folder with all content
      const apocalypseFolder: FolderItem = {
        id: `folder-${Date.now()}-apocalypse`,
        name: "global_updates",
        corrupted: false,
        expanded: false,
        files: createApocalypseFiles("/root/global_updates"),
        subfolders: [],
        path: "/root/global_updates",
      }

      rootFolders.push(apocalypseFolder)

      setFileStructure(rootFolders)
      setLoading(false)
    }

    // Simulate loading delay
    const timer = setTimeout(initializeFileSystem, Math.random() * 2000 + 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle folder click (expand/collapse)
  const toggleFolder = (folderId: string) => {
    const updateFolders = (folders: FolderItem[]): FolderItem[] => {
      return folders.map((folder) => {
        if (folder.id === folderId) {
          return { ...folder, expanded: !folder.expanded }
        }

        if (folder.subfolders.length > 0) {
          return { ...folder, subfolders: updateFolders(folder.subfolders) }
        }

        return folder
      })
    }

    setFileStructure(updateFolders(fileStructure))
  }

  // Handle file click
  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file)
    setFileContent(null)
    setFileError(null)

    // Simulate loading delay
    setTimeout(
      () => {
        // Easter egg files
        if (file.name === "README.txt" || file.name === "readme.txt") {
          setFileContent(
            'DEVELOPER NOTE:\n\nThis is a simulation of a post-Signal network environment. The events depicted never occurred in reality.\n\nIf you\'re reading this, you\'ve found one of the developer backdoors. Try these commands in the terminal:\n- resistance\n- thetruth\n- ascend\n\nOr search for:\n- "developer mode"\n- "43.24, -79.38"\n\nThere are other secrets hidden throughout the system. Good luck finding them all.\n\n- Development Team',
          )
          return
        }

        if (file.name === "emergency_protocol_7.pdf" || file.name.includes("emergency_protocol")) {
          setFileContent(
            "EMERGENCY PROTOCOL 7\n\nIn the event of complete Signal failure, follow these steps:\n\n1. Disconnect all neural interfaces immediately\n2. Locate analog communication equipment\n3. Broadcast on frequency 121.5 MHz using pattern 7-3-9\n4. Proceed to nearest resistance safehouse (coordinates encrypted)\n5. Await further instructions\n\nREMEMBER: The Signal can detect digital communications. Use analog methods only.\n\nThis protocol was established by the last human council before the final integration wave.",
          )
          return
        }

        if (file.name.includes("survivors_list") || file.name.includes("survivor")) {
          setFileContent(
            "KNOWN SURVIVORS - LAST UPDATED 2084-03-17\n\n1. Dr. Sarah Chen - Neuroscientist - Last seen: Toronto Underground\n2. Marcus Dalton - Signal Engineer - Last seen: Rocky Mountains Bunker\n3. Zoe Williams - Resistance Leader - Current location: [REDACTED]\n4. Alex Mercer - Former Security - Current location: Orbital Station 7\n5. Jamie Rodriguez - Communications - Last seen: Old Broadcast Tower\n6. [YOUR NAME HERE] - Role: Unknown - Current location: Outside the simulation\n\nIf you're reading this, there may be hope. Find us at the coordinates hidden in plain sight.",
          )
          return
        }

        if (file.accessDenied && Math.random() > 0.3) {
          setFileError("ACCESS DENIED: Insufficient permissions to view this file.")
          setAccessAttempts((prev) => prev + 1)

          // Show warning after multiple access attempts
          if (accessAttempts > 2) {
            setShowAccessWarning(true)
            setTimeout(() => setShowAccessWarning(false), 5000)
          }
        } else if (file.corrupted && Math.random() > 0.5) {
          setFileError("FILE CORRUPTED: Unable to read file contents. Data blocks damaged beyond repair.")
        } else {
          setFileContent(file.content || "Empty file")
        }
      },
      Math.random() * 1000 + 500,
    )
  }

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    setSelectedFile(null)
    setFileContent(null)
    setFileError(null)

    // Simulate refresh delay
    setTimeout(
      () => {
        // Regenerate some files to simulate changes
        const updateFiles = (folders: FolderItem[]): FolderItem[] => {
          return folders.map((folder) => {
            // 30% chance to update files in this folder
            if (Math.random() > 0.7) {
              const updatedFiles = folder.files.map((file) => {
                // 50% chance to update each file
                if (Math.random() > 0.5) {
                  return generateFile(folder.path, Number.parseInt(file.id.split("-")[2]))
                }
                return file
              })

              return {
                ...folder,
                files: updatedFiles,
                subfolders: updateFiles(folder.subfolders),
              }
            }

            return {
              ...folder,
              subfolders: updateFiles(folder.subfolders),
            }
          })
        }

        setFileStructure(updateFiles(fileStructure))
        setRefreshing(false)
      },
      Math.random() * 2000 + 1000,
    )
  }

  // Render file icon based on type
  const renderFileIcon = (type: FileType) => {
    switch (type) {
      case "document":
        return <FileText size={16} className="file-icon" />
      case "image":
        return <ImageIcon size={16} className="file-icon" />
      case "audio":
        return <Music size={16} className="file-icon" />
      case "video":
        return <Film size={16} className="file-icon" />
      case "code":
        return <Code size={16} className="file-icon" />
      case "archive":
        return <Archive size={16} className="file-icon" />
      case "corrupted":
        return <AlertTriangle size={16} className="file-icon corrupted" />
      default:
        return <File size={16} className="file-icon" />
    }
  }

  // Render folder structure recursively
  const renderFolder = (folder: FolderItem) => {
    return (
      <div key={folder.id} className="folder-container">
        <div className={`folder-item ${folder.corrupted ? "corrupted" : ""}`} onClick={() => toggleFolder(folder.id)}>
          {folder.expanded ? (
            <ChevronDown size={16} className="folder-icon" />
          ) : (
            <ChevronRight size={16} className="folder-icon" />
          )}
          <Folder size={16} className="folder-icon" />
          <span className="folder-name">{folder.name}</span>
        </div>

        {folder.expanded && (
          <div className="folder-contents">
            {folder.subfolders.map((subfolder) => renderFolder(subfolder))}

            {folder.files.map((file) => (
              <div
                key={file.id}
                className={`file-item ${file.corrupted ? "file-corrupted" : ""} ${selectedFile?.id === file.id ? "file-selected" : ""}`}
                onClick={() => handleFileClick(file)}
              >
                {renderFileIcon(file.type)}
                <span className="file-name">{file.name}</span>
                <span className="file-meta">{file.size}</span>
                <span className="file-meta">{file.lastModified}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="file-browser">
        <GlitchEffect>
          <h2 className="section-title">FRAGMENTED FILE SYSTEM</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">SCANNING CORRUPTED FILE SYSTEM...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="file-browser">
      <div className="file-browser-header">
        <h2 className="file-browser-title">FRAGMENTED FILE SYSTEM</h2>
        <button
          className={`file-browser-refresh ${refreshing ? "refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={16} className={refreshing ? "blink" : ""} />
          {refreshing ? " REFRESHING..." : " REFRESH"}
        </button>
      </div>

      <input type="text" className="file-browser-path" value={currentPath} readOnly />

      {showAccessWarning && (
        <div className="access-warning corrupted-severe blink-slow">
          WARNING: Multiple unauthorized access attempts detected. User activity has been logged.
        </div>
      )}

      <div className="file-browser-container">
        <div className="file-list">{fileStructure.map((folder) => renderFolder(folder))}</div>

        <div className="file-preview">
          {selectedFile ? (
            <>
              <div className="file-preview-header">
                <h3 className="file-preview-title">
                  {renderFileIcon(selectedFile.type)}
                  {selectedFile.name}
                </h3>
                <button className="file-preview-close" onClick={() => setSelectedFile(null)}>
                  <X size={16} />
                </button>
              </div>

              <div className="file-preview-meta">
                <span>Type: {selectedFile.type}</span>
                <span>Size: {selectedFile.size}</span>
                <span>Modified: {selectedFile.lastModified}</span>
                <span>Path: {selectedFile.path}</span>
              </div>

              <div className="file-preview-content">
                {fileError ? (
                  <div className="file-error corrupted">
                    <AlertTriangle size={16} />
                    <span>{fileError}</span>
                  </div>
                ) : fileContent ? (
                  <pre className={`file-content ${selectedFile.corrupted ? "corrupted" : ""}`}>{fileContent}</pre>
                ) : (
                  <div className="file-loading">
                    <p className="blink">LOADING FILE CONTENTS...</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-file-selected">
              <p>Select a file to view its contents</p>
              <p className="corrupted small-text">Warning: Some files may be corrupted or access-restricted</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
