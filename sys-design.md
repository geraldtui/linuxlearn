# LinuxLearn - System Design Document

## Overview

A web-based interactive Linux learning platform inspired by RegexLearn. Users learn Linux commands through hands-on practice in a simulated terminal environment with step-by-step lessons.

**Key Characteristics:**
- Next.js with Static Site Generation (SSG)
- No backend API required for core learning
- Client-side Linux command simulation
- Progress tracking via localStorage
- Modern dark UI aesthetic
- Internationalization ready (following RegexLearn's i18n pattern)

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Next.js Application (SSG)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Build Time (getStaticProps/getStaticPaths)            │
│  ┌──────────────────────────────────────────────────┐  │
│  │  - Pre-render all lesson pages                   │  │
│  │  - Bundle lesson data                            │  │
│  │  - Generate routes: /learn, /learn/[lesson]     │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Runtime (Client-Side)                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │  InteractiveTerminalContext (React Context)      │  │
│  │  - Current step state                            │  │
│  │  - Filesystem state                              │  │
│  │  - Terminal history                              │  │
│  │  - Success/error state                           │  │
│  │  - localStorage integration                      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Components Layer                                │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Step (Lesson Layout)                      │  │  │
│  │  │  - Instruction panel                       │  │  │
│  │  │  - InteractiveTerminal                     │  │  │
│  │  │  - Hints & feedback                        │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  LearnProgress (Sidebar)                   │  │  │
│  │  │  - Step list with checkmarks               │  │  │
│  │  │  - Jump to completed steps                 │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  LearnFooter                               │  │  │
│  │  │  - Prev/Next navigation                    │  │  │
│  │  │  - Keyboard shortcuts                      │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Engine Layer                                    │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Virtual Filesystem                        │  │  │
│  │  │  - In-memory file tree                     │  │  │
│  │  │  - Path resolution                         │  │  │
│  │  │  - CRUD operations                         │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Command Executor                          │  │  │
│  │  │  - Parse command string                    │  │  │
│  │  │  - Execute on virtual FS                   │  │  │
│  │  │  - Generate output                         │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  Validator (checkCommand)                  │  │  │
│  │  │  - Validate command syntax                 │  │  │
│  │  │  - Check output against expected           │  │  │
│  │  │  - Support custom validation logic         │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend Framework
**Next.js 13+ (Pages Router)**
- Static Site Generation (SSG) with `getStaticProps`/`getStaticPaths`
- Pre-rendered pages for instant loading
- Built-in routing with file-system based structure
- Optimized production builds
- Easy internationalization support

### Language
**TypeScript**
- Type safety for components and data structures
- Better developer experience
- Easier refactoring

### Styling
**Tailwind CSS 3**
- Rapid prototyping
- Modern dark theme support
- Utility-first approach
- Easy customization
- @tailwindcss/forms for input styling

### UI Components
**@headlessui/react**
- Accessible modals, menus, dialogs
- Unstyled, fully customizable
- **clsx** for conditional class names

### State Management
**React Context + useState**
- `InteractiveTerminalContext` for lesson state
- Built-in React features (no Redux/Zustand)
- localStorage integration via wrapper library

### Progress Persistence
**lookie** (localStorage wrapper)
- Type-safe localStorage operations
- Key pattern: `lesson.{lessonKey}`
- Stores `currentStep` and `lastStep` per lesson

### Additional Libraries
- **react-hot-toast** - Toast notifications
- **canvas-confetti** - Celebration animations on completion
- **copy-to-clipboard** - Copy commands/snippets
- **lodash** - Utility functions (for validation logic)

### Deployment
**Vercel** (recommended) or **Netlify**
- Optimized for Next.js
- Automatic deployments from Git
- Free tier available
- Custom domain support
- **Alternative**: Can export to static and use GitHub Pages

---

## Project Structure

Following RegexLearn's architecture:

```
linuxlearn/
├── public/
│   ├── favicon.ico
│   └── images/                    # Static assets
├── src/
│   ├── pages/
│   │   ├── _app.tsx               # App wrapper, global providers
│   │   ├── _document.tsx          # HTML document structure
│   │   ├── 404.tsx                # 404 page
│   │   └── [lang]/                # Localized routes
│   │       ├── index.tsx          # Landing page
│   │       ├── learn/
│   │       │   ├── index.tsx      # Lesson catalog
│   │       │   └── [lesson].tsx   # Individual lesson page
│   │       └── cheatsheet.tsx     # Command reference (future)
│   │
│   ├── components/
│   │   ├── InteractiveTerminal.tsx    # Main terminal input/validation
│   │   ├── Step.tsx                   # Lesson step layout wrapper
│   │   ├── LearnProgress.tsx          # Sidebar with step list
│   │   ├── LearnFooter.tsx            # Prev/Next navigation
│   │   ├── TerminalOutput.tsx         # Command output display
│   │   ├── Header.tsx                 # App header/nav
│   │   └── landing/                   # Landing page components
│   │       ├── Hero.tsx
│   │       └── Features.tsx
│   │
│   ├── context/
│   │   └── InteractiveTerminalContext.tsx  # Lesson state management
│   │
│   ├── engine/
│   │   ├── filesystem.ts          # Virtual filesystem class
│   │   ├── commandExecutor.ts     # Execute commands on virtual FS
│   │   └── commands/              # Individual command implementations
│   │       ├── pwd.ts
│   │       ├── ls.ts
│   │       ├── cd.ts
│   │       ├── mkdir.ts
│   │       ├── touch.ts
│   │       ├── cat.ts
│   │       ├── echo.ts
│   │       ├── rm.ts
│   │       └── index.ts           # Command registry
│   │
│   ├── data/
│   │   └── lessons/
│   │       ├── index.json         # Lesson catalog
│   │       ├── basics.ts          # Basic commands lesson
│   │       ├── navigation.ts      # Navigation lesson
│   │       └── fileops.ts         # File operations lesson
│   │
│   ├── localization/              # i18n (future expansion)
│   │   ├── index.ts               # Locale config
│   │   └── en/
│   │       ├── general.json
│   │       ├── learn.json
│   │       └── lessons.json
│   │
│   ├── utils/
│   │   ├── checkCommand.ts        # Command validation logic
│   │   ├── storage.ts             # localStorage wrapper (lookie)
│   │   └── commandParser.ts       # Parse command strings
│   │
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   │
│   └── styles/
│       └── globals.css            # Global styles + Tailwind
│
├── .github/
│   └── workflows/
│       └── deploy.yml             # CI/CD (Vercel auto-deploys)
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## Core Data Structures

### Lesson Catalog (`src/data/lessons/index.json`)

Following RegexLearn's pattern:

```json
[
  {
    "key": "basics",
    "slug": "basic-commands",
    "stepCount": 8
  },
  {
    "key": "navigation",
    "slug": "navigation-and-paths",
    "stepCount": 6
  },
  {
    "key": "fileops",
    "slug": "file-operations",
    "stepCount": 8
  }
]
```

### Lesson Step Data (`src/data/lessons/basics.ts`)

Following RegexLearn's step structure:

```typescript
export interface StepData {
  title: string;                    // i18n key or direct text
  description: string;              // i18n key or direct text
  content: string;                  // Terminal content/scenario
  expectedCommand: string[];        // Accepted command variations
  expectedOutput?: string;          // Expected output (if validating output)
  initialFS: FileSystemTree;        // Initial filesystem state
  initialCwd: string;               // Starting directory
  interactive: boolean;             // Is this an interactive step?
  readOnly?: boolean;               // Can user edit terminal?
  hint?: string;                    // Hint text
  customValidate?: (command: string, output: string, fs: VirtualFS) => boolean;
}

// Example lesson file
export default [
  {
    title: "Your First Command: pwd",
    description: "Learn to print your current working directory",
    content: "",                    // No pre-filled content for first step
    expectedCommand: ["pwd"],
    expectedOutput: "/home/user",
    initialFS: {
      "/": {
        "home": {
          "user": {
            "documents": {},
            "downloads": {}
          }
        }
      }
    },
    initialCwd: "/home/user",
    interactive: true,
    hint: "pwd stands for 'print working directory'"
  },
  {
    title: "List Files with ls",
    description: "See what files are in your current directory",
    content: "",
    expectedCommand: ["ls", "ls ."],
    initialFS: {
      "/": {
        "home": {
          "user": {
            "documents": {},
            "file.txt": { type: "file", content: "Hello" }
          }
        }
      }
    },
    initialCwd: "/home/user",
    interactive: true,
    hint: "Type 'ls' to list files"
  }
  // ... more steps
]
```

### Virtual Filesystem Structure

```javascript
{
  tree: {
    "/": {
      type: "dir",
      children: {
        "home": {
          type: "dir",
          children: {
            "user": {
              type: "dir",
              children: {
                "file.txt": {
                  type: "file",
                  content: "Hello World",
                  permissions: "rw-r--r--"
                }
              }
            }
          }
        }
      }
    }
  },
  cwd: "/home/user",
  history: []
}
```

### Progress Tracking (localStorage)

```javascript
{
  completedLessons: [1, 2, 3],
  currentLesson: 4,
  lastVisited: "2026-03-31T10:30:00Z",
  stats: {
    totalCommands: 45,
    correctFirstTry: 38
  }
}
```

---

## Command Validation Strategy

Following RegexLearn's `checkRegex.ts` pattern with `checkCommand.ts`:

### Validation Flow

```
User types command in terminal
     ↓
On Enter key press
     ↓
checkCommand(userCommand, stepData, filesystem)
     ↓
1. Parse command string → { command, flags, args }
     ↓
2. Execute on virtual filesystem → { output, error }
     ↓
3. Validate command string (is it in expectedCommand[]?)
     ↓
4. Validate output (matches expectedOutput?)
     ↓
5. Run customValidate if provided
     ↓
Return { isSuccess, output, error }
     ↓
Update context: success, error, output
     ↓
Display feedback + enable/disable Next button
```

### Validation Logic (`utils/checkCommand.ts`)

```typescript
interface ValidationResult {
  isSuccess: boolean;
  output: string;
  error?: string;
}

function checkCommand(
  userCommand: string,
  stepData: StepData,
  filesystem: VirtualFilesystem
): ValidationResult {
  // 1. Parse command
  const parsed = parseCommand(userCommand);
  
  // 2. Execute on virtual filesystem
  const { output, error } = executeCommand(parsed, filesystem);
  
  if (error) {
    return { isSuccess: false, output: "", error };
  }
  
  // 3. Validate command string (accept multiple variations)
  const commandMatch = stepData.expectedCommand.some(cmd => 
    normalizeCommand(cmd) === normalizeCommand(userCommand)
  );
  
  // 4. Validate output (if specified)
  const outputMatch = stepData.expectedOutput 
    ? output.trim() === stepData.expectedOutput.trim()
    : true;
  
  // 5. Custom validation (for complex scenarios)
  const customMatch = stepData.customValidate
    ? stepData.customValidate(userCommand, output, filesystem)
    : true;
  
  const isSuccess = commandMatch && outputMatch && customMatch;
  
  return { isSuccess, output };
}
```

### Flexible Validation Examples

**Example 1: Multiple valid commands**
```typescript
{
  title: "Create a file named 'test.txt'",
  expectedCommand: [
    "touch test.txt",
    "touch ./test.txt",
    "touch /home/user/test.txt"
  ],
  customValidate: (cmd, output, fs) => {
    // Result-based: check if file exists
    return fs.exists("/home/user/test.txt");
  }
}
```

**Example 2: Flag order doesn't matter**
```typescript
{
  title: "List all files in long format",
  expectedCommand: ["ls -la", "ls -al", "ls -a -l", "ls -l -a"],
  customValidate: (cmd, output, fs) => {
    // Check output format and content
    return output.includes("drwx") && output.includes(".");
  }
}
```

**Example 3: Output-based validation**
```typescript
{
  title: "Navigate to the home directory",
  expectedCommand: ["cd ~", "cd /home/user"],
  customValidate: (cmd, output, fs) => {
    // Check filesystem state after command
    return fs.getCwd() === "/home/user";
  }
}
```

### Command Parser (`utils/commandParser.ts`)

```typescript
interface ParsedCommand {
  command: string;
  flags: Record<string, boolean>;  // e.g., { l: true, a: true }
  args: string[];
  raw: string;
}

function parseCommand(input: string): ParsedCommand {
  // Tokenize: "ls -la /home" → ["ls", "-la", "/home"]
  // Extract flags: -la → { l: true, a: true }
  // Separate args from flags
  // Handle quoted strings: echo "hello world"
  // Handle redirects: echo "text" > file.txt
}
```

### Commands to Implement (MVP)

**Tier 1 - Essential (8 commands)**
1. `pwd` - Print working directory
2. `ls` - List directory contents (with `-l`, `-a` flags)
3. `cd` - Change directory (with `.`, `..`, `~`, `-` support)
4. `mkdir` - Create directory (with `-p` flag)
5. `touch` - Create empty file
6. `cat` - Display file contents
7. `echo` - Print text (with `>` and `>>` redirect)
8. `rm` - Remove files/directories (with `-r`, `-f` flags)

**Tier 2 - Nice to Have**
- `cp` - Copy files
- `mv` - Move/rename
- `clear` - Clear terminal
- `help` - List available commands

---

## User Experience Flow

### First-Time User Journey

1. **Landing Page**
   - Hero section: "Learn Linux Commands Interactively"
   - "Start Learning" button
   - Brief explanation of what they'll learn

2. **Lesson Interface**
   - Left panel: Lesson instructions (30% width)
   - Right panel: Terminal emulator (70% width)
   - Progress bar at top
   - Current step highlighted

3. **Lesson Progression**
   - User reads instruction
   - Types command in terminal
   - Immediate validation feedback
   - Success → Next step
   - Error → Helpful hint

4. **Completion**
   - Celebration message
   - Progress saved automatically
   - "Next Lesson" button

### Returning User Journey

1. Load progress from localStorage
2. Show completed lessons (checkmarks)
3. Resume from last incomplete lesson
4. Option to restart any lesson

---

## Lesson Content Structure (MVP)

### Module 1: Getting Started
1. **Lesson 1**: Introduction to pwd
2. **Lesson 2**: Listing files with ls
3. **Lesson 3**: Understanding ls flags (-l, -a)

### Module 2: Navigation
4. **Lesson 4**: Changing directories with cd
5. **Lesson 5**: Relative vs absolute paths
6. **Lesson 6**: Special directories (., .., ~)

### Module 3: File Operations
7. **Lesson 7**: Creating directories (mkdir)
8. **Lesson 8**: Creating files (touch)
9. **Lesson 9**: Viewing files (cat)
10. **Lesson 10**: Writing to files (echo >)

### Module 4: File Management
11. **Lesson 11**: Removing files (rm)
12. **Lesson 12**: Removing directories (rm -r)

---

## Virtual Filesystem Implementation

### Core Operations (`src/engine/filesystem.ts`)

```typescript
interface FSNode {
  type: 'file' | 'dir';
  content?: string;        // For files
  children?: Record<string, FSNode>;  // For directories
  permissions?: string;    // e.g., "rw-r--r--"
}

interface FileSystemTree {
  [key: string]: FSNode | FileSystemTree;
}

class VirtualFilesystem {
  private tree: FileSystemTree;
  private cwd: string;
  private prevCwd: string;  // For 'cd -'
  
  constructor(initialTree: FileSystemTree, initialCwd: string = "/home/user") {
    this.tree = initialTree;
    this.cwd = initialCwd;
    this.prevCwd = initialCwd;
  }
  
  // Core operations
  resolvePath(path: string): string { }      // Normalize to absolute path
  getNode(path: string): FSNode | null { }   // Get node at path
  exists(path: string): boolean { }          // Check if path exists
  isDirectory(path: string): boolean { }     // Check if directory
  isFile(path: string): boolean { }          // Check if file
  
  // Directory operations
  mkdir(path: string, recursive?: boolean): void { }
  ls(path: string, flags?: { l?: boolean; a?: boolean }): string { }
  cd(path: string): { success: boolean; error?: string } { }
  
  // File operations
  touch(path: string): void { }
  cat(path: string): string { }
  writeFile(path: string, content: string, append?: boolean): void { }
  rm(path: string, recursive?: boolean): void { }
  
  // State getters
  pwd(): string { return this.cwd; }
  getCwd(): string { return this.cwd; }
  getTree(): FileSystemTree { return this.tree; }
  
  // Clone for immutability (if needed)
  clone(): VirtualFilesystem { }
}
```

### Path Resolution Rules

- **Absolute paths**: Start with `/` (e.g., `/home/user/file.txt`)
- **Relative paths**: Relative to `cwd` (e.g., `documents/file.txt`)
- **Special paths**:
  - `.` = current directory
  - `..` = parent directory
  - `~` = home directory (`/home/user`)
  - `-` = previous directory (for `cd -`)
- **Path normalization**: Remove redundant `/`, resolve `.` and `..`

---

## Command Validation Strategy

Following RegexLearn's `checkRegex.ts` pattern with `checkCommand.ts`:

### Validation Logic (`utils/checkCommand.ts`)

```typescript
interface ValidationResult {
  isSuccess: boolean;
  output: string;
  error?: string;
  match?: string[];
}

function checkCommand(
  userCommand: string,
  stepData: StepData,
  filesystem: VirtualFS
): ValidationResult {
  // 1. Parse command
  const parsed = parseCommand(userCommand);
  
  // 2. Execute on virtual filesystem
  const { output, error } = executeCommand(parsed, filesystem);
  
  if (error) {
    return { isSuccess: false, output, error };
  }
  
  // 3. Validate command string (multiple accepted variations)
  const commandMatch = stepData.expectedCommand.includes(userCommand.trim());
  
  // 4. Validate output (if specified)
  const outputMatch = stepData.expectedOutput 
    ? output.trim() === stepData.expectedOutput
    : true;
  
  // 5. Custom validation (for complex scenarios)
  const customMatch = stepData.customValidate
    ? stepData.customValidate(userCommand, output, filesystem)
    : true;
  
  const isSuccess = commandMatch && outputMatch && customMatch;
  
  return { isSuccess, output, match: output.split('\n') };
}
```

### Flexible Validation Examples

**Example 1: Multiple valid commands**
```typescript
{
  title: "Create a file named 'test.txt'",
  expectedCommand: [
    "touch test.txt",
    "touch ./test.txt",
    "touch /home/user/test.txt"
  ],
  customValidate: (cmd, output, fs) => {
    // Check if file exists after command (result-based)
    return fs.fileExists("/home/user/test.txt");
  }
}
```

**Example 2: Flag order doesn't matter**
```typescript
{
  title: "List all files including hidden ones",
  expectedCommand: ["ls -la", "ls -al", "ls -a -l", "ls -l -a"],
  customValidate: (cmd, output, fs) => {
    // Check output contains hidden files
    return output.includes(".") && output.includes("..");
  }
}
```

### Error Messages

Provide helpful feedback (similar to RegexLearn's hints):
- Command not found → "bash: {command}: command not found"
- Wrong directory → "You're in /home, but the file is in /home/user"
- Missing flag → "Almost! Try adding the -l flag to see more details"
- Syntax error → "Invalid syntax. Try: mkdir dirname"

---

## UI/UX Design Principles

### Modern Dark Theme
- Background: Dark gray/black (`#0f172a`, `#1e293b`)
- Terminal: Slightly lighter (`#1e293b`)
- Text: Light gray/white (`#e2e8f0`, `#f1f5f9`)
- Accents: Blue/cyan for success (`#3b82f6`, `#06b6d4`)
- Errors: Red/orange (`#ef4444`, `#f97316`)

### Typography
- Monospace for terminal: `'Fira Code'`, `'JetBrains Mono'`, or `'Consolas'`
- Sans-serif for UI: `'Inter'`, `'System UI'`

### Layout
- Responsive design (mobile-friendly)
- Split-panel layout on desktop
- Stacked layout on mobile
- Smooth transitions between steps

### Feedback
- Instant visual feedback on command execution
- Success: Green checkmark + encouraging message
- Error: Red X + helpful hint
- Progress: Visual progress bar

---

## Technical Implementation Details

### Virtual Filesystem

**In-Memory Tree Structure:**
- JavaScript object representing directory tree
- Each node has `type` (file/dir), `children`, `content`
- Operations modify tree in-place
- Reset to initial state per lesson

**Performance Considerations:**
- Small filesystem (< 100 nodes for MVP)
- No persistence needed between lessons
- Fast operations (all in-memory)

### Command Execution

**Parser Pipeline:**
1. Tokenize input string
2. Extract command, flags, arguments
3. Validate command exists
4. Execute command function
5. Return output string
6. Update filesystem state

**Example:**
```javascript
// Input: "ls -la /home"
const parsed = {
  command: "ls",
  flags: { l: true, a: true },
  args: ["/home"]
};

const output = executeCommand(parsed, filesystem);
// Output: "drwxr-xr-x  3 user user 4096 Mar 31 10:30 .\ndrwxr-xr-x  5 root root 4096 Mar 31 10:00 ..\n..."
```

### Progress Tracking

Following RegexLearn's pattern with per-lesson keys:

**localStorage Schema:**
```typescript
// Key: "lesson.basics"
{
  currentStep: 3,
  lastStep: 5      // Furthest step reached (allows jumping back)
}

// Key: "lesson.navigation"
{
  currentStep: 0,
  lastStep: 2
}
```

**Persistence Strategy:**
- Each lesson has its own localStorage key: `lesson.{lessonKey}`
- Save after each successful step completion
- `lastStep` tracks furthest progress (enables jumping to completed steps)
- `currentStep` tracks where user currently is
- Load on lesson page mount via `useEffect`
- Graceful fallback if corrupted or missing

---

## Commands Implementation (MVP)

### Tier 1 - Essential Commands

#### 1. `pwd`
- **Function**: Print working directory
- **Flags**: None
- **Output**: Current directory path
- **Example**: `pwd` → `/home/user`

#### 2. `ls`
- **Function**: List directory contents
- **Flags**: `-l` (long format), `-a` (show hidden)
- **Output**: File/directory names
- **Example**: `ls -la` → detailed listing with permissions

#### 3. `cd`
- **Function**: Change directory
- **Flags**: None
- **Args**: Target directory path
- **Example**: `cd /home` → changes cwd to `/home`

#### 4. `mkdir`
- **Function**: Create directory
- **Flags**: `-p` (create parent dirs)
- **Args**: Directory name/path
- **Example**: `mkdir projects` → creates `projects` dir

#### 5. `touch`
- **Function**: Create empty file
- **Flags**: None
- **Args**: File name/path
- **Example**: `touch file.txt` → creates empty file

#### 6. `cat`
- **Function**: Display file contents
- **Flags**: None
- **Args**: File path
- **Example**: `cat file.txt` → shows file content

#### 7. `echo`
- **Function**: Print text
- **Flags**: None
- **Args**: Text to print
- **Redirect**: `>` (write), `>>` (append)
- **Example**: `echo "hello" > file.txt` → writes to file

#### 8. `rm`
- **Function**: Remove files/directories
- **Flags**: `-r` (recursive), `-f` (force)
- **Args**: File/directory path
- **Example**: `rm -r folder` → removes directory

---

## Lesson Design Principles

### Progressive Learning
1. Start with read-only commands (`pwd`, `ls`)
2. Introduce navigation (`cd`)
3. Add creation commands (`mkdir`, `touch`)
4. Teach content manipulation (`cat`, `echo`)
5. Cover deletion (`rm`)

### Each Lesson Should:
- Focus on ONE command or concept
- Provide clear, concise instructions
- Include 3-5 steps
- Build on previous lessons
- Validate both command AND result
- Provide helpful hints
- Celebrate success

### Example Lesson Flow

**Lesson 1: pwd**
- Step 1: "Type `pwd` to see where you are"
- Step 2: "Great! You're in `/home/user`. Type `pwd` again to confirm."
- Lesson complete!

**Lesson 2: ls**
- Step 1: "Type `ls` to see what's in this directory"
- Step 2: "Now try `ls -l` to see more details"
- Step 3: "Use `ls -a` to see hidden files"

---

## State Management (Following RegexLearn's Pattern)

### InteractiveTerminalContext

Main context provider that manages lesson state:

```typescript
interface TerminalContextState {
  // Step navigation
  step: number;              // Current step index
  lastStep: number;          // Furthest step reached
  
  // Validation state
  success: boolean;          // Is current step solved?
  error: string | null;      // Error message
  lockError: boolean;        // Throttle error display
  
  // Terminal state
  output: string[];          // Terminal output lines
  filesystem: VirtualFilesystem;  // Current FS state
  
  // Actions
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  executeCommand: (cmd: string) => void;
  resetLesson: () => void;
}
```

### Context Provider Pattern

```typescript
// src/context/InteractiveTerminalContext.tsx
export function InteractiveTerminalProvider({ 
  children, 
  lessonData,
  lessonKey 
}) {
  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [filesystem, setFilesystem] = useState(null);
  
  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = lookie.get(`lesson.${lessonKey}`);
    if (saved) {
      setStep(saved.currentStep);
      setLastStep(saved.lastStep);
    }
    
    // Initialize filesystem for current step
    const stepData = lessonData[step];
    setFilesystem(new VirtualFilesystem(
      stepData.initialFS,
      stepData.initialCwd
    ));
  }, [lessonKey]);
  
  // Save progress when step advances
  useEffect(() => {
    if (success && step > lastStep) {
      const newLastStep = step;
      setLastStep(newLastStep);
      lookie.set(`lesson.${lessonKey}`, {
        currentStep: step,
        lastStep: newLastStep
      });
    }
  }, [success, step]);
  
  const executeCommand = (userCommand: string) => {
    const stepData = lessonData[step];
    const result = checkCommand(userCommand, stepData, filesystem);
    
    setSuccess(result.isSuccess);
    setError(result.error);
    
    // Add output to terminal
    setOutput(prev => [...prev, `$ ${userCommand}`, result.output]);
  };
  
  // ... nextStep, prevStep, etc.
  
  return (
    <TerminalContext.Provider value={{ ... }}>
      {children}
    </TerminalContext.Provider>
  );
}
```

### Page-Level Integration

```typescript
// src/pages/[lang]/learn/[lesson].tsx
export default function LessonPage({ lesson, lessonData }) {
  return (
    <InteractiveTerminalProvider 
      lessonData={lessonData}
      lessonKey={lesson.key}
    >
      <div className="flex">
        <LearnProgress />
        <Step />
        <LearnFooter />
      </div>
    </InteractiveTerminalProvider>
  );
}

export async function getStaticProps({ params }) {
  const lesson = lessons.find(l => l.slug === params.lesson);
  const lessonData = await import(`@/data/lessons/${lesson.key}`);
  return { props: { lesson, lessonData: lessonData.default } };
}

export async function getStaticPaths() {
  // Generate paths for all lessons
  const paths = lessons.map(lesson => ({
    params: { lang: 'en', lesson: lesson.slug }
  }));
  return { paths, fallback: false };
}
```

---

## Component Architecture

### Key Components (Following RegexLearn's Pattern)

#### 1. InteractiveTerminal Component

Main terminal UI where users type commands:

```typescript
// src/components/InteractiveTerminal.tsx
export function InteractiveTerminal() {
  const { 
    step, 
    success, 
    error, 
    executeCommand, 
    output 
  } = useTerminalContext();
  
  const [input, setInput] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };
  
  return (
    <div className="terminal-container">
      <TerminalOutput lines={output} />
      <form onSubmit={handleSubmit}>
        <span className="prompt">$ </span>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={success || readOnly}
        />
      </form>
      {error && <ErrorMessage text={error} />}
      {success && <SuccessMessage />}
    </div>
  );
}
```

#### 2. Step Component

Wraps lesson content and terminal:

```typescript
// src/components/Step.tsx
export function Step() {
  const { step, lessonData } = useTerminalContext();
  const currentStep = lessonData[step];
  
  return (
    <div className="lesson-layout">
      <aside className="instruction-panel">
        <h2>{currentStep.title}</h2>
        <p>{currentStep.description}</p>
        {currentStep.hint && <Hint text={currentStep.hint} />}
      </aside>
      
      <main className="terminal-panel">
        <InteractiveTerminal />
      </main>
    </div>
  );
}
```

#### 3. LearnProgress Component

Sidebar showing all steps:

```typescript
// src/components/LearnProgress.tsx
export function LearnProgress() {
  const { step, lastStep, setStep, lessonData } = useTerminalContext();
  
  return (
    <nav className="progress-sidebar">
      {lessonData.map((stepData, index) => (
        <button
          key={index}
          onClick={() => index <= lastStep && setStep(index)}
          disabled={index > lastStep}
          className={cn(
            index === step && "active",
            index <= lastStep && "completed"
          )}
        >
          {index <= lastStep && <CheckIcon />}
          <span>Step {index + 1}</span>
        </button>
      ))}
    </nav>
  );
}
```

#### 4. LearnFooter Component

Navigation controls:

```typescript
// src/components/LearnFooter.tsx
export function LearnFooter() {
  const { step, lastStep, nextStep, prevStep, success } = useTerminalContext();
  
  // Keyboard shortcuts (Enter for next, Shift+Enter for prev)
  useEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      prevStep();
    } else if (e.key === 'Enter' && success) {
      nextStep();
    }
  });
  
  return (
    <footer className="lesson-footer">
      <button onClick={prevStep} disabled={step === 0}>
        Previous
      </button>
      <span>{step + 1} / {lessonData.length}</span>
      <button onClick={nextStep} disabled={!success}>
        Next
      </button>
    </footer>
  );
}
```

---

## Routing Structure

Following Next.js Pages Router pattern:

```
Routes:
/                          → Landing page (redirect to /en)
/en                        → English landing page
/en/learn                  → Lesson catalog page
/en/learn/basic-commands   → Lesson page (basics)
/en/learn/navigation       → Lesson page (navigation)
/en/learn/file-operations  → Lesson page (fileops)
/en/cheatsheet            → Command reference (future)
```

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  
  // Rewrites for cleaner URLs (optional)
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/en'
      },
      {
        source: '/learn',
        destination: '/en/learn'
      },
      {
        source: '/learn/:lesson*',
        destination: '/en/learn/:lesson*'
      }
    ];
  },
  
  // For static export (GitHub Pages)
  // output: 'export',
  // images: { unoptimized: true }
}
```

## Deployment Strategy

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero configuration
- Automatic deployments from GitHub
- Optimized for Next.js
- Free tier generous
- Preview deployments for PRs

**Setup:**
1. Push code to GitHub
2. Import repo in Vercel
3. Auto-deploys on push to main
4. Access at `https://linuxlearn.vercel.app`

