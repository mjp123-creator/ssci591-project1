"use strict";
// AI-assisted draft; adapt and disclose assistance in accordance with course policy.
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
const aboutButton = document.getElementById("about-button");
const moreAbout = document.getElementById("more-about");
const aboutStatus = document.getElementById("about-status");

// Function + visible string output + an event listener independent of the map.
function toggleAbout() {
  const show = moreAbout.hidden;
  moreAbout.hidden = !show;
  aboutButton.setAttribute("aria-expanded", String(show));
  aboutButton.textContent = show ? "Show less" : "More about me";
  aboutStatus.textContent = show ? "More information is shown above." : "More information is hidden.";
}
aboutButton.addEventListener("click", toggleAbout);

// Library usage adapted from https://leafletjs.com/examples/quick-start/.
// USC coordinates come from the Week 1 classroom demo, not a personal location claim.
const USC = [34.0224, -118.2851];
// Representative point in Shunde, not a residential address.
// Source: https://maps.apple.com/place?auid=1117349206072835&lsp=57879
const HOME = [22.80541, 113.29320];
const mapStatus = document.getElementById("map-status");
const resetButton = document.getElementById("reset-map");
const homeButton = document.getElementById("home-map");

if (typeof L === "undefined") {
  mapStatus.textContent = "The map library could not load. Check your internet connection and reload. The profile and introduction button still work.";
} else {
  const map = L.map("map", { scrollWheelZoom: false }).setView(USC, 14);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  let tileFailed = false;
  tiles.on("loading", function () { tileFailed = false; });
  tiles.on("tileerror", function () {
    tileFailed = true;
    mapStatus.textContent = "Some map tiles could not load. Check your connection, then reload the page.";
  });
  tiles.on("load", function () {
    if (!tileFailed) mapStatus.textContent = "Map ready. Drag to explore, use + / − to zoom, or select a location marker.";
  });
  tiles.addTo(map);
  L.marker(USC, { alt: "University of Southern California", title: "USC" })
    .addTo(map).bindPopup("University of Southern California — course reference location.");
  L.marker(HOME, { alt: "Shunde, Foshan", title: "My hometown" })
    .addTo(map).bindPopup("My hometown: Shunde, Foshan, Guangdong, China.");
  homeButton.disabled = false;
  homeButton.addEventListener("click", function () {
    map.setView(HOME, 12);
    mapStatus.textContent = "Showing my hometown: Shunde, Foshan, China.";
  });
  resetButton.disabled = false;
  resetButton.addEventListener("click", function () {
    map.setView(USC, 14, { animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches });
    mapStatus.textContent = "Returned to USC, Los Angeles.";
  });
}
