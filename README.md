# Vscode Text Objects

Vscode text objects are a nicer way to edit code. long are the days of slow block selection. Now you can press a cople keybinds and Done!

## Roadmap

### Reverse select / go to

the idea is for all the commands that we have access to (select next function. go to next if statement) there would be a reverse to that. currently proven objects are functioning.

-    functions

### Node Support

The current Fully supported nodes are:

-    Functions
-    Loops
-    Strings
-    Arrays
-    Objects
-    Comments

The current in development nodes are

-    Conditionals: unsure if they work in all cases
-    Variables: unsure if they work in all cases
-    Variable assignments:
     -    unsure if they work in all cases
     -    only work in assignment for the first time, working on whenever the variable is assigned the subsequent times
-    Types: very bare bones (only in typescript and only on type and interface creations)
-    Inner Strings: Only supported in javascript for now
-    Calls: only started
-    inner Calls: only started

#### Possible nodes support

Blocks:

Blocks would be nice catch all.

## Language Support

Language Support in development:

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

### Planned Languages

-    yaml
-    c#

## Roadmap

-    vim integration with delete and change - DONE
-    add keybinds and vim integration on gotos - DONE
-    finalize keybinds - DONE

-    add rest of inner and outers (arrays, objects...)
-    check if inner parameter and/or calls would be better being
     outer : all parameters or call arguments
     inner : the first parameter or call argument
-    add methods to language queries and add them on functions
-    do the else on if statements
-    finalize gotos
-    do backward gotos
-    do backward selection
-    add more configs?
-    finish the languages support
-    rhs is not for assignign, but reassigning

# VIM Integration

Vscode vim does not allow editing of the yank register. And using vscode's api to send the commands is extremelly slow (over 2 seconds of lag!), so to circumvent that. I recomment putting this on your `settings.json`.

