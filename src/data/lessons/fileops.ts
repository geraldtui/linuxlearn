import { StepData } from '@/types';

const fileops: StepData[] = [
  {
    title: "Create a Directory",
    description: "The 'mkdir' command creates a new directory. Try creating a directory called 'projects'.",
    interactive: true,
    expectedCommand: ["mkdir projects"],
    hint: "Type: mkdir projects",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {}
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return fs.exists("/home/user/projects") && fs.isDirectory("/home/user/projects");
    }
  },
  {
    title: "Create Nested Directories",
    description: "Use 'mkdir -p' to create nested directories all at once. Create 'projects/web/frontend' with a single command.",
    interactive: true,
    expectedCommand: ["mkdir -p projects/web/frontend"],
    hint: "Type: mkdir -p projects/web/frontend",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {}
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return fs.exists("/home/user/projects/web/frontend");
    }
  },
  {
    title: "Create a File",
    description: "The 'touch' command creates an empty file. Create a file called 'README.md'.",
    interactive: true,
    expectedCommand: ["touch README.md"],
    hint: "Type: touch README.md",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "projects": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return fs.exists("/home/user/README.md") && fs.isFile("/home/user/README.md");
    }
  },
  {
    title: "View File Contents",
    description: "The 'cat' command displays the contents of a file. View the contents of 'welcome.txt'.",
    interactive: true,
    expectedCommand: ["cat welcome.txt"],
    expectedOutput: "Welcome to Linux!",
    hint: "Type: cat welcome.txt",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "welcome.txt": { type: "file", content: "Welcome to Linux!" }
            }
          }
        }
      }
    },
    initialCwd: "/home/user"
  },
  {
    title: "Write to a File",
    description: "Use 'echo' with '>' to write text to a file. Write 'Hello Linux' to a file called 'greeting.txt'.",
    interactive: true,
    expectedCommand: ["echo Hello Linux > greeting.txt"],
    hint: "Type: echo Hello Linux > greeting.txt",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {}
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return fs.exists("/home/user/greeting.txt") && 
             fs.cat("/home/user/greeting.txt").includes("Hello Linux");
    }
  },
  {
    title: "Append to a File",
    description: "Use '>>' to append text to a file without overwriting it. Append 'Second line' to greeting.txt.",
    interactive: true,
    expectedCommand: ["echo Second line >> greeting.txt"],
    hint: "Type: echo Second line >> greeting.txt",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "greeting.txt": { type: "file", content: "Hello Linux\n" }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      const content = fs.cat("/home/user/greeting.txt");
      return content.includes("Hello Linux") && content.includes("Second line");
    }
  },
  {
    title: "View Updated File",
    description: "Let's verify the file was updated. Use 'cat' to view greeting.txt again.",
    interactive: true,
    expectedCommand: ["cat greeting.txt"],
    hint: "Type: cat greeting.txt",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "greeting.txt": { type: "file", content: "Hello Linux\nSecond line\n" }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return output.includes("Hello Linux") && output.includes("Second line");
    }
  },
  {
    title: "Remove a File",
    description: "The 'rm' command removes files. Delete the greeting.txt file.",
    interactive: true,
    expectedCommand: ["rm greeting.txt"],
    hint: "Type: rm greeting.txt",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "greeting.txt": { type: "file", content: "Hello Linux\n" },
              "documents": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return !fs.exists("/home/user/greeting.txt");
    }
  },
  {
    title: "Try Removing a Directory",
    description: "Try removing the 'documents' directory with just 'rm documents'. You'll see an error - directories need special handling!",
    interactive: true,
    expectedCommand: ["rm documents"],
    hint: "Type: rm documents",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return fs.exists("/home/user/documents");
    }
  },
  {
    title: "Remove a Directory Recursively",
    description: "To remove a directory and its contents, use 'rm -r'. Now remove the documents directory properly.",
    interactive: true,
    expectedCommand: ["rm -r documents"],
    hint: "Type: rm -r documents",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": {
                type: "dir",
                children: {
                  "file.txt": { type: "file", content: "test" }
                }
              }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return !fs.exists("/home/user/documents");
    }
  }
];

export default fileops;
