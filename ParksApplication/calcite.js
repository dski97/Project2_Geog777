const button = document.getElementById("example-button");
const modal = document.getElementById("example-modal");
const doneButton = document.querySelector("calcite-button[slot='primary']");
const openmodal = document.getElementById("opener");
const navbar = document.getElementById("navLogo");
const modalbutton = document.getElementById("calcite-button[slot='okay']");

button?.addEventListener("click", function() {
    modal.open = true;
});

doneButton?.addEventListener("click", function() {
    modal.open = false;
});

navbar?.addEventListener("click", function() {
    openmodal.open = true
});

modalbutton?.addEventListener("click", function() {
    openmodal.open = false
});

