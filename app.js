const ratioData = [[1975, 3.14], [1980, 2.68], [1990, 1.88], [2000, 1.59], [2010, 1.44], [2016, 1.31]];

const ageProfiles = {
  old: [
    ["85+", .235], ["80-84", .499], ["75-79", .982], ["70-74", 1.446], ["65-69", 1.784],
    ["60-64", 2.036], ["55-59", 2.245], ["50-54", 2.749], ["45-49", 3.064], ["40-44", 3.094],
    ["35-39", 2.801], ["30-34", 2.157], ["25-29", 3.336], ["20-24", 3.295], ["15-19", 3.111],
    ["10-14", 2.747], ["5-9", 2.427], ["0-4", 3.935]
  ],
  now: [
    ["85+", 2.267], ["80-84", 1.848], ["75-79", 2.541], ["70-74", 3.533], ["65-69", 3.932],
    ["60-64", 4.184], ["55-59", 4.421], ["50-54", 4.496], ["45-49", 4.356], ["40-44", 4.245],
    ["35-39", 4.242], ["30-34", 4.095], ["25-29", 3.812], ["20-24", 3.870], ["15-19", 4.179],
    ["10-14", 4.195], ["5-9", 3.988], ["0-4", 3.557]
  ]
};

const choiceCopy = {
  pension: "Sous-indexer une pension élevée réduit son pouvoir d'achat réel sans toucher la petite pension de Monique.",
  work: "Augmenter les cotisations prélève davantage sur le salaire ou sur le coût du travail. C'est un choix possible, pas une ressource gratuite.",
  age: "Repousser l'âge fait porter l'effort sur les futurs retraités. L'effet est très différent selon le métier, la carrière et l'espérance de vie.",
  capital: "Taxer le capital déplace l'effort. Si une partie de la recette reste investie dans un fonds collectif, elle crée aussi un actif pour demain."
};

function renderAgeShape(hostId, rows, cls) {
  const host = document.getElementById(hostId);
  if (!host) return;
  const max = Math.max(...ageProfiles.old.map(x => x[1]), ...ageProfiles.now.map(x => x[1]));
  host.innerHTML = rows.map(([age, value]) => {
    const width = Math.max(4, value / max * 100);
    return `<div class="cohort-row ${age.startsWith('65') || age.startsWith('70') || age.startsWith('75') || age.startsWith('80') || age.startsWith('85') ? 'senior' : ''}"><span>${age}</span><div class="cohort-bar ${cls}" style="width:${width}%" title="${age} : environ ${String(value).replace('.', ',')} millions"></div></div>`;
  }).join("");
}

function renderRatioChart() {
  const host = document.getElementById("ratioChart");
  if (!host) return;
  const max = 3.4;
  host.innerHTML = ratioData.map(([year, value], index) => `
    <div class="chart-bar" style="left:${7 + index * 16.2}%;height:${(value / max) * 88}%">
      <b>${value.toFixed(2).replace('.', ',')}</b><span>${year}</span>
    </div>`).join("");
}

function renderMagnitude() {
  const host = document.getElementById("magnitudeBars");
  if (!host) return;
  const rows = [
    ["Échelle du système", 422.2, "primary"],
    ["Recettes LFI supplémentaires", 48, "secondary"],
    ["Mesures retraite LFI chiffrées", 26.8, "tertiary"]
  ];
  host.innerHTML = rows.map(([label, value, cls]) => `
    <div class="mag-row ${cls}">
      <span class="mag-label">${label}</span>
      <div class="mag-track"><div class="mag-fill" style="width:${Math.max(2.5, value / 422.2 * 100)}%"></div></div>
      <span class="mag-value">${String(value).replace('.', ',')} Md€</span>
    </div>`).join("");
}

function bindStockLab() {
  const slider = document.getElementById("wealthStock");
  if (!slider) return;
  const update = () => {
    const stock = Number(slider.value);
    const months = stock / 422.2 * 12;
    const income = stock * .03;
    document.getElementById("wealthValue").textContent = stock;
    document.getElementById("monthsCovered").textContent = `${months.toFixed(1).replace('.', ',')} mois`;
    document.getElementById("annualIncome").textContent = `${income.toFixed(1).replace('.', ',')} Md€/an`;
  };
  slider.addEventListener("input", update);
  update();
}

function formatBillions(value) {
  return `${Math.round(value).toLocaleString("fr-FR")} Md€`;
}

function fundFuture(contribution, years, realReturn = .03, initial = 20.7) {
  return initial * Math.pow(1 + realReturn, years) + contribution * ((Math.pow(1 + realReturn, years) - 1) / realReturn);
}

function bindSimulator() {
  const slider = document.getElementById("annualContribution");
  if (!slider) return;
  const update = () => {
    const contribution = Number(slider.value);
    const v20 = fundFuture(contribution, 20);
    const v40 = fundFuture(contribution, 40);
    document.getElementById("annualValue").textContent = contribution;
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
      document.querySelectorAll(".choice").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      text.textContent = choiceCopy[button.dataset.choice];
    });
  });
}

