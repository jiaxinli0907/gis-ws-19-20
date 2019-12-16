import { Component, OnInit, Input, ViewEncapsulation, IterableDiffers, DoCheck, IterableChangeRecord } from '@angular/core';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import * as L from 'leaflet';
import { Overlay } from '../types/map.types';
declare const l:any

import {mypoint,pointToLine,pointInPolygon,mypointarray} from '../userdefinefunc/comparefunc'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  // super important, otherwise the defined css doesn't get added to dynamically created elements, for example, from D3.
  // encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, DoCheck {

  @Input() overlays: Array<Overlay> = [];
  iterableDiffer: any;

  private layerControl: L.Control.Layers;

  constructor(private iterable: IterableDiffers) {
    this.iterableDiffer = this.iterable.find(this.overlays).create();
  }

  ngOnInit() {
    // use osm tiles
    const basemap = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // create map, set initial view to basemap and zoom level to center of BW
    const mymap = L.map('main', { layers: [basemap] }).setView([48.6813312, 9.0088299], 9);


    // create maps and overlay objects for leaflet control
    const baseMaps = {
      OpenStreetMap: basemap,
    };

    // add a control which lets us toggle maps and overlays
    this.layerControl = L.control.layers(baseMaps);
    this.layerControl.addTo(mymap);


// add line  --success
  var linepoint=[]
  var lines= L.polyline(linepoint)
  var tempLines= L.polyline([])
  var ls=[]

    function onClickln(e)
    {

      linepoint.push([e.latlng.lat,e.latlng.lng])
        lines.addLatLng(e.latlng)
        mymap.addLayer(lines)
        mymap.addLayer(L.circle(e.latlng,{color:'#ff0000',fillColor:'ff0000',fillOpacity:1}))
        mymap.on('mousemove',onMoveln)
    }
    function onMoveln(e) {
        if(linepoint.length>0) {
            ls=[linepoint[linepoint.length-1],[e.latlng.lat,e.latlng.lng]]
            console.log("ls:"+ls)
            tempLines.setLatLngs(ls)
            mymap.addLayer(tempLines)
        }
    }

    function onDoubleClickln(e)
    {
        L.polyline(linepoint).addTo(mymap)
        console.log("linepoint:"+linepoint)
        linepoint=[]
        lines= L.polyline(linepoint)
        mymap.off('mousemove')
    }
// line end
 // add polygon -- success
 var polygonpoint=[]
 var pl: any
 var polygonline= L.polyline([])
 var tempLines= L.polyline([])
 var ls=[]
 function onClickPolygon(e)
 {
  polygonpoint.push([e.latlng.lat,e.latlng.lng])
  polygonline.addLatLng(e.latlng)
     mymap.addLayer(tempLines)
     mymap.addLayer(polygonline)
     mymap.addLayer(L.circle(e.latlng,{color:'#ff0000',fillColor:'ff0000',fillOpacity:1}))

 }
 function onMovePolygon(e) {
     if(polygonpoint.length>0) {
         ls=[polygonpoint[polygonpoint.length-1],[e.latlng.lat,e.latlng.lng],polygonpoint[0]]
         tempLines.setLatLngs(ls)
         console.log("ls polygon:"+ls)
     }
 }
 function onDoubleClickPolygon(e)
 {
     L.polygon(polygonpoint).addTo(mymap)
     pl = polygonpoint
     polygonpoint=[]
     polygonline.remove()
     tempLines.remove()
     polygonline= L.polyline([])
 }
 //polygon end
// add marker --success
var point = []
function onMapClickPoint(e) {
  point.push([e.latlng.lat,e.latlng.lng])
  L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap)
        .bindPopup("I am a point.").openPopup().setPopupContent("You clicked the map at " + e.latlng.toString());
}
// marker end


 function addPoint(){
  mymap.on('dblclick', onMapClickPoint);
}
function addLine(){
  mymap.on('click', onClickln);  
  mymap.on('dblclick',onDoubleClickln);
}

function addPol(){
  mymap.on('click', onClickPolygon);    
  mymap.on('dblclick',onDoubleClickPolygon);
  mymap.on('mousemove',onMovePolygon)
}

var element3  = document.getElementById ('buttonPol');
      element3.addEventListener ('click', addPol);

var element1  = document.getElementById ('buttonPoint');
      element1.addEventListener ('click', addPoint);

var element2  = document.getElementById ('buttonLine');
      element2.addEventListener ('click', addLine);

function pointLine(){
  let p0:mypoint = {x:point[0][0],y:point[0][1]}
  console.log("p0:"+p0.x,p0.y)
  let p1:mypoint = {x:ls[0][0],y:ls[0][1]}
  let p2:mypoint = {x:ls[1][0],y:ls[1][1]}
  console.log("p1:"+p1.x,p1.y)
  console.log("p2:"+p2.x,p2.y)
  let d = pointToLine(p0,p1,p2)
  console.log("distance between the point and the line is:" + d);
}
var element4  = document.getElementById ('pointlinecompare');
      element4.addEventListener ('click', pointLine);



function pointPolygon(){
  let pl: mypointarray
  // let p:mypoint
  let p0:mypoint = {x:point[0][0],y:point[0][1]}
  console.log("p0:"+p0.x,p0.y)
  for(let i = 0;i < ls.length;i++){
    pl.push({x:ls[i][0],y:ls[i][1]})
    console.log("pli:"+pl[i].x, pl[i].y)
  }
  let d = pointInPolygon(p0,pl)
  console.log("relationship between a point and a polygon:");
  if(d[0] == 0){
    console.log("outside, the distance is:"+d[1])
  }
  else if(d[0]==1){
    console.log("inside, the distanceis"+d[1])
  }
  else{
    console.log("on the edge, the distanceis"+d[1])
  }

}
var element5  = document.getElementById ('pointPolygonCompare');
      element5.addEventListener ('click', pointPolygon);
  
  }

    
  


  /**
   * If the input data changes, update the layers
   * @param changes the angular changes object
   */
  ngDoCheck(): void {
    const changes = this.iterableDiffer.diff(this.overlays);
    if (changes) {

      changes.forEachAddedItem((newOverlay: IterableChangeRecord<Overlay>) => {
        const overlay = newOverlay.item;
        this.layerControl.addOverlay(overlay.createOverlay(), overlay.name);
      });
    }
  }

}