### Option 2: Netlify

**Advantages:**
- Similar to Vercel
- Good Next.js support
- Free tier

**Setup:**
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Auto-deploys

### Option 3: Static Export to GitHub Pages

**Configuration:**
```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/linuxlearn'  // Your repo name
}
```

**Build:**
```bash
npm run build
# Generates static files in out/
```

**GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## Development Phases

### Phase 1: Core Engine (Foundation)
- [ ] Virtual filesystem implementation
- [ ] Command parser
- [ ] Basic command implementations (pwd, ls, cd)
- [ ] Unit tests for core engine

### Phase 2: UI Components
- [ ] Terminal component with xterm.js
- [ ] Lesson panel component
- [ ] Progress bar component
- [ ] Layout and styling

### Phase 3: Lesson Content
- [ ] Write 10-12 basic lessons
- [ ] Define validation logic
- [ ] Add hints and feedback messages

### Phase 4: Integration
- [ ] Connect UI to engine
- [ ] Implement lesson flow
- [ ] Add progress tracking
- [ ] localStorage integration

### Phase 5: Polish & Deploy
- [ ] Error handling
- [ ] Responsive design
- [ ] Performance optimization
- [ ] GitHub Pages deployment
- [ ] README and documentation

---

## Technical Challenges & Solutions

