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
        obj.tmpTrans = {};
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
        //鼠标左键
        if(e.buttons!= 1 || e.ctrlKey || e.altKey)
        {
            preX = null;
            preY = null;
            return false;
        }

        
        // console.log("------------------------------");
        // let mat = calcMat(obj, ancestors);
        //because  translate -> rotate -> scale -> skewX -> skewY
        let res = getTransformTypeAndValue(obj.tmpTrans["translate"]);
        // if(res !== null && res.type == 'translate'){
        //     // mat = m3.multipy(   m3.translate(...res.args) ,mat);
        //     mat = m3.multipy( mat,  m3.translate(...res.args) );
        // }
        

        let inverseMat = calcInverseMat(obj, ancestors);
        if(res !== null && res.type == 'translate'){
            // inverseMat = m3.multipy( inverseMat, m3.inverse.translate(...res.args)  );
            inverseMat = m3.multipy( m3.inverse.translate(...res.args) ,inverseMat );
        }
        // res = getTransformTypeAndValue(obj.tmpTrans["rotate"]);
        // if(res !== null && res.type == 'rotate'){
        //     inverseMat = m3.multipy( inverseMat, m3.inverse.rotate(...res.args) );
        // }

        // let ori = m3.mMulVec(mat , [0,0,1]);
        // let origin = {
        //     x:ori[0],
        //     y:ori[1]
        // }
        

        if(!preX || !preY ){
            preX = e.offsetX;
            preY = e.offsetY;
            // console.log("offset" , e.offsetX , e.offsetY);
            return false;

        }
        // let scaleMat = calcScale(obj, ancestors);
        // let scaleX = scaleMat[0][0];
        // let scaleY = scaleMat[1][1];
        // console.log("_____________________________");

        let preV = [preX  , preY  , 1];
        // let preV = [preX - ori[0] , preY - ori[1] , 0];
        let nowV = [e.offsetX  , e.offsetY  , 1];
        // let nowV = [e.offsetX - ori[0] , e.offsetY - ori[1]  , 0];

        // console.log("oring ",ori, "preV",preV,"nowV",nowV);

        preV = m3.mMulVec( inverseMat , preV);
        // m3.normalize(preV);
        // preV = m3.vMulMat(preV , inverseMat);
        nowV = m3.mMulVec( inverseMat , nowV);
        // m3.normalize(nowV);
        // console.log("ancestors",ancestors)
        // console.log("preV",preV,"nowV",nowV);
        // console.log('origin', m3.mMulVec(inverseMat , [origin.x , origin.y , 1]))
        // console.log("inversemat", inverseMat);
        // console.log("e.offsetX",e.offsetX,"e.offsetY",e.offsetY)
        // nowV = m3.vMulMat(nowV , inverseMat);
        // preV[0] *= scaleX;
        // nowV[0] *= scaleX;
        // preV[1] *= scaleY;
        // nowV[1] *= scaleY;
        let cross = ( preV[0]*nowV[1] - preV[1]*nowV[0] );
        let dot = preV[0]*nowV[0] +   preV[1] * nowV[1] ;
       
        // let cross = ( ( preX - origin.x)*(e.offsetY - origin.y)-( preY - origin.y)*(e.offsetX - origin.x));
        // let dot = scaleY* ( preX - origin.x)*(e.offsetX - origin.x) /(scaleX) +  scaleX*( preY - origin.y)*(e.offsetY - origin.y) /( scaleY);
        let degree = 180 * Math.atan(cross/dot) / Math.PI;
        
        // deprecated ,when tmpTrans is Array
        // if(obj.tmpTrans.length ==0 || !obj.tmpTrans[obj.tmpTrans.length-1].startsWith("rotate")){
        //     obj.tmpTrans.push(`rotate(${degree})`)
        // }else{
        //     let idx = obj.tmpTrans.length-1;
        //     obj.tmpTrans[idx] = `rotate(${degree+ parseFloat(getTransformTypeAndValue( obj.tmpTrans[idx]).args[0])  })`
        // }
        if(obj.tmpTrans.rotate){
            obj.tmpTrans.rotate = `rotate(${degree+ parseFloat(getTransformTypeAndValue( obj.tmpTrans.rotate).args[0])  })`
        }else{
            obj.tmpTrans.rotate = `rotate(${degree})`;
        }
        let str = obj.trans.join(" ");
        // deprecated ,when tmpTrans is Array
        // str += (" " + obj.tmpTrans.join(" ")); 

        transformTypes.forEach(tran=>{
            if(obj.tmpTrans[tran]){
                str += ` ${obj.tmpTrans[tran]}`;
            }
        })

        e.currentTarget.setAttribute("transform" , str);

        preX = e.offsetX;
        preY = e.offsetY;

        e.stopPropagation();
        e.preventDefault()

        return false;
    });
}

