const button = document.getElementById("example-button");
const modal = document.getElementById("example-modal");

button?.addEventListener("click", function() {
    modal.open = true;
});