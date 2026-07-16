/* Deterministic Mermaid rendering for Material for MkDocs.
   Renders ```mermaid fenced code blocks into SVG, themed to the AtlasXomics
   brand. Blocks are detected by their content header (flowchart, graph, ...)
   since pymdownx does not tag them with a language class. Runs on load and on
   Material's instant navigation (document$), retrying until mermaid is ready. */
(() => {
  const THEME = {
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
      primaryColor: "#eaf1f8",
      primaryBorderColor: "#225789",
      primaryTextColor: "#1f2937",
      lineColor: "#225789",
      secondaryColor: "#f8fafc",
      tertiaryColor: "#ffffff"
    }
  };

  const MERMAID_HEADER = /^\s*(?:%%\{|flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|quadrantChart|requirementDiagram|C4Context|sankey|xychart)/;

  let initialized = false;

  function renderAll() {
    if (!window.mermaid) {
      // library not loaded yet — retry shortly
      return setTimeout(renderAll, 100);
    }
    if (!initialized) {
      window.mermaid.initialize(THEME);
      initialized = true;
    }
    document.querySelectorAll(".highlight pre > code, pre > code").forEach((code) => {
      const src = code.textContent;
      if (!MERMAID_HEADER.test(src)) return;

      const block = code.closest(".highlight") || code.closest("pre") || code;
      if (block.dataset.mmRendered) return;
      block.dataset.mmRendered = "1";

      const holder = document.createElement("div");
      holder.className = "mermaid";
      block.replaceWith(holder);

      const id = "mm-" + Math.random().toString(36).slice(2);
      window.mermaid
        .render(id, src)
        .then(({ svg }) => { holder.innerHTML = svg; })
        .catch(() => { holder.textContent = src; });
    });
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(() => setTimeout(renderAll, 0));
  } else if (document.readyState !== "loading") {
    renderAll();
  } else {
    window.addEventListener("DOMContentLoaded", renderAll);
  }
})();