function attachTranslate(obj , ancestors){
    if(!obj.origin){
        console.warn(`events.js attachRotate: run '${attachOrigin}' before attach event`);
        return;
    }
    if(!obj.tmpTrans){
        obj.tmpTrans = {};
    }
    let preX = null;
    let preY = null;

    obj.group.addEventListener("mouseleave",function(e){
        preX = null;
        preY = null;
        
        return false;
    });

    obj.group.addEventListener("contextmenu" , function(e){
        e.preventDefault();
    });

    obj.group.addEventListener("mousemove",function(e){
        //鼠标右键
        if(e.buttons !=2 || e.ctrlKey || e.altKey){
            preX = null;
            preY = null;
            return false;
        }

        // let mat = calcMat(obj, ancestors);
        // let origin  = {
        //     x: mat[0][2],
        //     y: mat[1][2]
        // }


        if(!preX || !preY ){
            preX = e.offsetX;
            preY = e.offsetY;
            // console.log("offset" , e.offsetX , e.offsetY);
            return false;

        }

        //translate vector
        let tv = [e.offsetX - preX , e.offsetY - preY , 0];
        let inverseMat = calcInverseMat(obj , ancestors);
        tv = m3.mMulVec(inverseMat , tv);
        

        if(obj.tmpTrans.translate){
            
            let pr = getTransformTypeAndValue( obj.tmpTrans.translate);
            // console.log("translate",pr,obj.tmpTrans.translate);
            obj.tmpTrans.translate = `translate(${tv[0]+ parseFloat( pr.args[0] ) },${tv[1]+ parseFloat( pr.args[1] ) })`
        }else{
            obj.tmpTrans.translate = `translate(${tv[0]},${tv[1]})`;
        }

        let str = obj.trans.join(" ");
        transformTypes.forEach(tran=>{
            if(obj.tmpTrans[tran]){
                str += ` ${obj.tmpTrans[tran]}`;
            }
        })

        e.currentTarget.setAttribute("transform" , str);

        preX = e.offsetX;
        preY = e.offsetY;

        e.stopPropagation();
        e.preventDefault();

        // e.p
        return false;
    })
}
function attachScale(obj , ancestors){
    if(!obj.origin){
        console.warn(`events.js attachRotate: run '${attachOrigin}' before attach event`);
        return;
    }
    if(!obj.tmpTrans){
        obj.tmpTrans = {};
    }
    let preX = null;
    let preY = null;

    let dir = {
        x:1,
        y:2,
        all:3
    }
    obj.group.addEventListener("mouseleave",function(e){
        preX = null;
        preY = null;
        return false;
    });

    obj.group.addEventListener("contextmenu" , function(e){
        e.preventDefault();
    });

    obj.group.addEventListener("mousemove" , function(e){
        //ctrl + 鼠标右键（scale y） / + 鼠标左键（scale x）/ 左键和右键 （scale all ）
        if(!e.ctrlKey || (e.buttons!=2 && e.buttons!=1 && e.buttons!=3) ){
            preX = null;
            preY = null;
            return false;
        }
        let direction =0;
        if(e.buttons==1){
            //左键 x
            direction = dir.x;
        }else if(e.buttons == 2){
            //右键 y
            direction = dir.y;
        }else{
            // both
            direction = dir.all;
        }

        if(!preX || !preY ){
            preX = e.offsetX;
            preY = e.offsetY;
            // console.log("offset" , e.offsetX , e.offsetY);
            return false;
        }

        // let mat = calcMat(obj, ancestors);
        //because  translate -> rotate -> scale -> skewX -> skewY
        // let res = getTransformTypeAndValue(obj.tmpTrans["translate"]);
        // if(res !== null && res.type == 'translate'){
        //     mat = m3.multipy(mat , m3.translate(...res.args));
        // }
        // res = getTransformTypeAndValue(obj.tmpTrans["rotate"]);
        // if(res !== null && res.type == 'rotate'){
        //     mat = m3.multipy(mat , m3.rotate(...res.args));
        // }
        // res = getTransformTypeAndValue(obj.tmpTrans["scale"]);
        // if(res !== null && res.type == 'scale'){
        //     mat = m3.multipy(mat , m3.scale(...res.args));
        // }
        let inverseMat = calcInverseMat(obj, ancestors);
        let res = getTransformTypeAndValue(obj.tmpTrans["translate"]);
        if(res !== null && res.type == 'translate'){
            inverseMat = m3.multipy( m3.inverse.translate(...res.args) , inverseMat);
        }
        res = getTransformTypeAndValue(obj.tmpTrans["rotate"]);
        if(res !== null && res.type == 'rotate'){
            inverseMat = m3.multipy( m3.inverse.rotate(...res.args) , inverseMat);
        }
        
        

        // let prev = [ preX -origin.x  , preY - origin.y , 0 ];
        let prev = [ preX  , preY  , 1 ];
        prev = m3.mMulVec(inverseMat , prev);
        // let now = [ e.offsetX - origin.x , e.offsetY - origin.y, 0];
        let now = [ e.offsetX , e.offsetY , 1];
        now = m3.mMulVec(inverseMat , now);
        let scaleX = (dir.x & direction)?now[0]/prev[0]:1;
        let scaleY = (dir.y & direction)?now[1]/prev[1]:1;
        // console.log(scaleX , scaleY)
        if(obj.tmpTrans.scale){
            let pr = getTransformTypeAndValue( obj.tmpTrans.scale);
            obj.tmpTrans.scale = `scale(${scaleX* parseFloat(pr.args[0])},${scaleY*parseFloat(pr.args[1])})`
            console.log('parsefloat',parseFloat(pr.args[0]) , parseFloat(pr.args[1]) );
        }else{
            obj.tmpTrans.scale = `scale(${scaleX},${scaleY})`;
        }

        let str = obj.trans.join(" ");
        transformTypes.forEach(tran=>{
            if(obj.tmpTrans[tran]){
                str += ` ${obj.tmpTrans[tran]}`;
            }
        })

        e.currentTarget.setAttribute("transform" , str);

        preX = e.offsetX;
        preY = e.offsetY;

        e.stopPropagation();
        e.preventDefault()
        // e.p
        return false;



    })
}
function attachSkew(obj , ancestors){
    if(!obj.inverseMat){
        console.warn(`events.js attachRotate: run '${attachOrigin}' before attach event`);
        return;
    }
    if(!obj.tmpTrans)obj.tmpTrans = {}

    let preX = null;
    let preY = null;

    let dir = { //alt +
        x:1, //鼠标左键
        y:2, //鼠标右键
        all:3
    }

    obj.group.addEventListener("mouseleave",function(e){
        preX = null;
        preY = null;
        return false;
    });

    obj.group.addEventListener("contextmenu" , function(e){
        e.preventDefault();
    });

    obj.group.addEventListener("mousemove" , function(e){
        //alt + 鼠标右键（scale y） / + 鼠标左键（scale x）/ 左键和右键 （scale all ）
        if(!e.altKey || (e.buttons!=2 && e.buttons!=1 && e.buttons!=3) ){
            preX = null;
            preY = null;
            return false;
        }
        let direction =0;
        if(e.buttons==1){
            //左键 x
            direction = dir.x;
        }else if(e.buttons == 2){
            //右键 y
            direction = dir.y;
        }else{
            // both
            direction = dir.all;
        }

        if(!preX || !preY ){
            preX = e.offsetX;
            preY = e.offsetY;
            // console.log("offset" , e.offsetX , e.offsetY);
            return false;
        }

        let inverseMat = calcInverseMat(obj, ancestors);
        let res = getTransformTypeAndValue(obj.tmpTrans["translate"]);
        if(res !== null && res.type == 'translate'){
            inverseMat = m3.multipy( m3.inverse.translate(...res.args) , inverseMat);
        }
        res = getTransformTypeAndValue(obj.tmpTrans["rotate"]);
        if(res !== null && res.type == 'rotate'){
            inverseMat = m3.multipy( m3.inverse.rotate(...res.args) , inverseMat);
        }
        res = getTransformTypeAndValue(obj.tmpTrans["scale"]);
        if(res !== null && res.type == 'scale'){
            inverseMat = m3.multipy( m3.inverse.scale(...res.args) , inverseMat);
        }

        let prev = [ preX  , preY  , 1 ];
        prev = m3.mMulVec(inverseMat , prev);
        let now = [ e.offsetX , e.offsetY , 1];
        now = m3.mMulVec(inverseMat , now);

        
        if(dir.x & direction){
            //skewX
            let prevx = [prev[0] , Math.abs(prev[1]) , 1 ];
            let nowx = [ now[0] , Math.abs(now[1]) , 1 ];

            let cross = ( prevx[0]*nowx[1] - prevx[1]*nowx[0] );
            let dot = prevx[0]*nowx[0] +   prevx[1] * nowx[1] ;
           
            let degree = 180 * Math.atan(cross/dot) / Math.PI;

            if(obj.tmpTrans.skewX){
                obj.tmpTrans.skewX = `skewX(${degree+ parseFloat(getTransformTypeAndValue( obj.tmpTrans.skewX).args[0])  })`
            }else{
                obj.tmpTrans.skewX = `skewX(${degree})`;
            }
        }

        if(dir.y & direction){
            //skewY
            let prevy = [ Math.abs(prev[0]) , prev[1] , 1 ];
            let nowy = [ Math.abs(now[0]) , now[1] , 1 ];

            let cross = ( prevy[0]*nowy[1] - prevy[1]*nowy[0] );
            let dot = prevy[0]*nowy[0] +   prevy[1] * nowy[1] ;
           
            let degree = 180 * Math.atan(cross/dot) / Math.PI;

            if(obj.tmpTrans.skewY){
                obj.tmpTrans.skewY = `skewY(${degree+ parseFloat(getTransformTypeAndValue( obj.tmpTrans.skewY).args[0])  })`
            }else{
                obj.tmpTrans.skewY = `skewY(${degree})`;
            }
        }

        let str = obj.trans.join(" ");
        // deprecated ,when tmpTrans is Array
        // str += (" " + obj.tmpTrans.join(" ")); 

        transformTypes.forEach(tran=>{
            if(obj.tmpTrans[tran]){
                str += ` ${obj.tmpTrans[tran]}`;
            }
        })

        e.currentTarget.setAttribute("transform" , str);

        preX = e.offsetX;
        preY = e.offsetY;

        e.stopPropagation();
        e.preventDefault()

        return false;

    });
}

