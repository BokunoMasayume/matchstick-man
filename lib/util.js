function isTransformType(str){
    let reg = /^\s*(?:translate\(.*\)|rotate\(.*\)|scale\(.*\)|skew[XY]\(.*\))\s*$/;
    return reg.test(str);
}

module.exports.isTransformType = isTransformType;