### Challenge 1: Path Resolution
**Problem**: Handling relative paths, `.`, `..`, `~`
**Solution**: Implement robust path resolver that normalizes all paths to absolute

### Challenge 2: Command Validation
**Problem**: Users might type commands in different valid ways
**Solution**: Validate based on result/state, not exact command match

### Challenge 3: Filesystem State
**Problem**: Maintaining consistent FS state across commands
**Solution**: Immutable updates or careful state management with React

### Challenge 4: Terminal UX
**Problem**: Making simulated terminal feel real
**Solution**: Use xterm.js for authentic look/feel, implement command history (↑/↓)

### Challenge 5: Mobile Experience
**Problem**: Terminal input on mobile keyboards
**Solution**: Responsive layout, larger touch targets, on-screen keyboard optimization

---

## Future Enhancements (Post-MVP)

### Features
- **Cheatsheet**: Quick reference for all commands
- **Playground**: Free-form terminal practice
- **Practice Mode**: Challenges and exercises
- **Achievements**: Gamification elements
- **Sharing**: Share progress/achievements

### Technical
- **More Commands**: grep, find, sed, awk, pipes
- **Advanced Topics**: Permissions, users, processes
- **Vim Tutorial**: Integrated vim learning
- **Scripting**: Bash script lessons
- **Real Terminal**: Optional Docker container backend

