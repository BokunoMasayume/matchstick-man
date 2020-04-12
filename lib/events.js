const {transformTypes, parseFinder , getTransformTypeAndValue} = require('./util')
const m3 = require('./m3');
/**
 * 
 * @param {{group:SVGElement,tmpTrans:[] ,origin:{x:Number, y:Number} subs:[],trans:[]}} obj 
 * @param {{mat:[],tmpTrans:[]}[]} ancestors
 * 
 */
function attachRotate(obj , ancestors){
    if(!obj.origin ){
        console.warn(`events.js attachRotate: run '${attachOrigin}' before attach event`);
        return;
    }
    if(!obj.tmpTrans){
        obj.tmpTrans = [];
    }
    let preX = null;
    let preY = null;
    obj.group.addEventListener("mouseleave", function(e){
        // console.log("leave");

        preX = null;
        preY = null;

        // e.stopPropagation();
        return false;
    })
 
    /**
     * calculate degree
     * cross mul = x1*y2 - x2*y1 = |a||b|*sin(degree)
     * dot mul = x1*x2 + y1*y2 = |a||b|*cos(degree)
     * tan(degree) = cross / dot
     * degree = atan(degree)
     */
    obj.group.addEventListener("mousemove", function(e){
        if(e.buttons!= 1)
        {
            preX = null;
            preY = null;
            return false;
        }
        if(!preX || !preY || preX==obj.origin.x || preY==obj.origin.y){
            preX = e.offsetX;
            preY = e.offsetY;
            // console.log("offset" , e.offsetX , e.offsetY);
            return false;

        }
        // console.log("------------------------------");
        let mat = m3.unit();
        ancestors.forEach(anc=>{
            // console.log("mul:" ,anc.mat )
            mat = m3.multipy(mat , anc.mat);
            // console.log("--res:", mat);
            if(anc.tmpTrans){
                anc.tmpTrans.forEach(tran=>{
                    let res = getTransformTypeAndValue(tran);
                    if(res ===null)return;
                    // console.log("mul:" ,m3[res.type](...res.args) )

                    mat = m3.multipy(mat , m3[res.type](...res.args));
                    // console.log("--res:", mat);

                });
            }
        });
        let origin = {
            x:mat[0][2],
            y:mat[1][2]
        }
        

        let cross = (( preX - origin.x)*(e.offsetY - origin.y)-( preY - origin.y)*(e.offsetX - origin.x)) ;
        let dot = ( preX - origin.x)*(e.offsetX - origin.x)+( preY - origin.y)*(e.offsetY - origin.y);
        let degree = 185 * Math.atan(cross/dot) / Math.PI;
        
        if(obj.tmpTrans.length ==0 || !obj.tmpTrans[obj.tmpTrans.length-1].startsWith("rotate")){
            obj.tmpTrans.push(`rotate(${degree})`)
        }else{
            let idx = obj.tmpTrans.length-1;
            obj.tmpTrans[idx] = `rotate(${degree+ parseFloat(getTransformTypeAndValue( obj.tmpTrans[idx]).args[0])  })`
        }

        let str = obj.trans.join(" ");
        str += (" " + obj.tmpTrans.join(" ")); 

        e.currentTarget.setAttribute("transform" , str);

        preX = e.offsetX;
        preY = e.offsetY;

        e.stopPropagation()
        return false;
    });
}

function attachTranslate(obj){
    console.warn("not implemented");
}
function attachScale(obj){
    console.warn("not implemented");
}
function attachSkewX(obj){
    console.warn("not implemented");
}
function attachSkewY(obj){
    console.warn("not implemented");
}
eventAttaches = {
    rotate:attachRotate,
    translate:attachTranslate,
    scale:attachScale,
    skewX:attachSkewX,
    skewY:attachSkewY
}

/**
 * 
 * @param {String} finder 
 * @param {String} type 
 * @param {{group:SVGElement,tmpTrans:[] ,origin:{x:Number, y:Number} subs:[],trans:[]}} body
 * @param {{group:SVGElement,tmpTrans:[] ,origin:{x:Number, y:Number} subs:[],trans:[]}} parentbody
 * @example
 * attach('body.head' , 'rotate' , ms.body)
 */
function attach(finder , type,body){
    if(!transformTypes.includes(type)){
        console.warn(`events.js attach :type '${type}' not supported`);
        return;
    }
    let p = parseFinder(finder);
    if(p === null){
        console.warn("has a illegal path",finder,"in",name,"motion");
        return;
    }
    let warpper;
    let ancestors = [body];
    if(p.type == 'id'){
        warpper = body.group.querySelector(p.path);
        return;
        //nono
    }else if(p.type = "normal"){
        warpper = p.path.reduce((acc, e, i)=>{
            ancestors.push(acc.subs[e]) ;
            return acc.subs[e];
        }, body);
    }else{
        return;
    }


    eventAttaches[type](warpper ,ancestors );

}

module.exports = attach;

