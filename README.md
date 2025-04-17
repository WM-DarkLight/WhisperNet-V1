# WhisperNet v0

## Overview

WhisperNet v0 is an immersive, interactive web experience that simulates a corrupted internet from a dystopian future. It's a narrative-driven exploration game where users uncover fragments of a dark story about "The Signal" - a mysterious technology that has fundamentally altered humanity.

The project combines visual glitches, audio effects, and interactive elements to create an unsettling, atmospheric experience where players piece together the truth by exploring different sections of the corrupted network.

![WhisperNet Screenshot](/placeholder.svg?height=400&width=800)

## Narrative Background

WhisperNet exists in a post-apocalyptic world where society has collapsed following a series of catastrophic events. The narrative unfolds through corrupted data fragments, news reports, and system files that players discover while navigating the interface.

### The Signal

At the core of WhisperNet's story is "The Signal" - a mysterious technological phenomenon that appeared shortly before the collapse. Its origins and purpose remain unclear, but its effects on humanity and technology are documented throughout the system.

### Timeline of Events

- **Day 0**: First detection of The Signal
- **Days 1-7**: Global communications disruption
- **Days 8-30**: Societal breakdown and infrastructure collapse
- **Days 31-100**: Formation of survivor enclaves
- **Days 100+**: Emergence of WhisperNet as a fragmented communication system

## Features

- **Immersive Boot Sequence**: Starts with a simulated system boot to set the tone
- **Multiple Corrupted Interfaces**: News feeds, forums, file browsers, terminals, and more
- **Dynamic Glitch Effects**: Visual distortions, static overlays, and CRT effects
- **Procedurally Generated Audio Glitches**: System-generated eerie sounds using Web Audio API
- **Interactive Terminal**: Command-line interface with hidden commands and easter eggs
- **Narrative System**: Progressive story with chapters and collectible clues
- **Memory Fragments**: Random story elements that appear throughout the experience
- **Ghost Users**: Phantom users that appear throughout the interface
- **Hidden Easter Eggs**: Secret content accessible through special commands or interactions
- **Journal System**: Tracks story progress and discovered evidence
- **Apocalyptic Content Integration**: Special news reports and files documenting the collapse of civilization
- **Global Updates Archive**: Complete collection of apocalyptic news accessible through the file browser

## Technical Architecture

WhisperNet is built on a modular component architecture using Next.js and React. The system consists of:

### Core Systems

- **Narrative Engine**: Manages story progression and unlocks content based on player discoveries
- **Glitch System**: Controls the frequency and intensity of visual and audio distortions
- **Memory Fragment Generator**: Procedurally inserts story elements throughout the interface
- **Ghost User System**: Simulates the presence of other users in the network

### Data Management

- **Encyclopedia Database**: Contains lore and background information
- **News Generation System**: Creates procedural news content mixed with pre-written apocalyptic reports
- **File System Simulation**: Manages the virtual file structure and content accessibility

## Installation

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- Git

### Standard Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/whispernet.git
cd whispernet
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Installation

