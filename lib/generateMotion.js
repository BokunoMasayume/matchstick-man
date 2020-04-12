const {transformTypes , parseFinder} = require('./util');


function generateMotion(name , frames){
    let obj = cookFrames(frames);
    let gs = {};
    let flat= [];//all animation related tags
    Object.keys(obj).forEach(gn=>{
        //gn : xxx.xxx.xxx or #idname  -- #idname can support add animate to non-group tag
        gs[gn] = createGroupAnimas(obj[gn],name);
        flat = flat.concat(gs[gn]);
    });

    //attach class on every animate element
    flat.forEach(e=>{
        e.classList.add(`_${name}_motion`);
    });

    //           =》 生成函数
    /**
     * @param {Object} opts
     *  - dur
     *  - calcMode
     *  - repeatCount
     *  - repeatDur
     *  - keySpline // just one
     */
    return function(opts){
        //this point to Matchstick instance
        if(!(opts instanceof Object))opts = {};
        let dur = opts.dur || "1s";
        let calcMode = opts.calcMode || "linear";
        let repeatCount = opts.repeatCount || "indefinite";
        let repeatDur = opts.repeatDur || null;
        let keySpline = opts.keySpline || null;

        flat.forEach(e=>{
            // e.setAttributeNS("http://www.w3.org/2000/svg" , "dur", dur);
            // e.setAttributeNS("http://www.w3.org/2000/svg" , "calcMode", calcMode);
            // e.setAttributeNS("http://www.w3.org/2000/svg" , "repeatCount", repeatCount);
            // e.setAttributeNS("http://www.w3.org/2000/svg" , "repeatDur", repeatDur);

            e.setAttribute( "dur", dur);
            e.setAttribute("calcMode", calcMode);
            e.setAttribute( "repeatCount", repeatCount);
            e.setAttribute( "repeatDur", repeatDur);
            //TODO keySplines waiting
            // e.setAttributeNS("http://www.w3.org/2000/svg" , "keySpine", dur);
        });

        Object.keys(gs).forEach(finder=>{
            let p = parseFinder(finder);
            if(p===null){
                console.warn("has a illegal path",finder,"in",name,"motion");
                return;
            }
            let warpper;
            if(p.type == 'id'){
                warpper = this.body.group.querySelector(p.path);
            }else if(p.type = "normal"){
                warpper = p.path.reduce((acc, e)=>{
                    return acc.subs[e];
                }, this.body).group;
            }else{
                return;
            }

            //append animation elements to the warpper
            gs[finder].forEach(ele=>{
                warpper.appendChild(ele);
            })

        });

    }
}


//           =》 分组-anima相关标签list
function createGroupAnimas(obj ){
    let res = Object.entries(obj).filter(([attr,obj])=>{
        return !transformTypes.includes(attr);
    }).map(([attr, obj])=>createSingleAnima(attr,obj));
    // translate -> rotate -> scale -> skewX -> skewY
    transformTypes.forEach((tran)=>{
        if(obj[tran]){
            res.push(createSingleAnima(tran, obj[tran]));
        }
    })
    return res;

}

//属性-百分比-值 =》 tag
function createSingleAnima(attrName , transObj ){
    let keyTimes = "";
    let values = "";
    let dom = null;
    
    let source = Object.entries(transObj);
    if(source[0][0] !=0){
        source.unshift([0 , source[0][1]]);
    }
    if(source[source.length-1][0] !=100){
        source.push([100 ,source[source.length-1][1] ]);
    }
    source.forEach(([k,v])=>{
        if(k!=0){
            keyTimes += (";"+(k/100));
            values += (";"+v);
        }else{
            keyTimes += ((k/100));
            values += (v);
        }
        
    });
    if(transformTypes.includes(attrName)){
        //animateTransform
        dom = document.createElementNS("http://www.w3.org/2000/svg" , "animateTransform");
        // dom.setAttributeNS("http://www.w3.org/2000/svg" , "attributeName", "transform");
        dom.setAttribute("attributeName", "transform");
        // dom.setAttributeNS("http://www.w3.org/2000/svg" , "type", attrName);
        dom.setAttribute( "type", attrName);
    }else{
        dom = document.createElementNS("http://www.w3.org/2000/svg" , "animate");
        // dom.setAttributeNS("http://www.w3.org/2000/svg" , "attributeName", attrName);
        dom.setAttribute( "attributeName", attrName);

    }
    //设置通用属性：keyTimes ,values ,additive
    // dom.setAttributeNS("http://www.w3.org/2000/svg" , "keyTimes", keyTimes);
    // dom.setAttributeNS("http://www.w3.org/2000/svg" , "values", values);
    // dom.setAttributeNS("http://www.w3.org/2000/svg" , "additive", "sum");

    dom.setAttribute("keyTimes", keyTimes);
    dom.setAttribute( "values", values);
    dom.setAttribute( "additive", "sum");

    return dom;
}

// 拓扑一下 ：百分比-分组-属性-值
//           =》 分组-百分比-属性-值
//           =》 分组-属性-百分比-值 
function cookFrames(frames){
    let obj = doTopo(frames);
    Object.entries(obj).forEach(([groupname, percents])=>{
        obj[groupname] = doTopo(percents);
    });

    return obj;
}

//单层拓扑
function doTopo(obj){
    let res = {};

    Object.keys(obj).forEach(outerEle=>{
        Object.keys(obj[outerEle]).forEach(innerEle=>{
            if(! (res[innerEle] instanceof Object))res[innerEle] = {};

            res[innerEle][outerEle] = obj[outerEle][innerEle];
        })
    })

    return res;
}

module.exports = generateMotion;