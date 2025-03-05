// Whoever reads this JavaScript may Jesus himself be with you!

document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelectorAll(".listofmitglieder li");

    listItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = "fadeInList 0.5s ease-out forwards";
        }, index * 300);
    });
});
