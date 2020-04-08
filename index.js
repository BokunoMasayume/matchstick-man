const parse = require('./lib/parse');
// let obj = {//<g>
//     eles:[
//         {
//             type: "tag name",
//             attrs:{
//                  //attributes
//              }
//         }
//     ],
//     trans:[
//         "translate(0 ,20)",...
//     ],
//     subs:{
//         "name1" : obj,//a <g>
//         "name2" :obj,//a <g>
//         ...
//     }

// }

// body={
//     group :Element,
//     subs:{
//         "name1":SVGGElement,
//         "name2":SVGGElement
//     }
// }

class Matchstick{
    constructor(stickObj){
        //generate this.body
        this.parseBody(stickObj);

        this.motions = [];
    }

    /**
     * parse body obj 
     * @param {Object} obj 
     */
    parseBody(obj){
        this.body = parse(obj); 
        return this;
    }

    //
    /**
     * remove all animite related to className's tags 
     * e.g. animateTransform.walk animate.walk
     * @param {String} className 
     *  - not set clean all animate tags
     *  - e.g. className = walk clean animateTransform.walk animate.walk ..
     */
    cleanAnims(className){
        this.body.group.querySelectorAll(className).forEach(ele => {
            if(ele instanceof SVGSetElement || ele instanceof SVGAnimateElement || ele instanceof SVGAnimateTransformElement ||ele instanceof SVGAnimateColorElement || ele instanceof SVGAnimateMotionElement){
                ele.parentNode.removeChild(ele);
            }
        });

        return this;
    }

    //invoke cleanAnimas
    cancelMotion(motionName){
        this.cleanAnims(motionName);
        return this;
    }

    registe(motionName , frames){

    }
}

module.exports = Matchstick;

window.Matchstick = Matchstick;