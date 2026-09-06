/* Layout audit for slides. Runs only when ?audit=1 is present.
   Writes results into <title> so `chrome --dump-dom` can read them. */
if (location.search.indexOf("audit") !== -1) {
  window.addEventListener("load", function () {
    setTimeout(function () {
      var W = 2560, H = 1600;
      var issues = [];
      var de = document.documentElement;

      if (de.scrollWidth > W + 1 || de.scrollHeight > H + 1)
        issues.push("PAGE-OVERFLOW " + de.scrollWidth + "x" + de.scrollHeight);

      var els = document.querySelectorAll("*");
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        var cls = (typeof el.className === "string" && el.className) ? "." + el.className.trim().split(/\s+/)[0] : "";
        var tag = el.tagName.toLowerCase() + cls;

        if (r.right > W + 1 || r.bottom > H + 1 || r.left < -1 || r.top < -1)
          issues.push("OUT-OF-CANVAS " + tag + " [l" + Math.round(r.left) + " t" + Math.round(r.top) + " r" + Math.round(r.right) + " b" + Math.round(r.bottom) + "]");

        // clipped text inside overflow-hidden ancestors
        if (el.children.length === 0 && el.textContent.trim()) {
          var box = el.getBoundingClientRect();
          var range = document.createRange();
          range.selectNodeContents(el);
          var tr = range.getBoundingClientRect();
          if (tr.width > box.width + 3) {
            var p = el.parentElement, hidden = false;
            while (p) {
              var o = getComputedStyle(p).overflow;
              if (o === "hidden" || o === "clip" || o === "auto" || o === "scroll") { hidden = true; break; }
              p = p.parentElement;
            }
            if (hidden)
              issues.push("CLIPPED-TEXT " + tag + ' "' + el.textContent.trim().slice(0, 36) + '"');
          }
        }
      }
      document.title = "AUDIT " + (issues.length ? issues.join(" || ") : "CLEAN");
    }, 700);
  });
}
