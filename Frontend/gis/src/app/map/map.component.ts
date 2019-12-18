import { Component, OnInit, Input, ViewEncapsulation, IterableDiffers, DoCheck, IterableChangeRecord } from '@angular/core';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import * as L from 'leaflet';
import * as LD from 'leaflet-draw';
import { Overlay } from '../types/map.types';
declare const l:any

import {mypoint,pointToLine,pointInPolygon,mypointarray,polygonAndPolygon,lineAndLine,pointToPoint,lineInPolygon} from '../userdefinefunc/comparefunc'
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
    mymap.doubleClickZoom.disable();

    // create maps and overlay objects for leaflet control
    const baseMaps = {
      OpenStreetMap: basemap,
    };


    // add a control which lets us toggle maps and overlays
    this.layerControl = L.control.layers(baseMaps);
    this.layerControl.addTo(mymap);

//// from here: draw function 
var element1  = document.getElementById ('buttonPoint');
element1.addEventListener ('click', addPoint);
element1.style.backgroundColor="red";

var element2  = document.getElementById ('buttonLine');
element2.addEventListener ('click', addLine);
element2.style.backgroundColor="red";

var element3  = document.getElementById ('buttonPol');
element3.addEventListener ('click', addPol);
element3.style.backgroundColor="red"; 

var reset = document.getElementById('resetAll');
reset.addEventListener('click', resetAll)
// add line  --success
  var  lineresult = []
  var linepoint=[]
  var lines= L.polyline(linepoint)
  var tempLines= L.polyline([])
  var ls1=[] //for line

  function onClickln(e)
  {
    linepoint.push([e.latlng.lat,e.latlng.lng])
    lines.addLatLng(e.latlng)
    mymap.addLayer(lines)
    mymap.addLayer(L.circle(e.latlng,{color:'#ff0000',fillColor:'ff0000',fillOpacity:1}))
      // mymap.on('mousemove',onMoveln)
  }
  // function onMoveln(e) {
  //     if(linepoint.length>0) {
  //         ls1=[linepoint[linepoint.length-1],[e.latlng.lat,e.latlng.lng]]
  //         // console.log("ls1:"+ls1)
  //         tempLines.setLatLngs(ls1)
  //         mymap.addLayer(tempLines)
  //     }
  // }

  function onDoubleClickln(e)
  {

    L.polyline(linepoint).addTo(mymap)
    linepoint.pop()
    lineresult.push(linepoint)
    // console.log(lineresult, lineresult.length)
    linepoint=[]
    lines= L.polyline(linepoint)
//     mymap.removeEventListener('click', onClickln)
    // mymap.off('mousemove')
  }
// line end
 // add polygon -- success
  var polygonresult = []
  var polygonpoint=[]
  var polygonline= L.polyline([])
  var tempLines= L.polyline([])
  var ls2=[] //for polygon
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
          ls2=[polygonpoint[polygonpoint.length-1],[e.latlng.lat,e.latlng.lng],polygonpoint[0]]
          tempLines.setLatLngs(ls2)
          // console.log("ls2:"+ls2)
      }
  }
  function onDoubleClickPolygon(e)
  {
      L.polygon(polygonpoint).addTo(mymap)
      polygonpoint.pop()
      polygonresult.push(polygonpoint)
//       console.log("polygonresult"+polygonresult,polygonresult.length)
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
    // console.log(point)
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap)
          .bindPopup("I am a point.").openPopup().setPopupContent("You clicked the map at " + e.latlng.toString());
  }
// marker end

 function addPoint(){
  mymap.removeEventListener('click', onClickPolygon);    
  mymap.removeEventListener('dblclick',onDoubleClickPolygon);
  mymap.removeEventListener('mousemove',onMovePolygon);
  mymap.removeEventListener('dbclick', onDoubleClickln);
  mymap.removeEventListener('click', onClickln);
 // mymap.removeEventListener('mousemove',onMoveln);
  mymap.addEventListener('click', onMapClickPoint);
  element1.style.backgroundColor="green";
  element2.style.backgroundColor="red";
  element3.style.backgroundColor="red";
}
function addLine(){
  mymap.removeEventListener('click', onClickPolygon);    
  mymap.removeEventListener('dblclick',onDoubleClickPolygon);
  mymap.removeEventListener('mousemove',onMovePolygon);
  mymap.removeEventListener('click', onMapClickPoint);
  // mymap.removeEventListener('dbclick', onDoubleClickln);
  mymap.addEventListener('click', onClickln); 
  mymap.addEventListener('dblclick', onDoubleClickln);
  element1.style.backgroundColor="red";
  element2.style.backgroundColor="green";
  element3.style.backgroundColor="red";
}

