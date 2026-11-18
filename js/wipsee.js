(function () {
  "use strict";

  function initAccordion(root) {
    root.querySelectorAll(".wip-accordion__trigger").forEach(function (trigger) {
      if (trigger.__wpBound) return;
      trigger.__wpBound = true;
      trigger.addEventListener("click", function () {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }

  function initTabs(root) {
    root.querySelectorAll(".wip-tabs").forEach(function (tabs) {
      if (tabs.__wpBound) return;
      tabs.__wpBound = true;
      var buttons = Array.prototype.slice.call(tabs.querySelectorAll(".wip-tabs__tab"));
      function select(btn) {
        buttons.forEach(function (b) {
          var selected = b === btn;
          b.setAttribute("aria-selected", String(selected));
          var panel = document.getElementById(b.getAttribute("aria-controls"));
          if (panel) panel.hidden = !selected;
        });
        btn.focus();
      }
      buttons.forEach(function (btn, i) {
        btn.addEventListener("click", function () { select(btn); });
        btn.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight") select(buttons[(i + 1) % buttons.length]);
          if (e.key === "ArrowLeft") select(buttons[(i - 1 + buttons.length) % buttons.length]);
        });
      });
    });
  }

  function initModal(root) {
    root.querySelectorAll("[data-modal-open]").forEach(function (opener) {
      if (opener.__wpBound) return;
      opener.__wpBound = true;
      opener.addEventListener("click", function () {
        var overlay = document.getElementById(opener.getAttribute("data-modal-open"));
        if (!overlay) return;
        overlay.hidden = false;
        var focusable = overlay.querySelector("button, [href], input, select, textarea");
        if (focusable) focusable.focus();
      });
    });
    root.querySelectorAll(".wip-modal-overlay").forEach(function (overlay) {
      if (overlay.__wpBound) return;
      overlay.__wpBound = true;
      function close() { overlay.hidden = true; }
      overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
      overlay.querySelectorAll("[data-modal-close]").forEach(function (btn) {
        btn.addEventListener("click", close);
      });
      overlay.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    });
  }

  function initNav(root) {
    root.querySelectorAll(".wip-nav-toggle").forEach(function (toggle) {
      if (toggle.__wpBound) return;
      toggle.__wpBound = true;
      toggle.addEventListener("click", function () {
        var header = toggle.closest(".wip-header");
        if (!header) return;
        var open = header.classList.toggle("wip-header--open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    });
  }

  function initDismiss(root) {
    root.querySelectorAll("[data-dismiss]").forEach(function (btn) {
      if (btn.__wpBound) return;
      btn.__wpBound = true;
      btn.addEventListener("click", function () {
        var target = btn.closest(".wip-alert, .wip-tag");
        if (target) target.remove();
      });
    });
  }

  function initAll(root) {
    root = root || document;
    initAccordion(root);
    initTabs(root);
    initModal(root);
    initNav(root);
    initDismiss(root);
  }

  window.Wipsee = {
    initAccordion: initAccordion,
    initTabs: initTabs,
    initModal: initModal,
    initNav: initNav,
    initDismiss: initDismiss,
    initAll: initAll
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { initAll(document); });
  } else {
    initAll(document);
  }
})();
