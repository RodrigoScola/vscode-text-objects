<div align="center">

# Vscode Text Objects

With Vscode Text Objects you can select, delete, copy and go to text in a more fluid way than you have ever experienced.

</div>

![VSCode Text Objects Demo](./docs/demo.gif)

## Getting started

To change your keybinds, you need to update your `vscode-textobjects.keybindings` to the shortcut you want. Then execute the command `vscode-textobjects.generateKeybinds`. Copy and paste the output on your vscode keybinds (`Preferences: Open Keyboard shortcuts (JSON)`).

### The Vim way

If you are using the [Vim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim), you need to change the shortcuts in `vscode-textobjects.vimKeybinds` to the key that you want, then use the command `Generate Vim Keybinds`, then it will automagically save it in your `normalModeKeybinds` in your `settings.json`

<div >

If you enjoy this extension, consider supporting it. You can donate it on ko-fi or paypal directly. It will encourage me to make more extensions and make them better and better!

  <a style="display: 	flex; justify-content: center; align-items: center; height: 100%; width: 50%; " href="https://ko-fi.com/M4M31DOW0A" target="_blank">
<img style=" width: 50%; height: 50%; object-fit: contain; " src="/images/support.png" alt="Support me on Ko-fi">
  </a>
</div>

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

## VIM Integration

## **For the full list of commands, go to [vim_integration.md](/vim_integration.md)**

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

### Misc

-    remove the console logs - DONE
-    make sure keybinds and vim are okay - DONE
-    do a nice landing page - DONE

-    Make an icon, revamp the name?
-    LAUNCH (add tags and releases)

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

# Huge Thanks

Thank you [nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects) for the huge inspiration. You were the reason that i wanted to make this extension in vscode and the thing i miss about [neovim](https://github.com/neovim/neovim/) the most.

## Disclaimer

Although i like this extension, I am uncertain about the development past my needs. Since extension development is not my career (at least not for now). I dont intend to have a lot going on for this extension.

# Update material

-    add an start and end so we can goto start and goto end of a node
