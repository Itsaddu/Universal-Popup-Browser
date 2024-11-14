

document.getElementById("openPopup").addEventListener("click", function() {
    const url = document.getElementById("urlInput").value;
    
    if (url) {
        const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
        chrome.windows.create({
            url: validUrl,
            type: "popup",
            width: 400,
            height: 600
        });
    } else {
        alert("Please enter a valid URL.");
    }
});

// Quick link buttons
document.querySelectorAll(".quick-link").forEach(button => {
    button.addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        chrome.windows.create({
            url: url,
            type: "popup",
            width: 400,
            height: 600
        });
    });
});

// Add favorite website 
document.getElementById("addFavorite").addEventListener("click", async function() {
    const title = document.getElementById("favTitle").value;
    const url = document.getElementById("favUrl").value;

    if (title && url) {
        try {
            // Insert favorite into the SQLite database
            db.run("INSERT INTO favorites (title, url) VALUES (?, ?);", [title, url]);
            console.log("Favorite added successfully:", { title, url });
            
            displayFavorites();  // Refresh favorites list
            document.getElementById("favTitle").value = "";
            document.getElementById("favUrl").value = "";
        } catch (error) {
            console.error("Error adding favorite to SQLite: ", error);
        }
    } else {
        alert("Please enter both a title and a URL.");
    }
});
// Add favorite button functionality
document.getElementById("addFavorite").addEventListener("click", () => {
    const title = document.getElementById("favTitle").value;
    const url = document.getElementById("favUrl").value;

    if (title && url) {
        // Send a message to background.js to save the favorite
        chrome.runtime.sendMessage({ action: "saveFavorite", title, url }, (response) => {
            if (response && response.status === "success") {
                console.log("Favorite added successfully:", { title, url });
                displayFavorites();  // Refresh the favorites list
                document.getElementById("favTitle").value = "";
                document.getElementById("favUrl").value = "";
            } else {
                console.error("Error saving favorite:", response ? response.message : "No response");
            }
        });
    } else {
        alert("Please enter both a title and a URL.");
    }
});

// Display favorites
function displayFavorites() {
    const favoritesList = document.getElementById("favorites-list");
    favoritesList.innerHTML = "";  // Clear existing favorites

    // Request all favorites from background.js
    chrome.runtime.sendMessage({ action: "getFavorites" }, (response) => {
        if (response && response.status === "success") {
            response.favorites.forEach(({ title, url }) => {
                const favButton = document.createElement("button");
                favButton.textContent = title;
                favButton.classList.add("favorite-link");
                favButton.addEventListener("click", () => {
                    chrome.windows.create({
                        url: url,
                        type: "popup",
                        width: 400,
                        height: 600
                    });
                });
                favoritesList.appendChild(favButton);
            });
        } else {
            console.error("Error retrieving favorites:", response ? response.message : "No response");
        }
    });
}

// Load favorites on popup open
document.addEventListener("DOMContentLoaded", displayFavorites);

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading favorites...");
    displayFavorites();
});



// Check if the DOM elements are accessible and add event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Add favorite button functionality
    const addFavoriteBtn = document.getElementById("addFavorite");

    if (addFavoriteBtn) {
        addFavoriteBtn.addEventListener("click", () => {
            const title = document.getElementById("favTitle").value;
            const url = document.getElementById("favUrl").value;

            if (title && url) {
                // Send a message to background.js to save the favorite
                chrome.runtime.sendMessage({ action: "saveFavorite", title, url }, (response) => {
                    if (response && response.status === "success") {
                        console.log("Favorite added successfully:", { title, url });
                        displayFavorites();  // Refresh the favorites list
                        document.getElementById("favTitle").value = "";
                        document.getElementById("favUrl").value = "";
                    } else {
                        console.error("Error saving favorite:", response ? response.message : "No response");
                    }
                });
            } else {
                alert("Please enter both a title and a URL.");
            }
        });
    } else {
        console.error("Add Favorite button not found.");
    }

    // Load favorites on popup open
    displayFavorites();
});
