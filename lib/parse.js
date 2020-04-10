const {isTransformType,nsEscape} = require('./util');

function parse(obj , defaults){    
    let parsedObj = {};
    parsedObj.group = document.createElementNS("http://www.w3.org/2000/svg" , "g");
    parsedObj.subs = {};
    attachTransform(parsedObj.group , obj.trans);

    attachElements(parsedObj.group , obj.eles,defaults );
    for(let sub in obj.subs){
        parsedObj.subs[sub] = parse(obj.subs[sub] , defaults);

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
        // group.setAttributeNS("http://www.w3.org/2000/svg" , 'transform', trans);
        group.setAttribute('transform', trans);
        return group;
    }
    let transStr = "";
    
    trans.forEach(el=>{
        if((el instanceof String || typeof el == 'string')&& isTransformType(el)){
            transStr += (" "+el);
        }
    });

    // group.setAttributeNS("http://www.w3.org/2000/svg" , 'transform', transStr);
    group.setAttribute('transform', transStr);
    return group;
}



/**
 * 
 * @param {SVGGElement} group 
 * @param {Array} eles
 * @param {{tagName:{attrname:String}}} defaults 
 */
function attachElements(group, eles ,defaults){
    if(!eles )return;
    if(eles instanceof Object && !(eles instanceof Array))eles = [eles];
    for(let i=0 ;i<eles.length; i++){
        let el = eles[i];

        /**
         * attach default value to specific attribute
         */
        let defa = defaults[el.type];
        if(defa){
            el.attrs = Object.assign({},defa,el.attrs);
        }

        
        let dom = document.createElementNS("http://www.w3.org/2000/svg" , el.type);
        if(!dom){
            continue;
        }
        if(!(el.attrs instanceof Object)){
            continue;
        }
        for(let attr in el.attrs){
            if(nsEscape.includes(attr)){
                dom.setAttribute(attr, el.attrs[attr]);
            }else{
                // dom.setAttributeNS("http://www.w3.org/2000/svg" , attr, el.attrs[attr]);
                dom.setAttribute(attr, el.attrs[attr]);
            }
        }
        group.appendChild(dom);
    }

    return group;
}

module.exports = parse;