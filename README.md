# Foleon Dev Tools

The easier way to manage environments and flags.

## Installation

Load extension:
- download zip and extract it **to folder**
- open Chrome settings and click Extensions in the bottom left
- in Extensions tab, click on Developer mode in upper right
- then click on Load unpacked on the upper left
- navigate to the folder from the first step
- *Foleon dev tools are now installed!*

Pin extension
- click on the puzzle icon in upper right, just besides the profile icon
- find Foleon dev tools in click on Pin icon
- *now you'll always see the icon*

**Go to the Editor window and refresh the page.**

**Done!**

## User guide

### "Info" section

Just a basic info about the open publication in the Editor: publication name,
publication id, page id and environment that you're currently on.

### "Flags" section

You can override local storage flags here.

**API**: set the API that you wish to connect Editor to.

**Preview button**: enable if you want to see `Dev-Preview` button.

**Previewer**: override the environment that `Dev-Preview` button will open.

**Debugger**: enable debugger in the Editor (little worm icon and buttons on activity indicator)

When you are done with the changes, please click "Save and reload" button, because Editor needs to reload to
collect flags from local storage.

### "Open with..." section

Here you can open things in the tab.

First you choose if you want **Editor or Previewer**.

If Editor:
- you can choose the **environment**
- click on the button will open current publication and page in chosen environment
- keep in mind that, if that environment is not with the same API as your current, you'll need to open Foleon Dev Tools in that tab, set the API from the "Flags" section and click "Save and reload"

If Previewer:
- you can choose the **environment**
- you'll see **publication id** (you can change it if you like - this is not available for "editor" option because we need to know the page id also)
- you can choose the **API** (this is not available for "editor" option because we have to set the API flag in the local storage like explained above)

This section will remember your preference for all fields except for publication id. That id is always the one from the editor.

