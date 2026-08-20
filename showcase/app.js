const concepts = [
  {
    id: "1",
    name: "Präzise Linie",
    description: "Zurückhaltende Farbpräsenz, kompakte Dichte und eine klare Akzentkante."
  },
  {
    id: "2",
    name: "Ausgewogenes Kontor",
    description: "Balancierte Pastellflächen mit Serif-Display und ruhiger Borderhierarchie."
  },
  {
    id: "3",
    name: "Klares Signal",
    description: "Deutlich sichtbarer RAL-5015-Akzent bei weiterhin neutralen Grundflächen."
  },
  {
    id: "4",
    name: "Pastell-Arbeitsfläche",
    description: "Flächenorientierte Pastelltöne, entspannte Dichte und Serif-Display."
  },
  {
    id: "5",
    name: "Fokussierter Kontrast",
    description: "Kontrastreicher und dichter, aber gedeckt und vollständig flat."
  }
];

const iconHref = (name) => `../src/icons.svg#sb-icon-${name}`;

function icon(name) {
  return `<svg class="sb-icon" aria-hidden="true"><use href="${iconHref(name)}"></use></svg>`;
}

const navigation = [
  ["layout-dashboard", "Übersicht", true],
  ["clock", "Zeiten", false],
  ["users", "Kunden", false],
  ["file-text", "Angebote", false],
  ["receipt", "Rechnungen", false],
  ["wallet", "Ausgaben", false],
  ["chart", "Berichte", false]
];

function sidebarMarkup(id, mobile) {
  const toggleSemantic = mobile ? "navigation.close" : "sidebar.collapse";
  const toggleLabel = mobile ? "Navigation schließen" : "Sidebar einklappen";
  const toggleIcon = mobile ? "panel-left-close" : "panel-left-close";
  return `
    <aside class="sb-sidebar" aria-label="Hauptnavigation">
      <div class="sb-brand-row">
        <a class="sb-product-identity" href="#concept-${id}">
          <span class="sb-product-symbol" aria-hidden="true">F</span>
          <span class="sb-product-copy">
            <span class="sb-wordmark">simple</span>
            <span class="sb-product-name">Freelancer</span>
          </span>
        </a>
        <button class="sb-icon-button sb-panel-button" type="button" data-panel-toggle data-semantic="${toggleSemantic}" aria-label="${toggleLabel}" title="${toggleLabel}">
          ${icon(toggleIcon)}
        </button>
        <button class="sb-icon-button sb-search-action" type="button" aria-label="Navigation durchsuchen" title="Navigation durchsuchen">
          ${icon("search")}
        </button>
      </div>
      <button class="sb-product-switcher" type="button">
        <span>Freelancer</span>${icon("chevron-down")}
      </button>
      <div class="sb-sidebar-scroll">
        <p class="sb-section-label">Arbeitsbereich</p>
        <nav class="sb-navigation" aria-label="Primär">
          ${navigation
            .map(
              ([navIcon, label, active]) => `
                <a class="sb-nav-link" href="#concept-${id}" ${active ? 'aria-current="page"' : ""}>
                  ${icon(navIcon)}<span class="sb-nav-label">${label}</span>
                </a>`
            )
            .join("")}
        </nav>
        <p class="sb-section-label">Organisation</p>
        <nav class="sb-navigation" aria-label="Sekundär">
          <a class="sb-nav-link" href="#concept-${id}">${icon("building")}<span class="sb-nav-label">Unternehmen</span></a>
          <button class="sb-nav-link settings-entry" type="button" data-open-settings>${icon("settings")}<span class="sb-nav-label">Einstellungen</span></button>
          <a class="sb-nav-link" href="#concept-${id}">${icon("help")}<span class="sb-nav-label">Hilfe</span></a>
        </nav>
      </div>
      <div class="sb-account-area">
        <a class="sb-account" href="#concept-${id}">
          <span class="sb-avatar" aria-hidden="true">TK</span>
          <span class="sb-account-copy"><strong>Tim K.</strong><br /><small>Administrator</small></span>
        </a>
      </div>
    </aside>`;
}

