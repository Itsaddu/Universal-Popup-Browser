// Function to save a favorite to chrome.storage.local
function saveFavorite(title, url, sendResponse) {
  chrome.storage.local.get({ favorites: [] }, (data) => {
      const favorites = data.favorites;
      favorites.push({ title, url });
      chrome.storage.local.set({ favorites }, () => {
          console.log("Favorite saved:", { title, url });
          sendResponse({ status: "success", message: "Favorite saved." });
      });
  });
}

// Function to retrieve all favorites from chrome.storage.local
function getFavorites(sendResponse) {
  chrome.storage.local.get({ favorites: [] }, (data) => {
      console.log("Retrieved favorites:", data.favorites);
      sendResponse({ status: "success", favorites: data.favorites });
  });
}

// Listen for messages from popup.js to save or retrieve favorites
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
if (message.action === "saveFavorite") {
    saveFavorite(message.title, message.url, sendResponse);
    return true; // Keep the message channel open for async sendResponse
} else if (message.action === "getFavorites") {
    getFavorites(sendResponse);
    return true;
} else {
    sendResponse({ status: "error", message: "Invalid action." });
}
});
