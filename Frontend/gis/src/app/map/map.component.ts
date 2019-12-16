import { Component, OnInit, Input, ViewEncapsulation, IterableDiffers, DoCheck, IterableChangeRecord } from '@angular/core';

import * as L from 'leaflet';
import { Overlay } from '../types/map.types';
declare const l:any

import {mypoint,pointToLine} from '../userdefinefunc/comparefunc'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  // super important, otherwise the defined css doesn't get added to dynamically created elements, for example, from D3.
  encapsulation: ViewEncapsulation.None,
  // template: `
  // <ejs-toolbar>
  //   <e-items>
  //      <e-item text='Bold'  [htmlAttributes] = 'boldAttribute'></e-item>
  //      <e-item text='Italic' [htmlAttributes] = 'italicAttribute'></e-item>
  //   </e-items>
  // </ejs-toolbar>
  // `
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

       // add draw functions
    //增加一个marker ，地图上的标记，并绑定了一个popup，默认打开
    // function onMapClick(e) {
    //   popup
    //   .setLatLng(e.latlng)
    //   .setContent("You clicked the map at " + e.latlng.toString())
    //   .openOn(mymap);
    // }
    // mymap.on('click', onMapClick);

    // L.marker([48.75981, 9.168091]).addTo(mymap)
    //         .bindPopup("<b>Hello world!</b><br />I am a point.").openPopup();

    // //增加多边形
    // L.polygon([
    //         [47.73424, 9.119504],
    //         [48.57479, 7.723389],
    //         [48.133101, 11.552124]
    // ]).addTo(mymap).bindPopup("I am a polygon.");
    // L.polyline([[49.425267, 11.063232],
    //   [48.414619, 10.69519]]).addTo(mymap).bindPopup("I am a line");
    // 
    // var popup = L.popup();

   

// // add line  --success
//     var points=[]
//     var lines= L.polyline(points)
//     var tempLines= L.polyline([])
//     var ls=[]
//     mymap.on('click', onClickln);  
//     mymap.on('dblclick',onDoubleClickln);
//     console.log("the points is:"+points)
//     function onClickln(e)
//     {

//         points.push([e.latlng.lat,e.latlng.lng])
//         lines.addLatLng(e.latlng)
//         mymap.addLayer(lines)
//         mymap.addLayer(L.circle(e.latlng,{color:'#ff0000',fillColor:'ff0000',fillOpacity:1}))
//         mymap.on('mousemove',onMoveln)//双击地图

//     }
//     function onMoveln(e) {
//         if(points.length>0) {
//             ls=[points[points.length-1],[e.latlng.lat,e.latlng.lng]]
//             tempLines.setLatLngs(ls)
//             mymap.addLayer(tempLines)
//         }
//     }

//     function onDoubleClickln(e)
//     {
//         L.polyline(points).addTo(mymap)
//         points=[]
//         lines= L.polyline(points)
//         mymap.off('mousemove')
//     }

var element3  = document.getElementById ('buttonPol');
      element3.addEventListener ('click', addPol);

function addPol(){
  mymap.on('click', onMapClickPolygon);
}

 // add polygon -- success
 function onMapClickPolygon(){

 var points=[]
 var lines= L.polyline([])
 var tempLines= L.polyline([])
 var ls=[]

 mymap.on('click', onClick);    
 mymap.on('dblclick',onDoubleClick);
 mymap.on('mousemove',onMove)



 function onClick(e)
 {

     points.push([e.latlng.lat,e.latlng.lng])
     lines.addLatLng(e.latlng)
     mymap.addLayer(tempLines)
     mymap.addLayer(lines)
     mymap.addLayer(L.circle(e.latlng,{color:'#ff0000',fillColor:'ff0000',fillOpacity:1}))

 }
 function onMove(e) {
     if(points.length>0) {
         ls=[points[points.length-1],[e.latlng.lat,e.latlng.lng],points[0]]
         tempLines.setLatLngs(ls)

     }
 }

 function onDoubleClick(e)
 {
     L.polygon(points).addTo(mymap)
     points=[]
     //map.removeLayer(tempLines)
     //tempLines.remove()
     lines.remove()
     tempLines.remove()
     lines= L.polyline([])
 }

 }


var element  = document.getElementById ('buttonPoint');
      element.addEventListener ('click', addPoint);

function addPoint(){
  mymap.on('click', onMapClickPoint);
}

var element2  = document.getElementById ('buttonLine');
      element2.addEventListener ('click', addLine);

function addLine(){
  mymap.on('click', onMapClickPoint);
}



// add marker --success
var point = []
function onMapClickPoint(e) {
  point.push([e.latlng.lat,e.latlng.lng])
  L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap)
        .bindPopup("I am a point.").openPopup().setPopupContent("You clicked the map at " + e.latlng.toString());
  //  console.log(point);
  //  mymap.on('click', onMapClick);
   if(point.length >=3){
    L.marker(point[point.length-2]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a point.").openPopup();
    let p1:mypoint = {x:point[point.length -3][0],y:point[point.length -3][1]}
    let p2:mypoint = {x:point[point.length -2][0],y:point[point.length -2][1]}
    let p3:mypoint = {x:point[point.length -1][0],y:point[point.length -1][1]}
    // console.log("p1.xy "+p1.x);
    
    console.log("point 1 is:" + p1.x,p1.y);
    console.log("point 2 is:" + p2.x,p2.y);
    console.log("point 3 is:" + p3.x,p3.y);
    console.log("distance between the point(p1) and the line(p2p3) is:" + pointToLine(p1,p2,p3));

  }
}










  }
/**
 * 
 */

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

// module ButtonComponent {
//   $(function () {
//       var basicButton = new ej.Button($("#button_normal"), {
//           //normal size type is used
//           size: "normal",
//           showRoundedCorner: true,
//           contentType: "imageonly",
//           prefixIcon: "e-icon e-handup"
//       });
//      var basicButton1 = new ej.Button($("#button_mini"), {  
//           showRoundedCorner: true,
//           //mini size type is used
//           size: "mini"
//       });
//      var basicButton2 = new ej.Button($("#button_small"), {   
//           showRoundedCorner: true,
//           //small size type is used
//           size: "small"
//       });
//     var basicButton3 = new ej.Button($("#button_medium"), {   
//           showRoundedCorner: true,
//           //medium size type is used
//           size: "medium"
//       });
//    var basicButton4 = new ej.Button($("#button_large"), {  
//           //large size type is used
//           size: "large",
//           showRoundedCorner: true,
//           contentType: "textandimage",
//           prefixIcon: "e-icon e-handup"
//       });
//    var basicButton4 = new ej.Button($("#button_custom"), {  
//           //button with user given height and width
//           height: 50,
//           width: 130,
//           showRoundedCorner: true,
//           contentType: "textandimage",
//           prefixIcon: "e-icon e-handup"
//       });
//   });
// }