eventAttaches = {
    rotate:attachRotate,
    translate:attachTranslate,
    scale:attachScale,
    skew:attachSkew
    
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
    // if(!transformTypes.includes(type)){
    //     console.warn(`events.js attach :type '${type}' not supported`);
    //     return;
    // }
    let p = parseFinder(finder);
    if(p === null){
        console.warn("has a illegal path",finder,"in",name,"motion");
        return;
    }
    let warpper;
    let ancestors = [];
    if(p.type == 'id'){
        warpper = body.group.querySelector(p.path);
        return;
        //nono
    }else if(p.type = "normal"){
        warpper = p.path.reduce((acc, e)=>{
            ancestors.push(acc) ;
            return acc.subs[e];
        }, body);
    }else{
        return;
    }


    try{
        eventAttaches[type](warpper ,ancestors );

    }catch(e){
        console.warn(`events.js attach :type '${type}' not supported`);
    }

}

function calcMat(obj, ancestors){
    let mat = m3.unit();
    ancestors.forEach(anc=>{
        // console.log("mul:" ,anc.mat )
        mat = m3.multipy( mat,  anc.mat  );
        // console.log("--res:", mat);
        if(anc.tmpTrans){
            // deprecated ,when tmpTrans is Array
            // anc.tmpTrans.forEach(tran=>{
            //     let res = getTransformTypeAndValue(tran);
            //     if(res ===null)return;
            //     // console.log("mul:" ,m3[res.type](...res.args) )

            //     mat = m3.multipy(mat , m3[res.type](...res.args));
            //     // console.log("--res:", mat);

            // });

            transformTypes.forEach(tran=>{   
                let res = getTransformTypeAndValue(anc.tmpTrans[tran]);
                if(res === null || res.type!= tran)return;
                mat = m3.multipy( mat, m3[res.type](...res.args)  );       
            });
        }
    });
    //because this is rotate event
    // and translate -> rotate -> scale -> skewX -> skewY
    mat = m3.multipy( mat , obj.mat );
    // transformTypes.forEach(tran=>{   
    //     let res = getTransformTypeAndValue(obj.tmpTrans[tran]);
    //     if(res === null || res.type!= tran)return;
    //     mat = m3.multipy( mat, m3[res.type](...res.args)  );       
    // });
    return mat;
}

