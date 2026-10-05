# Global Earthquake Explorer

SSCI 591 Project 2 · Jiapei Mei

An educational exploration of a seven-day USGS earthquake snapshot. The application is an ArcGIS Dashboard embedded in the accompanying HTML page. The Leaflet preview is a development aid, not a substitute for the required Esri application.

## Published application

- [ArcGIS Dashboard](https://www.arcgis.com/apps/dashboards/2e0b3c22e92445f4ac493915b46173cc)
- [Web Map](https://www.arcgis.com/home/item.html?id=3b0be81f736449708624e89157a25fda)
- [Hosted data](https://www.arcgis.com/home/item.html?id=8c39b77313dd4aab8fdcdc3d57cd8c50)

The public Dashboard contains proportional magnitude circles, event popups, a linked count indicator, and a magnitude-group bar chart. Selecting a bar filters the map and count. The layer, map, and Dashboard have been verified without signing in. The higher-magnitude group produces 132 events from 319 total.

## Data and provenance

Source: USGS Earthquake Hazards Program, M2.5+ seven-day GeoJSON feed:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson

Archived feed generation: **October 4, 2026, 19:51:31 UTC**. This project uses this fixed snapshot; downloading the same feed later will return different events.

The original download contains 325 records. The processing script excludes six records below magnitude 2.5 and retains 319. It checks identifiers, earthquake type, numeric magnitudes and coordinates, and coordinate bounds. No locations were entered individually.

Source geometry uses WGS84 longitude/latitude (EPSG:4326). The source third coordinate represents depth in kilometers. Processing moves it into `Depth_km` and publishes two-dimensional geometry. ArcGIS's upload wizard states the hosted layer is published in WGS 1984 Web Mercator; this differs from the source coordinate system.

| Magnitude range | Events |
|---|---:|
| 2.5 to <4.5 | 187 |
| 4.5 to <6 | 132 |
| 6 and above | 0 |

Maximum magnitude: 5.9. Event times span September 27, 2026, 20:49:20 UTC to October 4, 2026, 18:56:14 UTC.

## Files

- `data/usgs_original.geojson`: archived source.
- `prepare.py`: reproducible validation and transformation.
- `data/earthquakes.geojson`: publish this as a hosted feature layer.
- `data/earthquakes.csv`: equivalent tabular export.
- `data/metadata.json`: counts, exclusions, source URL, timestamps, and source checksum.
- `preview.html`, `preview.js`: local interactive preview.
- `index.html`, `config.js`, `embed.js`: final Dashboard embedding page.
- `evidence/`: publication and test screenshots when available.

## Run locally

From the repository root, run `python3 -m http.server 8592`, then open:
http://127.0.0.1:8592/project2/earthquakes/preview.html

The preview needs an internet connection for Leaflet and map tiles. It supports minimum-magnitude filtering, statistics, event selection, and resetting the map extent.

## Deployment

Publish this folder on GitHub Pages with `index.html` as the entry point. `config.js` contains the public Dashboard URL. No build process or authentication is required. The application depends on ArcGIS Online and an internet connection. The Dashboard is designed primarily for desktop use.

## Limitations

This is a static snapshot, not an alert service. Short-term earthquake counts do not measure long-term hazard. Detection and reporting completeness vary by region. USGS may revise event parameters, and different magnitude types are not a homogenized scientific catalog.

## References and assistance

- USGS GeoJSON documentation: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
- Comparable application, USGS Latest Earthquakes: https://earthquake.usgs.gov/earthquakes/map/
- Leaflet preview: https://leafletjs.com/
- Preview basemap: OpenStreetMap contributors, https://www.openstreetmap.org/copyright

AI assistance was used for data preparation code, the local preview, documentation, and drafting. Publication and testing status must reflect actual completed work.
