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
module.exports.getPathType = function(str){
    for(let i=0;i<types.length;i++){
        if(paths[types[i]].test(str)){
            return types[i];
        }
    }
    return null;
}