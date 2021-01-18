# Foleon Dev Tools

The easier way to manage environments and flags.

<img src="https://i.imgur.com/itbSrwn.png" alt="screenshot" width="300">

## 🕺🏻 User guide

### 💻 Installation and updating

Load extension:

- download zip and extract it **to folder**
- open Chrome settings and click Extensions in the bottom left
- in the Extensions tab, click on Developer mode in upper right
- then click on Load unpacked on the upper left
- navigate to the folder from the first step
- _Foleon dev tools are now installed!_

Pin extension

- click on the puzzle icon in the upper right, just beside the profile icon
- find Foleon dev tools and click on the Pin icon
- _now you'll always see the icon_

**Open the Foleon application (Editor, Dashboard or Previewer) in the Chrome tab and refresh the page. Done!**

##### 🕹 Updating

- download zip and extract it **the same folder as previous**

**Open the Foleon application (Editor, Dashboard or Previewer) in the Chrome tab and refresh the page. Done!**

### 🗂 "Info" section

Just basic info about currently opened application and its content: current application, publication name, publication id, page id, and environment that you're currently on.

### 🗂 "Current environment (flags and overrides)" section

You can override local storage flags here.

**API**: set the API that you wish to connect Editor to.

#### Editor specific flags

**Dev-Preview button**: enable if you want to see the `Dev-Preview` button.

**Dev-Preview environment**: override the environment that the `Dev-Preview` button will open.

**Debugger**: enable debugger in the Editor (little worm icon and buttons on activity indicator)

When you are done with the changes, please click the "Save and reload" button, because application needs to reload to
collect flags from local storage.

Note: if you see `default` it means that there's no flag in the local storage of current application, and it uses whatever is a default for that environment.
If you set `default` it will remove that flag from the local storage.

### 🗂 "Open in new tab..." section

Here you can open things in a new tab. You can open the Dashboard, you can open current publication in the Editor or Previewer.

First, choose which application you want to open: **Editor, Previewer or Dashboard**. Based on selected application, different fields will appear below.

If Editor:

- you can choose the **environment**
  - keep in mind that, if that environment is not with the same API as your current, you'll need to open Foleon Dev Tools in that tab, set the API from the "Current tab" section and click "Save and reload"
- you can fill in publication `id`, page `id` and overlay `id`
  - publication `id` and page `id` are `required` so link can be successfully generated
  - publication `id`, page `id` and overlay `id` are filled in based on data from current tab (empty if not available)
- click on the "Open in new tab" button will open the publication in new tab (based on selected environment and filled in fields )

If Previewer:

- you can choose the **environment**
- you can choose the **API** (this is not available for "editor" option because we have to set the API flag in the local storage like explained above)
- you can fill in the publication `id`
  - publication `id` is `required`
  - publication `id` is filled in based on data from current tab (empty if not available)

If Dashboard:

- you can choose the **environment**

This section will remember your preference for `Application` and `Environment` fields. Data for other fields is collected from the current tab.

"Open in new tab" button will open selected application in a new tab. There's the '...' option which will expand 2 more buttons: "Open in this tab" and "Just show the url", which is useful if you need to copy the url and use it in another browser for example.

### ⚙️ Settings

You can configure additional environments. Just enter a coma-separated array of names and it will be available in the environment dropdowns.

You can configure ports for localhost for all apps.

## 👨🏻‍💻 Developer guide

### Installation and updating, developer way

- checkout
- "Load unpacked" the `foleon-dev-tools/extension` folder - you need to do this only for the first time
- on every update (pull) make sure to run `yarn build` and go to the Editor tab and refresh the page

### Develop and Contribute

I decided to use Typescript combined with _querySelector-jQuery-like_ library for direct DOM manipulation.
If this project grows significantly, I'll consider fancy full-fledged dev environment.
**Feel free to post an issue, feature request, or to fork and make an interesting PR.**

<img src="https://i.imgur.com/fyNBqmI.png" alt="joey" width="300">

##### Usual steps:

- checkout
- `yarn`
- all things related to the extension are in `extension` folder, except the source for the Popup
- the source for the Popup is `typescript` in the `src` folder
- to build it, use `yarn build` which will place a `bundle.js` in `extension/popup/bundle` which is already included in `index.html`
- just like the installation guide above, make sure to Load unpacked the `extension` folder (or reload the extension on reload button if already loaded) and refresh the Foleon application tab
- for debugging the Popup, right-click on Popup > Inspect
- for debugging the Content script, find the Content script in the dev tools of the Foleon application tab, Sources section
