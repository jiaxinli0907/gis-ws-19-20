import * as L from 'leaflet';
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FeatureCollection } from 'geojson';
import { Overlay, LandkreisLayer, BardichteLayer, ComparisiontaskLayer } from './types/map.types';

    // @Component({
    //     selector: 'app-container',
    //     templateUrl: '.draw.html',
    //     styleUrls: ['./draw.css'],
    //     // super important, otherwise the defined css doesn't get added to dynamically created elements, for example, from D3.
  
    //   })


export class Draw {

    // constructor() {

    // }
    // var osmUrl = 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
    // osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // osm = L.tileLayer(osmUrl, { maxZoom: 19, attribution: osmAttrib }),
    // map = new L.Map('map', { center: new L.LatLng([48.6813312, 9.0088299]), zoom: 19 }),
    // drawnItems = L.featureGroup().addTo(map);
    // L.control.layers({
    // 'osm': osm.addTo(map),
    // "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    //     attribution: 'google'
    // })
    // }, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
    // map.addControl(new L.Control.Draw({
    // edit: {
    //     featureGroup: drawnItems,
    //     poly: {
    //         allowIntersection: false
    //     }
    // },
    // draw: {
    //     polygon: {
    //         allowIntersection: false,
    //         showArea: true
    //     }
    // }
    // }));

    // map.on(L.Draw.Event.CREATED, function (event) {
    // var layer = event.layer;

    // drawnItems.addLayer(layer);
    // });
 
}