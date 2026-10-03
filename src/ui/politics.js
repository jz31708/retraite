import { evidenceLabels, partyComparisons } from "../../data/site-data.js";

const leverLabels = {
  work:"Âge et durée d'activité",
  revenue:"Recettes et cotisations",
  highPensions:"Effort sur les pensions élevées",
  collectiveCapital:"Capital collectif"
};

function sourceLink(sourceId) {
  if (!sourceId) return null;
  const article = document.querySelector(`#source-${CSS.escape(sourceId)}`);
  if (!article) return null;
  const link = document.createElement("a");
  link.href = `#source-${sourceId}`;
  link.textContent = `Voir la fiche : ${article.querySelector("h3")?.textContent ?? sourceId} ↓`;
  return link;
}

function renderPanel(panel, comparison) {
  panel.replaceChildren();
  panel.setAttribute("aria-label", comparison.label);
  const category = document.createElement("span");
  category.className = "data-label";
  category.textContent = comparison.status;
  const title = document.createElement("h3");
  title.textContent = comparison.label;
  const summary = document.createElement("p");
  summary.textContent = comparison.summary;
  const grid = document.createElement("div");
  grid.className = "evidence-grid";

  for (const [id, label] of Object.entries(leverLabels)) {
    const item = comparison.levers[id];
    const card = document.createElement("article");
    card.className = "evidence-item";
    card.dataset.category = item.category;
    const heading = document.createElement("span");
    heading.textContent = `${label} · ${evidenceLabels[item.category]}`;
    const detail = document.createElement("p");
    detail.textContent = item.rationale;
    card.append(heading, detail);
    const evidenceLink = sourceLink(item.sourceId);
    if (evidenceLink) card.append(evidenceLink);
    else if (item.actorType === "proposition du site") {
      const internalLink = document.createElement("a");
      internalLink.href = "#proposition";
      internalLink.textContent = "Lire la proposition de ce site ↓";
      card.append(internalLink);
    }
    grid.append(card);
  }
  panel.append(category, title, summary, grid);

  const links = [...new Set(comparison.sources)].map(sourceLink).filter(Boolean);
  if (links.length) {
    const sourceWrap = document.createElement("p");
    sourceWrap.className = "party-sources";
    sourceWrap.append(...links.flatMap((link, index) => index ? [document.createTextNode(" · "), link] : [link]));
    panel.append(sourceWrap);
  }
}

export function initialisePolitics() {
  const picker = document.querySelector("#partyPicker");
  const panel = document.querySelector("#partyPanel");
  if (!picker || !panel) return;

  picker.replaceChildren();
  partyComparisons.forEach((comparison, index) => {
    const button = document.createElement("button");
    button.id = `party-tab-${comparison.id}`;
    button.type = "button";
    button.role = "tab";
    button.setAttribute("aria-controls", "partyPanel");
    button.setAttribute("aria-selected", String(index === 0));
    button.tabIndex = index === 0 ? 0 : -1;
    button.textContent = comparison.shortLabel;
    button.addEventListener("click", () => select(index));
    picker.append(button);
  });
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("aria-labelledby", "party-tab-current-law");

  function select(index, moveFocus = false) {
    const buttons = [...picker.querySelectorAll('[role="tab"]')];
    buttons.forEach((button, itemIndex) => {
      const selected = itemIndex === index;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", buttons[index].id);
    renderPanel(panel, partyComparisons[index]);
    if (moveFocus) buttons[index].focus();
  }

  picker.addEventListener("keydown", (event) => {
    const tabs = [...picker.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  });
  select(0);
}
