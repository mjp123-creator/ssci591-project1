"""Rebuild upload files from the archived USGS snapshot; no manual event entry."""
import csv,json,math,hashlib
from pathlib import Path
from datetime import datetime,timezone
P=Path(__file__).parent.parent/'data'
raw=(P/'usgs_original.geojson').read_bytes(); src=json.loads(raw)
def utc(ms): return datetime.fromtimestamp(ms/1000,timezone.utc).isoformat(timespec='seconds').replace('+00:00','Z')
rows=[];seen=set(); removed={}
for f in src['features']:
 p=f['properties'];c=f['geometry']['coordinates'];eid=f['id'];mag=p.get('mag');reason=None
 if eid in seen:reason='duplicate_id'
 elif p.get('type')!='earthquake':reason='non_earthquake'
 elif mag is None or not math.isfinite(mag):reason='missing_magnitude'
 elif mag<2.5:reason='below_2_5'
 elif len(c)<3 or not all(isinstance(x,(int,float)) and math.isfinite(x) for x in c) or not (-180<=c[0]<=180 and -90<=c[1]<=90):reason='invalid_coordinates'
 if reason:removed[reason]=removed.get(reason,0)+1;continue
 seen.add(eid)
 rows.append(dict(EventID=eid,Magnitude=mag,MagnitudeGroup='2.5 to <4.5' if mag<4.5 else '4.5 to <6' if mag<6 else '6 and above',Place=p.get('place') or 'Location not provided',TimeUTC=utc(p['time']),EventTime=p['time'],DayUTC=utc(p['time'])[:10],Depth_km=c[2],Longitude=c[0],Latitude=c[1],ReviewStatus=p['status'],MagnitudeType=p['magType'],USGS_URL=p['url'],Source='USGS Earthquake Hazards Program',SnapshotUTC=utc(src['metadata']['generated'])))
rows.sort(key=lambda r:r['EventTime'],reverse=True)
with (P/'earthquakes.csv').open('w',newline='') as file:
 w=csv.DictWriter(file,fieldnames=rows[0]);w.writeheader();w.writerows(rows)
geo=dict(type='FeatureCollection',features=[dict(type='Feature',geometry=dict(type='Point',coordinates=[r['Longitude'],r['Latitude']]),properties=r) for r in rows])
(P/'earthquakes.geojson').write_text(json.dumps(geo,indent=2))
meta=dict(source_url=src['metadata']['url'],source_generated_utc=utc(src['metadata']['generated']),processed_utc=datetime.now(timezone.utc).isoformat(),raw_sha256=hashlib.sha256(raw).hexdigest(),input_count=len(src['features']),output_count=len(rows),excluded=removed,earliest_event=rows[-1]['TimeUTC'],latest_event=rows[0]['TimeUTC'],max_magnitude=max(r['Magnitude'] for r in rows),groups={g:sum(r['MagnitudeGroup']==g for r in rows) for g in ['2.5 to <4.5','4.5 to <6','6 and above']},coordinate_system='WGS84 longitude/latitude (EPSG:4326), GeoJSON longitude first. Source third ordinate is depth in km; moved to Depth_km and removed from geometry.',limitations=['Static snapshot, not automatically updated','Seven-day feed is not a complete long-term hazard assessment','Reporting completeness varies geographically; event parameters may be revised','Magnitude types differ; grouped magnitudes are descriptive, not a homogenized scientific catalog'])
(P/'metadata.json').write_text(json.dumps(meta,indent=2));(P/'snapshot.js').write_text('window.SNAPSHOT='+json.dumps(dict(metadata=meta,events=rows))+';\n')
print(json.dumps(meta,indent=2))
