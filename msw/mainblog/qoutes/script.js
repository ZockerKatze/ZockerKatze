/************************************************************
* This Code is a Pain in the ass to read (you like it tho)  *
*************************************************************/

document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

document.querySelectorAll('.changefile-button').forEach(button => {
    button.style.textDecoration = 'none';
    button.style.color = 'black';
});