function renderQuickCompare() {
  const host = document.getElementById("quickCompare");
  if (!host || typeof PARTY_DATA === "undefined") return;
  const spotlight = [
    ["high", "Les pensions élevées participent-elles ?"],
    ["workers", "Où tombe l'effort sur les actifs ?"],
    ["capitalisation", "Un capital est-il accumulé ?"],
    ["socialOwnership", "Qui possède ce capital ?"]
  ];
  host.innerHTML = spotlight.map(([criterionId, question]) => {
    const criterion = PARTY_DATA.criteria.find(item => item.id === criterionId);
    const chips = PARTY_DATA.parties.map(party => {
      const [label, type] = party.cells[criterionId];
      return `<button class="compare-chip ${type} ${party.id === 'ours' ? 'ours' : ''}" data-party="${party.id}" data-criterion="${criterionId}"><span>${party.name}</span><b>${label}</b></button>`;
    }).join("");
    return `<article class="compare-question"><div class="compare-question-head"><span>${criterion.label}</span><h3>${question}</h3></div><div class="compare-chips">${chips}</div></article>`;
  }).join("");
  host.querySelectorAll(".compare-chip").forEach(button => button.addEventListener("click", () => openPartyDialog(button.dataset.party, button.dataset.criterion)));
}

function renderPartyTable(filter = "all") {
  const table = document.getElementById("partyTable");
  if (!table || typeof PARTY_DATA === "undefined") return;
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  thead.innerHTML = `<tr><th>Critère</th>${PARTY_DATA.parties.map(party => `<th>${party.name}</th>`).join("")}</tr>`;
  tbody.innerHTML = "";
  PARTY_DATA.criteria.filter(criteria => filter === "all" || criteria.group === filter).forEach(criteria => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th>${criteria.label}</th>${PARTY_DATA.parties.map(party => {
      const [label, type, detail] = party.cells[criteria.id];
      const tip = detail.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
      return `<td class="party-cell" data-party="${party.id}" data-criterion="${criteria.id}" tabindex="0" role="button" title="${tip}"><span class="stance ${type}">${label}</span></td>`;
    }).join("")}`;
    tbody.appendChild(tr);
  });
  bindPartyCells();
}

function openPartyDialog(partyId, criterionId) {
  const party = PARTY_DATA.parties.find(item => item.id === partyId);
  const criterion = PARTY_DATA.criteria.find(item => item.id === criterionId);
  if (!party || !criterion) return;
  const [label, type, detail] = party.cells[criterionId];
  const sources = party.sources.length
    ? party.sources.map(([name, url]) => `<a class="source-link" href="${url}" target="_blank" rel="noreferrer">${name}</a>`).join(" ")
    : `<span class="small-print">Cette colonne décrit la proposition présentée sur ce site.</span>`;
  document.getElementById("dialogContent").innerHTML = `
    <div class="dialog-top"><span class="dialog-party">${party.name}</span><span>${party.updated}</span></div>
    <h2>${criterion.label}</h2>
    <p class="dialog-summary">${party.summary}</p>
    <div class="dialog-verdict ${type}"><span>Position retenue</span><strong>${label}</strong><p>${detail}</p></div>
    <div class="dialog-section"><h4>Sources</h4><div class="link-row">${sources}</div></div>`;
  document.getElementById("partyDialog").showModal();
}

function bindPartyCells() {
  document.querySelectorAll(".party-cell").forEach(cell => {
    const open = () => openPartyDialog(cell.dataset.party, cell.dataset.criterion);
    cell.addEventListener("click", open);
    cell.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
  });
}

function bindPartyFilters() {
  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      renderPartyTable(button.dataset.filter);
    });
  });
  const dialog = document.getElementById("partyDialog");
  document.getElementById("dialogClose")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
}

function quoteImpact(item) {
  const text = `${item.verdict} ${item.bernard}`.toLowerCase();
  if (text.includes("tend à protéger")) return ["plutôt oui", "mixed"];
  if (text.includes("oui") || text.includes("protection forte") || text.includes("protège directement")) return ["oui", "yes"];
  if (text.includes("non")) return ["non", "no"];
  return ["à lire", "unknown"];
}

function renderQuotes() {
  const host = document.getElementById("quoteGrid");
  if (!host || typeof QUOTES === "undefined") return;
  host.innerHTML = QUOTES.map(item => {
    const [impact, type] = quoteImpact(item);
    return `<article class="quote-card">
      <div class="quote-meta"><span>${item.person}, ${item.party}</span><span>${item.date}</span></div>
      <blockquote>"${item.quote}"</blockquote>
      <p class="quote-context">${item.context}</p>
      <div class="quote-answer ${type}"><span>Bernard à 5 000 € est-il protégé ?</span><strong>${impact}</strong></div>
      <p class="quote-detail">${item.verdict} ${item.bernard}</p>
      <a class="source-link" href="${item.url}" target="_blank" rel="noreferrer">Voir la source</a>
    </article>`;
  }).join("");
}

function renderSources() {
  const host = document.getElementById("sourceGrid");
  if (!host || typeof SOURCES === "undefined") return;
  host.innerHTML = SOURCES.map(source => `<article class="source-card"><span class="source-kind">${source.kind}</span><h3>${source.title}</h3><p>${source.note}</p><a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">Ouvrir</a></article>`).join("");
}

function bindReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: .06 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

renderAgeShape("ageShape1950", ageProfiles.old, "old");
renderAgeShape("ageShapeNow", ageProfiles.now, "now");
renderRatioChart();
renderMagnitude();
bindStockLab();
bindSimulator();
bindChoices();
renderQuickCompare();
renderPartyTable();
bindPartyFilters();
renderQuotes();
renderSources();
bindReveal();
