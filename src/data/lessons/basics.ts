import { StepData } from '@/types';

const basics: StepData[] = [
  {
    title: "Welcome to SudoSchool",
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
    description: "The 'pwd' command stands for 'print working directory'. It shows you where you currently are in the filesystem. Try it out!",
    interactive: true,
    expectedCommand: ["pwd"],
    expectedOutput: "/home/user",
    hint: "Remember: pwd stands for 'print working directory'",
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
    hint: "Use the command that lists files and directories",
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
    description: "The 'ls' command has flags that change its behavior. Adding a flag shows more details about files, including permissions, size, and modification date. Which flag shows a detailed 'long' listing?",
    interactive: true,
    expectedCommand: ["ls -l"],
    hint: "Add the -l flag to the ls command to show more details",
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
    description: "Files starting with a dot (.) are hidden by default. You should see .bashrc and .profile in your home directory, but they're not showing up. There's a flag for 'ls' that shows 'all' files, including hidden ones.",
    interactive: true,
    expectedCommand: ["ls -a"],
    hint: "Use the -a flag with ls to show 'all' files including hidden ones",
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
    description: "The 'cd' command changes your current directory. Try navigating to the documents folder.",
    interactive: true,
    expectedCommand: ["cd documents"],
    hint: "Use the command that 'changes directory' followed by the folder name",
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
    description: "The special path '..' represents the parent directory. Use 'cd' with this special path to go back up one level.",
    interactive: true,
    expectedCommand: ["cd .."],
    hint: "Use two dots (..) to represent the parent directory",
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
    description: "The tilde '~' is a shortcut for your home directory. You can also use 'cd' without any arguments. Try getting back to your home directory using either approach.",
    interactive: true,
    expectedCommand: ["cd ~", "cd"],
    hint: "Use the tilde symbol (~) or just cd by itself to go home",
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
