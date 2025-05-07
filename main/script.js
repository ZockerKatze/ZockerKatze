/************************************************************************
* Some Syntax may not be correct here ; but who cares                   *
* The Formatting is also not the "prettiest" but you can work it out    *
* Written 5.5.2025 ; &copy                                              *
 *                          Updated 7.5.2025                            *
*************************************************************************/

// Initialize syntax highlighting
hljs.highlightAll();

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') ||
(prefersDarkScheme.matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    document.body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Code tab functionality
const codeTabs = document.querySelectorAll('.code-tab');
const codeSnippets = document.querySelectorAll('.code-snippet');

codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Set active tab
        codeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding code snippet
        const lang = tab.dataset.lang;
        codeSnippets.forEach(snippet => {
            snippet.classList.toggle('active', snippet.dataset.lang === lang);
        });
    });
});

// Language toggle functionality
const languageOptions = document.querySelectorAll('.language-option');
const elementsToTranslate = document.querySelectorAll('[data-i18n]');

// Translations
const translations = {
    en: {
        name: "ZockerKatze / Rattatwingo",
        intro: "Passionate developer with love for coding, anime and Minecraft.",
        personal_info: "Personal Information",
        born: "Born:",
        birth_date: "March 09, 2010",
        birth_place: "in Austria",
        languages: "Languages:",
        german: "🇩🇪 German (Native)",
        english: "🇬🇧 English (Fluent)",
        spanish: "🇪🇸 Spanish (Intermediate)",
        russian: "🇷🇺 Russian (Basic)",
        current_status: "Current Status",
        working_on: "I'm currently working on private Minecraft plugins on my local Gitea instance",
        learning: "I'm currently learning Minecraft Plugin Creation with Kotlin and the Bukkit API",
        collaborate: "I'm looking to collaborate on Minecraft plugins",
        projects: "Some of my projects are available at github.com/ZockerKatze",
        ask_me: "Ask me about Minecraft plugins and the Bukkit API",
        interests: "Interests",
        hobbies: "Hobbies:",
        anime: "Watching Anime",
        manga: "Reading Manga",
        coding: "Coding Minecraft Plugins",
        sleeping: "Sleeping",
        minecraft: "Playing Minecraft",
        monster: "Favorite Monster Flavor:",
        white: "White",
        rosa: "Ultra Rosá",
        mango: "Mango Loco",
        paradise: "Ultra Paradise",
        skills: "Skills",
        programming: "Programming Languages:",
        web: "Minecraft & Other Technologies:",
        github: "GitHub Activity",
        footer_oss: "This Page (CSS/HTML) is OSS, it's hosted on GitHub",
        footer_made: "Made with ❤️"
    },
    de: {
        name: "ZockerKatze / Rattatwingo",
        intro: "Leidenschaftlicher Entwickler mit Liebe zum Programmieren, Anime und Minecraft.",
        personal_info: "Persönliche Informationen",
        born: "Geboren:",
        birth_date: "09. März 2010",
        birth_place: "in Österreich",
        languages: "Sprachen:",
        german: "🇩🇪 Deutsch (Muttersprache)",
        english: "🇬🇧 Englisch (Fließend)",
        spanish: "🇪🇸 Spanisch (Mittelstufe)",
        russian: "🇷🇺 Russisch (Grundkenntnisse)",
        current_status: "Aktueller Status",
        working_on: "Ich arbeite derzeit an privaten Minecraft Plugins auf meiner lokalen Gitea Instanz",
        learning: "Ich lerne derzeit Minecraft Plugin Entwicklung mit Kotlin und der Bukkit API",
        collaborate: "Ich möchte an Minecraft Plugins zusammenarbeiten",
        projects: "Einige meiner Projekte sind auf github.com/ZockerKatze verfügbar",
        ask_me: "Frag mich über Minecraft Plugins und die Bukkit API",
        interests: "Interessen",
        hobbies: "Hobbys:",
        anime: "Anime schauen",
        manga: "Manga lesen",
        coding: "Minecraft Plugins programmieren",
        sleeping: "Schlafen",
        minecraft: "Minecraft spielen",
        monster: "Lieblings Monster Geschmack:",
        white: "White",
        rosa: "Ultra Rosá",
        mango: "Mango Loco",
        paradise: "Ultra Paradise",
        skills: "Fähigkeiten",
        programming: "Programmiersprachen:",
        web: "Minecraft & Andere Technologien:",
        github: "GitHub Aktivität",
        footer_oss: "Diese Seite (CSS/HTML) ist Open Source, sie wird auf GitHub gehostet",
        footer_made: "Gemacht mit ❤️"
    }
};

// Set active language
function setActiveLanguage(lang) {
    languageOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });

    // Update translations
    elementsToTranslate.forEach(element => {
        const key = element.dataset.i18n;
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    localStorage.setItem('language', lang);
}

// Initialize language
const savedLanguage = localStorage.getItem('language') || 'en';
setActiveLanguage(savedLanguage);

// Add click event to language options
languageOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.dataset.lang;
        setActiveLanguage(lang);
    });
});

// Intersection Observer for fade-in effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');

            // Animate skill bars if this is the skills section
            if (entry.target.querySelector('.skill-progress')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const percent = bar.dataset.percent;
                    bar.style.width = `${percent}%`;
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.info-section').forEach(section => {
    observer.observe(section);
});

// Run code functionality
document.getElementById('run-code').addEventListener('click', function() {
    const output = document.getElementById('code-output');
    output.innerHTML = ''; // Clear previous output
    output.style.display = 'block'; // Show output area

    // Get the active language
    const activeTab = document.querySelector('.code-tab.active');
    const lang = activeTab.dataset.lang;

    // Common output lines
    const lines = [
        "Hello, I'm ZockerKatze / Rattatwingo!",
        `- ${getLanguageName(lang)}`,
        "- Python",
        "- Kotlin",
        "- Minecraft Plugins",
        "- Bukkit API",
        "Let's build some awesome Minecraft plugins!"
    ];

    // Simulate execution with typing effect
    let delay = 0;
    lines.forEach(line => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.textContent = line;
            output.appendChild(div);
            output.scrollTop = output.scrollHeight;
        }, delay);
        delay += 200;
    });
});

// Helper function to get proper language name
function getLanguageName(lang) {
    switch(lang) {
        case 'rust': return 'Rust';
        case 'cpp': return 'C++';
        case 'python': return 'Python';
        case 'kotlin': return 'Kotlin';
        default: return lang;
    }
}