function addPol(){
  mymap.removeEventListener('click', onClickln);
  mymap.removeEventListener('click', onMapClickPoint); 
  mymap.removeEventListener('dbclick', onDoubleClickln);
  mymap.addEventListener('click', onClickPolygon);    
  mymap.addEventListener('dblclick',onDoubleClickPolygon);
  mymap.addEventListener('mousemove',onMovePolygon);
  element1.style.backgroundColor="red";
  element2.style.backgroundColor="red";
  element3.style.backgroundColor="green";
}

function resetAll(){
  location.reload(true);
}

function pointLine(){
  let p0:mypoint = {x:point[0][0],y:point[0][1]}
  // console.log("p0:"+p0.x,p0.y)
  let p1:mypoint = {x:lineresult[0][0][0],y:lineresult[0][0][1]}
  let p2:mypoint = {x:lineresult[0][1][0],y:lineresult[0][1][1]}
  // console.log("point on line:"+p1.x,p1.y)
  // console.log("point on line::"+p2.x,p2.y)
  let d = pointToLine(p0,p1,p2)
  console.log("distance between the point and the line is:" + d);
}
var element4  = document.getElementById ('pointlinecompare');
      element4.addEventListener ('click', pointLine);



function pointPolygon(){
  let pl: Array<mypoint> = []
  let p0:mypoint = {x:point[0][0],y:point[0][1]}
  // console.log("p0:"+p0.x,p0.y)
  for(let i = 0;i < polygonresult[0].length; i++){
    pl.push({x:polygonresult[0][i][0],y:polygonresult[0][i][1]})  
  }
//   console.log("polyggon:"+pl)
  let d = pointInPolygon(p0,pl)
  // console.log("relationship between a point and a polygon:");
  if(d.ifin == false){
    console.log("relationship between a point and a polygon: outside")
    console.log("the distance is:"+d.dist)
  }
  else {
    console.log("relationship between a point and a polygon: inside")
    console.log("the distance is:"+d.dist)
  }

}

  var element5  = document.getElementById ('pointPolygonCompare');
        element5.addEventListener ('click', pointPolygon);


  function polygonPolygon(){
    let pl1: Array<mypoint> = []
    let pl2: Array<mypoint> = []
    for(let i = 0;i < polygonresult[0].length;i++){
      pl1.push({x:polygonresult[0][i][0],y:polygonresult[0][i][1]})
//       console.log("pl1"+pl1[i])
    }
   
    for(let i = 0;i < polygonresult[1].length;i++){
        pl2.push({x:polygonresult[1][i][0],y:polygonresult[1][i][1]})
//         console.log("pl2"+pl2[i][0],pl2[i][1])
      }
    let flag:boolean = polygonAndPolygon(pl1,pl2)
    if(flag == true){
      console.log("relationship between two polygon: intersect.")
    }
    else{
      console.log("relationship between two polygon: no intersection.")
    }
  }
  var element6  = document.getElementById ('polygonPolygonCompare');
        element6.addEventListener ('click', polygonPolygon);
  
  function lineLine(){
    let p11:mypoint
    let p12:mypoint
    let p21:mypoint
    let p22:mypoint
    p11 = {x:lineresult[0][0][0],y:lineresult[0][0][1]}
    p12 = {x:lineresult[0][1][0],y:lineresult[0][1][1]}
    p21 = {x:lineresult[1][0][0],y:lineresult[1][0][1]}
    p22 = {x:lineresult[1][1][0],y:lineresult[1][1][1]}
    let d = lineAndLine(p11,p12,p21,p22)
    console.log("if two line intersect:" + d.ifin)
    console.log("distance: "+d.dist)
  }
  var element7  = document.getElementById ('lineLineCompare');
  element7.addEventListener ('click', lineLine);

  function pointPoint(){
    let p1:mypoint = {x:point[0][0],y:point[0][1]}
    let p2:mypoint = {x:point[1][0],y:point[1][1]}
    let d = pointToPoint(p1,p2)
    console.log("the disntance between two point is: " + d)
  }
  var element8  = document.getElementById ('pointPointCompare');
  element8.addEventListener ('click', pointPoint);

  function linePolygon(){
    let p1:mypoint = {x:lineresult[0][0][0],y:lineresult[0][0][1]}
    let p2:mypoint = {x:lineresult[0][1][0],y:lineresult[0][1][1]}
    let pl1: Array<mypoint> = []
    for(let i = 0;i < polygonresult[0].length;i++){
      pl1.push({x:polygonresult[0][i][0],y:polygonresult[0][i][1]})
    }
    let d = lineInPolygon(p1,p2,pl1)
    if(d == 0){
      console.log("the relationship between the line and the polygon: outside" )
    }
    else if(d ==1){
      console.log("the relationship between the line and the polygon: intersect" )
    }
    else{
      console.log("the relationship between the line and the polygon: contain" )
    }
    
 
  }
  var element9  = document.getElementById ('LinePolygonCompare');
  element9.addEventListener ('click', linePolygon);

      // end dont delete }
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
