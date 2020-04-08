function parse(obj){    
    let parsedObj = {};
    parsedObj.group = document.createElementNS("http://www.w3.org/2000/svg" , "g");
    parsedObj.subs = {};
    attachTransform(parsedObj.group , obj.trans);

    attachElements(parsedObj.group , obj.eles);
    for(let sub in obj.subs){
        parsedObj.subs[sub] = parse(obj.subs[sub]);

        parsedObj.group.appendChild(parsedObj.subs[sub].group );
    }

    /**
     * @param {Object} parsedObj
     *  - group : total Element
     *  - subs : sub Elements
     */
    return parsedObj;
}

/**
 * 
 * @param {SVGGElement} group 
 * @param {Array} trans 
 */
function attachTransform(group, trans){
    if(!trans)return group;
    if(trans instanceof String || typeof trans == 'string'){
        group.setAttributeNS("http://www.w3.org/2000/svg" , 'transform', trans);
        return group;
    }
    let transStr = "";
    
    trans.forEach(el=>{
        if((el instanceof String || typeof el == 'string')&& isTransformType(el)){
            transStr += (" "+el);
        }
    });

    group.setAttributeNS("http://www.w3.org/2000/svg" , 'transform', transStr);
    return group;
}

function isTransformType(str){
    let reg = /^\s*(?:translate\(.*\)|rotate\(.*\)|scale\(.*\)|skew[XY]\(.*\))\s*$/;
    return reg.test(str);
}

/**
 * 
 * @param {SVGGElement} group 
 * @param {Object} eles 
 */
function attachElements(group, eles){
    for(let i=0 ;i<eles.length; i++){
        let el = eles[i];
        let dom = document.createElementNS("http://www.w3.org/2000/svg" , el.type);
        if(!dom){
            continue;
        }
        if(!(el.attrs instanceof Object)){
            continue;
        }
        for(let attr in el.attrs){
            dom.setAttributeNS("http://www.w3.org/2000/svg" , attr, el.attrs[attr]);
        }
        group.appendChild(dom);
    }

    return group;
}

module.exports = parse;