### Content
- **Multiple Tracks**: Beginner, Intermediate, Advanced
- **Specialized Paths**: DevOps, SysAdmin, Developer
- **Challenges**: Timed challenges, puzzles
- **Community**: User-contributed lessons

---

## Performance Considerations

### Optimization Strategies
- Lazy load lessons (code splitting)
- Minimize bundle size
- Use React.memo for expensive components
- Debounce command validation
- Virtual scrolling for long terminal output

### Bundle Size Targets
- Initial load: < 200KB (gzipped)
- Per-lesson: < 10KB
- Total app: < 500KB

---

## Testing Strategy

### Unit Tests
- Filesystem operations
- Command parser
- Individual command implementations
- Path resolution

### Integration Tests
- Lesson flow
- Progress tracking
- localStorage persistence

### Manual Testing
- Complete each lesson as a user
- Test on multiple browsers
- Mobile responsiveness
- Keyboard navigation

---

## Success Metrics (Post-Launch)

- Lesson completion rate
- Time per lesson
- Error rate per command
- User retention (returning visitors)
- Most difficult lessons (high error rate)

---

## Dependencies

Following RegexLearn's dependency choices:

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "next": "^14.2.0",
    "@headlessui/react": "^2.0.0",
    "clsx": "^2.1.0",
    "lookie": "^1.1.0",
    "react-hot-toast": "^2.4.1",
    "canvas-confetti": "^1.9.3",
    "copy-to-clipboard": "^3.3.3",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/lodash": "^4.17.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/forms": "^0.5.7",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

