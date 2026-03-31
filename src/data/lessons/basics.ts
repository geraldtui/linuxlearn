import { StepData } from '@/types';

const basics: StepData[] = [
  {
    title: "Welcome to LinuxLearn",
    description: "In this lesson, you'll learn the most fundamental Linux commands. Let's start by understanding where you are in the filesystem.",
    interactive: false,
    readOnly: true,
    expectedCommand: [],
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
    initialCwd: "/home/user"
  },
  {
    title: "Your First Command: pwd",
    description: "The 'pwd' command stands for 'print working directory'. It shows you where you currently are in the filesystem. Try typing 'pwd' and press Enter.",
    interactive: true,
    expectedCommand: ["pwd"],
    expectedOutput: "/home/user",
    hint: "Type exactly: pwd",
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
    initialCwd: "/home/user"
  },
  {
    title: "List Files with ls",
    description: "The 'ls' command lists files and directories in your current location. Try it now to see what's in your home directory.",
    interactive: true,
    expectedCommand: ["ls", "ls ."],
    hint: "Type: ls",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": { type: "dir", children: {} },
              "downloads": { type: "dir", children: {} },
              "file.txt": { type: "file", content: "Hello World" }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return output.includes("documents") && output.includes("downloads");
    }
  },
  {
    title: "List Files with Details",
    description: "Adding the '-l' flag to ls shows more details about files, including permissions, size, and modification date. Try 'ls -l'.",
    interactive: true,
    expectedCommand: ["ls -l"],
    hint: "Type: ls -l",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              "documents": { type: "dir", children: {} },
              "file.txt": { type: "file", content: "Hello World" }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return output.includes("rwx") || output.includes("drwx");
    }
  },
  {
    title: "Show Hidden Files",
    description: "Files starting with a dot (.) are hidden by default. Use 'ls -a' to see all files, including hidden ones.",
    interactive: true,
    expectedCommand: ["ls -a"],
    hint: "Type: ls -a",
    initialFS: {
      "home": {
        type: "dir",
        children: {
          "user": {
            type: "dir",
            children: {
              ".bashrc": { type: "file", content: "# bash config" },
              ".profile": { type: "file", content: "# profile" },
              "documents": { type: "dir", children: {} }
            }
          }
        }
      }
    },
    initialCwd: "/home/user",
    customValidate: (cmd, output, fs) => {
      return output.includes(".bashrc") && output.includes(".profile");
    }
  },
  {
    title: "Change Directory",
    description: "The 'cd' command changes your current directory. Try navigating to the documents folder with 'cd documents'.",
    interactive: true,
    expectedCommand: ["cd documents"],
    hint: "Type: cd documents",
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
    title: "Go to Parent Directory",
    description: "The special path '..' represents the parent directory. Use 'cd ..' to go back to the parent directory.",
    interactive: true,
    expectedCommand: ["cd .."],
    hint: "Type: cd ..",
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
    initialCwd: "/home/user/documents",
    customValidate: (cmd, output, fs) => {
      return fs.getCwd() === "/home/user";
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
  }
];

export default basics;
