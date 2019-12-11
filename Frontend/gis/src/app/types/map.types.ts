import { FeatureCollection } from 'geojson';

import * as L from 'leaflet';
import * as d3 from 'd3';


class Overlay {

    name: string;
    featureCollection: FeatureCollection;

    constructor(name: string, featureCollection: FeatureCollection) {
        this.name = name;
        this.featureCollection = featureCollection;
    }

    createOverlay() {
        return L.geoJSON(this.featureCollection);
    }
}

class LandkreisLayer extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection) {
        super(name, featureCollection);
    }

    createOverlay() {
        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        const minMaxArea = d3.extent(this.featureCollection.features.map(d => d.properties.area));
        const colorScale = d3.scaleSequential(d3.interpolateReds).domain(minMaxArea);

        // create tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('id', 'landkreis-tooltip')
            .attr('class', 'map-tooltip')
            .style('display', 'none');

        tooltip.append('h3').text('County Information:');
        const nameP = tooltip.append('p');
        const areaP = tooltip.append('p');

        // create geojson layer (looks more complex than it is)
        const landKreiseLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: colorScale(feature.properties.area),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {

                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`County: ${feature.properties.name}`);
                        areaP.text(`Area: ${feature.properties.area}`);

                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });

                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        landKreiseLayer.resetStyle(e.target);
                    }
                });
            }
        });

        return landKreiseLayer;
    }
}

class BardichteLayer extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection) {
        super(name, featureCollection);
    }

    createOverlay() {
        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        const minMaxBars = d3.extent(this.featureCollection.features.map(d => d.properties.num_bars));
        const colorScale = d3.scaleSequential(d3.interpolateReds).domain(minMaxBars);

        // create tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('id', 'bardichte-tooltip')
            .attr('class', 'map-tooltip')
            .style('display', 'none');

        tooltip.append('h3').text('Bar Dichte:');
        const nameP = tooltip.append('p');
        const areaP = tooltip.append('p');

        // create geojson layer (looks more complex than it is)
        const bardichteLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: colorScale(feature.properties.num_bars),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {

                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`County: ${feature.properties.name}`);
                        areaP.text(`Num Bars: ${feature.properties.num_bars}`);

                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });

                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        bardichteLayer.resetStyle(e.target);
                    }
                });
            }
        });

        return bardichteLayer;
    }
}

class ComparisiontaskLayer extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection) {
        super(name, featureCollection);
    }

    createOverlay() {
        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        const minMaxBars = d3.extent(this.featureCollection.features.map(d => d.properties.area));//d.properties.num_bars
        const colorScale = d3.scaleSequential(d3.interpolateReds).domain(minMaxBars);

        // create tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('id', 'comparision-tooltip')
            .attr('class', 'map-tooltip')
            .style('display', 'none');

        tooltip.append('h3').text('comparision result:');
        const nameP = tooltip.append('p');
        const areaP = tooltip.append('p');

        // create geojson layer (looks more complex than it is)
        const comparisiontaskLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: colorScale(feature.properties.area), //feature.properties.num_bars
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {

                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`name: ${feature.properties.name}`);
                        areaP.text(`area: ${feature.properties.area}`); //${feature.properties.name}
                        // numpointP.text(`num of points: ${feature.properties.num_point}`); // ${feature.properties.num_bars}
                        // pointidP.text(`point_id: ${feature.properties.pointidP}`);


                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });

                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        comparisiontaskLayer.resetStyle(e.target);
                    }
                });
            }
        });



        return comparisiontaskLayer;
    }
}

export { Overlay, LandkreisLayer, BardichteLayer, ComparisiontaskLayer};

class Compare{
    pp0:mypoint
    pp1:mypoint
    pp2:mypoint
    constructor(public point0: mypoint,public point1: mypoint,public point2: mypoint){
        this.pp0 = point0
        this.pp1 = point1
        this.pp2 = point2
    }
  
    dist:number = pointToLine(this.pp0,this.pp1,this.pp2) ;


}

function pointToLine(p0: mypoint, p1:mypoint, p2: mypoint){
    let ifVertical: Boolean
    let d: number // the shorest distance from a point to the line
    let u: number[] = [p0.x-p1.x, p0.y-p1.y];
    let v: number[] = [p2.x-p1.x, p2.y-p1.y];
    if( u[0]*v[1]-u[1]*v[0] < 0){
        d = Math.min(Math.sqrt((p0.x-p2.x)^2+(p0.y-p2.y)^2),Math.sqrt((p1.x-p0.x)^2+(p1.y-p0.y)^2))
    }
    else{
        d = u[0]*v[1]-u[1]*v[0]/ Math.sqrt((p1.x-p2.x)^2+(p1.y-p2.y)^2)
    }
    return d
}

function pointInPolygon(p0:mypoint, pl:mypoint[]){
    let ifin: Boolean
    ifin = false

    return ifin
}

interface mypoint{
    x: number;
    y: number
}