**Key Libraries Explained:**

- **lookie**: Type-safe localStorage wrapper (same as RegexLearn)
- **@headlessui/react**: Accessible UI components (modals, menus)
- **clsx**: Conditional className utility
- **react-hot-toast**: Toast notifications for feedback
- **canvas-confetti**: Celebration animation on lesson completion
- **lodash**: Utility functions (for validation, array operations)

---

## Getting Started

### Setup Commands

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest linuxlearn --typescript --tailwind --app false --src-dir --import-alias "@/*"

# Navigate to project
cd linuxlearn

# Install additional dependencies
npm install @headlessui/react clsx lookie react-hot-toast canvas-confetti copy-to-clipboard lodash

# Install dev dependencies
npm install -D @types/lodash @tailwindcss/forms

# Start development server
npm run dev

# Build for production
npm run build

# Start production server (for testing)
npm start

# Export as static site (for GitHub Pages)
# First, update next.config.js with output: 'export'
npm run build
# Static files will be in ./out/
```

### Initial Configuration

**1. Tailwind Config** (`tailwind.config.js`):
```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0f172a',
          text: '#e2e8f0',
          prompt: '#06b6d4',
          success: '#10b981',
          error: '#ef4444',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

**2. TypeScript Config** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## Key Implementation Insights from RegexLearn

