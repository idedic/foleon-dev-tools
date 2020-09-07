# Foleon Dev Tools

The easier way to manage environments and flags.

<img src="https://i.imgur.com/dbt2IWo.png" alt="screenshot" width="300">

## 🕺🏻 User guide

### 💻 Installation and updating

Load extension:
- download zip and extract it **to folder**
- open Chrome settings and click Extensions in the bottom left
- in the Extensions tab, click on Developer mode in upper right
- then click on Load unpacked on the upper left
- navigate to the folder from the first step
- *Foleon dev tools are now installed!*

Pin extension
- click on the puzzle icon in the upper right, just beside the profile icon
- find Foleon dev tools and click on the Pin icon
- *now you'll always see the icon*

**Go to the Editor tab and refresh the page. Done!**

##### 🕹 Updating
- download zip and extract it **the same folder as previous**

**Go to the Editor tab and refresh the page. Done!**

### 🗂 "Info" section

Just basic info about the open publication in the Editor: publication name,
publication id, page id, and environment that you're currently on.

### 🗂 "Flags" section

You can override local storage flags here.

**API**: set the API that you wish to connect Editor to.

**Dev-Preview button**: enable if you want to see the `Dev-Preview` button.

**Dev-Preview environment**: override the environment that the `Dev-Preview` button will open.

**Debugger**: enable debugger in the Editor (little worm icon and buttons on activity indicator)

When you are done with the changes, please click the "Save and reload" button, because Editor needs to reload to
collect flags from local storage.

Note: if you see `default` it means that there's no flag in the Editor's local storage, and it uses whatever is a default for that environment.
If you set `default` it will remove that flag from the local storage.

### 🗂 "Open with..." section

Here you can open things in a new tab. You can open the Dashboard, or based on the "Info" (section from above), you can open current publication in the Editor or Previewer.

First, you choose if you want **Editor, Previewer or Dashboard**.

If Editor:
- you can choose the **environment**
- click on the button will open the current publication and page in the chosen environment
- keep in mind that, if that environment is not with the same API as your current, you'll need to open Foleon Dev Tools in that tab, set the API from the "Flags" section and click "Save and reload"

If Previewer:
- you can choose the **environment**
- you'll see **publication id** (you can change it if you like - this is not available for "editor" option because we need to know the page id also)
- you can choose the **API** (this is not available for "editor" option because we have to set the API flag in the local storage like explained above)

If Dashboard:
- you can choose the **environment**

This section will remember your preference for all fields except for publication id. That id is always the one from the editor.

## 👨🏻‍💻 Developer guide

### Develop

- checkout
- `yarn`
- all things related to the extension are in `extension` folder, except the source for the Popup
- the source for the Popup is `typescript` in the `src` folder
- to build it, use `yarn build` which will place a `bundle.js` in `extension/popup/bundle` which is already included in `index.html`
- just like the installation guide above, make sure to Load unpacked the `extension` folder (or reload the extension on reload button if already loaded) and refresh the Editor tab
- for debugging the Popup, right-click on Popup > Inspect
- for debugging the Content script, find the Content script in the Editor's dev tools, Sources section

### Installation and updating, developer way

- checkout
- "Load unpacked" the `foleon-dev-tools/extension` folder - you need to do this only for the first time
- on every update (pull) make sure to run `yarn build` and go to the Editor tab and refresh the page

