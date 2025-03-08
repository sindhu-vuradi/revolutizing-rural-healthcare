document.getElementById("start-voice").addEventListener("click", () => {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    let selectedLanguage = document.getElementById("language-select").value;
    recognition.lang = selectedLanguage; // Set selected language
    recognition.start();

    recognition.onresult = async (event) => {
        let spokenText = event.results[0][0].transcript;
        document.getElementById("recognized-text").innerText = "You said: " + spokenText;

        // Translate to English if not already in English
        let translatedText = await translateText(spokenText, selectedLanguage);
        localStorage.setItem("userSymptoms", translatedText);
    };
});

// Function to translate text into English
async function translateText(text, sourceLang) {
    if (sourceLang === "en-US") return text; // No translation needed

    let response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|en`);
    let data = await response.json();
    return data.responseData.translatedText || text;
}
