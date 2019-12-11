
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

export function pointToLine(p0: mypoint, p1:mypoint, p2: mypoint){
    let ifVertical: boolean
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

export function pointInPolygon(p0:mypoint, pl:mypoint[]){
    let ifin: number //ifin = 0 outside ifin = 1 inside ifin = 2 on the edge
    ifin = 0
    pl.push(pl[0])
    for(var i=0; i < pl.length-1; i++){
        if(pl[i].y == pl[i+1].y && pl[i].y == p0.y){ //the ray is overlap with segment
            if(pl[i].x<p0.x || p0.x <pl[i+1].x){ // p0 in a segment
                ifin = 2
            }
            if(pl[i+1].x<p0.x || p0.x <pl[i].x){
                ifin = 2
            }
            if(pl[i].x==p0.x && p0.y ==pl[i].y){ //p0 is a vertex
                ifin = 2
            }
            if(pl[i+1].x==p0.x && p0.y ==pl[i+1].y){
                ifin = 2
            } 
            if(p0.x < Math.min(pl[i].x,pl[i+1].x) || p0.x > Math.max(pl[i].x,pl[i+1].x)){ //p0 is in theoutside
                ifin = 1
            }     
        }
        if(p0.y> Math.min(pl[i].y,pl[i+1].y) && p0.y< Math.max(pl[i].y,pl[i+1].y)){
            ifin = 1
        }      
    }
    return ifin
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
        let i = pointInPolygon(node, pl2)
        if(i!=0){
            ifin = true
        }
    }

    for(let node of pl2){
        let i = pointInPolygon(node, pl1)
        if(i!=0){
            ifin = true
        }
    }
    return ifin
}

export function lineAndLine(p11:mypoint,p12:mypoint,p21:mypoint,p22:mypoint){
    let ifin:boolean = false
    let t1_denominator = (p11.x-p12.x)*(p21.y-p22.y) - (p21.x - p22.x)*(p11.y - p12.y)
    let t2_denominator = (p21.x-p22.x)*(p11.y-p12.y) - (p11.x - p12.x)*(p21.y - p22.y)

    if(t1_denominator ==0 || t2_denominator==0){
        if((p21.y-p11.y)/(p21.x-p11.x) == (p12.y-p11.y)/(p12.x-p11.x)) {//overlap
            ifin =  true
        }
    }
    else{
        let t1 = (p11.x-p21.x)*(p21.y-p22.y) - (p21.x - p22.x)*(p11.y - p21.y)/t1_denominator
        let t2 = (p21.x-p11.x)*(p11.y-p12.y) - (p11.x - p12.x)*(p21.y - p11.y)/t2_denominator
        if(t1>=0 && t1 <=1 && t2>=0 && t2<=1){
            ifin = true  
        }
    }
    return ifin
}

export interface mypoint{
    x: number;
    y: number
}