function workspaceMarkup(conceptId, mobile = false) {
  const previewKey = `${conceptId}-${mobile ? "mobile" : "desktop"}`;
  const collapseState = localStorage.getItem("simple-business-sidebar") === "collapsed" ? "collapsed" : "expanded";
  return `
    <div class="sb-shell" data-preview-shell="${previewKey}" data-sidebar="${collapseState}" data-drawer="closed">
      ${sidebarMarkup(conceptId, mobile)}
      <button class="sb-drawer-scrim" type="button" data-drawer-scrim aria-label="Navigation schließen"></button>
      <main class="sb-main">
        <div class="sb-context-bar sb-mobile-context">
          <button class="sb-icon-button sb-panel-button" type="button" data-panel-toggle data-semantic="navigation.open" aria-label="Navigation öffnen" title="Navigation öffnen">
            ${icon("panel-left-open")}
          </button>
          <strong>Übersicht</strong>
          <button class="sb-icon-button" type="button" data-open-settings aria-label="Einstellungen" title="Einstellungen">${icon("settings")}</button>
        </div>
        <div class="sb-page">
          <header class="sb-page-header">
            <div>
              <p class="sb-eyebrow">Donnerstag · 20. August</p>
              <h2 class="sb-title">Guten Tag, Tim.</h2>
              <p class="sb-subtitle">Offene Arbeit, fällige Rechnungen und aktuelle Zeiten auf einen Blick.</p>
            </div>
            <button class="sb-button sb-button-primary" type="button">${icon("plus")}Neue Rechnung</button>
          </header>
          <div class="sb-toolbar">
            <div class="sb-tabs" role="tablist" aria-label="Übersichtsbereich">
              <button class="sb-tab" type="button" role="tab" aria-selected="true">Heute</button>
              <button class="sb-tab" type="button" role="tab" aria-selected="false">Diese Woche</button>
              <button class="sb-tab" type="button" role="tab" aria-selected="false">Offen</button>
            </div>
            <label>
              <span class="sb-visually-hidden">Einträge durchsuchen</span>
              <input class="sb-field" type="search" placeholder="Suchen" />
            </label>
          </div>
          <section class="sb-work-surface" aria-label="Aktuelle Vorgänge">
            <div class="sb-data-row" aria-selected="true">
              <strong>Website-Relaunch</strong><span>Nordstern GmbH</span><span>6:20 h</span><span class="sb-status">Aktiv</span>
            </div>
            <div class="sb-data-row">
              <strong>Beratung August</strong><span>Werkraum KG</span><span>2:45 h</span><a class="sb-link" href="#concept-${conceptId}">Öffnen</a>
            </div>
            <div class="sb-data-row">
              <strong>Rechnung RE-2026-081</strong><span>Studio Süd</span><span>1.420,00 €</span><span class="sb-status">Bezahlt</span>
            </div>
            <div class="sb-data-row">
              <strong>Angebot AN-2026-027</strong><span>Hafenbüro</span><span>3.800,00 €</span><a class="sb-link" href="#concept-${conceptId}">Prüfen</a>
            </div>
          </section>
        </div>
      </main>
    </div>`;
}

