export const manPages: Record<string, string> = {
  pwd: `NAME
    pwd - print name of current/working directory

SYNOPSIS
    pwd

DESCRIPTION
    Print the full filename of the current working directory.`,

  ls: `NAME
    ls - list directory contents

SYNOPSIS
    ls [OPTION]... [FILE]...

DESCRIPTION
    List information about files and directories.

OPTIONS
    -l     use a long listing format
    -a     do not ignore entries starting with .`,

  cd: `NAME
    cd - change the working directory

SYNOPSIS
    cd [DIRECTORY]

DESCRIPTION
    Change the current directory to DIRECTORY.
    If no DIRECTORY is given, change to home directory.

SPECIAL PATHS
    ~      home directory
    -      previous directory
    .      current directory
    ..     parent directory`,

  mkdir: `NAME
    mkdir - make directories

SYNOPSIS
    mkdir [OPTION]... DIRECTORY...

DESCRIPTION
    Create the DIRECTORY(ies), if they do not already exist.

OPTIONS
    -p     make parent directories as needed`,

  touch: `NAME
    touch - create empty file

SYNOPSIS
    touch FILE...

DESCRIPTION
    Create FILE(s) if they do not exist.`,

  cat: `NAME
    cat - concatenate files and print on the standard output

SYNOPSIS
    cat [FILE]...

DESCRIPTION
    Concatenate FILE(s) to standard output.`,

  echo: `NAME
    echo - display a line of text

SYNOPSIS
    echo [STRING]...

DESCRIPTION
    Echo the STRING(s) to standard output.

REDIRECTION
    >      write output to file (overwrite)
    >>     append output to file`,

  rm: `NAME
    rm - remove files or directories

SYNOPSIS
    rm [OPTION]... FILE...

DESCRIPTION
    Remove (unlink) the FILE(s).

OPTIONS
    -r     remove directories and their contents recursively`,

  clear: `NAME
    clear - clear the terminal screen

SYNOPSIS
    clear

DESCRIPTION
    Clear the terminal screen.`,

  man: `NAME
    man - display manual pages

SYNOPSIS
    man COMMAND

DESCRIPTION
    Display the manual page for COMMAND.
    
EXAMPLES
    man ls      view manual for ls command
    man cd      view manual for cd command`
};
