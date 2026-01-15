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
    
    // 1. Change the text and grow the Yes button (Your original logic)
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;

    // 2. Move the button to a random position
    const x = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const y = Math.random() * (window.innerHeight - noButton.offsetHeight);
    
    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
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
