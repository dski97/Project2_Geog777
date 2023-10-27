const button = document.getElementById("example-button");
const modal = document.getElementById("example-modal");
const doneButton = document.querySelector("calcite-button[slot='primary']");

button?.addEventListener("click", function() {
    modal.open = true;
});

doneButton?.addEventListener("click", function() {
    modal.open = false;
});

