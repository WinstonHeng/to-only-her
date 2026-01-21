(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();

const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Princess please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Hmph! (Cues rabbit sticker)",
    "Just kidding, say yes please! ❤️",
    "真的不答应吗?",
    "What am I gonna do with my reservations :'(",
    "Say yes, pretty pleaseeeeeee :D",
    "You're really stubborn, aren't you?",
    "I promise I will make it a good date!",
    "The Box is at the max size already :(",
    "There's no need to try anymore! Just click yes hehe"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    
    // 1. Change the text and grow the Yes button
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Keeping your preferred 1.5x multiplier
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;

    // 2. Shrink and Move the "No" button to bottom-left
    // Reduces size by 10% each click, stopping at 30% of original size
    const scaleFactor = Math.max(1 - (messageIndex * 0.1), 0.3);
    
    noButton.style.position = "fixed"; 
    noButton.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"; // Smooth "pop" effect
    noButton.style.zIndex = "999"; 
    
    // Move to bottom-left corner
    noButton.style.left = "20px"; 
    noButton.style.bottom = "20px";
    noButton.style.top = "auto"; 
    noButton.style.right = "auto";
    
    // Apply the shrinking
    noButton.style.transform = `scale(${scaleFactor})`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

// --- NEW MOBILE FIX ---
// This part detects a touch on mobile and triggers the move before the click happens
document.addEventListener("DOMContentLoaded", () => {
    const noButton = document.querySelector('.no-button');
    if (noButton) {
        noButton.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevents the phone from actually "clicking"
            handleNoClick();
        });
    }
});