```json

"vim.normalModeKeyBindings": [
		// go to next CALL
		{
			"before": ["]", "m"],
			"commands": ["vscode-textobjects.goTo.next.outer.call"]
		},
		{
			"before": ["]", "M"],
			"commands": ["vscode-textobjects.goTo.next.inner.call"]
		},

		//go to previous CALL
		{
			"before": ["[", "m"],
			"commands": ["vscode-textobjects.goTo.previous.outer.call"]
		},

		{
			"before": ["[", "M"],
			"commands": ["vscode-textobjects.goTo.previous.inner.call"]
		},

		// go to next FUNCTION
		{
			"before": ["]", "f"],
			"commands": ["vscode-textobjects.goTo.next.outer.function"]
		},
		{
			"before": ["]", "F"],
			"commands": ["vscode-textobjects.goTo.next.inner.function"]
		},

		//go to previous FUNCTION
		{
			"before": ["[", "f"],
			"commands": ["vscode-textobjects.goTo.previous.outer.function"]
		},

		{
			"before": ["[", "F"],
			"commands": ["vscode-textobjects.goTo.previous.inner.function"]
		},
		// go to next parameters
		{
			"before": ["]", "p"],
			"commands": ["vscode-textobjects.goTo.next.outer.parameters"]
		},
		{
			"before": ["]", "P"],
			"commands": ["vscode-textobjects.goTo.next.inner.parameters"]
		},

		//go to previous parameters
		{
			"before": ["[", "p"],
			"commands": ["vscode-textobjects.goTo.previous.outer.parameters"]
		},

		{
			"before": ["[", "P"],
			"commands": ["vscode-textobjects.goTo.previous.inner.parameters"]
		},
		// go to next type
		{
			"before": ["]", "t"],
			"commands": ["vscode-textobjects.goTo.next.outer.type"]
		},
		{
			"before": ["]", "T"],
			"commands": ["vscode-textobjects.goTo.next.inner.type"]
		},

		//go to previous type
		{
			"before": ["[", "t"],
			"commands": ["vscode-textobjects.goTo.previous.outer.type"]
		},

		{
			"before": ["[", "T"],
			"commands": ["vscode-textobjects.goTo.previous.inner.type"]
		},
		// go to next comment
		{
			"before": ["]", "c"],
			"commands": ["vscode-textobjects.goTo.next.outer.comment"]
		},

		//go to previous comment
		{
			"before": ["[", "c"],
			"commands": ["vscode-textobjects.goTo.previous.outer.comment"]
		},

		// go to next array
		{
			"before": ["]", "a"],
			"commands": ["vscode-textobjects.goTo.next.outer.array"]
		},
		{
			"before": ["]", "A"],
			"commands": ["vscode-textobjects.goTo.next.inner.array"]
		},

		//go to previous array
		{
			"before": ["[", "a"],
			"commands": ["vscode-textobjects.goTo.previous.outer.array"]
		},

		{
			"before": ["[", "A"],
			"commands": ["vscode-textobjects.goTo.previous.inner.array"]
		},
		// NEXT class
		{
			"before": ["]", "k"],
			"commands": ["vscode-textobjects.goTo.next.outer.class"]
		},
		{
			"before": ["]", "K"],
			"commands": ["vscode-textobjects.goTo.next.inner.class"]
		},

		// PREVIOUS class
		{
			"before": ["[", "k"],
			"commands": ["vscode-textobjects.goTo.previous.outer.class"]
		},

		{
			"before": ["[", "K"],
			"commands": ["vscode-textobjects.goTo.previous.inner.class"]
		},

		// NEXT conditional
		{
			"before": ["]", "i"],
			"commands": ["vscode-textobjects.goTo.next.outer.conditional"]
		},
		{
			"before": ["]", "I"],
			"commands": ["vscode-textobjects.goTo.next.inner.conditional"]
		},

		// PREVIOUS conditional
		{
			"before": ["[", "i"],
			"commands": ["vscode-textobjects.goTo.previous.outer.conditional"]
		},

		{
			"before": ["[", "I"],
			"commands": ["vscode-textobjects.goTo.previous.inner.conditional"]
		},
		// NEXT loop
		{
			"before": ["]", "l"],
			"commands": ["vscode-textobjects.goTo.next.outer.loop"]
		},
		{
			"before": ["]", "L"],
			"commands": ["vscode-textobjects.goTo.next.inner.loop"]
		},

		// PREVIOUS loop
		{
			"before": ["[", "l"],
			"commands": ["vscode-textobjects.goTo.previous.outer.loop"]
		},

		{
			"before": ["[", "L"],
			"commands": ["vscode-textobjects.goTo.previous.inner.loop"]
		},
		// NEXT string
		{
			"before": ["]", "s"],
			"commands": ["vscode-textobjects.goTo.next.outer.string"]
		},
		{
			"before": ["]", "S"],
			"commands": ["vscode-textobjects.goTo.next.inner.string"]
		},

		// PREVIOUS string
		{
			"before": ["[", "s"],
			"commands": ["vscode-textobjects.goTo.previous.outer.string"]
		},

		{
			"before": ["[", "S"],
			"commands": ["vscode-textobjects.goTo.previous.inner.string"]
		},

		// NEXT object
		{
			"before": ["]", "o"],
			"commands": ["vscode-textobjects.goTo.next.outer.object"]
		},
		{
			"before": ["]", "O"],
			"commands": ["vscode-textobjects.goTo.next.inner.object"]
		},

		// PREVIOUS object
		{
			"before": ["[", "o"],
			"commands": ["vscode-textobjects.goTo.previous.outer.object"]
		},

		{
			"before": ["[", "O"],
			"commands": ["vscode-textobjects.goTo.previous.inner.object"]
		},

		// NEXT variable
		{
			"before": ["]", "v"],
			"commands": ["vscode-textobjects.goTo.next.outer.variable"]
		},

		// PREVIOUS variable
		{
			"before": ["[", "v"],
			"commands": ["vscode-textobjects.goTo.previous.outer.variable"]
		},

		// NEXT rhs
		{
			"before": ["]", "r"],
			"commands": ["vscode-textobjects.goTo.next.outer.rhs"]
		},

		// PREVIOUS variable
		{
			"before": ["[", "r"],
			"commands": ["vscode-textobjects.goTo.previous.outer.rhs"]
		},

		// SELECT OUTER TYPE
		{
			"before": ["v", "a", "t"],
			"commands": ["vscode-textobjects.select.next.outer.type"]
		},
		{
			"before": ["d", "a", "t"],
			"commands": [
				"vscode-textobjects.select.next.outer.type",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},

		{
			"before": ["c", "a", "t"],
			"commands": [
				"vscode-textobjects.select.next.outer.type",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},

		// SELECT INNER TYPE
		{
			"before": ["v", "i", "t"],
			"commands": ["vscode-textobjects.select.next.inner.type"]
		},
		{
			"before": ["d", "i", "t"],
			"commands": [
				"vscode-textobjects.select.next.inner.type",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "t"],
			"commands": [
				"vscode-textobjects.select.next.inner.type",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER VARIABLE
		{
			"before": ["v", "a", "v"],
			"commands": ["vscode-textobjects.select.next.outer.variable"]
		},
		{
			"before": ["d", "a", "v"],
			"commands": [
				"vscode-textobjects.select.next.outer.variable",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "v"],
			"commands": [
				"vscode-textobjects.select.next.outer.variable",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},

		// SELECT OUTER RHS
		{
			"before": ["v", "a", "r"],
			"commands": ["vscode-textobjects.select.next.outer.rhs"]
		},
		{
			"before": ["d", "a", "r"],
			"commands": [
				"vscode-textobjects.select.next.outer.rhs",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "r"],
			"commands": [
				"vscode-textobjects.select.next.outer.rhs",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},

		// SELECTING OUTER CONDITIONAL
		{
			"before": ["v", "a", "i"],
			"commands": ["vscode-textobjects.select.next.outer.conditional"]
		},
		{
			"before": ["d", "a", "i"],
			"commands": [
				"vscode-textobjects.select.next.outer.conditional",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "i"],
			"commands": [
				"vscode-textobjects.select.next.outer.conditional",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT INNER CONDITIONAL
		{
			"before": ["v", "i", "i"],
			"commands": ["vscode-textobjects.select.next.inner.conditional"]
		},

		{
			"before": ["d", "i", "i"],
			"commands": [
				"vscode-textobjects.select.next.inner.conditional",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "i"],
			"commands": [
				"vscode-textobjects.select.next.inner.conditional",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},

		// SELECT OUTER CLASS
		{
			"before": ["v", "a", "k"],
			"commands": ["vscode-textobjects.select.next.outer.class"]
		},
		{
			"before": ["d", "a", "k"],
			"commands": [
				"vscode-textobjects.select.next.outer.class",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "k"],
			"commands": [
				"vscode-textobjects.select.next.outer.class",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT INNER CLASS
		{
			"before": ["v", "i", "k"],
			"commands": ["vscode-textobjects.select.next.inner.class"]
		},
		{
			"before": ["d", "i", "k"],
			"commands": [
				"vscode-textobjects.select.next.inner.class",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "k"],
			"commands": [
				"vscode-textobjects.select.next.inner.class",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER STRING
		{
			"before": ["v", "a", "s"],
			"commands": ["vscode-textobjects.select.next.outer.string"]
		},
		{
			"before": ["d", "a", "s"],
			"commands": [
				"vscode-textobjects.select.next.outer.string",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "s"],
			"commands": [
				"vscode-textobjects.select.next.outer.string",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT INNER STRING
		{
			"before": ["v", "i", "s"],
			"commands": ["vscode-textobjects.select.next.inner.string"]
		},
		{
			"before": ["d", "i", "s"],
			"commands": [
				"vscode-textobjects.select.next.inner.string",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "s"],
			"commands": [
				"vscode-textobjects.select.next.inner.string",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER OBJECT
		{
			"before": ["v", "a", "o"],
			"commands": ["vscode-textobjects.select.next.outer.object"]
		},
		{
			"before": ["d", "a", "o"],
			"commands": [
				"vscode-textobjects.select.next.outer.object",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "o"],
			"commands": [
				"vscode-textobjects.select.next.outer.object",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER ARRAY
		{
			"before": ["v", "a", "a"],
			"commands": ["vscode-textobjects.select.next.outer.array"]
		},
		{
			"before": ["d", "a", "a"],
			"commands": [
				"vscode-textobjects.select.next.outer.array",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "a"],
			"commands": [
				"vscode-textobjects.select.next.outer.array",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},

		//SELECT OUTER COMMENT
		{
			"before": ["v", "a", "c"],
			"commands": ["vscode-textobjects.select.next.outer.comment"]
		},
		{
			"before": ["d", "a", "c"],
			"commands": [
				"vscode-textobjects.select.next.outer.comment",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "c"],
			"commands": [
				"vscode-textobjects.select.next.outer.comment",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},

		//SELECT INNER PARAMETERS
		{
			"before": ["v", "i", "p"],
			"commands": ["vscode-textobjects.select.next.inner.parameters"]
		},
		{
			"before": ["d", "i", "p"],
			"commands": [
				"vscode-textobjects.select.next.inner.parameters",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "p"],
			"commands": [
				"vscode-textobjects.select.next.inner.parameters",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER PARAMETERS
		{
			"before": ["v", "a", "p"],
			"commands": ["vscode-textobjects.select.next.outer.parameters"]
		},
		{
			"before": ["d", "a", "p"],
			"commands": [
				"vscode-textobjects.select.next.outer.parameters",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "p"],
			"commands": [
				"vscode-textobjects.select.next.outer.parameters",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER CALL
		{
			"before": ["v", "a", "m"],
			"commands": ["vscode-textobjects.select.next.outer.call"]
		},
		{
			"before": ["d", "a", "m"],
			"commands": [
				"vscode-textobjects.select.next.outer.call",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "m"],
			"commands": [
				"vscode-textobjects.select.next.outer.call",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT INNER CALL
		{
			"before": ["v", "i", "m"],
			"commands": ["vscode-textobjects.select.next.inner.call"]
		},
		{
			"before": ["d", "i", "m"],
			"commands": [
				"vscode-textobjects.select.next.inner.call",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "m"],
			"commands": [
				"vscode-textobjects.select.next.inner.call",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER LOOP
		{
			"before": ["v", "a", "l"],
			"commands": ["vscode-textobjects.select.next.outer.loop"]
		},
		{
			"before": ["d", "a", "l"],
			"commands": [
				"vscode-textobjects.select.next.outer.loop",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "l"],
			"commands": [
				"vscode-textobjects.select.next.outer.loop",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT INNER LOOP
		{
			"before": ["v", "i", "l"],
			"commands": ["vscode-textobjects.select.next.inner.loop"]
		},
		{
			"before": ["d", "i", "l"],
			"commands": [
				"vscode-textobjects.select.next.inner.loop",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "l"],
			"commands": [
				"vscode-textobjects.select.next.inner.loop",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT OUTER FUNCTION
		{
			"before": ["v", "a", "f"],
			"commands": ["vscode-textobjects.select.next.outer.function"]
		},
		{
			"before": ["d", "a", "f"],
			"commands": [
				"vscode-textobjects.select.next.outer.function",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "a", "f"],
			"commands": [
				"vscode-textobjects.select.next.outer.function",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		// SELECT INNER FUNCTION
		{
			"before": ["v", "i", "f"],
			"commands": ["vscode-textobjects.select.next.inner.function"]
		},
		{
			"before": ["d", "i", "f"],
			"commands": [
				"vscode-textobjects.select.next.inner.function",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "f"],
			"commands": [
				"vscode-textobjects.select.next.inner.function",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},

		// PREVIOUS KEYBINDS

		// SELECT PREVIOUS FUNCTION
		{
			"before": ["v", "a", "F"],
			"commands": ["vscode-textobjects.select.previous.outer.function"]
		},
		{
			"before": ["d", "a", "F"],
			"commands": [
				"vscode-textobjects.select.previous.outer.function",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "F"],
			"commands": [
				"vscode-textobjects.select.previous.outer.function",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
		//SELECT PREVIOUS OUTER LOOP
		{
			"before": ["v", "a", "L"],
			"commands": ["vscode-textobjects.select.previous.outer.loop"]
		},
		{
			"before": ["d", "a", "L"],
			"commands": [
				"vscode-textobjects.select.previous.outer.loop",
				{ "command": "vim.remap", "args": { "after": ["d"] } }
			]
		},
		{
			"before": ["c", "i", "L"],
			"commands": [
				"vscode-textobjects.select.previous.outer.loop",
				{ "command": "vim.remap", "args": { "after": ["c"] } }
			]
		},
]

```

## Disclaimer

Although i like this extension, I am uncertain about the development past my needs. Since extension development is not my career (at least not for now). I dont intend to have a lot going on for this extension.

