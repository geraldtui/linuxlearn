import { StepData } from '@/types';

const fileops: StepData[] = [
  {
    title: "Create a Directory",
    description: "The 'mkdir' command creates a new directory. Use it to create a directory called 'projects'.",
    interactive: true,
    expectedCommand: ["mkdir projects"],
    hint: "Use the command that 'makes a directory' followed by the name",
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
    description: "The 'mkdir' command has a flag that lets you create nested directories all at once. Create the nested path 'projects/web/frontend' with a single command.",
    interactive: true,
    expectedCommand: ["mkdir -p projects/web/frontend"],
    hint: "Use the -p flag with mkdir to create parent directories automatically",
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
    description: "The 'touch' command creates an empty file. Use it to create a file called 'README.md'.",
    interactive: true,
    expectedCommand: ["touch README.md"],
    hint: "Use the command that creates empty files, followed by the filename",
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
    description: "The 'cat' command displays the contents of a file. Use it to view what's inside 'welcome.txt'.",
    interactive: true,
    expectedCommand: ["cat welcome.txt"],
    expectedOutput: "Welcome to Linux!",
    hint: "Use the command that displays file contents, followed by the filename",
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
    description: "The 'echo' command prints text, but you can redirect its output to a file using '>'. Write the text 'Hello Linux' to a file called 'greeting.txt'.",
    interactive: true,
    expectedCommand: ["echo Hello Linux > greeting.txt"],
    hint: "Use echo followed by your text, then > to redirect it to a file",
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
    description: "The '>' operator overwrites files. There's a similar operator with two angle brackets that appends instead. Use 'echo' to append 'Second line' to greeting.txt without erasing what's already there.",
    interactive: true,
    expectedCommand: ["echo Second line >> greeting.txt"],
    hint: "Use >> instead of > to append rather than overwrite",
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
    description: "Let's verify the file was updated. Use 'cat' to view the contents of greeting.txt.",
    interactive: true,
    expectedCommand: ["cat greeting.txt"],
    hint: "Use the same command you used earlier to view file contents",
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
    description: "The 'rm' command removes files. Use it to delete the greeting.txt file.",
    interactive: true,
    expectedCommand: ["rm greeting.txt"],
    hint: "Use the command that removes files, followed by the filename",
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
    description: "Try using 'rm' on the 'documents' directory. You'll see an error - directories need special handling!",
    interactive: true,
    expectedCommand: ["rm documents"],
    hint: "Try using rm on the directory name to see what happens",
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
    description: "To remove a directory and its contents, 'rm' needs a special flag. Use 'rm' with the recursive flag to remove the documents directory.",
    interactive: true,
    expectedCommand: ["rm -r documents"],
    hint: "Use the -r flag with rm to remove directories recursively",
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
