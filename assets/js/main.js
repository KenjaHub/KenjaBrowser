/* KenjaBrowser site — caption simulator, reveal-on-scroll, store link */
(function () {
  "use strict";

  /* ------------------------------------------------------------
   * App Store link — set this once the app is live, e.g.:
   *   var APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX";
   * Every [data-store-link] element picks it up automatically.
   * ---------------------------------------------------------- */
  var APP_STORE_URL = "";

  document.querySelectorAll("[data-store-link]").forEach(function (el) {
    if (APP_STORE_URL) {
      el.setAttribute("href", APP_STORE_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else if (el.getAttribute("href") === "#") {
      el.setAttribute("href", "#download");
    }
  });

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- reveal on scroll ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- live caption simulator ---------- */
  var LINES = [
    {
      lang: "EN → 中文",
      src: "Welcome back to the channel — today we're building something fun.",
      dst: "欢迎回到频道——今天我们要做点有趣的东西。"
    },
    {
      lang: "日本語 → English",
      src: "今日はいい天気ですね、散歩に行きましょう。",
      dst: "The weather is lovely today — let's go for a walk."
    },
    {
      lang: "EN → 日本語",
      src: "This is the most important slide of the whole lecture.",
      dst: "これは講義全体の中で最も重要なスライドです。"
    },
    {
      lang: "한국어 → 中文",
      src: "정말 맛있어요! 다음에 또 올게요.",
      dst: "真的太好吃了！下次我还会再来。"
    }
  ];

  var lineEl = document.getElementById("cc-line");
  var langEl = document.getElementById("cc-lang");

  function renderLine(item, srcLen, dstLen) {
    var html = '<span class="src"></span>';
    if (dstLen > 0) html += '<span class="dst"></span>';
    lineEl.innerHTML = html;
    lineEl.querySelector(".src").textContent = item.src.slice(0, srcLen);
    if (dstLen > 0) lineEl.querySelector(".dst").textContent = item.dst.slice(0, dstLen);
    var caret = document.createElement("span");
    caret.className = "cc-caret";
    lineEl.appendChild(caret);
  }

  function play() {
    if (!lineEl) return;
    var idx = 0;

    if (reduced) {
      // static display, slow rotation
      setInterval(function () {
        var item = LINES[idx % LINES.length];
        langEl.textContent = item.lang;
        renderLine(item, item.src.length, item.dst.length);
        idx++;
      }, 4200);
      var first = LINES[0];
      langEl.textContent = first.lang;
      renderLine(first, first.src.length, first.dst.length);
      return;
    }

    var item, s = 0, d = 0;

    function typeSrc() {
      if (s <= item.src.length) {
        renderLine(item, s, 0);
        s++;
        setTimeout(typeSrc, 24 + Math.random() * 30);
      } else {
        setTimeout(typeDst, 350);
      }
    }
    function typeDst() {
      if (d <= item.dst.length) {
        renderLine(item, item.src.length, d);
        d++;
        setTimeout(typeDst, 18 + Math.random() * 24);
      } else {
        setTimeout(next, 2600);
      }
    }
    function next() {
      idx = (idx + 1) % LINES.length;
      item = LINES[idx];
      s = 0; d = 0;
      langEl.textContent = item.lang;
      renderLine(item, 0, 0);
      setTimeout(typeSrc, 300);
    }

    item = LINES[0];
    langEl.textContent = item.lang;
    renderLine(item, 0, 0);
    setTimeout(typeSrc, 150);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", play);
  } else {
    play();
  }
})();
