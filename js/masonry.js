(function () {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll(".piece"));
  if (!items.length) return;

  function layout() {
    const containerWidth = grid.clientWidth;
    const gap = 100;
    let cols = 3;
    if (containerWidth <= 640) cols = 1;
    else if (containerWidth <= 900) cols = 2;

    const colWidth = (containerWidth - gap * (cols - 1)) / cols;
    const colHeights = new Array(cols).fill(0);

    grid.style.position = "relative";

    items.forEach((item) => {
      item.style.position = "absolute";
      item.style.width = colWidth + "px";

      const shortest = colHeights.indexOf(Math.min(...colHeights));
      const x = shortest * (colWidth + gap);
      const y = colHeights[shortest];

      item.style.left = x + "px";
      item.style.top = y + "px";

      const img = item.querySelector("img");
      const ratio = img.naturalHeight / img.naturalWidth || 0.75;
      const itemHeight = colWidth * ratio;

      colHeights[shortest] = y + itemHeight + gap;
    });

    grid.style.height = Math.max(...colHeights) + "px";
  }

  let loaded = 0;
  const images = grid.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) layout();
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === images.length) layout();
      });
      img.addEventListener("error", () => {
        loaded++;
        if (loaded === images.length) layout();
      });
    }
  });

  if (loaded === images.length) layout();
  window.addEventListener("resize", layout);
})();
