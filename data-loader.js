(async () => {
  const files = ["data-a.js", "data-b.js", "data-c.js"];
  const parts = await Promise.all(files.map(async file => {
    const response = await fetch(file, { cache: "no-store" });
    if (!response.ok) throw new Error(`Impossible de charger ${file}`);
    return response.text();
  }));
  let code = parts.join("\n");
  code = code
    .replace("const PARTY_DATA", "window.PARTY_DATA")
    .replace("const QUOTES", "window.QUOTES")
    .replace("const SOURCES", "window.SOURCES");
  (0, eval)(code);
  const app = document.createElement("script");
  app.src = "app.js";
  app.defer = false;
  document.body.appendChild(app);
})().catch(error => {
  console.error(error);
  const main = document.getElementById("main");
  if (main) {
    const box = document.createElement("p");
    box.style.padding = "24px";
    box.textContent = "Le comparateur n'a pas pu charger ses données. Rechargez la page.";
    main.appendChild(box);
  }
});
