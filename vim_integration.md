# Vim Integration

If you are working with in vim, i would highly recommend you to add this in your `settings.json` file. This has been a game changer for me and the reason that i have been loving using and making the extension for the last couple of months.

Just copy the json at the end of the file into your `vim.normalModeKeyBindings` and you are good to go!

# Removing commands

If you dont like a specific command on this extension. You can just remove it from your configuration file.

# Changing command motions

Some commands

```json
[
	{
		"before": ["v", "a", "f"],
		"commands": ["vscode-textobjects.select.next.outer.function"]
	},
	{
		"before": ["v", "i", "f"],
		"commands": ["vscode-textobjects.select.next.inner.function"]
	},
	{
		"before": ["v", "a", "l"],
		"commands": ["vscode-textobjects.select.next.outer.loop"]
	},
	{
		"before": ["v", "i", "l"],
		"commands": ["vscode-textobjects.select.next.inner.loop"]
	},
	{
		"before": ["v", "a", "i"],
		"commands": ["vscode-textobjects.select.next.outer.conditional"]
	},
	{
		"before": ["v", "i", "i"],
		"commands": ["vscode-textobjects.select.next.inner.conditional"]
	},
	{
		"before": ["v", "a", "r"],
		"commands": ["vscode-textobjects.select.next.outer.rhs"]
	},
	{
		"before": ["v", "i", "r"],
		"commands": ["vscode-textobjects.select.next.inner.rhs"]
	},
	{
		"before": ["v", "a", "h"],
		"commands": ["vscode-textobjects.select.next.outer.lhs"]
	},
	{
		"before": ["v", "i", "h"],
		"commands": ["vscode-textobjects.select.next.inner.lhs"]
	},
	{
		"before": ["v", "a", "v"],
		"commands": ["vscode-textobjects.select.next.outer.variable"]
	},
	{
		"before": ["v", "a", "s"],
		"commands": ["vscode-textobjects.select.next.outer.string"]
	},
	{
		"before": ["v", "i", "s"],
		"commands": ["vscode-textobjects.select.next.inner.string"]
	},
	{
		"before": ["v", "a", "k"],
		"commands": ["vscode-textobjects.select.next.outer.class"]
	},
	{
		"before": ["v", "i", "k"],
		"commands": ["vscode-textobjects.select.next.inner.class"]
	},
	{
		"before": ["v", "a", "a"],
		"commands": ["vscode-textobjects.select.next.outer.array"]
	},
	{
		"before": ["v", "i", "a"],
		"commands": ["vscode-textobjects.select.next.inner.array"]
	},
	{
		"before": ["v", "a", "o"],
		"commands": ["vscode-textobjects.select.next.outer.object"]
	},
	{
		"before": ["v", "i", "o"],
		"commands": ["vscode-textobjects.select.next.inner.object"]
	},
	{
		"before": ["v", "a", "p"],
		"commands": ["vscode-textobjects.select.next.outer.parameters"]
	},
	{
		"before": ["v", "i", "p"],
		"commands": ["vscode-textobjects.select.next.inner.parameters"]
	},
	{
		"before": ["v", "a", "m"],
		"commands": ["vscode-textobjects.select.next.outer.call"]
	},
	{
		"before": ["v", "i", "m"],
		"commands": ["vscode-textobjects.select.next.inner.call"]
	},
	{
		"before": ["v", "a", "t"],
		"commands": ["vscode-textobjects.select.next.outer.type"]
	},
	{
		"before": ["v", "i", "t"],
		"commands": ["vscode-textobjects.select.next.inner.type"]
	},
	{
		"before": ["v", "a", "c"],
		"commands": ["vscode-textobjects.select.next.outer.comment"]
	},
	{
		"before": ["v", "i", "c"],
		"commands": ["vscode-textobjects.select.next.inner.comment"]
	},
	{
		"before": ["v", "a", "F"],
		"commands": ["vscode-textobjects.select.previous.outer.function"]
	},
	{
		"before": ["v", "i", "F"],
		"commands": ["vscode-textobjects.select.previous.inner.function"]
	},
	{
		"before": ["v", "a", "L"],
		"commands": ["vscode-textobjects.select.previous.outer.loop"]
	},
	{
		"before": ["v", "i", "L"],
		"commands": ["vscode-textobjects.select.previous.inner.loop"]
	},
	{
		"before": ["v", "a", "I"],
		"commands": ["vscode-textobjects.select.previous.outer.conditional"]
	},
	{
		"before": ["v", "i", "I"],
		"commands": ["vscode-textobjects.select.previous.inner.conditional"]
	},
	{
		"before": ["v", "a", "R"],
		"commands": ["vscode-textobjects.select.previous.outer.rhs"]
	},
	{
		"before": ["v", "i", "R"],
		"commands": ["vscode-textobjects.select.previous.inner.rhs"]
	},
	{
		"before": ["v", "a", "H"],
		"commands": ["vscode-textobjects.select.previous.outer.lhs"]
	},
	{
		"before": ["v", "i", "H"],
		"commands": ["vscode-textobjects.select.previous.inner.lhs"]
	},
	{
		"before": ["v", "a", "V"],
		"commands": ["vscode-textobjects.select.previous.outer.variable"]
	},
	{
		"before": ["v", "a", "S"],
		"commands": ["vscode-textobjects.select.previous.outer.string"]
	},
	{
		"before": ["v", "i", "S"],
		"commands": ["vscode-textobjects.select.previous.inner.string"]
	},
	{
		"before": ["v", "a", "K"],
		"commands": ["vscode-textobjects.select.previous.outer.class"]
	},
	{
		"before": ["v", "i", "K"],
		"commands": ["vscode-textobjects.select.previous.inner.class"]
	},
	{
		"before": ["v", "a", "A"],
		"commands": ["vscode-textobjects.select.previous.outer.array"]
	},
	{
		"before": ["v", "i", "A"],
		"commands": ["vscode-textobjects.select.previous.inner.array"]
	},
	{
		"before": ["v", "a", "O"],
		"commands": ["vscode-textobjects.select.previous.outer.object"]
	},
	{
		"before": ["v", "i", "O"],
		"commands": ["vscode-textobjects.select.previous.inner.object"]
	},
	{
		"before": ["v", "i", "P"],
		"commands": ["vscode-textobjects.select.previous.inner.parameters"]
	},
	{
		"before": ["v", "a", "P"],
		"commands": ["vscode-textobjects.select.previous.outer.parameters"]
	},
	{
		"before": ["v", "a", "M"],
		"commands": ["vscode-textobjects.select.previous.outer.call"]
	},
	{
		"before": ["v", "i", "M"],
		"commands": ["vscode-textobjects.select.previous.inner.call"]
	},
	{
		"before": ["v", "a", "T"],
		"commands": ["vscode-textobjects.select.previous.outer.type"]
	},
	{
		"before": ["v", "i", "T"],
		"commands": ["vscode-textobjects.select.previous.inner.type"]
	},
	{
		"before": ["v", "a", "C"],
		"commands": ["vscode-textobjects.select.previous.outer.comment"]
	},
	{
		"before": ["v", "i", "C"],
		"commands": ["vscode-textobjects.select.previous.inner.comment"]
	},
	{
		"before": ["[", "f"],
		"commands": ["vscode-textobjects.goTo.next.outer.function"]
	},
	{
		"before": ["[", "F"],
		"commands": ["vscode-textobjects.goTo.next.inner.function"]
	},
	{
		"before": ["[", "l"],
		"commands": ["vscode-textobjects.goTo.next.outer.loop"]
	},
	{
		"before": ["[", "L"],
		"commands": ["vscode-textobjects.goTo.next.inner.loop"]
	},
	{
		"before": ["[", "i"],
		"commands": ["vscode-textobjects.goTo.next.outer.conditional"]
	},
	{
		"before": ["[", "I"],
		"commands": ["vscode-textobjects.goTo.next.inner.conditional"]
	},
	{
		"before": ["[", "r"],
		"commands": ["vscode-textobjects.goTo.next.outer.rhs"]
	},
	{
		"before": ["[", "R"],
		"commands": ["vscode-textobjects.goTo.next.inner.rhs"]
	},
	{
		"before": ["[", "h"],
		"commands": ["vscode-textobjects.goTo.next.outer.lhs"]
	},
	{
		"before": ["[", "H"],
		"commands": ["vscode-textobjects.goTo.next.inner.lhs"]
	},
	{
		"before": ["[", "v"],
		"commands": ["vscode-textobjects.goTo.next.outer.variable"]
	},
	{
		"before": ["[", "s"],
		"commands": ["vscode-textobjects.goTo.next.outer.string"]
	},
	{
		"before": ["[", "S"],
		"commands": ["vscode-textobjects.goTo.next.inner.string"]
	},
	{
		"before": ["[", "k"],
		"commands": ["vscode-textobjects.goTo.next.outer.class"]
	},
	{
		"before": ["[", "K"],
		"commands": ["vscode-textobjects.goTo.next.inner.class"]
	},
	{
		"before": ["[", "a"],
		"commands": ["vscode-textobjects.goTo.next.outer.array"]
	},
	{
		"before": ["[", "A"],
		"commands": ["vscode-textobjects.goTo.next.inner.array"]
	},
	{
		"before": ["[", "o"],
		"commands": ["vscode-textobjects.goTo.next.outer.object"]
	},
	{
		"before": ["[", "O"],
		"commands": ["vscode-textobjects.goTo.next.inner.object"]
	},
	{
		"before": ["[", "p"],
		"commands": ["vscode-textobjects.goTo.next.outer.parameters"]
	},
	{
		"before": ["[", "P"],
		"commands": ["vscode-textobjects.goTo.next.inner.parameters"]
	},
	{
		"before": ["[", "m"],
		"commands": ["vscode-textobjects.goTo.next.outer.call"]
	},
	{
		"before": ["[", "M"],
		"commands": ["vscode-textobjects.goTo.next.inner.call"]
	},
	{
		"before": ["[", "t"],
		"commands": ["vscode-textobjects.goTo.next.outer.type"]
	},
	{
		"before": ["[", "T"],
		"commands": ["vscode-textobjects.goTo.next.inner.type"]
	},
	{
		"before": ["[", "c"],
		"commands": ["vscode-textobjects.goTo.next.outer.comment"]
	},
	{
		"before": ["[", "C"],
		"commands": ["vscode-textobjects.goTo.next.inner.comment"]
	},
	{
		"before": ["]", "f"],
		"commands": ["vscode-textobjects.goTo.previous.outer.function"]
	},
	{
		"before": ["]", "F"],
		"commands": ["vscode-textobjects.goTo.previous.inner.function"]
	},
	{
		"before": ["]", "l"],
		"commands": ["vscode-textobjects.goTo.previous.outer.loop"]
	},
	{
		"before": ["]", "L"],
		"commands": ["vscode-textobjects.goTo.previous.inner.loop"]
	},
	{
		"before": ["]", "i"],
		"commands": ["vscode-textobjects.goTo.previous.outer.conditional"]
	},
	{
		"before": ["]", "I"],
		"commands": ["vscode-textobjects.goTo.previous.inner.conditional"]
	},
	{
		"before": ["]", "r"],
		"commands": ["vscode-textobjects.goTo.previous.outer.rhs"]
	},
	{
		"before": ["]", "R"],
		"commands": ["vscode-textobjects.goTo.previous.inner.rhs"]
	},
	{
		"before": ["]", "h"],
		"commands": ["vscode-textobjects.goTo.previous.outer.lhs"]
	},
	{
		"before": ["]", "H"],
		"commands": ["vscode-textobjects.goTo.previous.inner.lhs"]
	},
	{
		"before": ["]", "v"],
		"commands": ["vscode-textobjects.goTo.previous.outer.variable"]
	},
	{
		"before": ["]", "s"],
		"commands": ["vscode-textobjects.goTo.previous.outer.string"]
	},
	{
		"before": ["]", "S"],
		"commands": ["vscode-textobjects.goTo.previous.inner.string"]
	},
	{
		"before": ["]", "k"],
		"commands": ["vscode-textobjects.goTo.previous.outer.class"]
	},
	{
		"before": ["]", "K"],
		"commands": ["vscode-textobjects.goTo.previous.inner.class"]
	},
	{
		"before": ["]", "a"],
		"commands": ["vscode-textobjects.goTo.previous.outer.array"]
	},
	{
		"before": ["]", "A"],
		"commands": ["vscode-textobjects.goTo.previous.inner.array"]
	},
	{
		"before": ["]", "o"],
		"commands": ["vscode-textobjects.goTo.previous.outer.object"]
	},
	{
		"before": ["]", "O"],
		"commands": ["vscode-textobjects.goTo.previous.inner.object"]
	},
	{
		"before": ["]", "P"],
		"commands": ["vscode-textobjects.goTo.previous.inner.parameters"]
	},
	{
		"before": ["]", "p"],
		"commands": ["vscode-textobjects.goTo.previous.outer.parameters"]
	},
	{
		"before": ["]", "m"],
		"commands": ["vscode-textobjects.goTo.previous.outer.call"]
	},
	{
		"before": ["]", "M"],
		"commands": ["vscode-textobjects.goTo.previous.inner.call"]
	},
	{
		"before": ["]", "t"],
		"commands": ["vscode-textobjects.goTo.previous.outer.type"]
	},
	{
		"before": ["]", "T"],
		"commands": ["vscode-textobjects.goTo.previous.inner.type"]
	},
	{
		"before": ["]", "c"],
		"commands": ["vscode-textobjects.goTo.previous.outer.comment"]
	},
	{
		"before": ["]", "C"],
		"commands": ["vscode-textobjects.goTo.previous.inner.comment"]
	},
	{
		"before": ["d", "a", "f"],
		"commands": ["vscode-textobjects.delete.next.outer.function"]
	},
	{
		"before": ["d", "i", "f"],
		"commands": ["vscode-textobjects.delete.next.inner.function"]
	},
	{
		"before": ["d", "a", "l"],
		"commands": ["vscode-textobjects.delete.next.outer.loop"]
	},
	{
		"before": ["d", "i", "l"],
		"commands": ["vscode-textobjects.delete.next.inner.loop"]
	},
	{
		"before": ["d", "a", "i"],
		"commands": ["vscode-textobjects.delete.next.outer.conditional"]
	},
	{
		"before": ["d", "i", "i"],
		"commands": ["vscode-textobjects.delete.next.inner.conditional"]
	},
	{
		"before": ["d", "a", "r"],
		"commands": ["vscode-textobjects.delete.next.outer.rhs"]
	},
	{
		"before": ["d", "i", "r"],
		"commands": ["vscode-textobjects.delete.next.inner.rhs"]
	},
	{
		"before": ["d", "a", "h"],
		"commands": ["vscode-textobjects.delete.next.outer.lhs"]
	},
	{
		"before": ["d", "i", "h"],
		"commands": ["vscode-textobjects.delete.next.inner.lhs"]
	},
	{
		"before": ["d", "a", "v"],
		"commands": ["vscode-textobjects.delete.next.outer.variable"]
	},
	{
		"before": ["d", "a", "s"],
		"commands": ["vscode-textobjects.delete.next.outer.string"]
	},
	{
		"before": ["d", "i", "s"],
		"commands": ["vscode-textobjects.delete.next.inner.string"]
	},
	{
		"before": ["d", "a", "k"],
		"commands": ["vscode-textobjects.delete.next.outer.class"]
	},
	{
		"before": ["d", "i", "k"],
		"commands": ["vscode-textobjects.delete.next.inner.class"]
	},
	{
		"before": ["d", "a", "a"],
		"commands": ["vscode-textobjects.delete.next.outer.array"]
	},
	{
		"before": ["d", "i", "a"],
		"commands": ["vscode-textobjects.delete.next.inner.array"]
	},
	{
		"before": ["d", "a", "o"],
		"commands": ["vscode-textobjects.delete.next.outer.object"]
	},
	{
		"before": ["d", "i", "o"],
		"commands": ["vscode-textobjects.delete.next.inner.object"]
	},
	{
		"before": ["d", "a", "p"],
		"commands": ["vscode-textobjects.delete.next.outer.parameters"]
	},
	{
		"before": ["d", "i", "p"],
		"commands": ["vscode-textobjects.delete.next.inner.parameters"]
	},
	{
		"before": ["d", "a", "m"],
		"commands": ["vscode-textobjects.delete.next.outer.call"]
	},
	{
		"before": ["d", "i", "m"],
		"commands": ["vscode-textobjects.delete.next.inner.call"]
	},
	{
		"before": ["d", "a", "t"],
		"commands": ["vscode-textobjects.delete.next.outer.type"]
	},
	{
		"before": ["d", "i", "t"],
		"commands": ["vscode-textobjects.delete.next.inner.type"]
	},
	{
		"before": ["d", "a", "c"],
		"commands": ["vscode-textobjects.delete.next.outer.comment"]
	},
	{
		"before": ["d", "i", "c"],
		"commands": ["vscode-textobjects.delete.next.inner.comment"]
	},
	{
		"before": ["d", "a", "F"],
		"commands": ["vscode-textobjects.delete.previous.outer.function"]
	},
	{
		"before": ["d", "i", "F"],
		"commands": ["vscode-textobjects.delete.previous.inner.function"]
	},
	{
		"before": ["d", "a", "L"],
		"commands": ["vscode-textobjects.delete.previous.outer.loop"]
	},
	{
		"before": ["d", "i", "L"],
		"commands": ["vscode-textobjects.delete.previous.inner.loop"]
	},
	{
		"before": ["d", "a", "I"],
		"commands": ["vscode-textobjects.delete.previous.outer.conditional"]
	},
	{
		"before": ["d", "i", "I"],
		"commands": ["vscode-textobjects.delete.previous.inner.conditional"]
	},
	{
		"before": ["d", "a", "R"],
		"commands": ["vscode-textobjects.delete.previous.outer.rhs"]
	},
	{
		"before": ["d", "i", "R"],
		"commands": ["vscode-textobjects.delete.previous.inner.rhs"]
	},
	{
		"before": ["d", "a", "H"],
		"commands": ["vscode-textobjects.delete.previous.outer.lhs"]
	},
	{
		"before": ["d", "i", "H"],
		"commands": ["vscode-textobjects.delete.previous.inner.lhs"]
	},
	{
		"before": ["d", "a", "V"],
		"commands": ["vscode-textobjects.delete.previous.outer.variable"]
	},
	{
		"before": ["d", "a", "S"],
		"commands": ["vscode-textobjects.delete.previous.outer.string"]
	},
	{
		"before": ["d", "i", "S"],
		"commands": ["vscode-textobjects.delete.previous.inner.string"]
	},
	{
		"before": ["d", "a", "K"],
		"commands": ["vscode-textobjects.delete.previous.outer.class"]
	},
	{
		"before": ["d", "i", "K"],
		"commands": ["vscode-textobjects.delete.previous.inner.class"]
	},
	{
		"before": ["d", "a", "A"],
		"commands": ["vscode-textobjects.delete.previous.outer.array"]
	},
	{
		"before": ["d", "i", "A"],
		"commands": ["vscode-textobjects.delete.previous.inner.array"]
	},
	{
		"before": ["d", "a", "O"],
		"commands": ["vscode-textobjects.delete.previous.outer.object"]
	},
	{
		"before": ["d", "i", "O"],
		"commands": ["vscode-textobjects.delete.previous.inner.object"]
	},
	{
		"before": ["d", "a", "P"],
		"commands": ["vscode-textobjects.delete.previous.outer.parameters"]
	},
	{
		"before": ["d", "i", "P"],
		"commands": ["vscode-textobjects.delete.previous.inner.parameters"]
	},
	{
		"before": ["d", "a", "M"],
		"commands": ["vscode-textobjects.delete.previous.outer.call"]
	},
	{
		"before": ["d", "i", "M"],
		"commands": ["vscode-textobjects.delete.previous.inner.call"]
	},
	{
		"before": ["d", "a", "T"],
		"commands": ["vscode-textobjects.delete.previous.outer.type"]
	},
	{
		"before": ["d", "i", "T"],
		"commands": ["vscode-textobjects.delete.previous.inner.type"]
	},
	{
		"before": ["d", "a", "C"],
		"commands": ["vscode-textobjects.delete.previous.outer.comment"]
	},
	{
		"before": ["d", "i", "C"],
		"commands": ["vscode-textobjects.delete.previous.inner.comment"]
	},
	{
		"before": ["y", "a", "f"],
		"commands": ["vscode-textobjects.yank.next.outer.function"]
	},
	{
		"before": ["y", "i", "f"],
		"commands": ["vscode-textobjects.yank.next.inner.function"]
	},
	{
		"before": ["y", "a", "l"],
		"commands": ["vscode-textobjects.yank.next.outer.loop"]
	},
	{
		"before": ["y", "i", "l"],
		"commands": ["vscode-textobjects.yank.next.inner.loop"]
	},
	{
		"before": ["y", "a", "i"],
		"commands": ["vscode-textobjects.yank.next.outer.conditional"]
	},
	{
		"before": ["y", "i", "i"],
		"commands": ["vscode-textobjects.yank.next.inner.conditional"]
	},
	{
		"before": ["y", "a", "r"],
		"commands": ["vscode-textobjects.yank.next.outer.rhs"]
	},
	{
		"before": ["y", "i", "r"],
		"commands": ["vscode-textobjects.yank.next.inner.rhs"]
	},
	{
		"before": ["y", "a", "h"],
		"commands": ["vscode-textobjects.yank.next.outer.lhs"]
	},
	{
		"before": ["y", "i", "h"],
		"commands": ["vscode-textobjects.yank.next.inner.lhs"]
	},
	{
		"before": ["y", "a", "v"],
		"commands": ["vscode-textobjects.yank.next.outer.variable"]
	},
	{
		"before": ["y", "a", "s"],
		"commands": ["vscode-textobjects.yank.next.outer.string"]
	},
	{
		"before": ["y", "i", "s"],
		"commands": ["vscode-textobjects.yank.next.inner.string"]
	},
	{
		"before": ["y", "a", "k"],
		"commands": ["vscode-textobjects.yank.next.outer.class"]
	},
	{
		"before": ["y", "i", "k"],
		"commands": ["vscode-textobjects.yank.next.inner.class"]
	},
	{
		"before": ["y", "a", "a"],
		"commands": ["vscode-textobjects.yank.next.outer.array"]
	},
	{
		"before": ["y", "i", "a"],
		"commands": ["vscode-textobjects.yank.next.inner.array"]
	},
	{
		"before": ["y", "a", "o"],
		"commands": ["vscode-textobjects.yank.next.outer.object"]
	},
	{
		"before": ["y", "i", "o"],
		"commands": ["vscode-textobjects.yank.next.inner.object"]
	},
	{
		"before": ["y", "a", "p"],
		"commands": ["vscode-textobjects.yank.next.outer.parameters"]
	},
	{
		"before": ["y", "i", "p"],
		"commands": ["vscode-textobjects.yank.next.inner.parameters"]
	},
	{
		"before": ["y", "a", "m"],
		"commands": ["vscode-textobjects.yank.next.outer.call"]
	},
	{
		"before": ["y", "i", "m"],
		"commands": ["vscode-textobjects.yank.next.inner.call"]
	},
	{
		"before": ["y", "a", "t"],
		"commands": ["vscode-textobjects.yank.next.outer.type"]
	},
	{
		"before": ["y", "i", "t"],
		"commands": ["vscode-textobjects.yank.next.inner.type"]
	},
	{
		"before": ["y", "a", "c"],
		"commands": ["vscode-textobjects.yank.next.outer.comment"]
	},
	{
		"before": ["y", "i", "c"],
		"commands": ["vscode-textobjects.yank.next.inner.comment"]
	},
	{
		"before": ["y", "a", "F"],
		"commands": ["vscode-textobjects.yank.previous.outer.function"]
	},
	{
		"before": ["y", "i", "F"],
		"commands": ["vscode-textobjects.yank.previous.inner.function"]
	},
	{
		"before": ["y", "a", "L"],
		"commands": ["vscode-textobjects.yank.previous.outer.loop"]
	},
	{
		"before": ["y", "i", "L"],
		"commands": ["vscode-textobjects.yank.previous.inner.loop"]
	},
	{
		"before": ["y", "a", "I"],
		"commands": ["vscode-textobjects.yank.previous.outer.conditional"]
	},
	{
		"before": ["y", "i", "I"],
		"commands": ["vscode-textobjects.yank.previous.inner.conditional"]
	},
	{
		"before": ["y", "a", "R"],
		"commands": ["vscode-textobjects.yank.previous.outer.rhs"]
	},
	{
		"before": ["y", "i", "R"],
		"commands": ["vscode-textobjects.yank.previous.inner.rhs"]
	},
	{
		"before": ["y", "a", "H"],
		"commands": ["vscode-textobjects.yank.previous.outer.lhs"]
	},
	{
		"before": ["y", "i", "H"],
		"commands": ["vscode-textobjects.yank.previous.inner.lhs"]
	},
	{
		"before": ["y", "a", "V"],
		"commands": ["vscode-textobjects.yank.previous.outer.variable"]
	},
	{
		"before": ["y", "a", "S"],
		"commands": ["vscode-textobjects.yank.previous.outer.string"]
	},
	{
		"before": ["y", "i", "S"],
		"commands": ["vscode-textobjects.yank.previous.inner.string"]
	},
	{
		"before": ["y", "a", "K"],
		"commands": ["vscode-textobjects.yank.previous.outer.class"]
	},
	{
		"before": ["y", "i", "K"],
		"commands": ["vscode-textobjects.yank.previous.inner.class"]
	},
	{
		"before": ["y", "a", "A"],
		"commands": ["vscode-textobjects.yank.previous.outer.array"]
	},
	{
		"before": ["y", "i", "A"],
		"commands": ["vscode-textobjects.yank.previous.inner.array"]
	},
	{
		"before": ["y", "a", "O"],
		"commands": ["vscode-textobjects.yank.previous.outer.object"]
	},
	{
		"before": ["y", "i", "O"],
		"commands": ["vscode-textobjects.yank.previous.inner.object"]
	},
	{
		"before": ["y", "a", "P"],
		"commands": ["vscode-textobjects.yank.previous.outer.parameters"]
	},
	{
		"before": ["y", "i", "P"],
		"commands": ["vscode-textobjects.yank.previous.inner.parameters"]
	},
	{
		"before": ["y", "a", "M"],
		"commands": ["vscode-textobjects.yank.previous.outer.call"]
	},
	{
		"before": ["y", "i", "M"],
		"commands": ["vscode-textobjects.yank.previous.inner.call"]
	},
	{
		"before": ["y", "a", "T"],
		"commands": ["vscode-textobjects.yank.previous.outer.type"]
	},
	{
		"before": ["y", "i", "T"],
		"commands": ["vscode-textobjects.yank.previous.inner.type"]
	},
	{
		"before": ["y", "a", "C"],
		"commands": ["vscode-textobjects.yank.previous.outer.comment"]
	},
	{
		"before": ["y", "i", "C"],
		"commands": ["vscode-textobjects.yank.previous.inner.comment"]
	},
	{
		"before": ["c", "a", "f"],
		"commands": ["vscode-textobjects.change.next.outer.function"]
	},
	{
		"before": ["c", "i", "f"],
		"commands": ["vscode-textobjects.change.next.inner.function"]
	},
	{
		"before": ["c", "a", "l"],
		"commands": ["vscode-textobjects.change.next.outer.loop"]
	},
	{
		"before": ["c", "i", "l"],
		"commands": ["vscode-textobjects.change.next.inner.loop"]
	},
	{
		"before": ["c", "a", "i"],
		"commands": ["vscode-textobjects.change.next.outer.conditional"]
	},
	{
		"before": ["c", "i", "i"],
		"commands": ["vscode-textobjects.change.next.inner.conditional"]
	},
	{
		"before": ["c", "a", "r"],
		"commands": ["vscode-textobjects.change.next.outer.rhs"]
	},
	{
		"before": ["c", "i", "r"],
		"commands": ["vscode-textobjects.change.next.inner.rhs"]
	},
	{
		"before": ["c", "a", "h"],
		"commands": ["vscode-textobjects.change.next.outer.lhs"]
	},
	{
		"before": ["c", "i", "h"],
		"commands": ["vscode-textobjects.change.next.inner.lhs"]
	},
	{
		"before": ["c", "a", "v"],
		"commands": ["vscode-textobjects.change.next.outer.variable"]
	},
	{
		"before": ["c", "a", "s"],
		"commands": ["vscode-textobjects.change.next.outer.string"]
	},
	{
		"before": ["c", "i", "s"],
		"commands": ["vscode-textobjects.change.next.inner.string"]
	},
	{
		"before": ["c", "a", "k"],
		"commands": ["vscode-textobjects.change.next.outer.class"]
	},
	{
		"before": ["c", "i", "k"],
		"commands": ["vscode-textobjects.change.next.inner.class"]
	},
	{
		"before": ["c", "a", "a"],
		"commands": ["vscode-textobjects.change.next.outer.array"]
	},
	{
		"before": ["c", "i", "a"],
		"commands": ["vscode-textobjects.change.next.inner.array"]
	},
	{
		"before": ["c", "a", "o"],
		"commands": ["vscode-textobjects.change.next.outer.object"]
	},
	{
		"before": ["c", "i", "o"],
		"commands": ["vscode-textobjects.change.next.inner.object"]
	},
	{
		"before": ["c", "a", "p"],
		"commands": ["vscode-textobjects.change.next.outer.parameters"]
	},
	{
		"before": ["c", "i", "p"],
		"commands": ["vscode-textobjects.change.next.inner.parameters"]
	},
	{
		"before": ["c", "a", "m"],
		"commands": ["vscode-textobjects.change.next.outer.call"]
	},
	{
		"before": ["c", "i", "m"],
		"commands": ["vscode-textobjects.change.next.inner.call"]
	},
	{
		"before": ["c", "a", "t"],
		"commands": ["vscode-textobjects.change.next.outer.type"]
	},
	{
		"before": ["c", "i", "t"],
		"commands": ["vscode-textobjects.change.next.inner.type"]
	},
	{
		"before": ["c", "a", "c"],
		"commands": ["vscode-textobjects.change.next.outer.comment"]
	},
	{
		"before": ["c", "i", "c"],
		"commands": ["vscode-textobjects.change.next.inner.comment"]
	},
	{
		"before": ["c", "a", "F"],
		"commands": ["vscode-textobjects.change.previous.outer.function"]
	},
	{
		"before": ["c", "i", "F"],
		"commands": ["vscode-textobjects.change.previous.inner.function"]
	},
	{
		"before": ["c", "a", "L"],
		"commands": ["vscode-textobjects.change.previous.outer.loop"]
	},
	{
		"before": ["c", "i", "L"],
		"commands": ["vscode-textobjects.change.previous.inner.loop"]
	},
	{
		"before": ["c", "a", "I"],
		"commands": ["vscode-textobjects.change.previous.outer.conditional"]
	},
	{
		"before": ["c", "i", "I"],
		"commands": ["vscode-textobjects.change.previous.inner.conditional"]
	},
	{
		"before": ["c", "a", "R"],
		"commands": ["vscode-textobjects.change.previous.outer.rhs"]
	},
	{
		"before": ["c", "i", "R"],
		"commands": ["vscode-textobjects.change.previous.inner.rhs"]
	},
	{
		"before": ["c", "a", "H"],
		"commands": ["vscode-textobjects.change.previous.outer.lhs"]
	},
	{
		"before": ["c", "i", "H"],
		"commands": ["vscode-textobjects.change.previous.inner.lhs"]
	},
	{
		"before": ["c", "a", "V"],
		"commands": ["vscode-textobjects.change.previous.outer.variable"]
	},
	{
		"before": ["c", "a", "S"],
		"commands": ["vscode-textobjects.change.previous.outer.string"]
	},
	{
		"before": ["c", "i", "S"],
		"commands": ["vscode-textobjects.change.previous.inner.string"]
	},
	{
		"before": ["c", "a", "K"],
		"commands": ["vscode-textobjects.change.previous.outer.class"]
	},
	{
		"before": ["c", "i", "K"],
		"commands": ["vscode-textobjects.change.previous.inner.class"]
	},
	{
		"before": ["c", "a", "A"],
		"commands": ["vscode-textobjects.change.previous.outer.array"]
	},
	{
		"before": ["c", "i", "A"],
		"commands": ["vscode-textobjects.change.previous.inner.array"]
	},
	{
		"before": ["c", "a", "O"],
		"commands": ["vscode-textobjects.change.previous.outer.object"]
	},
	{
		"before": ["c", "i", "O"],
		"commands": ["vscode-textobjects.change.previous.inner.object"]
	},
	{
		"before": ["c", "a", "P"],
		"commands": ["vscode-textobjects.change.previous.outer.parameters"]
	},
	{
		"before": ["c", "i", "P"],
		"commands": ["vscode-textobjects.change.previous.inner.parameters"]
	},
	{
		"before": ["c", "a", "M"],
		"commands": ["vscode-textobjects.change.previous.outer.call"]
	},
	{
		"before": ["c", "i", "M"],
		"commands": ["vscode-textobjects.change.previous.inner.call"]
	},
	{
		"before": ["c", "a", "T"],
		"commands": ["vscode-textobjects.change.previous.outer.type"]
	},
	{
		"before": ["c", "i", "T"],
		"commands": ["vscode-textobjects.change.previous.inner.type"]
	},
	{
		"before": ["c", "a", "C"],
		"commands": ["vscode-textobjects.change.previous.outer.comment"]
	},
	{
		"before": ["c", "i", "C"],
		"commands": ["vscode-textobjects.change.previous.inner.comment"]
	},
	{
		"before": ["v", "a", "n"],
		"commands": ["vscode-textobjects.select.next.outer.node"]
	},
	{
		"before": ["v", "i", "n"],
		"commands": ["vscode-textobjects.select.next.inner.node"]
	},
	{
		"before": ["v", "a", "N"],
		"commands": ["vscode-textobjects.select.previous.outer.node"]
	},
	{
		"before": ["v", "i", "N"],
		"commands": ["vscode-textobjects.select.previous.inner.node"]
	},
	{
		"before": ["[", "n"],
		"commands": ["vscode-textobjects.goTo.next.outer.node"]
	},
	{
		"before": ["[", "N"],
		"commands": ["vscode-textobjects.goTo.next.inner.node"]
	},
	{
		"before": ["]", "n"],
		"commands": ["vscode-textobjects.goTo.previous.outer.node"]
	},
	{
		"before": ["]", "N"],
		"commands": ["vscode-textobjects.goTo.previous.inner.node"]
	},
	{
		"before": ["c", "a", "n"],
		"commands": ["vscode-textobjects.change.next.outer.node"]
	},
	{
		"before": ["c", "i", "N"],
		"commands": ["vscode-textobjects.change.previous.inner.node"]
	},
	{
		"before": ["d", "a", "n"],
		"commands": ["vscode-textobjects.delete.next.outer.node"]
	},
	{
		"before": ["d", "i", "N"],
		"commands": ["vscode-textobjects.delete.previous.inner.node"]
	},
	{
		"before": ["y", "a", "n"],
		"commands": ["vscode-textobjects.yank.next.outer.node"]
	},
	{
		"before": ["y", "i", "n"],
		"commands": ["vscode-textobjects.yank.next.inner.node"]
	}
]
```
