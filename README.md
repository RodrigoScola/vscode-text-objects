<div align="center">

# Vscode Text Objects

With Vscode Text Objects you can select, delete, copy and go to text in a more fluid way than you have ever experienced.

</div>

![VSCode Text Objects Demo](./docs/demo.gif)

## Supported Languages

You can use it in a variety of languages such as:

-    Javascript and JSX
-    Typescript and TSX
-    JSON
-    Golang
-    rust
-    c++
-    python
-    c
-    lua
-    java
-    toml
-    c#
-    yaml

## Roadmap

-    vim integration with delete and change - DONE
-    add keybinds and vim integration on gotos - DONE
-    finalize keybinds - DONE
-    finalize gotos - DONE
-    do backward gotos - DONE
-    do backward selection - DONE
-    add yank commands - DONE
-    add an inner string convention for languages that do not have it? should be good - DONE
-    fix command titles - DONE
-    put back the keybinds - DONE
-    change call to be all out and inner to be nearest - DONE
-    add go to empty params - DONE
-    add rest of inner and outers (arrays, objects...) - DONE
-    inner comment - DONE
-    change the commands interface for better devs - DONE
-    do the else on if statements - DONE
-    rhs is not for assignign, but reassigning - DONE
-    do inner rhs aswell - DONE
-    finish the languages support - DONE
-    see if it works on tsx and jsx all the things (mainly conditionals) - DONE
-    add the on language events - DONE
-    see if the todos are valid still - DONE
-    organize into good js - DONE

### Misc

-    remove the console logs - DONE
-    make sure keybinds and vim are okay - DONE
-    do a nice landing page - DONE

-    Make an icon, revamp the name?
-    LAUNCH (add tags and releases)

### Nodes Support

The current Fully supported nodes are:

-    Functions
-    Loops
-    Objects
-    Arrays
-    Function calls
-    Classes
-    Comments
-    Parameters
-    If and else statements, switches, ternaries, conditionals in generals
-    Strings
-    Types
-    Nodes
-    Variables
-    Right Hand Variable Assignment
-    Left Hand Variable Assignment

# Keybinds

The current keybinds for all the nodes are:

-    f - Functions
-    l - Loops
-    o - Objects
-    a - Arrays
-    m - Function calls
-    k - Classes
-    c - Comments
-    p - Parameters
-    i - If and else statements, switches, ternaries, conditionals in generals
-    s - Strings
-    t - Types
-    n - Nodes
-    v - Variables
-    r - Right Hand Variable Assignment
-    h - Left Hand Variable Assignment

## VIM Integration

To enable Vim integration, wich adds the commands to select, delete, copy and change as motions that you can activate using the vim motions syntax!

To enable the deletion, copying and changing motions to go to your register instead of your clipboard. Go to your `settings.json` and paste this:

```json
"vscode-textobjects.vimEnabled": true,
```

Example:

To select a function, just press:

    v a f

To select the inner of a function, just press:

    v i f

to go to a function, just press:

    [ f

to go to the inside of a function, just press:

    [ F

to go to back a function, just press:

    ] f

to go back to the inside of a function, just press:

    ] F

After That, also add this to your `settings.json` to enable full vim mode.