### 1. Data-Driven Architecture
- **Lesson content is pure data** (TypeScript/JavaScript files)
- **UI components are generic** and reusable across all lessons
- Easy to add new lessons without touching component code
- Separation of concerns: data vs presentation

### 2. Context-Based State Management
- Single `InteractiveTerminalContext` manages all lesson state
- Components consume context via hooks
- Centralized validation and progression logic
- Clean component interfaces

### 3. Progressive Disclosure
- Users cannot skip ahead (`step <= lastStep`)
- Can jump back to any completed step
- Clear visual feedback (checkmarks, disabled states)
- Keyboard shortcuts for power users

### 4. Validation Flexibility
- Multiple accepted command variations per step
- Custom validation functions for complex scenarios
- Validates both command syntax AND results
- Helpful error messages guide users

### 5. Performance Optimization
- Pre-rendered pages (SSG) load instantly
- Lesson data code-split per route
- No API calls during lesson flow
- Lightweight client-side operations

---

## Differences from RegexLearn

### What We Keep
- Next.js with SSG
- React Context for state
- localStorage for progress (per-lesson keys)
- Data-driven lesson structure
- Component architecture
- TypeScript
- Tailwind CSS

### What We Adapt
- **Terminal UI** instead of regex input field
- **Virtual filesystem** instead of regex matching
- **Command execution** instead of regex validation
- **Multi-line output** instead of highlighted matches
- **Filesystem state** persists across steps within a lesson