function calcInverseMat(obj,ancestors){
    let mat = m3.unit();
    ancestors.forEach(anc=>{
        // console.log("mul:" ,anc.mat )
        mat = m3.multipy( anc.inverseMat , mat);
        // console.log("--res:", mat);
        if(anc.tmpTrans){
            // deprecated ,when tmpTrans is Array
            // anc.tmpTrans.forEach(tran=>{
            //     let res = getTransformTypeAndValue(tran);
            //     if(res ===null)return;
            //     // console.log("mul:" ,m3[res.type](...res.args) )

            //     mat = m3.multipy(mat , m3[res.type](...res.args));
            //     // console.log("--res:", mat);

            // });

            transformTypes.forEach(tran=>{   
                let res = getTransformTypeAndValue(anc.tmpTrans[tran]);
                // if(res === null || res.type!= tran || res.type == "translate" || res.type == 'rotate' || res.type == 'skewX' || res.type == 'skewY')return;
                if(res === null || res.type!= tran )return;
                mat = m3.multipy( m3.inverse[res.type](...res.args) , mat);       
            });
        }
    });
    //because this is rotate event
    // and translate -> rotate -> scale -> skewX -> skewY
    mat = m3.multipy( obj.inverseMat  , mat );
    // transformTypes.forEach(tran=>{   
    //     let res = getTransformTypeAndValue(obj.tmpTrans[tran]);
    //     // if(res === null || res.type!= tran || res.type == "translate" || res.type == 'rotate' || res.type == 'skewX' || res.type == 'skewY')return;
    //     if(res === null || res.type!= tran )return;
    //     mat = m3.multipy( m3.inverse[res.type](...res.args) , mat);       
    // });
    return mat;
}