```json

"vim.normalModeKeyBindings": [
	{
		"before": ["v", "a", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.function"]
	},
	{
		"before": ["v", "i", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.function"]
	},
	{
		"before": ["v", "a", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.loop"]
	},
	{
		"before": ["v", "i", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.loop"]
	},
	{
		"before": ["v", "a", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.conditional"]
	},
	{
		"before": ["v", "i", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.conditional"]
	},
	{
		"before": ["v", "a", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.rhs"]
	},
	{
		"before": ["v", "i", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.rhs"]
	},
	{
		"before": ["v", "a", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.lhs"]
	},
	{
		"before": ["v", "i", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.lhs"]
	},
	{
		"before": ["v", "a", "v"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.variable"]
	},
	{
		"before": ["v", "a", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.string"]
	},
	{
		"before": ["v", "i", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.string"]
	},
	{
		"before": ["v", "a", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.class"]
	},
	{
		"before": ["v", "i", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.class"]
	},
	{
		"before": ["v", "a", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.array"]
	},
	{
		"before": ["v", "i", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.array"]
	},
	{
		"before": ["v", "a", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.object"]
	},
	{
		"before": ["v", "i", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.object"]
	},
	{
		"before": ["v", "a", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.parameters"]
	},
	{
		"before": ["v", "i", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.parameters"]
	},
	{
		"before": ["v", "a", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.call"]
	},
	{
		"before": ["v", "i", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.call"]
	},
	{
		"before": ["v", "a", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.type"]
	},
	{
		"before": ["v", "i", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.type"]
	},
	{
		"before": ["v", "a", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.comment"]
	},
	{
		"before": ["v", "i", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.comment"]
	},
	{
		"before": ["v", "a", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.function"]
	},
	{
		"before": ["v", "i", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.function"]
	},
	{
		"before": ["v", "a", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.loop"]
	},
	{
		"before": ["v", "i", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.loop"]
	},
	{
		"before": ["v", "a", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.conditional"]
	},
	{
		"before": ["v", "i", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.conditional"]
	},
	{
		"before": ["v", "a", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.rhs"]
	},
	{
		"before": ["v", "i", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.rhs"]
	},
	{
		"before": ["v", "a", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.lhs"]
	},
	{
		"before": ["v", "i", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.lhs"]
	},
	{
		"before": ["v", "a", "V"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.variable"]
	},
	{
		"before": ["v", "a", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.string"]
	},
	{
		"before": ["v", "i", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.string"]
	},
	{
		"before": ["v", "a", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.class"]
	},
	{
		"before": ["v", "i", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.class"]
	},
	{
		"before": ["v", "a", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.array"]
	},
	{
		"before": ["v", "i", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.array"]
	},
	{
		"before": ["v", "a", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.object"]
	},
	{
		"before": ["v", "i", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.object"]
	},
	{
		"before": ["v", "i", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.parameters"]
	},
	{
		"before": ["v", "a", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.parameters"]
	},
	{
		"before": ["v", "a", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.call"]
	},
	{
		"before": ["v", "i", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.call"]
	},
	{
		"before": ["v", "a", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.type"]
	},
	{
		"before": ["v", "i", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.type"]
	},
	{
		"before": ["v", "a", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.comment"]
	},
	{
		"before": ["v", "i", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.comment"]
	},
	{
		"before": ["[", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.function"]
	},
	{
		"before": ["[", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.function"]
	},
	{
		"before": ["[", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.loop"]
	},
	{
		"before": ["[", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.loop"]
	},
	{
		"before": ["[", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.conditional"]
	},
	{
		"before": ["[", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.conditional"]
	},
	{
		"before": ["[", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.rhs"]
	},
	{
		"before": ["[", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.rhs"]
	},
	{
		"before": ["[", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.lhs"]
	},
	{
		"before": ["[", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.lhs"]
	},
	{
		"before": ["[", "v"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.variable"]
	},
	{
		"before": ["[", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.string"]
	},
	{
		"before": ["[", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.string"]
	},
	{
		"before": ["[", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.class"]
	},
	{
		"before": ["[", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.class"]
	},
	{
		"before": ["[", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.array"]
	},
	{
		"before": ["[", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.array"]
	},
	{
		"before": ["[", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.object"]
	},
	{
		"before": ["[", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.object"]
	},
	{
		"before": ["[", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.parameters"]
	},
	{
		"before": ["[", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.parameters"]
	},
	{
		"before": ["[", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.call"]
	},
	{
		"before": ["[", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.call"]
	},
	{
		"before": ["[", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.type"]
	},
	{
		"before": ["[", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.type"]
	},
	{
		"before": ["[", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.comment"]
	},
	{
		"before": ["[", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.comment"]
	},
	{
		"before": ["]", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.function"]
	},
	{
		"before": ["]", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.function"]
	},
	{
		"before": ["]", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.loop"]
	},
	{
		"before": ["]", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.loop"]
	},
	{
		"before": ["]", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.conditional"]
	},
	{
		"before": ["]", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.conditional"]
	},
	{
		"before": ["]", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.rhs"]
	},
	{
		"before": ["]", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.rhs"]
	},
	{
		"before": ["]", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.lhs"]
	},
	{
		"before": ["]", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.lhs"]
	},
	{
		"before": ["]", "v"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.variable"]
	},
	{
		"before": ["]", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.string"]
	},
	{
		"before": ["]", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.string"]
	},
	{
		"before": ["]", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.class"]
	},
	{
		"before": ["]", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.class"]
	},
	{
		"before": ["]", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.array"]
	},
	{
		"before": ["]", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.array"]
	},
	{
		"before": ["]", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.object"]
	},
	{
		"before": ["]", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.object"]
	},
	{
		"before": ["]", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.parameters"]
	},
	{
		"before": ["]", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.parameters"]
	},
	{
		"before": ["]", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.call"]
	},
	{
		"before": ["]", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.call"]
	},
	{
		"before": ["]", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.type"]
	},
	{
		"before": ["]", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.type"]
	},
	{
		"before": ["]", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.comment"]
	},
	{
		"before": ["]", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.comment"]
	},
	{
		"before": ["d", "a", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.function"]
	},
	{
		"before": ["d", "i", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.function"]
	},
	{
		"before": ["d", "a", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.loop"]
	},
	{
		"before": ["d", "i", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.loop"]
	},
	{
		"before": ["d", "a", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.conditional"]
	},
	{
		"before": ["d", "i", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.conditional"]
	},
	{
		"before": ["d", "a", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.rhs"]
	},
	{
		"before": ["d", "i", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.rhs"]
	},
	{
		"before": ["d", "a", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.lhs"]
	},
	{
		"before": ["d", "i", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.lhs"]
	},
	{
		"before": ["d", "a", "v"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.variable"]
	},
	{
		"before": ["d", "a", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.string"]
	},
	{
		"before": ["d", "i", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.string"]
	},
	{
		"before": ["d", "a", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.class"]
	},
	{
		"before": ["d", "i", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.class"]
	},
	{
		"before": ["d", "a", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.array"]
	},
	{
		"before": ["d", "i", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.array"]
	},
	{
		"before": ["d", "a", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.object"]
	},
	{
		"before": ["d", "i", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.object"]
	},
	{
		"before": ["d", "a", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.parameters"]
	},
	{
		"before": ["d", "i", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.parameters"]
	},
	{
		"before": ["d", "a", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.call"]
	},
	{
		"before": ["d", "i", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.call"]
	},
	{
		"before": ["d", "a", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.type"]
	},
	{
		"before": ["d", "i", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.type"]
	},
	{
		"before": ["d", "a", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.comment"]
	},
	{
		"before": ["d", "i", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.inner.comment"]
	},
	{
		"before": ["d", "a", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.function"]
	},
	{
		"before": ["d", "i", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.function"]
	},
	{
		"before": ["d", "a", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.loop"]
	},
	{
		"before": ["d", "i", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.loop"]
	},
	{
		"before": ["d", "a", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.conditional"]
	},
	{
		"before": ["d", "i", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.conditional"]
	},
	{
		"before": ["d", "a", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.rhs"]
	},
	{
		"before": ["d", "i", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.rhs"]
	},
	{
		"before": ["d", "a", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.lhs"]
	},
	{
		"before": ["d", "i", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.lhs"]
	},
	{
		"before": ["d", "a", "V"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.variable"]
	},
	{
		"before": ["d", "a", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.string"]
	},
	{
		"before": ["d", "i", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.string"]
	},
	{
		"before": ["d", "a", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.class"]
	},
	{
		"before": ["d", "i", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.class"]
	},
	{
		"before": ["d", "a", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.array"]
	},
	{
		"before": ["d", "i", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.array"]
	},
	{
		"before": ["d", "a", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.object"]
	},
	{
		"before": ["d", "i", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.object"]
	},
	{
		"before": ["d", "a", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.parameters"]
	},
	{
		"before": ["d", "i", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.parameters"]
	},
	{
		"before": ["d", "a", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.call"]
	},
	{
		"before": ["d", "i", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.call"]
	},
	{
		"before": ["d", "a", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.type"]
	},
	{
		"before": ["d", "i", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.type"]
	},
	{
		"before": ["d", "a", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.outer.comment"]
	},
	{
		"before": ["d", "i", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.comment"]
	},
	{
		"before": ["y", "a", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.function"]
	},
	{
		"before": ["y", "i", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.function"]
	},
	{
		"before": ["y", "a", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.loop"]
	},
	{
		"before": ["y", "i", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.loop"]
	},
	{
		"before": ["y", "a", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.conditional"]
	},
	{
		"before": ["y", "i", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.conditional"]
	},
	{
		"before": ["y", "a", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.rhs"]
	},
	{
		"before": ["y", "i", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.rhs"]
	},
	{
		"before": ["y", "a", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.lhs"]
	},
	{
		"before": ["y", "i", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.lhs"]
	},
	{
		"before": ["y", "a", "v"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.variable"]
	},
	{
		"before": ["y", "a", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.string"]
	},
	{
		"before": ["y", "i", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.string"]
	},
	{
		"before": ["y", "a", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.class"]
	},
	{
		"before": ["y", "i", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.class"]
	},
	{
		"before": ["y", "a", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.array"]
	},
	{
		"before": ["y", "i", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.array"]
	},
	{
		"before": ["y", "a", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.object"]
	},
	{
		"before": ["y", "i", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.object"]
	},
	{
		"before": ["y", "a", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.parameters"]
	},
	{
		"before": ["y", "i", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.parameters"]
	},
	{
		"before": ["y", "a", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.call"]
	},
	{
		"before": ["y", "i", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.call"]
	},
	{
		"before": ["y", "a", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.type"]
	},
	{
		"before": ["y", "i", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.type"]
	},
	{
		"before": ["y", "a", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.comment"]
	},
	{
		"before": ["y", "i", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.comment"]
	},
	{
		"before": ["y", "a", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.function"]
	},
	{
		"before": ["y", "i", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.function"]
	},
	{
		"before": ["y", "a", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.loop"]
	},
	{
		"before": ["y", "i", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.loop"]
	},
	{
		"before": ["y", "a", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.conditional"]
	},
	{
		"before": ["y", "i", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.conditional"]
	},
	{
		"before": ["y", "a", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.rhs"]
	},
	{
		"before": ["y", "i", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.rhs"]
	},
	{
		"before": ["y", "a", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.lhs"]
	},
	{
		"before": ["y", "i", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.lhs"]
	},
	{
		"before": ["y", "a", "V"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.variable"]
	},
	{
		"before": ["y", "a", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.string"]
	},
	{
		"before": ["y", "i", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.string"]
	},
	{
		"before": ["y", "a", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.class"]
	},
	{
		"before": ["y", "i", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.class"]
	},
	{
		"before": ["y", "a", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.array"]
	},
	{
		"before": ["y", "i", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.array"]
	},
	{
		"before": ["y", "a", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.object"]
	},
	{
		"before": ["y", "i", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.object"]
	},
	{
		"before": ["y", "a", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.parameters"]
	},
	{
		"before": ["y", "i", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.parameters"]
	},
	{
		"before": ["y", "a", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.call"]
	},
	{
		"before": ["y", "i", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.call"]
	},
	{
		"before": ["y", "a", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.type"]
	},
	{
		"before": ["y", "i", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.type"]
	},
	{
		"before": ["y", "a", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.outer.comment"]
	},
	{
		"before": ["y", "i", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.previous.inner.comment"]
	},
	{
		"before": ["c", "a", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.function"]
	},
	{
		"before": ["c", "i", "f"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.function"]
	},
	{
		"before": ["c", "a", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.loop"]
	},
	{
		"before": ["c", "i", "l"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.loop"]
	},
	{
		"before": ["c", "a", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.conditional"]
	},
	{
		"before": ["c", "i", "i"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.conditional"]
	},
	{
		"before": ["c", "a", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.rhs"]
	},
	{
		"before": ["c", "i", "r"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.rhs"]
	},
	{
		"before": ["c", "a", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.lhs"]
	},
	{
		"before": ["c", "i", "h"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.lhs"]
	},
	{
		"before": ["c", "a", "v"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.variable"]
	},
	{
		"before": ["c", "a", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.string"]
	},
	{
		"before": ["c", "i", "s"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.string"]
	},
	{
		"before": ["c", "a", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.class"]
	},
	{
		"before": ["c", "i", "k"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.class"]
	},
	{
		"before": ["c", "a", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.array"]
	},
	{
		"before": ["c", "i", "a"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.array"]
	},
	{
		"before": ["c", "a", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.object"]
	},
	{
		"before": ["c", "i", "o"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.object"]
	},
	{
		"before": ["c", "a", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.parameters"]
	},
	{
		"before": ["c", "i", "p"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.parameters"]
	},
	{
		"before": ["c", "a", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.call"]
	},
	{
		"before": ["c", "i", "m"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.call"]
	},
	{
		"before": ["c", "a", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.type"]
	},
	{
		"before": ["c", "i", "t"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.type"]
	},
	{
		"before": ["c", "a", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.comment"]
	},
	{
		"before": ["c", "i", "c"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.inner.comment"]
	},
	{
		"before": ["c", "a", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.function"]
	},
	{
		"before": ["c", "i", "F"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.function"]
	},
	{
		"before": ["c", "a", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.loop"]
	},
	{
		"before": ["c", "i", "L"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.loop"]
	},
	{
		"before": ["c", "a", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.conditional"]
	},
	{
		"before": ["c", "i", "I"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.conditional"]
	},
	{
		"before": ["c", "a", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.rhs"]
	},
	{
		"before": ["c", "i", "R"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.rhs"]
	},
	{
		"before": ["c", "a", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.lhs"]
	},
	{
		"before": ["c", "i", "H"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.lhs"]
	},
	{
		"before": ["c", "a", "V"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.variable"]
	},
	{
		"before": ["c", "a", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.string"]
	},
	{
		"before": ["c", "i", "S"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.string"]
	},
	{
		"before": ["c", "a", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.class"]
	},
	{
		"before": ["c", "i", "K"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.class"]
	},
	{
		"before": ["c", "a", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.array"]
	},
	{
		"before": ["c", "i", "A"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.array"]
	},
	{
		"before": ["c", "a", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.object"]
	},
	{
		"before": ["c", "i", "O"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.object"]
	},
	{
		"before": ["c", "a", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.parameters"]
	},
	{
		"before": ["c", "i", "P"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.parameters"]
	},
	{
		"before": ["c", "a", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.call"]
	},
	{
		"before": ["c", "i", "M"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.call"]
	},
	{
		"before": ["c", "a", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.type"]
	},
	{
		"before": ["c", "i", "T"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.type"]
	},
	{
		"before": ["c", "a", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.outer.comment"]
	},
	{
		"before": ["c", "i", "C"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.comment"]
	},
	{
		"before": ["v", "a", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.outer.node"]
	},
	{
		"before": ["v", "i", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.next.inner.node"]
	},
	{
		"before": ["v", "a", "N"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.outer.node"]
	},
	{
		"before": ["v", "i", "N"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.select.previous.inner.node"]
	},
	{
		"before": ["[", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.outer.node"]
	},
	{
		"before": ["[", "N"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.next.inner.node"]
	},
	{
		"before": ["]", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.outer.node"]
	},
	{
		"before": ["]", "N"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.goTo.previous.inner.node"]
	},
	{
		"before": ["c", "a", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.next.outer.node"]
	},
	{
		"before": ["c", "i", "N"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.change.previous.inner.node"]
	},
	{
		"before": ["d", "a", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.next.outer.node"]
	},
	{
		"before": ["d", "i", "N"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.delete.previous.inner.node"]
	},
	{
		"before": ["y", "a", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.outer.node"]
	},
	{
		"before": ["y", "i", "n"],
		"when": " editorTextFocus  && vscode-textobjects.vimEnabled  && !inDebugRepl && vim.mode != 'Insert'",
		"commands": ["vscode-textobjects.yank.next.inner.node"]
	}
]
```

# Huge Thanks

Thank you [nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects) for the huge inspiration. You were the reason that i wanted to make this extension in vscode and the thing i miss about [neovim](https://github.com/neovim/neovim/) the most.

## Disclaimer

Although i like this extension, I am uncertain about the development past my needs. Since extension development is not my career (at least not for now). I dont intend to have a lot going on for this extension.

# Update material

-    add an start and end so we can goto start and goto end of a node
