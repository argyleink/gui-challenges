const compares = document.querySelectorAll(".compare");
for (const compare of compares) {
  compare
    .querySelector('input[type="range"]')
    .addEventListener("input", function () {
      compare.style.setProperty("--pos", this.value + "%");
    });
}
