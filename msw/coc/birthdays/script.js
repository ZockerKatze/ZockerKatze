/***********************************************************
Whoever reads this JavaScript , you are alone with this one!
I wrote this one while on 5 Monsters :3
***********************************************************/


const birthdays = [
    /*
    Example of Usage! This works with YYYY-MM-DD for time
    { name: "Alice", date: "2025-03-08" },
    { name: "Bob", date: "2025-04-15" },
    { name: "Charlie", date: "2025-06-22" }
    */

    { name: "", date: ""}
];

// Sehr gute Komplimente xD
const compliments = [
    "Du bist ein wunderbarer Mensch!",
    "Deine Freundlichkeit macht die Welt zu einem besseren Ort!",
    "Du bringst Freude in das Leben aller um dich herum!",
    "Deine positive Energie ist ansteckend!",
    "Du bist wirklich einzigartig!"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const calendar = document.getElementById("calendar");
    const monthYearLabel = document.getElementById("month-year");
    calendar.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    monthYearLabel.textContent = new Date(year, month).toLocaleString('de-DE', { month: 'long', year: 'numeric' });

    daysOfWeek.forEach(day => {
        const header = document.createElement("div");
        header.className = "day-header";
        header.textContent = day;
        calendar.appendChild(header);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "day";
        calendar.appendChild(emptyCell);
    }

    let birthdayToday = false;

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "day";
        dayCell.textContent = day;

        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        birthdays.forEach(birthday => {
            if (birthday.date === fullDate) {
                dayCell.classList.add("birthday");
                dayCell.textContent += `\n🎉 ${birthday.name}`;
                if (fullDate === new Date().toISOString().slice(0, 10)) {
                    birthdayToday = true;
                    showPopup(birthday.name);
                }
            }
        });

        calendar.appendChild(dayCell);
    }

    if (birthdayToday) {
        launchConfetti();
    }
}

function launchConfetti() {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
}

function showPopup(name) {
    const popup = document.getElementById("birthday-popup");
    const message = document.getElementById("birthday-message");
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    message.innerHTML = `Herzlichen Glückwunsch, ${name}! 🎉<br>${randomCompliment}<br><br>(Kompliment aus dem Internet)`;
    popup.classList.add("show");
}

function closePopup() {
    document.getElementById("birthday-popup").classList.remove("show");
}

function prevMonth() {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentYear -= (currentMonth === 11) ? 1 : 0;
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    currentYear += (currentMonth === 0) ? 1 : 0;
    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);