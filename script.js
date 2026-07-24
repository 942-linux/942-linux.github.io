(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const randomThoughts = [
    "Most alpha is just information with better typography.",
    "Being early and being wrong often look identical.",
    "Every serious protocol eventually becomes a meme.",
    "The market rewards patience, then tests whether you actually have any.",
    "Research sometimes means scrolling X for three hours.",
    "The chart looked better before I opened it.",
    "Internet conviction has a half-life of twelve hours.",
    "Every community eventually invents its own vocabulary.",
    "Not everything needs a token.",
    "Some things definitely need a meme.",
    "The best ideas often arrive disguised as bad jokes.",
    "Liquidity moves faster than understanding.",
    "Everyone is a long-term investor until the timeline turns red.",
    "A dashboard does not automatically make something intelligent.",
    "Curiosity compounds better than confidence.",
    "A roadmap is a calendar written by optimism.",
    "The replies are where certainty goes to be stress-tested."
  ];
  const convictionExplanations = [
    "Increased after reading one optimistic thread.",
    "Reduced after opening the replies.",
    "No meaningful research was conducted.",
    "Updated after staring at the chart for eleven minutes.",
    "Confidence restored by typography.",
    "Data unavailable. Vibes remain strong.",
    "Recalculated using a proprietary emotional model."
  ];
  const systemMessages = [
    "Signal detected",
    "Alpha not found",
    "Timeline unstable",
    "Research in progress",
    "Vibes calibrated"
  ];

  const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

  const setupNavigation = () => {
    const toggle = document.querySelector(".menu-toggle");
    const panel = document.querySelector(".nav-panel");
    if (!toggle || !panel) return;

    const closeMenu = ({ returnFocus = false } = {}) => {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      if (returnFocus) toggle.focus();
    };

    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      panel.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("menu-open", willOpen);
      if (willOpen) panel.querySelector("a")?.focus();
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        closeMenu({ returnFocus: true });
      }
    });

    window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  };

  const setupRandomThoughts = () => {
    const dialog = document.querySelector("#thought-dialog");
    const thoughtText = document.querySelector("#thought-text");
    const triggers = document.querySelectorAll("[data-random-thought]");
    if (!dialog || !thoughtText || !triggers.length) return;

    const showThought = () => {
      thoughtText.textContent = randomItem(randomThoughts);
      if (typeof dialog.showModal === "function") {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    };

    const closeThought = () => {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    };

    triggers.forEach((trigger) => trigger.addEventListener("click", showThought));
    dialog.querySelector("[data-close-thought]")?.addEventListener("click", closeThought);
    dialog.querySelector("[data-another-thought]")?.addEventListener("click", showThought);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeThought();
    });
  };

  const setupConviction = () => {
    const button = document.querySelector("#conviction-button");
    const output = document.querySelector("#conviction-output");
    const meter = document.querySelector("#conviction-meter");
    const copy = document.querySelector("#conviction-copy");
    if (!button || !output || !meter || !copy) return;

    button.addEventListener("click", () => {
      const value = Math.floor(Math.random() * 58) + 42;
      output.textContent = `${value}%`;
      meter.style.setProperty("--value", `${value}%`);
      copy.textContent = randomItem(convictionExplanations);
      output.setAttribute("aria-label", `Current simulated conviction ${value} percent`);
    });
  };

  const setupArchiveFilters = () => {
    const filters = document.querySelectorAll("[data-filter]");
    const files = document.querySelectorAll("[data-category]");
    const empty = document.querySelector("#archive-empty");
    if (!filters.length || !files.length) return;

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.filter;
        let visibleCount = 0;

        filters.forEach((filter) => {
          const active = filter === button;
          filter.classList.toggle("is-active", active);
          filter.setAttribute("aria-pressed", String(active));
        });

        files.forEach((file) => {
          const visible = selected === "all" || file.dataset.category === selected;
          file.hidden = !visible;
          if (visible) visibleCount += 1;
        });

        if (empty) empty.hidden = visibleCount !== 0;
      });
    });
  };

  const setupRabbitHoles = () => {
    document.querySelectorAll(".rabbit-item").forEach((item) => {
      item.addEventListener("click", () => {
        const expanded = item.getAttribute("aria-expanded") === "true";
        item.setAttribute("aria-expanded", String(!expanded));
      });
    });
  };

  const setupEasterEgg = () => {
    const message = document.querySelector("#degen-message");
    let typed = "";
    let degenTimer;

    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return;
      typed = `${typed}${event.key}`.slice(-6);
      if (typed !== "429999") return;

      window.clearTimeout(degenTimer);
      document.body.classList.add("degen-mode");
      message?.classList.add("is-visible");

      degenTimer = window.setTimeout(() => {
        document.body.classList.remove("degen-mode");
        message?.classList.remove("is-visible");
      }, 5000);
      typed = "";
    });
  };

  const setupSystemMessages = () => {
    const toast = document.querySelector("#system-toast");
    if (!toast) return;
    let showTimer;
    let hideTimer;

    const scheduleMessage = () => {
      window.clearTimeout(showTimer);
      showTimer = window.setTimeout(() => {
        if (document.hidden || toast.classList.contains("is-visible")) {
          scheduleMessage();
          return;
        }
        toast.textContent = randomItem(systemMessages);
        toast.classList.add("is-visible");
        hideTimer = window.setTimeout(() => {
          toast.classList.remove("is-visible");
          scheduleMessage();
        }, 3200);
      }, 45000 + Math.random() * 45000);
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.clearTimeout(showTimer);
        window.clearTimeout(hideTimer);
        toast.classList.remove("is-visible");
      } else {
        scheduleMessage();
      }
    });

    scheduleMessage();
  };

  const setupCursor = () => {
    const pointerQuery = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 900px)");
    if (!pointerQuery.matches || reducedMotion.matches) return;

    let queued = false;
    let x = -20;
    let y = -20;

    document.addEventListener("pointermove", (event) => {
      x = event.clientX;
      y = event.clientY;
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${x}px`);
        document.documentElement.style.setProperty("--cursor-y", `${y}px`);
        document.documentElement.style.setProperty("--ring-x", `${x}px`);
        document.documentElement.style.setProperty("--ring-y", `${y}px`);
        document.body.classList.add("cursor-ready");
        queued = false;
      });
    }, { passive: true });

    document.addEventListener("pointerover", (event) => {
      const interactive = event.target.closest("a, button, [tabindex]");
      document.body.classList.toggle("cursor-active", Boolean(interactive));
    });
  };

  document.querySelectorAll("[data-current-year]").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  setupNavigation();
  setupRandomThoughts();
  setupConviction();
  setupArchiveFilters();
  setupRabbitHoles();
  setupEasterEgg();
  setupSystemMessages();
  setupCursor();
})();
