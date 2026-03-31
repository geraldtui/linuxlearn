import { StepData } from '@/types';

const navigation: StepData[] = [
  {
    title: "Absolute Paths",
    description: "An absolute path starts with '/' and specifies the complete path from the root. Try navigating to /home/user/documents using an absolute path.",
    interactive: true,
    expectedCommand: ["cd /home/user/documents"],
    hint: "Type: cd /home/user/documents",
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
    description: "A relative path doesn't start with '/' and is relative to your current location. From /home/user, navigate to downloads using a relative path.",
    interactive: true,
    expectedCommand: ["cd downloads"],
    hint: "Type: cd downloads",
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
    description: "The dot '.' represents the current directory. Try listing the current directory with 'ls .'",
    interactive: true,
    expectedCommand: ["ls .", "ls"],
    hint: "Type: ls .",
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
    description: "You've already used '..' to go up one level. You can also use it multiple times. From /home/user/documents/work, go up two levels to /home/user.",
    interactive: true,
    expectedCommand: ["cd ../..", "cd ../../"],
    hint: "Type: cd ../..",
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
    description: "You can combine '..' with other paths. From /home/user/documents, navigate to /home/user/downloads using '../downloads'.",
    interactive: true,
    expectedCommand: ["cd ../downloads"],
    hint: "Type: cd ../downloads",
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
    description: "The tilde '~' is a shortcut for your home directory. You can also use 'cd' without arguments. Try 'cd ~' to go home.",
    interactive: true,
    expectedCommand: ["cd ~", "cd"],
    hint: "Type: cd ~",
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
    description: "The special path '-' takes you to your previous directory. After changing directories, use 'cd -' to go back.",
    interactive: true,
    expectedCommand: ["cd -"],
    hint: "Type: cd -",
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
