export function initialiseSourceFilters() {
  const filterGroup = document.querySelector("#sourceFilters");
  const cards = [...document.querySelectorAll(".source-card[data-source-category]")];
  if (!filterGroup || !cards.length) return;

  filterGroup.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-source-filter]");
    if (!button) return;
    const category = button.dataset.sourceFilter;
    filterGroup.querySelectorAll("button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.sourceCategory !== category;
    });
  });
}
