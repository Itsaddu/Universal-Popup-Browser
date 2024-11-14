# Universal Popup Browser Extension

This Chrome extension allows you to open websites in a small popup window and manage your favorite websites. You can save your favorite websites and easily access them from the extension popup.

## Features

- **Open any URL in a popup window:** Enter a URL or use quick links like WhatsApp Web or ChatGPT.
- **Manage favorites:** Add your favorite websites and access them quickly via the extension.
- **Favorites are stored persistently:** Your favorites are saved and persist across sessions using `chrome.storage.local`.

## Installation

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** at the top-right corner.
4. Click **Load unpacked** and select the directory containing the extension files.
5. The extension will appear in your extensions list, and you can start using it.

## Usage

- **Open a website in a popup:**
  1. Enter a URL in the input field and click **Go!** to open it in a small popup window.
  
- **Quick Links:**
  1. Use the predefined quick links (e.g., WhatsApp Web, ChatGPT) to open these sites in a popup.

- **Add to Favorites:**
  1. Enter a title and URL in the "Add to Favorites" section.
  2. Click **Add** to save the website to your favorites list.
  3. Click any of your saved favorite sites to open them in a popup window.

## Files

- `popup.html`: The HTML structure for the extension's popup interface.
- `popup.js`: JavaScript for handling user interactions and managing the popup's behavior.
- `background.js`: Handles saving and retrieving favorites from `chrome.storage.local`.
- `manifest.json`: The extension's metadata, permissions, and settings.
- `styles.css`: The CSS file for styling the popup (not shared here).

## How It Works

1. **Saving Favorites:**
   - When you add a favorite, the title and URL are stored in `chrome.storage.local` under a "favorites" key.
   - The favorites list is displayed each time the popup is opened.

2. **Retrieving Favorites:**
   - On opening the popup, the extension retrieves the list of favorite websites from `chrome.storage.local` and displays them as buttons.

3. **Opening Websites in a Popup:**
   - Websites are opened in a new popup window with specified dimensions.

## Permissions

- **storage**: Allows the extension to use Chrome's local storage for saving data.
- **tabs**: Grants the extension permission to create new browser tabs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
