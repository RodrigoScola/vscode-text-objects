```json
[
	{ "before": ["[", "m"], "commands": ["vscode-textobjects.goTo.next.outer.call"] },
	{ "before": ["[", "M"], "commands": ["vscode-textobjects.goTo.next.inner.call"] },
	//go to previous CALL
	{ "before": ["]", "m"], "commands": ["vscode-textobjects.goTo.previous.outer.call"] },
	{ "before": ["]", "M"], "commands": ["vscode-textobjects.goTo.previous.inner.call"] },
	// go to next FUNCTION
	{ "before": ["[", "f"], "commands": ["vscode-textobjects.goTo.next.outer.function"] },
	{ "before": ["[", "F"], "commands": ["vscode-textobjects.goTo.next.inner.function"] },
	//go to previous FUNCTION
	{ "before": ["]", "f"], "commands": ["vscode-textobjects.goTo.previous.outer.function"] },
	{ "before": ["]", "F"], "commands": ["vscode-textobjects.goTo.previous.inner.function"] },
	// go to next parameters
	{ "before": ["[", "p"], "commands": ["vscode-textobjects.goTo.next.outer.parameters"] },
	{ "before": ["[", "P"], "commands": ["vscode-textobjects.goTo.next.inner.parameters"] },
	//go to previous parameters
	{ "before": ["]", "p"], "commands": ["vscode-textobjects.goTo.previous.outer.parameters"] },
	{ "before": ["]", "P"], "commands": ["vscode-textobjects.goTo.previous.inner.parameters"] },
	// go to next type
	{ "before": ["[", "t"], "commands": ["vscode-textobjects.goTo.next.outer.type"] },
	{ "before": ["[", "T"], "commands": ["vscode-textobjects.goTo.next.inner.type"] },
	//go to previous type
	{ "before": ["]", "t"], "commands": ["vscode-textobjects.goTo.previous.outer.type"] },
	{ "before": ["]", "T"], "commands": ["vscode-textobjects.goTo.previous.inner.type"] },
	// go to next comment
	{ "before": ["[", "c"], "commands": ["vscode-textobjects.goTo.next.outer.comment"] },
	//go to previous comment
	{ "before": ["]", "c"], "commands": ["vscode-textobjects.goTo.previous.outer.comment"] },
	// go to next array
	{ "before": ["[", "a"], "commands": ["vscode-textobjects.goTo.next.outer.array"] },
	{ "before": ["[", "A"], "commands": ["vscode-textobjects.goTo.next.inner.array"] },
	//go to previous array
	{ "before": ["]", "a"], "commands": ["vscode-textobjects.goTo.previous.outer.array"] },
	{ "before": ["]", "A"], "commands": ["vscode-textobjects.goTo.previous.inner.array"] },
	// NEXT class
	{ "before": ["[", "k"], "commands": ["vscode-textobjects.goTo.next.outer.class"] },
	{ "before": ["[", "K"], "commands": ["vscode-textobjects.goTo.next.inner.class"] },
	// PREVIOUS class
	{ "before": ["]", "k"], "commands": ["vscode-textobjects.goTo.previous.outer.class"] },
	{ "before": ["]", "K"], "commands": ["vscode-textobjects.goTo.previous.inner.class"] },
	// NEXT conditional
	{ "before": ["[", "i"], "commands": ["vscode-textobjects.goTo.next.outer.conditional"] },
	{ "before": ["[", "I"], "commands": ["vscode-textobjects.goTo.next.inner.conditional"] },
	// PREVIOUS conditional
	{ "before": ["]", "i"], "commands": ["vscode-textobjects.goTo.previous.outer.conditional"] },
	{ "before": ["]", "I"], "commands": ["vscode-textobjects.goTo.previous.inner.conditional"] },
	// NEXT loop
	{ "before": ["[", "l"], "commands": ["vscode-textobjects.goTo.next.outer.loop"] },
	{ "before": ["[", "L"], "commands": ["vscode-textobjects.goTo.next.inner.loop"] },
	// PREVIOUS loop
	{ "before": ["]", "l"], "commands": ["vscode-textobjects.goTo.previous.outer.loop"] },
	{ "before": ["]", "L"], "commands": ["vscode-textobjects.goTo.previous.inner.loop"] },
	// NEXT string
	{ "before": ["[", "s"], "commands": ["vscode-textobjects.goTo.next.outer.string"] },
	{ "before": ["[", "S"], "commands": ["vscode-textobjects.goTo.next.inner.string"] },
	// PREVIOUS string
	{ "before": ["]", "s"], "commands": ["vscode-textobjects.goTo.previous.outer.string"] },
	{ "before": ["]", "S"], "commands": ["vscode-textobjects.goTo.previous.inner.string"] },
	// NEXT object
	{ "before": ["[", "o"], "commands": ["vscode-textobjects.goTo.next.outer.object"] },
	{ "before": ["[", "O"], "commands": ["vscode-textobjects.goTo.next.inner.object"] },
	// PREVIOUS object
	{ "before": ["]", "o"], "commands": ["vscode-textobjects.goTo.previous.outer.object"] },
	{ "before": ["]", "O"], "commands": ["vscode-textobjects.goTo.previous.inner.object"] },
	// NEXT variable
	{ "before": ["[", "v"], "commands": ["vscode-textobjects.goTo.next.outer.variable"] },
	// PREVIOUS variable
	{ "before": ["]", "v"], "commands": ["vscode-textobjects.goTo.previous.outer.variable"] },
	// NEXT rhs
	{ "before": ["[", "r"], "commands": ["vscode-textobjects.goTo.next.outer.rhs"] },
	{ "before": ["[", "R"], "commands": ["vscode-textobjects.goTo.next.inner.rhs"] },
	// PREVIOUS object
	{ "before": ["]", "r"], "commands": ["vscode-textobjects.goTo.previous.outer.rhs"] },
	{ "before": ["]", "R"], "commands": ["vscode-textobjects.goTo.previous.inner.rhs"] },
	// NEXT lhs
	{ "before": ["[", "h"], "commands": ["vscode-textobjects.goTo.next.outer.lhs"] },
	{ "before": ["[", "H"], "commands": ["vscode-textobjects.goTo.next.inner.lhs"] },
	// PREVIOUS object
	{ "before": ["]", "h"], "commands": ["vscode-textobjects.goTo.previous.outer.lhs"] },
	{ "before": ["]", "H"], "commands": ["vscode-textobjects.goTo.previous.inner.lhs"] },
	// SELECT OUTER TYPE
	{ "before": ["v", "a", "t"], "commands": ["vscode-textobjects.select.next.outer.type"] },
	{
		"before": ["y", "a", "t"],
		"commands": [
			"vscode-textobjects.select.next.outer.type",
			{ "command": "vim.remap", "args": { "after": ["y"] } }
		]
	},
	{
		"before": ["d", "a", "t"],
		"commands": [
			"vscode-textobjects.select.next.outer.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "t"],
		"commands": [
			"vscode-textobjects.select.next.outer.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT INNER TYPE
	{
		"before": ["v", "i", "t"],
		"commands": ["vscode-textobjects.select.next.inner.type"]
	},
	{
		"before": ["y", "i", "t"],
		"commands": [
			"vscode-textobjects.select.next.inner.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "t"],
		"commands": [
			"vscode-textobjects.select.next.inner.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "t"],
		"commands": [
			"vscode-textobjects.select.next.inner.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER VARIABLE
	{ "before": ["v", "a", "v"], "commands": ["vscode-textobjects.select.next.outer.variable"] },
	{
		"before": ["y", "a", "v"],
		"commands": [
			"vscode-textobjects.select.next.outer.variable",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "v"],
		"commands": [
			"vscode-textobjects.select.next.outer.variable",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "v"],
		"commands": [
			"vscode-textobjects.select.next.outer.variable",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER lhs
	{
		"before": ["v", "a", "h"],
		"commands": ["vscode-textobjects.select.next.outer.lhs"]
	},
	{
		"before": ["y", "a", "h"],
		"commands": [
			"vscode-textobjects.select.next.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "h"],
		"commands": [
			"vscode-textobjects.select.next.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "h"],
		"commands": [
			"vscode-textobjects.select.next.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT inner lhs
	{
		"before": ["v", "i", "h"],
		"commands": ["vscode-textobjects.select.next.inner.lhs"]
	},
	{
		"before": ["y", "i", "h"],
		"commands": [
			"vscode-textobjects.select.next.inner.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "h"],
		"commands": [
			"vscode-textobjects.select.next.inner.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "h"],
		"commands": [
			"vscode-textobjects.select.next.inner.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT OUTER lhs
	{
		"before": ["v", "a", "h"],
		"commands": ["vscode-textobjects.select.next.outer.lhs"]
	},
	{
		"before": ["y", "a", "h"],
		"commands": [
			"vscode-textobjects.select.next.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "h"],
		"commands": [
			"vscode-textobjects.select.next.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "h"],
		"commands": [
			"vscode-textobjects.select.next.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT inner lhs
	{
		"before": ["v", "i", "h"],
		"commands": ["vscode-textobjects.select.next.inner.lhs"]
	},
	{
		"before": ["y", "i", "h"],
		"commands": [
			"vscode-textobjects.select.next.inner.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "h"],
		"commands": [
			"vscode-textobjects.select.next.inner.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "h"],
		"commands": [
			"vscode-textobjects.select.next.inner.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT inner RHS
	{
		"before": ["v", "i", "r"],
		"commands": ["vscode-textobjects.select.next.inner.rhs"]
	},
	{
		"before": ["y", "i", "r"],
		"commands": [
			"vscode-textobjects.select.next.inner.rhs",
			{
				"command": "vim.remap",
				"irgs": {
					"ifter": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "r"],
		"commands": [
			"vscode-textobjects.select.next.inner.rhs",
			{
				"command": "vim.remap",
				"irgs": {
					"ifter": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "r"],
		"commands": [
			"vscode-textobjects.select.next.inner.rhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER RHS
	{
		"before": ["v", "a", "r"],
		"commands": ["vscode-textobjects.select.next.outer.rhs"]
	},
	{
		"before": ["y", "a", "r"],
		"commands": [
			"vscode-textobjects.select.next.outer.rhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "r"],
		"commands": [
			"vscode-textobjects.select.next.outer.rhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "r"],
		"commands": [
			"vscode-textobjects.select.next.outer.rhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "i"],
		"commands": [
			"vscode-textobjects.select.next.outer.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "i"],
		"commands": [
			"vscode-textobjects.select.next.outer.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "i"],
		"commands": [
			"vscode-textobjects.select.next.inner.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "i"],
		"commands": [
			"vscode-textobjects.select.next.inner.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT OUTER CLASS
	{
		"before": ["v", "a", "k"],
		"commands": ["vscode-textobjects.select.next.outer.class"]
	},
	{
		"before": ["y", "a", "k"],
		"commands": [
			"vscode-textobjects.select.next.outer.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "k"],
		"commands": [
			"vscode-textobjects.select.next.outer.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "k"],
		"commands": [
			"vscode-textobjects.select.next.outer.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT INNER CLASS
	{
		"before": ["v", "i", "k"],
		"commands": ["vscode-textobjects.select.next.inner.class"]
	},
	{
		"before": ["y", "i", "k"],
		"commands": [
			"vscode-textobjects.select.next.inner.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "k"],
		"commands": [
			"vscode-textobjects.select.next.inner.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "k"],
		"commands": [
			"vscode-textobjects.select.next.inner.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER STRING
	{
		"before": ["v", "a", "s"],
		"commands": ["vscode-textobjects.select.next.outer.string"]
	},
	{
		"before": ["y", "a", "s"],
		"commands": [
			"vscode-textobjects.select.next.outer.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "s"],
		"commands": [
			"vscode-textobjects.select.next.outer.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "s"],
		"commands": [
			"vscode-textobjects.select.next.outer.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT INNER STRING
	{
		"before": ["v", "i", "s"],
		"commands": ["vscode-textobjects.select.next.inner.string"]
	},
	{
		"before": ["y", "i", "s"],
		"commands": [
			"vscode-textobjects.select.next.inner.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "s"],
		"commands": [
			"vscode-textobjects.select.next.inner.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "s"],
		"commands": [
			"vscode-textobjects.select.next.inner.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT inner OBJECT
	{
		"before": ["v", "i", "o"],
		"commands": ["vscode-textobjects.select.next.inner.object"]
	},
	{
		"before": ["y", "i", "o"],
		"commands": [
			"vscode-textobjects.select.next.inner.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "o"],
		"commands": [
			"vscode-textobjects.select.next.inner.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "o"],
		"commands": [
			"vscode-textobjects.select.next.inner.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER OBJECT
	{
		"before": ["v", "a", "o"],
		"commands": ["vscode-textobjects.select.next.outer.object"]
	},
	{
		"before": ["y", "a", "o"],
		"commands": [
			"vscode-textobjects.select.next.outer.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "o"],
		"commands": [
			"vscode-textobjects.select.next.outer.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "o"],
		"commands": [
			"vscode-textobjects.select.next.outer.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT inner ARRAY
	{
		"before": ["v", "i", "a"],
		"commands": ["vscode-textobjects.select.next.inner.array"]
	},
	{
		"before": ["y", "i", "a"],
		"commands": [
			"vscode-textobjects.select.next.inner.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "a"],
		"commands": [
			"vscode-textobjects.select.next.inner.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "a"],
		"commands": [
			"vscode-textobjects.select.next.inner.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER ARRAY
	{
		"before": ["v", "a", "a"],
		"commands": ["vscode-textobjects.select.next.outer.array"]
	},
	{
		"before": ["y", "a", "a"],
		"commands": [
			"vscode-textobjects.select.next.outer.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "a"],
		"commands": [
			"vscode-textobjects.select.next.outer.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "a"],
		"commands": [
			"vscode-textobjects.select.next.outer.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "c"],
		"commands": [
			"vscode-textobjects.select.next.outer.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "c"],
		"commands": [
			"vscode-textobjects.select.next.outer.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	{
		"before": ["v", "i", "c"],
		"commands": ["vscode-textobjects.select.next.inner.comment"]
	},

	{
		"before": ["d", "i", "c"],
		"commands": [
			"vscode-textobjects.select.next.inner.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "c"],
		"commands": [
			"vscode-textobjects.select.next.inner.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "c"],
		"commands": [
			"vscode-textobjects.select.next.inner.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "p"],
		"commands": [
			"vscode-textobjects.select.next.inner.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "p"],
		"commands": [
			"vscode-textobjects.select.next.inner.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "p"],
		"commands": [
			"vscode-textobjects.select.next.outer.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "p"],
		"commands": [
			"vscode-textobjects.select.next.outer.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "m"],
		"commands": [
			"vscode-textobjects.select.next.outer.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "m"],
		"commands": [
			"vscode-textobjects.select.next.outer.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "m"],
		"commands": [
			"vscode-textobjects.select.next.inner.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "m"],
		"commands": [
			"vscode-textobjects.select.next.inner.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "l"],
		"commands": [
			"vscode-textobjects.select.next.outer.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "l"],
		"commands": [
			"vscode-textobjects.select.next.outer.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "l"],
		"commands": [
			"vscode-textobjects.select.next.inner.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "l"],
		"commands": [
			"vscode-textobjects.select.next.inner.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
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
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "f"],
		"commands": [
			"vscode-textobjects.select.next.outer.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "f"],
		"commands": [
			"vscode-textobjects.select.next.outer.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT INNER FUNCTION
	{
		"before": ["v", "i", "f"],
		"commands": ["vscode-textobjects.select.next.inner.function"]
	},
	{
		"before": ["y", "i", "f"],
		"commands": [
			"vscode-textobjects.select.next.inner.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "f"],
		"commands": [
			"vscode-textobjects.select.next.inner.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "f"],
		"commands": [
			"vscode-textobjects.select.next.inner.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// PREVIOUS KEYBINDS

	// SELECT OUTER TYPE
	{
		"before": ["v", "a", "T"],
		"commands": ["vscode-textobjects.select.previous.outer.type"]
	},

	{
		"before": ["d", "a", "T"],
		"commands": [
			"vscode-textobjects.select.previous.outer.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["y", "a", "T"],
		"commands": [
			"vscode-textobjects.select.previous.outer.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "T"],
		"commands": [
			"vscode-textobjects.select.previous.outer.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT INNER TYPE
	{
		"before": ["v", "i", "T"],
		"commands": ["vscode-textobjects.select.previous.inner.type"]
	},

	{
		"before": ["d", "i", "T"],
		"commands": [
			"vscode-textobjects.select.previous.inner.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "T"],
		"commands": [
			"vscode-textobjects.select.previous.inner.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "T"],
		"commands": [
			"vscode-textobjects.select.previous.inner.type",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER VARIABLE
	{
		"before": ["v", "a", "V"],
		"commands": ["vscode-textobjects.select.previous.outer.variable"]
	},

	{
		"before": ["d", "a", "V"],
		"commands": [
			"vscode-textobjects.select.previous.outer.variable",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "V"],
		"commands": [
			"vscode-textobjects.select.previous.outer.variable",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "V"],
		"commands": [
			"vscode-textobjects.select.previous.outer.variable",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER LHS
	{
		"before": ["v", "a", "H"],
		"commands": ["vscode-textobjects.select.previous.outer.lhs"]
	},

	{
		"before": ["d", "a", "H"],
		"commands": [
			"vscode-textobjects.select.previous.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "H"],
		"commands": [
			"vscode-textobjects.select.previous.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "H"],
		"commands": [
			"vscode-textobjects.select.previous.outer.lhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT OUTER RHS
	{
		"before": ["v", "a", "R"],
		"commands": ["vscode-textobjects.select.previous.outer.rhs"]
	},

	{
		"before": ["d", "a", "R"],
		"commands": [
			"vscode-textobjects.select.previous.outer.rhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "R"],
		"commands": [
			"vscode-textobjects.select.previous.outer.rhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "R"],
		"commands": [
			"vscode-textobjects.select.previous.outer.rhs",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECTING OUTER CONDITIONAL
	{
		"before": ["v", "a", "I"],
		"commands": ["vscode-textobjects.select.previous.outer.conditional"]
	},
	{
		"before": ["y", "a", "I"],
		"commands": [
			"vscode-textobjects.select.previous.outer.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "I"],
		"commands": [
			"vscode-textobjects.select.previous.outer.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "I"],
		"commands": [
			"vscode-textobjects.select.previous.outer.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT INNER CONDITIONAL
	{
		"before": ["v", "i", "I"],
		"commands": ["vscode-textobjects.select.previous.inner.conditional"]
	},

	{
		"before": ["d", "i", "I"],
		"commands": [
			"vscode-textobjects.select.previous.inner.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "I"],
		"commands": [
			"vscode-textobjects.select.previous.inner.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "I"],
		"commands": [
			"vscode-textobjects.select.previous.inner.conditional",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	// SELECT OUTER CLASS
	{
		"before": ["v", "a", "K"],
		"commands": ["vscode-textobjects.select.previous.outer.class"]
	},

	{
		"before": ["d", "a", "K"],
		"commands": [
			"vscode-textobjects.select.previous.outer.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "K"],
		"commands": [
			"vscode-textobjects.select.previous.outer.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "K"],
		"commands": [
			"vscode-textobjects.select.previous.outer.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT INNER CLASS
	{
		"before": ["v", "i", "K"],
		"commands": ["vscode-textobjects.select.previous.inner.class"]
	},

	{
		"before": ["d", "i", "K"],
		"commands": [
			"vscode-textobjects.select.previous.inner.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "K"],
		"commands": [
			"vscode-textobjects.select.previous.inner.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "K"],
		"commands": [
			"vscode-textobjects.select.previous.inner.class",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER STRING
	{
		"before": ["v", "a", "S"],
		"commands": ["vscode-textobjects.select.previous.outer.string"]
	},

	{
		"before": ["d", "a", "S"],
		"commands": [
			"vscode-textobjects.select.previous.outer.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "S"],
		"commands": [
			"vscode-textobjects.select.previous.outer.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "S"],
		"commands": [
			"vscode-textobjects.select.previous.outer.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT INNER STRING
	{
		"before": ["v", "i", "S"],
		"commands": ["vscode-textobjects.select.previous.inner.string"]
	},

	{
		"before": ["d", "i", "S"],
		"commands": [
			"vscode-textobjects.select.previous.inner.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "i", "S"],
		"commands": [
			"vscode-textobjects.select.previous.inner.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "S"],
		"commands": [
			"vscode-textobjects.select.previous.inner.string",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER OBJECT
	{
		"before": ["v", "a", "O"],
		"commands": ["vscode-textobjects.select.previous.outer.object"]
	},

	{
		"before": ["d", "a", "O"],
		"commands": [
			"vscode-textobjects.select.previous.outer.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "O"],
		"commands": [
			"vscode-textobjects.select.previous.outer.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "O"],
		"commands": [
			"vscode-textobjects.select.previous.outer.object",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER ARRAY
	{
		"before": ["v", "a", "A"],
		"commands": ["vscode-textobjects.select.previous.outer.array"]
	},
	{
		"before": ["y", "a", "A"],
		"commands": [
			"vscode-textobjects.select.previous.outer.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "A"],
		"commands": [
			"vscode-textobjects.select.previous.outer.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "A"],
		"commands": [
			"vscode-textobjects.select.previous.outer.array",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	//SELECT OUTER COMMENT
	{
		"before": ["v", "a", "C"],
		"commands": ["vscode-textobjects.select.previous.outer.comment"]
	},
	{
		"before": ["y", "a", "C"],
		"commands": [
			"vscode-textobjects.select.previous.outer.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "a", "C"],
		"commands": [
			"vscode-textobjects.select.previous.outer.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "a", "C"],
		"commands": [
			"vscode-textobjects.select.previous.outer.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	//SELECT inner COMMENT
	{
		"before": ["v", "i", "C"],
		"commands": ["vscode-textobjects.select.previous.inner.comment"]
	},
	{
		"before": ["y", "i", "C"],
		"commands": [
			"vscode-textobjects.select.previous.inner.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "C"],
		"commands": [
			"vscode-textobjects.select.previous.inner.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "C"],
		"commands": [
			"vscode-textobjects.select.previous.inner.comment",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	//SELECT INNER PARAMETERS
	{
		"before": ["v", "i", "P"],
		"commands": ["vscode-textobjects.select.previous.inner.parameters"]
	},
	{
		"before": ["y", "i", "P"],
		"commands": [
			"vscode-textobjects.select.previous.inner.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	{
		"before": ["d", "i", "P"],
		"commands": [
			"vscode-textobjects.select.previous.inner.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	{
		"before": ["c", "i", "P"],
		"commands": [
			"vscode-textobjects.select.previous.inner.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	// SELECT OUTER PARAMETERS
	{
		"before": ["v", "a", "P"],
		"commands": ["vscode-textobjects.select.previous.outer.parameters"]
	},
	{
		"before": ["d", "a", "P"],
		"commands": [
			"vscode-textobjects.select.previous.outer.parameters",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},

	// SELECT OUTER CALL
	{
		"before": ["v", "a", "M"],
		"commands": ["vscode-textobjects.select.previous.outer.call"]
	},
	{
		"before": ["d", "a", "M"],
		"commands": [
			"vscode-textobjects.select.previous.outer.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "M"],
		"commands": [
			"vscode-textobjects.select.previous.outer.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "M"],
		"commands": [
			"vscode-textobjects.select.previous.outer.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	// SELECT INNER CALL
	{
		"before": ["v", "i", "M"],
		"commands": ["vscode-textobjects.select.previous.inner.call"]
	},
	{
		"before": ["d", "i", "M"],
		"commands": [
			"vscode-textobjects.select.previous.inner.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "M"],
		"commands": [
			"vscode-textobjects.select.previous.inner.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	{
		"before": ["y", "i", "M"],
		"commands": [
			"vscode-textobjects.select.previous.inner.call",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	// SELECT OUTER LOOP
	{
		"before": ["v", "a", "L"],
		"commands": ["vscode-textobjects.select.previous.outer.loop"]
	},
	{
		"before": ["d", "a", "L"],
		"commands": [
			"vscode-textobjects.select.previous.outer.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "L"],
		"commands": [
			"vscode-textobjects.select.previous.outer.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "L"],
		"commands": [
			"vscode-textobjects.select.previous.outer.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	// SELECT INNER LOOP
	{
		"before": ["v", "i", "L"],
		"commands": ["vscode-textobjects.select.previous.inner.loop"]
	},
	{
		"before": ["d", "i", "L"],
		"commands": [
			"vscode-textobjects.select.previous.inner.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "L"],
		"commands": [
			"vscode-textobjects.select.previous.inner.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	{
		"before": ["y", "i", "L"],
		"commands": [
			"vscode-textobjects.select.previous.inner.loop",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	// SELECT OUTER FUNCTION
	{
		"before": ["v", "a", "F"],
		"commands": ["vscode-textobjects.select.previous.outer.function"]
	},
	{
		"before": ["d", "a", "F"],
		"commands": [
			"vscode-textobjects.select.previous.outer.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["c", "a", "F"],
		"commands": [
			"vscode-textobjects.select.previous.outer.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},
	{
		"before": ["y", "a", "F"],
		"commands": [
			"vscode-textobjects.select.previous.outer.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	},
	// SELECT INNER FUNCTION
	{
		"before": ["v", "i", "F"],
		"commands": ["vscode-textobjects.select.previous.inner.function"]
	},
	{
		"before": ["d", "i", "F"],
		"commands": [
			"vscode-textobjects.select.previous.inner.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["d"]
				}
			}
		]
	},
	{
		"before": ["c", "i", "F"],
		"commands": [
			"vscode-textobjects.select.previous.inner.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["c"]
				}
			}
		]
	},

	{
		"before": ["y", "i", "F"],
		"commands": [
			"vscode-textobjects.select.previous.inner.function",
			{
				"command": "vim.remap",
				"args": {
					"after": ["y"]
				}
			}
		]
	}
]
```