function settingsMarkup(conceptId, mobile = false) {
  return `
    <div class="sb-settings-overlay" role="presentation">
      <section class="sb-settings" role="dialog" aria-modal="true" aria-labelledby="settings-title-${conceptId}-${mobile ? "m" : "d"}">
        <aside class="sb-settings-nav" aria-label="Einstellungskategorien">
          <label>
            <span class="sb-visually-hidden">Einstellungen durchsuchen</span>
            <input class="sb-field sb-settings-search" type="search" placeholder="Suchen" />
          </label>
          <p class="sb-section-label">Einstellungen</p>
          <nav class="sb-navigation">
            <a class="sb-nav-link" href="#concept-${conceptId}" aria-current="page">${icon("settings")}<span>Allgemein</span></a>
            <a class="sb-nav-link" href="#concept-${conceptId}">${icon("building")}<span>Unternehmen</span></a>
            <a class="sb-nav-link" href="#concept-${conceptId}">${icon("users")}<span>Benutzerkonto</span></a>
            <a class="sb-nav-link" href="#concept-${conceptId}">${icon("file-text")}<span>Rechnungen</span></a>
          </nav>
        </aside>
        <div class="sb-settings-main">
          <button class="sb-icon-button sb-settings-close" type="button" data-close-settings aria-label="Einstellungen schließen" title="Einstellungen schließen">${icon("x")}</button>
          <section class="sb-settings-section">
            <h3 class="sb-settings-heading" id="settings-title-${conceptId}-${mobile ? "m" : "d"}">Allgemein</h3>
            <div class="sb-setting-row">
              <span class="sb-setting-copy"><strong>Sprache</strong><span class="sb-helper">Sprache der Arbeitsoberfläche</span></span>
              <select class="sb-select" aria-label="Sprache"><option>Deutsch</option><option>English</option></select>
            </div>
            <div class="sb-setting-row">
              <span class="sb-setting-copy"><strong>Darstellung</strong><span class="sb-helper">Systemvorgabe oder feste Darstellung</span></span>
              <div class="sb-segmented" role="radiogroup" aria-label="Darstellung">
                <button class="sb-segment-button" type="button" role="radio" aria-checked="true">${icon("monitor")}System</button>
                <button class="sb-segment-button" type="button" role="radio" aria-checked="false">${icon("sun")}Hell</button>
                <button class="sb-segment-button" type="button" role="radio" aria-checked="false">${icon("moon")}Dunkel</button>
              </div>
            </div>
            <div class="sb-setting-row">
              <span class="sb-setting-copy"><strong>Wochenbeginn</strong><span class="sb-helper">Gilt für Kalender und Berichte</span></span>
              <select class="sb-select" aria-label="Wochenbeginn"><option>Montag</option><option>Sonntag</option></select>
            </div>
          </section>
          <section class="sb-settings-section">
            <h3 class="sb-settings-heading">Benachrichtigungen</h3>
            <div class="sb-setting-row">
              <span class="sb-setting-copy"><strong>Fällige Rechnungen</strong><span class="sb-helper">Hinweis drei Tage vor Fälligkeit</span></span>
              <input class="sb-binary-switch" type="checkbox" checked aria-label="Hinweise zu fälligen Rechnungen" />
            </div>
            <div class="sb-setting-row">
              <span class="sb-setting-copy"><strong>Wochenbericht</strong><span class="sb-helper">Zusammenfassung am Freitag</span></span>
              <input class="sb-checkbox" type="checkbox" checked aria-label="Wochenbericht senden" />
            </div>
          </section>
        </div>
      </section>
    </div>`;
}

function viewportMarkup(conceptId, mobile) {
  const viewport = mobile ? "Mobil · 390 × 844" : "Desktop · 1440 × 900";
  return `
    <div class="viewport-block">
      <div class="viewport-label"><span>${viewport}</span><span>gleicher Inhalt</span></div>
      <div class="preview-frame ${mobile ? "preview-mobile" : "preview-desktop"}">
        <div data-view-panel="workspace">${workspaceMarkup(conceptId, mobile)}</div>
        <div data-view-panel="settings" hidden>${settingsMarkup(conceptId, mobile)}</div>
      </div>
    </div>`;
}

function conceptMarkup(concept) {
  return `
    <article class="concept-card" id="concept-${concept.id}" data-sb-concept="${concept.id}" data-sb-theme="light">
      <header class="concept-card-header">
        <div>
          <span class="concept-number">0${concept.id}</span>
          <h2 class="concept-heading">${concept.name}</h2>
          <p class="concept-description">${concept.description}</p>
        </div>
        <div class="sb-segmented view-switch" role="group" aria-label="Vorschau für ${concept.name}">
          <button class="sb-segment-button" type="button" aria-pressed="true" data-view="workspace">Arbeitsfläche</button>
          <button class="sb-segment-button" type="button" aria-pressed="false" data-view="settings">Einstellungen</button>
        </div>
      </header>
      <div class="concept-viewports">
        ${viewportMarkup(concept.id, false)}
        ${viewportMarkup(concept.id, true)}
      </div>
    </article>`;
}

