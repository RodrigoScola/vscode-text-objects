# Change Log

## [0.2.0]

This is a big one 🎊🎊🎊! We added a new motion specification, new way to configure and generate your keybindings and migration to the new model!

## New motion specification: Position

This was a big thing that was missing in the initial release. A way for you to explicitelly go to the end of an object, either forwards or backwards.

For now only the `go to` motion has this hability, but if theres a community want for this, we can add it to all the other ones.

To migrate your old configuration to the new configuration, either accept the migration prompt, or execute the command `vscode-textobjects.migrateVimPositionals`.

## A New way to configure and generate your keybindings

There was a lot to improve in the keybinds and configuration department. If you wanted to change a motion key you had to update all the motions to update the one keystroke. Now you can update your settings in `vscode-textobjects.keybindings` or `vscode-textobjects.vimKeybindings` if you use vim mode. Then to regenerate your keybinds, use the commands `vscode-textobjects.generateKeybinds` or `vscode-textobjects.generateVimKeybinds` and then press `CTRL+SHIFT+P` and either paste your new keybindings on `Preferences: Open Keyboard shortcuts (JSON)` or on your json settings on your `vim` keybinds.

## Contribute

If you enjoy how the extension has been coming along, please consider contributing! I love developing tools and this helps me a ton!

[Donate Here!](https://ko-fi.com/rodrigoscola)

---

## [0.1.33]

In the continuation to make `Vscode-Text-Objects` a seemless integration with vscode and the vim extension. We've done some updates to how we handle the configuration and keybinds.

The biggest change is that some keybinds overwrote vim default motions, we've updated the default keybindings. Some of you might be affected if you use the `parameters`, `strings` and `type` motions. If you want the previous keybinds, i suggest you to change it on te configuration file or in the `shortcuts` tab.

-    Non obstructive vim keybindings. (#3; Thanks to [Josh](https://github.com/JoshPaulie))

-    Added a `getting_started.md` guide for vim users.

-    Updated vim keybindings were clauses that were covered by the vim extension by default

-    Added a [support me page](https://ko-fi.com/rodrigoscola) (#2; Thanks to [Rob](https://github.com/RobPruzan))
