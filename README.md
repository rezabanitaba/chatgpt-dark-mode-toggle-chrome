# 🌙 ChatGPT Dark Mode Toggle

A minimal Chrome extension that adds a one-click dark/light mode toggle to the ChatGPT web app — no settings, no bloat, just a moon icon sitting quietly in your sidebar.

---

## ✨ Features

- 🌙 / ☀️ Moon and sun icons toggle between dark and light mode instantly
- Floats fixed in the bottom-left sidebar, above your avatar
- Works with ChatGPT's own `localStorage` theme system — no CSS hacks
- Survives SPA navigation (MutationObserver keeps the button alive)
- Subtle click animation + toast confirmation
- Zero permissions beyond `chatgpt.com` access

---

## 📁 File Structure

```
chatgpt-darkmode-ext/
├── manifest.json
├── content.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🚀 Installation (Developer Mode)

1. Download and unzip this repo
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right)
4. Click **Load unpacked**
5. Select the unzipped `chatgpt-darkmode-ext` folder
6. Open [chatgpt.com](https://chatgpt.com) — the 🌙 icon appears above your avatar

---

## 🛠 How It Works

ChatGPT stores the current theme in `localStorage` under the key `theme` with values `"dark"` or `"light"`. This extension:

1. Reads that key on load to render the correct icon
2. On click, writes the new value to `localStorage`
3. Flips the `dark` class and `data-theme` attribute on `<html>` for an instant visual change
4. Fires a `StorageEvent` so ChatGPT's own listeners pick up the change

No page reload needed.

---

## 🔒 Permissions

| Permission | Reason |
|---|---|
| `scripting` | Inject the toggle button into the page |
| `storage` | Not used directly — theme is in `localStorage` |
| `host_permissions: chatgpt.com` | Scoped only to ChatGPT |

---

## 📄 License

MIT — do whatever you want with it.
