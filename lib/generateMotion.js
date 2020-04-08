const {isTransformType} = require('./util');


function generateMotion(name , frames){
    let obj = cookFrames(frames);
    let gs = {};
    let flat= [];
    Object.keys(obj).forEach(gn=>{
        gs[gn] = createGroupAnimas(obj[gn],name);
        flat = flat.concat(gs[gn]);
    })

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

    }
}

//           =》 分组-anima相关标签list
function createGroupAnimas(obj ){

}

//属性-百分比-值 =》 tag
function createSingleAnima(attrName , transObj ){

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