// function calcMat(obj, ancestors){
//     let mat = m3.unit();
//     ancestors.forEach(anc=>{
//         // console.log("mul:" ,anc.mat )
//         mat = m3.multipy(   anc.mat ,mat );
//         // console.log("--res:", mat);
//         if(anc.tmpTrans){
           
//             transformTypes.forEach(tran=>{   
//                 let res = getTransformTypeAndValue(anc.tmpTrans[tran]);
//                 if(res === null || res.type!= tran)return;
//                 mat = m3.multipy(  m3[res.type](...res.args) ,mat );       
//             });
//         }
//     });
//     //because this is rotate event
//     // and translate -> rotate -> scale -> skewX -> skewY
//     mat = m3.multipy( obj.mat ,mat );
//     // transformTypes.forEach(tran=>{   
//     //     let res = getTransformTypeAndValue(obj.tmpTrans[tran]);
//     //     if(res === null || res.type!= tran)return;
//     //     mat = m3.multipy( mat, m3[res.type](...res.args)  );       
//     // });
//     return mat;
// }

// function calcInverseMat(obj,ancestors){
//     let mat = m3.unit();
//     console.log("inverse mat :");
//     ancestors.forEach(anc=>{
//         // console.log("mul:" ,anc.mat )
//         mat = m3.multipy( mat, anc.inverseMat );
//         console.log("anc.inverseMat", anc.inverseMat);
//         // console.log("--res:", mat);
//         if(anc.tmpTrans){

//             transformTypes.forEach(tran=>{   
//                 let res = getTransformTypeAndValue(anc.tmpTrans[tran]);
//                 // if(res === null || res.type!= tran || res.type == "translate" || res.type == 'rotate' || res.type == 'skewX' || res.type == 'skewY')return;
//                 if(res === null || res.type!= tran )return;
//                 // console.log(tran , res.args);
//                 mat = m3.multipy( mat, m3.inverse[res.type](...res.args) );    
//                 console.log("inverse transform", res.type,m3.inverse[res.type](...res.args) );

//             });
//         }
//     });
//     //because this is rotate event
//     // and translate -> rotate -> scale -> skewX -> skewY
//     mat = m3.multipy( mat,  obj.inverseMat   );
//     console.log("obj.inverseMat" , obj.inverseMat);
//     console.log("end one inverse mat");
//     // transformTypes.forEach(tran=>{   
//     //     let res = getTransformTypeAndValue(obj.tmpTrans[tran]);
//     //     // if(res === null || res.type!= tran || res.type == "translate" || res.type == 'rotate' || res.type == 'skewX' || res.type == 'skewY')return;
//     //     if(res === null || res.type!= tran )return;
//     //     mat = m3.multipy( m3.inverse[res.type](...res.args) , mat);       
//     // });
//     return mat;
// }

module.exports = attach;

