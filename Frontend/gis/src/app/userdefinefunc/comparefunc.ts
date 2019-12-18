import { max, min } from 'rxjs/operators';
import { point } from 'leaflet';

export function pointToPoint(p0: mypoint, p1: mypoint){
    // function to compute the distance between two points
    //for now, computing the Euclidean distance. CHange later.
//     console.log("point 1: "+p0.x,p0.y)
//     console.log("point 2: "+p1.x,p1.y)
        let d: number = Math.sqrt((p0.x-p1.x)^2 + (p0.y-p1.y)^2)
        // console.log(d)
        return d
    }


export function pointToLine(p0: mypoint, p1:mypoint, p2: mypoint){

    let d: number // the shorest distance from a point to the line
 
    let u: number[] 
    u = [p0.x-p1.x, p0.y-p1.y];
    // console.log("u:"+u)
    let v: number[] 
    v = [p2.x-p1.x, p2.y-p1.y];
    let dot =  u[0]*v[0] + u[1]*v[1]
    // console.log("dot" + dot)
    if( dot < 0){
        d = Math.min(Math.sqrt((p0.x-p1.x)^2+(p0.y-p1.y)^2),Math.sqrt((p0.x-p2.x)^2+(p0.y-p2.y)^2))
        // console.log(d)
    }
    else{
        d = Math.abs(u[0]*v[1]-u[1]*v[0]) / Math.sqrt((p1.x-p2.x)^2+(p1.y-p2.y)^2)
        // console.log(d)
    }
    return d
}

export function lineAndLine(p11:mypoint,p12:mypoint,p21:mypoint,p22:mypoint){
    let ifin:boolean = false // if intersection
    let dist:number = 10000// distance between two line
    let d:number
    let t1_denominator = (p11.x-p12.x)*(p21.y-p22.y) - (p21.x - p22.x)*(p11.y - p12.y)
    let t2_denominator = (p21.x-p22.x)*(p11.y-p12.y) - (p11.x - p12.x)*(p21.y - p22.y)

    if(t1_denominator ==0 || t2_denominator==0){
        if((p21.y-p11.y)/(p21.x-p11.x) == (p12.y-p11.y)/(p12.x-p11.x)) {//overlap
            ifin =  true
            dist = 0
            return {ifin:ifin,dist:dist}
        }
        else {
            //parallel
            ifin = false
            dist =  pointToLine(p11,p21,p22)
            return {ifin:ifin,dist:dist}
        }
    }
    else{
        let t1 = ((p11.x-p21.x)*(p21.y-p22.y) - (p21.x - p22.x)*(p11.y - p21.y))/t1_denominator
        let t2 = ((p21.x-p11.x)*(p11.y-p12.y) - (p11.x - p12.x)*(p21.y - p11.y))/t2_denominator
        if(t1>=0 && t1 <=1 && t2>=0 && t2<=1){
            ifin = true  
            dist = 0
            return {ifin:ifin,dist:dist}
        }
        else{
            ifin = false
            dist = Math.min(pointToLine(p11,p21,p22),pointToLine(p12,p21,p22),pointToLine(p21,p11,p12),pointToLine(p22,p11,p12))
            // let d1 = pointToLine(p11,p21,p22)
            // if(d1 < dist){
            //     dist = d1 }
            // let d2 = pointToLine(p12,p21,p22)
            // if(d2 < dist){
            //     dist = d2 }
            // let d3 = pointToLine(p21,p11,p12)
            // if(d3 < dist){ 
            //     dist = d3}
            // let d4 = pointToLine(p22,p11,p12)
            // if(d4 < dist){
            //     dist = d4 }
            return {ifin:ifin,dist:dist}
        }
    }
//     return [ifin,dist]
}

export function pointInPolygon(p0:mypoint, pl:mypointarray){
    let ifin: boolean = false//ifin = false outside ifin = true inside
    let dist: number 
    dist = 1000
    let d: number = 0
    let maxx: number = -100
    let p:mypoint
    let count:number = 0
    // find bounding x y
    for( p of pl){
        if(p.x > maxx){
            maxx = p.x
        }
    }
    // console.log("max x:"+maxx)
    pl.push(pl[0])
    // construct ray(right)
    let p0_prime:mypoint = {x: maxx, y: p0.y};
    for(var i=0; i < pl.length-1; i++){
        // ray line intersect
        let d1 = lineAndLine(p0,p0_prime, pl[i],pl[i+1])
        let d2 = pointToLine(p0,pl[i],pl[i+1])
//         let distance:number = d2
        // console.log("d2,",d2.ifin)
        if( d1.ifin== true ){
                count++
                if(dist > d2){
                    dist = d2
                } 
            } 
    }
    if(count%2 == 0){
        ifin = false
    } else {
        ifin = true }
    return {ifin:ifin, dist:dist}
}

export function lineInPolygon(p0: mypoint, p1: mypoint, pl: mypointarray){
    // function to check if a polygon contains and/or intersects a line

    let flag: number // flag = 0 outside;flag = 1 intersect;flag = 2 contain 
    // let polygonContainsLine = 0
    // let lineIntersectsPolygon = 0

    // case 1: the line is within the polygon. Check if the two points are within the polygon
    if (pointInPolygon(p0,pl).ifin && pointInPolygon(p1,pl).ifin){
        // polygonContainsLine  = 1
        // return polygonContainsLine
        return flag = 2
    }
    //case 2: the line intersects the polygon at an edge. 
    else{
    // for(let pl1 of pl){
    //     for(let pl2 of pl){
    //         if(lineAndLine(p0, p1, pl1, pl2)[0]){
    //             // lineIntersectsPolygon = 1
    //             return flag = 1
    //             break;
    //         }
    //         if(flag == 1)
    //         break;
    //     }
    // } 
    pl.push(pl[0])
    for(let i = 0; i< pl.length-1;i++){
         if(lineAndLine(p0, p1, pl[i], pl[i+1]).ifin){
          return flag = 1
          break;
            }
    }
    return flag = 0// lineIntersectsPolygon
}
} 

export function polygonAndPolygon(pl1:mypointarray,pl2:mypointarray){
    let ifin:boolean = false //if intersection flag
    // calculate MBR
    let maxx1:number = 10000
    let maxy1:number = 10000
    let minx1:number =0
    let miny1 :number = 0
    let maxx2:number = 10000
    let maxy2:number = 10000
    let minx2:number =0
    let miny2 :number = 0
    for(let i of pl1){
        if(i.x>maxx1){
            maxx1 = i.x
        }
        if(i.y>maxy1){
            maxy1 = i.y
        }
        if(i.x<minx1){
            minx1 = i.x
        }
        if(i.y>miny1){
            miny1 = i.y
        }
    }
    for(let i of pl2){
        if(i.x>maxx1){
            maxx2 = i.x
        }
        if(i.y>maxy1){
            maxy2 = i.y
        }
        if(i.x<minx1){
            minx2 = i.x
        }
        if(i.y>miny1){
            miny2 = i.y
        }
    }

    if(maxx1 < minx2 || maxy1 < miny2){
        ifin = false // MPR are not intersect
    }
    if(maxx2 < minx1 || maxy2 < miny1){
        ifin = false // MPR are not intersect
    }

    for(let node of pl1){
        let p = pointInPolygon(node, pl2).ifin
        if(p){
            ifin = p
            break
        }
        
    }

    for(let node of pl2){
        let p = pointInPolygon(node, pl1).ifin
        if(p){
            ifin = p
            break
        }
    }
    return ifin
}



export interface mypoint {
    x: number;
    y: number;
}

export type mypointarray = Array<mypoint>
