function isTransformType(str){
    let reg = /^\s*(?:translate\(.*\)|rotate\(.*\)|scale\(.*\)|skew[XY]\(.*\))\s*$/;
    return reg.test(str);
}

module.exports.isTransformType = isTransformType;

module.exports.transformTypes = [
    "translate",
    "rotate",
    "scale",
    "skewX",
    "skewY"
];

module.exports.nsEscape = [
    "id"
]


// xxx.yyy.zzz or  #idname
let paths={
    normal:/^(?:[a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)$/,
    id:/^(?:#[a-zA-Z_$][a-zA-Z0-9_$]*)$/
}
let types = Object.keys(paths);
function getPathType(str){
    for(let i=0;i<types.length;i++){
        if(paths[types[i]].test(str)){
            return types[i];
        }
    }
    return null;
}
module.exports.getPathType = getPathType;


let tnvreg = /^\s*(translate|rotate|scale|skewX|skewY)\((-?[0-9.]+)(?:,(-?[0-9.]+))*\)\s*$/;
module.exports.getTransformTypeAndValue = function(str){
    let res = tnvreg.exec(str);
    if(res===null)return res;

    return {
        type:res[1],
        args:res.slice(2)
    }
}


/**
 * 
 * @param {String} finder 
 * - xxx.yy.zzz or #idname format
 */
function parseFinder(finder){
    if(finder == "")return {
        type:"normal",
        path:[]
    };
    let res = {};
    res.type = getPathType(finder);
    if(res.type === null){
        return null;
    }

    if(res.type=='normal'){
        res.path = finder.split('.');
    }
    if(res.type == "id"){
        res.path = finder;
    }
    return res;
}

module.exports.parseFinder = parseFinder;

function hasChildNode(parent , child){
    let test = document.createElement('p');
    try{
        parent.insertBefore(test,child);
        parent.removeChild(test);
        // console.log("有");
        return true;
    }catch(e){
        // console.log("没有");
        return false;
    }
}
module.exports.hasChildNode = hasChildNode;