const ratioData = [
  [1975, 3.14], [1980, 2.68], [1990, 1.88], [2000, 1.59], [2010, 1.44], [2016, 1.31]
];

const choiceCopy = {
  pension: "Sous-indexer une pension élevée réduit son pouvoir d'achat réel. Les petites pensions peuvent rester entièrement protégées.",
  work: "Augmenter les cotisations du travail prélève davantage sur les salaires et le coût du travail aujourd'hui.",
  age: "Repousser l'âge fait porter l'effort sur les futurs retraités. L'effet varie fortement selon carrière, pénibilité et espérance de vie.",
  capital: "Taxer le capital redistribue l'effort. Si une partie de la recette est capitalisée dans un fonds collectif, elle construit aussi un actif futur."
};

function renderRatioChart() {
  const host = document.getElementById("ratioChart");
  if (!host) return;
  const max = 3.4;
  ratioData.forEach(([year, value], index) => {
    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.left = `${8 + index * 15.5}%`;
    bar.style.height = `${(value / max) * 88}%`;
    bar.innerHTML = `<b>${value.toFixed(2).replace(".", ",")}</b><span>${year}</span>`;
    host.appendChild(bar);
  });
}

function renderMagnitude() {
  const host = document.getElementById("magnitudeBars");
  const rows = [
    ["Retraites 2025", 422.2, "Md€", "primary"],
    ["LFI, fiscalité hauts revenus + patrimoines", 48, "Md€", "secondary"],
    ["Mesures retraite LFI chiffrées", 26.8, "Md€", "tertiary"]
  ];
  rows.forEach(([label, value, unit, cls]) => {
    const row = document.createElement("div");
    row.className = `mag-row ${cls}`;
    row.innerHTML = `
      <span class="mag-label">${label}</span>
      <div class="mag-track"><div class="mag-fill" style="width:${Math.max(2, value / 422.2 * 100)}%"></div></div>
      <span class="mag-value">${String(value).replace(".", ",")} ${unit}</span>`;
    host.appendChild(row);
  });
}

function formatBillions(value) {
  return `${Math.round(value).toLocaleString("fr-FR")} Md€`;
}

function fundFuture(contribution, years, realReturn = 0.03, initial = 20.7) {
  return initial * Math.pow(1 + realReturn, years) + contribution * ((Math.pow(1 + realReturn, years) - 1) / realReturn);
}

function bindSimulator() {
  const slider = document.getElementById("annualContribution");
  if (!slider) return;
  const update = () => {
    const c = Number(slider.value);
    const v20 = fundFuture(c, 20);
    const v40 = fundFuture(c, 40);
    document.getElementById("annualValue").textContent = c;
    document.getElementById("fund20").textContent = formatBillions(v20);
    document.getElementById("fund40").textContent = formatBillions(v40);
    document.getElementById("income40").textContent = `${Math.round(v40 * .025).toLocaleString("fr-FR")} Md€ par an`;
  };
  slider.addEventListener("input", update);
  update();
}

function bindChoices() {
  const text = document.getElementById("choiceText");
  document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      text.textContent = choiceCopy[button.dataset.choice];
    });
  });
}

function renderPartyTable(filter = "all") {
  const table = document.getElementById("partyTable");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  thead.innerHTML = `<tr><th>Critère</th>${PARTY_DATA.parties.map(p => `<th>${p.name}</th>`).join("")}</tr>`;
  tbody.innerHTML = "";
  PARTY_DATA.criteria
    .filter(c => filter === "all" || c.group === filter)
    .forEach(criteria => {
      const tr = document.createElement("tr");
      const cells = PARTY_DATA.parties.map(party => {
        const [label, type, detail] = party.cells[criteria.id];
        const tip = detail.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
        return `<td class="party-cell" data-party="${party.id}" data-criterion="${criteria.id}" tabindex="0" role="button" title="${tip}" aria-label="${party.name}, ${criteria.label}, ${label}"><span class="stance ${type}">${label}</span></td>`;
      }).join("");
      tr.innerHTML = `<th>${criteria.label}</th>${cells}`;
      tbody.appendChild(tr);
    });
  bindPartyCells();
}

function openPartyDialog(partyId, criterionId) {
  const party = PARTY_DATA.parties.find(p => p.id === partyId);
  const criterion = PARTY_DATA.criteria.find(c => c.id === criterionId);
  if (!party || !criterion) return;
  const [label, , detail] = party.cells[criterionId];
  const sources = party.sources.length
    ? party.sources.map(([name, url]) => `<a class="source-link" href="${url}" target="_blank" rel="noreferrer">${name}</a>`).join(" ")
    : `<span class="small-print">Cette colonne décrit la proposition présentée sur ce site.</span>`;
  document.getElementById("dialogContent").innerHTML = `
    <span class="dialog-party">${party.name}, ${party.updated}</span>
    <h2>${criterion.label}</h2>
    <p>${party.summary}</p>
    <div class="dialog-section">
      <h4>Position retenue</h4>
      <p><strong>${label}</strong>. ${detail}</p>
    </div>
    <div class="dialog-section">
      <h4>Sources</h4>
      <div class="link-row">${sources}</div>
    </div>`;
  document.getElementById("partyDialog").showModal();
}

function bindPartyCells() {
  document.querySelectorAll(".party-cell").forEach(cell => {
    const open = () => openPartyDialog(cell.dataset.party, cell.dataset.criterion);
    cell.addEventListener("click", open);
    cell.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function bindPartyFilters() {
  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      renderPartyTable(button.dataset.filter);
    });
  });
  document.getElementById("dialogClose").addEventListener("click", () => document.getElementById("partyDialog").close());
  document.getElementById("partyDialog").addEventListener("click", event => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  });
}

function renderQuotes() {
  const host = document.getElementById("quoteGrid");
  QUOTES.forEach(item => {
    const card = document.createElement("article");
    card.className = "quote-card";
    card.innerHTML = `
      <div class="quote-meta"><span>${item.person}, ${item.party}</span><span>${item.date}</span></div>
      <blockquote>"${item.quote}"</blockquote>
      <p>${item.context}</p>
      <div class="bernard-test"><strong>Appliqué à Bernard.</strong> ${item.verdict} ${item.bernard}</div>
      <a class="source-link" href="${item.url}" target="_blank" rel="noreferrer">Voir la source</a>`;
    host.appendChild(card);
  });
}

function renderSources() {
  const host = document.getElementById("sourceGrid");
  SOURCES.forEach(source => {
    const card = document.createElement("article");
    card.className = "source-card";
    card.innerHTML = `
      <span class="source-kind">${source.kind}</span>
      <h3>${source.title}</h3>
      <p>${source.note}</p>
      <a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">Ouvrir</a>`;
    host.appendChild(card);
  });
}

function bindReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

renderRatioChart();
renderMagnitude();
bindSimulator();
bindChoices();
renderPartyTable();
bindPartyFilters();
renderQuotes();
renderSources();
bindReveal();
