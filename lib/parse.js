const {isTransformType,nsEscape , hasChildNode} = require('./util');

function reparse_depreecated(obj ){
    obj.group = obj.primeGroup.cloneNode(true);

    for(let sub in obj.subs){
        reparse(obj.subs[sub]);
        obj.group.appendChild(obj.subs[sub].group);
    }
}

function reparse(obj){
    for(let sub in obj.subs){
        // console.log(sub);
        if(!hasChildNode(obj.group , obj.subs[sub].group)){
            obj.group.appendChild(obj.subs[sub].group);

        }
        reparse(obj.subs[sub]);

    }
}

function parse(obj , defaults , className){    
    let parsedObj = {};
    parsedObj.group = document.createElementNS("http://www.w3.org/2000/svg" , "g");
    className?parsedObj.group.classList.add(className): "";

    parsedObj.subs = {};
    attachTransform(parsedObj.group , obj.trans , parsedObj);

    attachElements(parsedObj.group , obj.eles,defaults );

    parsedObj.primeGroup = parsedObj.group.cloneNode(true);

    for(let sub in obj.subs){
        parsedObj.subs[sub] = parse(obj.subs[sub] , defaults ,sub);

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
function attachTransform(group, trans , obj){
    obj.trans = [];
    if(!trans)return group;
    if(trans instanceof String || typeof trans == 'string'){
        // group.setAttributeNS("http://www.w3.org/2000/svg" , 'transform', trans);
        // group.setAttribute('transform', trans);
        // return group;
        trans = trans.split(/\s+/);
        // console.log(trans);
    }
    let transStr = "";
    trans.forEach(el=>{
        if((el instanceof String || typeof el == 'string')&& isTransformType(el)){
            transStr += (" "+el);
            obj.trans.push(el);
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
        // console.log(el);
        /**
         * attach default value to specific attribute
         */
        let defa =defaults? defaults[el.type]:null;
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

module.exports.parse = parse;
module.exports.reparse = reparse;