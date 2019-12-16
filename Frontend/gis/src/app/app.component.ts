import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { FeatureCollection } from 'geojson';
import { Overlay, LandkreisLayer, BardichteLayer, ComparisiontaskLayer } from './types/map.types';
import { importExpr } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
// my code

// @ViewChild('element') element;
public boldAttribute: any = { 'class': 'custom_bold', 'id': 'itemId' };
public italicAttribute: any = { 'class': 'custom_italic' };
// ngAfterViewInit() {
// }
//
  overlays: Array<Overlay> = new Array<Overlay>();

  // constructor is here only used to inject services
  constructor(private dataService: DataService) { }

  /**
   * Retrieve data from server and add it to the overlays arrays
   */
  ngOnInit(): void {
  
    this.dataService.getRegierungsBezirke().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new Overlay('Regierunsbezirke', val));
    });

    this.dataService.getLandkreise().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new LandkreisLayer('Landkreise', val));
    });

    this.dataService.getBardichte().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new BardichteLayer('Bardichte', val));
    });
    this.dataService.getComparisiontask().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new ComparisiontaskLayer('Comparisiontask', val));
    });
  }
  
}
