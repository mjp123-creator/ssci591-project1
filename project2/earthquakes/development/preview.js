'use strict';
const {events,metadata}=window.SNAPSHOT;
const $=id=>document.getElementById(id);
$('snapshot').textContent='Source generated '+metadata.source_generated_utc+' · '+events.length+' processed events';
let map,markers;
if(typeof L!=='undefined'){
 map=L.map('map',{scrollWheelZoom:false}).setView([15,0],2);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}).addTo(map).on('tileerror',()=>{$('map-status').textContent='Basemap tiles unavailable. Event data and filters remain available.';});
 markers=L.layerGroup().addTo(map);
}else $('map-status').textContent='Map library unavailable. Use the event table and filters below.';
function append(parent,tag,value){const e=document.createElement(tag);e.textContent=value;parent.append(e);return e;}
function popup(r){const p=document.createElement('div');append(p,'strong','M'+r.Magnitude+' · '+r.Place);append(p,'p',r.TimeUTC);append(p,'p','Depth: '+r.Depth_km+' km');const a=append(p,'a','USGS event details');a.href=r.USGS_URL;a.target='_blank';a.rel='noopener';return p;}
function render(){
 const subset=events.filter(r=>r.Magnitude>=Number($('magnitude').value));
 $('count').textContent=subset.length;$('maximum').textContent=subset.length?Math.max(...subset.map(r=>r.Magnitude)).toFixed(1):'—';
 $('status').textContent=subset.length?'Filter applied.':'No events match this filter.';
 if(markers)markers.clearLayers();
 const points=new Map();
 for(const r of subset){if(markers)points.set(r.EventID,L.circleMarker([r.Latitude,r.Longitude],{radius:r.Magnitude<4.5?5:r.Magnitude<6?9:13,color:'#743718',weight:1,fillColor:'#b34a22',fillOpacity:.7}).addTo(markers).bindPopup(popup(r)));}
 $('chart').replaceChildren();
 for(const name of ['2.5 to <4.5','4.5 to <6','6 and above']){const n=subset.filter(r=>r.MagnitudeGroup===name).length;const row=append($('chart'),'div','');row.className='bar-row';append(row,'span','M'+name+': '+n);const bar=append(row,'div','');bar.className='bar';bar.style.width=(subset.length?n/subset.length*100:0)+'%';}
 $('events').replaceChildren();
 for(const r of subset.slice(0,50)){const tr=append($('events'),'tr','');for(const v of [r.TimeUTC,r.Magnitude,r.Place,r.Depth_km])append(tr,'td',v);const cell=append(tr,'td','');const a=append(cell,'a','USGS');a.href=r.USGS_URL;a.target='_blank';a.rel='noopener';if(map){const b=append(cell,'button','Show');b.setAttribute('aria-label','Show '+r.Place+' on map');b.addEventListener('click',()=>{map.setView([r.Latitude,r.Longitude],6,{animate:false});points.get(r.EventID).openPopup();$('map').scrollIntoView({block:'center'});});}}
}
$('magnitude').addEventListener('change',render);$('reset').addEventListener('click',()=>{$('magnitude').value='2.5';if(map)map.setView([15,0],2);render();});render();
