"use strict";

// The map, chart filter and popups are configured in ArcGIS Dashboards.
// This script embeds the published application in the HTML page.
const dashboardURL = "https://www.arcgis.com/apps/dashboards/2e0b3c22e92445f4ac493915b46173cc";
const dashboard = document.getElementById("app");
const directLink = document.getElementById("direct");

dashboard.src = dashboardURL;
dashboard.hidden = false;
directLink.href = dashboardURL;
