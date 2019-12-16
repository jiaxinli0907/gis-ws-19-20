import { max } from 'rxjs/operators';
import { point } from 'leaflet';

// class Compare{
//     pp0:mypoint
//     pl1:Array<mypoint>
//     pl2:Array<mypoint>
//     constructor(public pointlist1:Array<mypoint>,public pointlist2:Array<mypoint>){
//         this.pl1 = pointlist1
//         this.pl2 = pointlist2
//     }

//     getPointToLine(): number {
//         return pointToLine(this.pl1[0],this.pl2[0],this.pl2[1]) ;
//     }
//     getPointInPolygon(): number {
//         return pointInPolygon(this.pl1[0],this.pl2);//ifin = 0 outside ifin = 1 inside ifin = 2 on the edge
//     }
//     getPolygonAndPolygon():boolean{
//         return polygonAndPolygon(this.pl1, this.pl2);
//     }
//     getLineAndLine():boolean{
//         return lineAndLine(this.pl1[0],this.pl1[1],this.pl2[0],this.pl2[1])
//     }

// }

export function pointToLine(point0: mypoint, point1:mypoint, point2: mypoint){
    let p0:mypoint
    let p1:mypoint
    let p2:mypoint
    p0 = point0
    p1 = point1
    p2 = point2
    let d: number // the shorest distance from a point to the line
 
    let u: number[] = [p0.x-p1.x, p0.y-p1.y];
    let v: number[] = [p2.x-p1.x, p2.y-p1.y];
    // console.log("point0.x"+point0.x)
    if( u[0]*v[1]-u[1]*v[0] < 0){
        d = Math.min(Math.sqrt((p0.x-p2.x)^2+(p0.y-p2.y)^2),Math.sqrt((p1.x-p0.x)^2+(p1.y-p0.y)^2))
        // console.log(d)
    }
    else{
        d = u[0]*v[1]-u[1]*v[0]/ Math.sqrt((p1.x-p2.x)^2+(p1.y-p2.y)^2)
        // console.log(d)
    }
    return d
}

export function pointInPolygon(p0:mypoint, pl:mypoint[]){
    let ifin: number //ifin = 0 outside ifin = 1 inside ifin = 2 on the edge
    let dist: number
    let d: number
    ifin = 0
    pl.push(pl[0])
    for(var i=0; i < pl.length-1; i++){
        if(pl[i].y == pl[i+1].y && pl[i].y == p0.y){ //the ray is overlap with segment
            if(p0.x < Math.max(pl[i].x, pl[i+1].x) && p0.x > Math.min(pl[i].x, pl[i+1].x)){ // p0 in a segment
                ifin = 2
                dist = 0
            }

            if(pl[i].x==p0.x || p0.x == pl[i+1].x){ //p0 is a vertex
                ifin = 2
                dist = 0
            }
      
            if(p0.x < Math.min(pl[i].x,pl[i+1].x) || p0.x > Math.max(pl[i].x,pl[i+1].x)){ //p0 is in the outside
                ifin = 1
                dist = Math.min(Math.abs(p0.x - pl[i].x),Math.abs(p0.x - pl[i+1].x))
            }     
        }
        if(p0.y> Math.min(pl[i].y,pl[i+1].y) && p0.y< Math.max(pl[i].y,pl[i+1].y)){
            ifin = 1
            for(i=0; i <pl.length-1; i++){
                d = pointToLine(p0,pl[i],pl[i+1])
                if(d < dist){
                    dist = d
                }

            }
            
        }      
    }
    return [ifin,dist]
}

export function polygonAndPolygon(pl1:mypoint[],pl2:mypoint[]){
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
        let p = pointInPolygon(node, pl2)[0]
        if(p!=0){
            ifin = true
        }
    }

    for(let node of pl2){
        let p = pointInPolygon(node, pl1)[0]
        if(p!=0){
            ifin = true
        }
    }
    return ifin
}

export function lineAndLine(p11:mypoint,p12:mypoint,p21:mypoint,p22:mypoint){
    let ifin:boolean = false // if intersection
    let dist:number // distance between two line
    let d:number
    let t1_denominator = (p11.x-p12.x)*(p21.y-p22.y) - (p21.x - p22.x)*(p11.y - p12.y)
    let t2_denominator = (p21.x-p22.x)*(p11.y-p12.y) - (p11.x - p12.x)*(p21.y - p22.y)

    if(t1_denominator ==0 || t2_denominator==0){
        if((p21.y-p11.y)/(p21.x-p11.x) == (p12.y-p11.y)/(p12.x-p11.x)) {//overlap
            ifin =  true
            dist = 0
        }
        else {
            dist = Math.sqrt((p21.x-p11.x)^2 + (p21.y-p11.y)^2)
        }
    }
    else{
        let t1 = (p11.x-p21.x)*(p21.y-p22.y) - (p21.x - p22.x)*(p11.y - p21.y)/t1_denominator
        let t2 = (p21.x-p11.x)*(p11.y-p12.y) - (p11.x - p12.x)*(p21.y - p11.y)/t2_denominator
        if(t1>=0 && t1 <=1 && t2>=0 && t2<=1){
            ifin = true  
            dist = 0
        }
        else{
            d = pointToLine(p11,p21,p22)
            if(d < dist){
                dist = d
            }
            d = pointToLine(p12,p21,p22)
            if(d < dist){
                dist = d
            }
            d = pointToLine(p21,p11,p12)
            if(d < dist){
                dist = d
            }
            d = pointToLine(p22,p11,p12)
            if(d < dist){
                dist = d
            }
        }
    }
    return [ifin,dist]
}

export interface mypoint{
    x: number;
    y: number
}