### What We Simplify (for MVP)
- **Single language** (English only, no i18n initially)
- **No playground** (just lessons)
- **No cheatsheet** (can add later)
- **No video support** (can add later)
- **No sharing feature** (no external API)

---

## Conclusion

This design follows RegexLearn's proven architecture while adapting it for Linux command learning. The Next.js + SSG approach provides:

**Key Strengths:**
- Proven architecture (RegexLearn has 4k+ GitHub stars)
- No backend complexity for core features
- Fast, pre-rendered pages
- Scalable lesson system
- Easy to extend with new commands/lessons
- Free hosting options (Vercel/Netlify/GitHub Pages)

**Development Path:**
1. Initialize Next.js project with TypeScript + Tailwind
2. Implement virtual filesystem engine
3. Build command parser and executor
4. Create core commands (pwd, ls, cd, etc.)
5. Build InteractiveTerminal context and components
6. Create lesson pages with routing
7. Write initial lesson content (10-12 lessons)
8. Add progress tracking with localStorage
9. Style with modern dark theme
10. Deploy to Vercel or GitHub Pages

**Estimated Timeline:**
- Core engine: 2-3 days
- UI components: 2 days
- Lesson content: 1 day
- Integration & polish: 1-2 days
- **Total: ~1 week for solid MVP**