\`\`\`bash
# Build the Docker image
docker build -t whispernet .

# Run the container
docker run -p 3000:3000 whispernet
\`\`\`

### Environment Configuration

WhisperNet supports the following environment variables:

- `NEXT_PUBLIC_GLITCH_INTENSITY`: Controls the frequency of visual glitches (default: 0.5)
- `NEXT_PUBLIC_AUDIO_ENABLED`: Enables/disables audio effects (default: true)
- `NEXT_PUBLIC_NARRATIVE_SPEED`: Controls how quickly new story elements are revealed (default: 1)

Create a `.env.local` file in the project root to customize these settings.

## Usage

WhisperNet is designed to be explored. Here's how to interact with the system:

### Navigation

- Use the main navigation bar to switch between major sections
- Each section has its own sub-navigation for different features
- The terminal accepts various commands (try `help` to see available commands)

### Discovering the Narrative

- Look for "Memory Fragments" that appear randomly
- Explore different sections to find clues
- Use the Journal (button in the bottom right) to track your progress
- Complete chapters by finding all required clues

### Terminal Commands

The terminal supports the following commands:

- `help`: Displays available commands
- `ls`: Lists files in the current directory
- `cd [directory]`: Changes directory
- `cat [file]`: Displays file contents
- `connect [address]`: Attempts to connect to a remote system
- `decrypt [file]`: Attempts to decrypt an encrypted file
- `scan`: Scans for nearby networks
- `status`: Displays system status
- `clear`: Clears the terminal screen
- `history`: Shows command history
- `whoami`: Displays current user information
- `date`: Shows the current system date
- `signal`: Provides information about The Signal (if discovered)
- `reboot`: Simulates a system reboot

### Accessing Apocalyptic Content

All apocalyptic news reports and documents are accessible through:

1. **News Feed**: Random apocalyptic news appears in the news feed
2. **File Browser**: Navigate to the `global_updates` folder to access all apocalyptic content
3. **Terminal**: Use `cat /global_updates/[filename]` to read specific reports

### Hidden Features

- Try the Konami code (↑↑↓↓←→←→BA)
- Type `thetruth` in the terminal when you've collected all evidence
- Look for glitches that can be clicked for hidden content
- Check source code comments for hints
- Enter `override:signal` in the search bar to access hidden Signal documentation

## Technical Details

WhisperNet is built with:

- **Next.js 13+**: React framework for the application structure with App Router
- **TypeScript**: For type-safe code
- **Web Audio API**: For generating audio effects programmatically
- **CSS Animations**: For glitch effects and visual distortions
- **React Context**: For state management of the narrative system
- **Tailwind CSS**: For styling components
- **Framer Motion**: For advanced animations
- **Howler.js**: For audio management
- **LocalForage**: For persistent storage of player progress

## Component Breakdown

### Core Components

- `page.tsx`: Main application entry point and layout
- `narrative-system.tsx`: Context provider for the story progression
- `narrative-journal.tsx`: UI for tracking story progress
- `narrative-encyclopedia.tsx`: Knowledge base for discovered lore
- `narrative-ecosystem.tsx`: Environmental storytelling system
- `narrative-side-stories.tsx`: Optional narrative branches

### Interface Components

- `dead-header.tsx`: Main navigation
- `dead-terminal.tsx`: Basic command line interface
- `dead-terminal-enhanced.tsx`: Advanced interactive command line
- `dead-file-browser.tsx`: Simulated file system with apocalyptic content
- `dead-newsfeed.tsx`: News aggregator with procedural and apocalyptic content
- `dead-forum.tsx`: Simulated discussion boards
- `dead-social.tsx`: Corrupted social media interface
- `dead-email.tsx`: Email client simulation
- `dead-map.tsx`: Geographic visualization system
- `dead-marketplace.tsx`: Abandoned digital marketplace
- `dead-video.tsx`: Corrupted video streaming service
- `dead-weather.tsx`: Climate monitoring system
- `dead-profiles.tsx`: User profile database
- `dead-users.tsx`: User management system
- `dead-ads.tsx`: Corrupted advertising system
- `dead-chatroom.tsx`: Real-time chat simulation
- `dead-search.tsx`: Search engine interface

### Effect Components

- `glitch-effect.tsx`: Text and element distortion
- `static-overlay.tsx`: Visual noise effect
- `crt-overlay.tsx`: CRT screen simulation
- `audio-glitch.tsx`: Procedurally generated audio effects
- `memory-fragment.tsx`: Basic story fragment display
- `memory-fragment-enhanced.tsx`: Advanced story fragment with interaction
- `random-alert.tsx`: System alert generator
- `notifications.tsx`: Notification system

### Tab Components

- `search-tab.tsx`: Search interface tab
- `terminal-tab.tsx`: Terminal interface tab
- `archives-tab.tsx`: Archives access tab

### Data Components

- `encyclopedia-data.ts`: Knowledge base content
- `apocalypse-news-data.ts`: Apocalyptic news reports and content

## Audio System

The audio system uses the Web Audio API to generate all sounds programmatically without external files:

- **Static**: White noise with bandpass filtering
- **Interference**: Sawtooth oscillator with frequency modulation
- **Whispers**: Filtered noise with tremolo effect
- **Signal Lost**: Decreasing beep pattern
- **Transmission**: Frequency modulation with random changes
- **System Alerts**: Notification sounds with varying urgency levels
- **Terminal Feedback**: Interactive audio feedback for terminal commands
- **Ambient Background**: Procedurally generated ambient soundscape

Audio glitches play randomly throughout the experience, creating an unsettling atmosphere. The audio system includes:

\`\`\`javascript
// Audio context initialization
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Oscillator setup
const oscillator = audioContext.createOscillator();
oscillator.type = 'sawtooth';
oscillator.frequency.value = 440;

// Filter setup
const filter = audioContext.createBiquadFilter();
filter.type = 'bandpass';
filter.frequency.value = 1000;
filter.Q.value = 0.5;

// Gain node for volume control
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.1;

// Connect nodes
oscillator.connect(filter);
filter.connect(gainNode);
gainNode.connect(audioContext.destination);
\`\`\`

## Customization

### Adding New Content

You can extend WhisperNet by:

1. Adding new memory fragments in `page.tsx`
2. Creating new terminal commands in `dead-terminal-enhanced.tsx`
3. Adding new clues to the narrative system in `narrative-system.tsx`
4. Creating new corrupted interfaces in the components directory
5. Adding new apocalyptic news reports in `data/apocalypse-news-data.ts`

### Modifying the Narrative

The narrative structure is defined in `narrative-system.tsx`. You can:

- Change the chapter structure
- Add or modify clues
- Adjust the requirements for chapter completion
- Create alternative endings
- Add new side stories

### Customizing the Interface

The interface can be customized by:

1. Modifying CSS files in the `app` directory
2. Adjusting glitch parameters in effect components
3. Creating new UI components in the `components` directory
4. Modifying the color scheme in `whispernet.css`

### Creating New Apocalyptic Content

To add new apocalyptic content:

1. Add new entries to `data/apocalypse-news-data.ts`
2. Create corresponding files in the file browser system
3. Link content to the narrative system if relevant to the story

## Performance Optimization

WhisperNet includes several performance optimizations:

- **Code Splitting**: Components are loaded only when needed
- **Image Optimization**: Images are compressed and served in modern formats
- **Lazy Loading**: Non-critical components are loaded after initial render
- **Memoization**: Expensive calculations are cached
- **Throttling**: Glitch effects are throttled to maintain performance

## Troubleshooting

### Common Issues

- **Audio not working**: Check if your browser supports Web Audio API and if audio is enabled in settings
- **High CPU usage**: Reduce glitch intensity in settings
- **Progress not saving**: Clear browser cache and reload
- **Terminal commands not working**: Make sure you're using the correct syntax
- **Content not unlocking**: Check the journal for missing clues

### Browser Compatibility

WhisperNet is tested and optimized for:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Mobile support is limited due to the interface complexity.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation for changes
- Ensure all tests pass before submitting PR
- Keep PR scope focused on a single feature or bug fix

## Future Development

Planned features for future releases:

- **Multiplayer Mode**: Collaborative exploration
- **VR Support**: Immersive virtual reality experience
- **Expanded Narrative**: Additional chapters and side stories
- **Mobile Optimization**: Better support for mobile devices
- **Offline Mode**: Full functionality without internet connection
- **Custom Content Creator**: Tools for users to create their own content

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by analog horror and digital dystopia narratives
- Special thanks to all contributors and testers
- Audio system inspired by the Web Audio API examples
- Glitch effects based on research by digital artists
- Narrative structure influenced by non-linear storytelling techniques

## Contact

For questions, feedback, or support:

- GitHub Issues: [https://github.com/yourusername/whispernet/issues](https://github.com/yourusername/whispernet/issues)
- Email: whispernet@example.com
- Twitter: [@WhisperNetV0](https://twitter.com/WhisperNetV0)
