import { StepData } from '@/types';

const navigation: StepData[] = [
  {
    title: "Absolute Paths",
    description: "An absolute path starts with '/' and specifies the complete path from the root. Use 'cd' to navigate to the documents folder using an absolute path.",
    interactive: true,
    expectedCommand: ["cd /home/user/documents"],
    hint: "Start your path with / and include the full path to documents",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": { type: "dir", children: {} },
              "downloads": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return fs.getCwd() === "/home/user/documents";
    }
  },
  {
    title: "Relative Paths",
    description: "A relative path doesn't start with '/' and is relative to your current location. Use 'cd' to navigate to the downloads folder, but this time use a relative path instead of the full path.",
    interactive: true,
    expectedCommand: ["cd downloads"],
    hint: "Don't start with /. Just use the folder name that's in your current directory",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": { type: "dir", children: {} },
              "downloads": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return fs.getCwd() === "/home/user/downloads";
    }
  },
  {
    title: "Current Directory: .",
    description: "The dot '.' represents the current directory. Try using 'ls' with this special symbol.",
    interactive: true,
    expectedCommand: ["ls .", "ls"],
    hint: "Use a single dot (.) to represent the current directory",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "file1.txt": { type: "file", content: "" },
              "file2.txt": { type: "file", content: "" }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return output.includes("file1.txt") && output.includes("file2.txt");
    }
  },
  {
    title: "Parent Directory: ..",
    description: "You've already used '..' to go up one level. You can also use it multiple times in a path. Use 'cd' to go up two levels from your current location.",
    interactive: true,
    expectedCommand: ["cd ../..", "cd ../../"],
    hint: "Use .. twice separated by a slash to go up two levels",
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
                  "work": { type: "dir", children: {} }
                }
              }
            }
          }
        }
      }
    },
    initialCwd: "/home/user/documents/work",
    customValidate: (cmd, output, fs) => {
      return fs.getCwd() === "/home/user";
    }
  },
  {
    title: "Combining Paths",
    description: "You can combine '..' with other paths in a single command. From /home/user/documents, navigate to /home/user/downloads by going up one level and then into downloads.",
    interactive: true,
    expectedCommand: ["cd ../downloads"],
    hint: "Go up one level (..) then into the downloads folder",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": { type: "dir", children: {} },
              "downloads": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user/documents",
    customValidate: (cmd, output, fs) => {
      return fs.getCwd() === "/home/user/downloads";
    }
  },
  {
    title: "Home Directory Shortcut",
    description: "The tilde '~' is a shortcut for your home directory. You can also use 'cd' without any arguments. Try getting back to your home directory using either approach.",
    interactive: true,
    expectedCommand: ["cd ~", "cd"],
    hint: "Use the tilde symbol (~) or just cd by itself",
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
      },
      "etc": { type: "dir", children: {} }
    },
    initialCwd: "/etc",
    customValidate: (cmd, output, fs) => {
      return fs.getCwd() === "/home/user";
    }
  },
  {
    title: "Previous Directory: cd -",
    description: "The special path '-' takes you to your previous directory. Use 'cd' with this special symbol to jump back to where you were before.",
    interactive: true,
    expectedCommand: ["cd -"],
    hint: "Use a dash (-) to go back to your previous directory",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": { type: "dir", children: {} },
              "downloads": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user/downloads",
    customValidate: (cmd, output, fs) => {
      return fs.getCwd() === "/home/user";
    }
  }
];

export default navigation;