const conceptList = document.querySelector("#concept-list");
conceptList.innerHTML = concepts.map(conceptMarkup).join("");

function setTheme(theme) {
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  document.body.dataset.sbTheme = resolved;
  document.querySelectorAll(".concept-card").forEach((card) => {
    card.dataset.sbTheme = resolved;
  });
  document.querySelectorAll("[data-theme]").forEach((button) => {
    button.setAttribute("aria-checked", String(button.dataset.theme === theme));
  });
  localStorage.setItem("simple-business-theme", theme);
}

document.querySelectorAll("[data-theme]").forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.theme));
});

document.querySelectorAll(".view-switch").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    const card = group.closest(".concept-card");
    card.querySelectorAll("[data-view-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.viewPanel !== button.dataset.view;
    });
    group.querySelectorAll("[data-view]").forEach((candidate) => {
      candidate.setAttribute("aria-pressed", String(candidate === button));
    });
  });
});

document.addEventListener("click", (event) => {
  const settingsTrigger = event.target.closest("[data-open-settings]");
  if (settingsTrigger) {
    const card = settingsTrigger.closest(".concept-card");
    card.querySelector('[data-view="settings"]').click();
    return;
  }

  const settingsClose = event.target.closest("[data-close-settings]");
  if (settingsClose) {
    const card = settingsClose.closest(".concept-card");
    card.querySelector('[data-view="workspace"]').click();
    return;
  }

  const scrim = event.target.closest("[data-drawer-scrim]");
  if (scrim) {
    closeDrawer(scrim.closest(".sb-shell"));
    return;
  }

  const toggle = event.target.closest("[data-panel-toggle]");
  if (!toggle) return;
  const shell = toggle.closest(".sb-shell");
  const mobilePreview = toggle.closest(".preview-mobile");
  if (mobilePreview) {
    if (shell.dataset.drawer === "open") {
      closeDrawer(shell);
    } else {
      openDrawer(shell, toggle);
    }
  } else {
    const collapsed = shell.dataset.sidebar === "collapsed";
    shell.dataset.sidebar = collapsed ? "expanded" : "collapsed";
    localStorage.setItem("simple-business-sidebar", shell.dataset.sidebar);
    updateDesktopToggle(toggle, !collapsed);
  }
});

function updateDesktopToggle(button, collapsed) {
  const label = collapsed ? "Sidebar ausklappen" : "Sidebar einklappen";
  const iconName = collapsed ? "panel-left-open" : "panel-left-close";
  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
  button.dataset.semantic = collapsed ? "sidebar.expand" : "sidebar.collapse";
  button.querySelector("use").setAttribute("href", iconHref(iconName));
}

function openDrawer(shell, trigger) {
  shell.dataset.drawer = "open";
  shell.dataset.drawerTrigger = trigger.closest(".preview-frame") ? "preview" : "page";
  shell._drawerTrigger = trigger;
  const closeButton = shell.querySelector('.sb-sidebar [data-panel-toggle]');
  closeButton.focus();
}

function closeDrawer(shell) {
  shell.dataset.drawer = "closed";
  const trigger = shell._drawerTrigger;
  if (trigger instanceof HTMLElement) trigger.focus();
}

document.addEventListener("keydown", (event) => {
  const openShell = document.querySelector('.sb-shell[data-drawer="open"]');
  if (!openShell) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeDrawer(openShell);
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [...openShell.querySelectorAll('.sb-sidebar a, .sb-sidebar button, .sb-sidebar input, .sb-sidebar [tabindex]:not([tabindex="-1"])')].filter(
    (element) => !element.hasAttribute("disabled")
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const preferredTheme = localStorage.getItem("simple-business-theme") ?? "system";
setTheme(preferredTheme);

document.querySelectorAll(".preview-desktop .sb-shell").forEach((shell) => {
  const button = shell.querySelector("[data-panel-toggle]");
  updateDesktopToggle(button, shell.dataset.sidebar === "collapsed");
});
