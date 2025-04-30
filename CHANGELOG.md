# Change Log

## [0.2.2]

After some bugs on the vim keybind generation and position migration.

-    changed the `vimGenerateKeybinds` commands to show a new editor window, instead of automatically changing it (it deleted some comments)

-    Added a comment on the `migratePositionals` command to warn about comment removal on auto upgrade

## [0.2.0]

This is a big one 🎊🎊🎊! We added a new motion specification, new way to configure and generate your keybindings and migration to the new model!

## New motion specification: Position

This was a big thing that was missing in the initial release. A way for you to explicitelly go to the end of an object, either forwards or backwards.

For now only the `go to` motion has this hability, but if theres a community want for this, we can add it to all the other ones.

To migrate your old configuration to the new configuration, either accept the migration prompt, or execute the command `vscode-textobjects.migrateVimPositionals`.

## A New way to configure and generate your keybindings

There was a lot to improve in the keybinds and configuration department. If you wanted to change a motion key you had to update all the motions to update the one keystroke. Now you can update your settings with commands!

to change a specific key, use the `vscode-textobjects.keybindings`. Then if you are not using the `vim` extension, use the command `Generate Keybindings`. It will open a new window with all your new keybindings for you to paste in your keyboard json config. To see that configuration, press CTRL+SHIFT+P and type `Preferences: Open Keyboard shortcuts (JSON)`.

if you are using the [Vim extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim). Alter your keys in `vscode-textobjects.vimKeybindings`, then use the command `Generate Vim Keybinds`. It will now update your keybinds and they will be stored in `normalModeKeybindings`

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
