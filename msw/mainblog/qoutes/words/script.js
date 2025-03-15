/************************************************************
*                  This Code is copied xD                   *
*************************************************************/

document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
document.querySelectorAll('.changefile-button').forEach(button => {
    button.style.textDecoration = 'none';
    button.style.color = 'black';
});
