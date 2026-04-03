# SudoSkills

Learn Linux commands interactively through hands-on practice in a simulated terminal environment.

## Features

- 🎯 **Interactive Learning** - Type real commands and get instant feedback
- 💾 **Progress Tracking** - Your progress is saved automatically
- 🚀 **No Setup Required** - Everything runs in your browser
- 🌙 **Modern Dark UI** - Beautiful, easy-on-the-eyes interface
- 📚 **Structured Lessons** - Learn step-by-step from basics to advanced

## Tech Stack

- **Framework**: Next.js 14 (Pages Router) with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + localStorage
- **Deployment**: Vercel (or static export for GitHub Pages)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

### Static Export (for GitHub Pages)

```bash
# Update next.config.js to add: output: 'export'
# Then build
npm run build

# Static files will be in ./out/
```

## Project Structure

```
src/
├── pages/              # Next.js pages
│   ├── en/            # English routes
│   │   ├── index.tsx  # Landing page
│   │   └── learn/     # Lesson pages
├── components/         # React components
├── context/           # React Context providers
├── engine/            # Virtual filesystem & command execution
│   ├── filesystem.ts  # Virtual filesystem
│   ├── commandExecutor.ts
│   └── commands/      # Individual command implementations
├── data/              # Lesson content
│   └── lessons/
├── utils/             # Utilities
└── types/             # TypeScript definitions
```

## Available Lessons

1. **Basic Commands** - Learn pwd, ls, cd
2. **Navigation & Paths** - Master absolute and relative paths
3. **File Operations** - Create, view, and manage files

## Development

### Adding New Commands

1. Create command handler in `src/engine/commands/`
2. Register in `src/engine/commands/index.ts`
3. Add tests

### Adding New Lessons

1. Create a new lesson file in `src/data/lessons/` (e.g., `my-lesson.ts`). It should export an array of `StepData` objects.
2. The `StepData` structure requires:
   - `title`: Step title
   - `description`: Instructions for the user
   - `interactive`: Boolean (true if user needs to type a command)
   - `expectedCommand`: Array of valid commands (e.g., `['ls -a']`)
   - `initialFS`: The starting state of the virtual filesystem for this step
   - `initialCwd`: The starting directory
   - `customValidate`: (Optional) A function to verify the command output or filesystem state
3. Add an entry to `src/data/lessons/index.json` with the lesson's metadata (`key`, `slug`, `title`, `description`, `stepCount`).

## Architecture

SudoSkills uses a **Client-side Virtual Filesystem**. All commands are parsed and executed entirely in the browser using JavaScript. No actual server or container is used. 

The core flow is:
1. User types command in the React UI.
2. `CommandParser` tokenizes the input.
3. `CommandExecutor` routes it to the specific command handler (e.g., `ls`, `cd`).
4. The handler interacts with the `VirtualFilesystem` class.
5. `checkCommand` validates the result against the lesson's `StepData`.

For more details, see [sys-design.md](./sys-design.md).

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js configuration
4. Deploy!

### Custom Domain

To use a custom subdomain (e.g., `sudoskills.yourdomain.com`):

1. Go to Project Settings → Domains in Vercel
2. Add your custom domain
3. Add CNAME record in your DNS provider:
   ```
   Type: CNAME
   Name: sudoskills
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (~15 minutes)
5. Vercel automatically provisions SSL certificate

## License

MIT
