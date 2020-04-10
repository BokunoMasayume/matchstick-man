const parse = require('./lib/parse');
const generateMotion = require('./lib/generateMotion');


class Matchstick{

    /**
     * 
     * @constructor
     * @param {Array} obj - object build message
     *  - eles  - {Object[]|Object} - elements in the group 
     *  - trans - {String[]|String} - transforms for this group
     *  - subs  - Array subgroups
     * @param {{tagName:{attrname:String}}} defaults
     */
    constructor(stickObj , defaults){
        this.use(defaults);
        //generate this.body
        this.parseBody(stickObj);

        this.motions = new Set();
    }

    /**
     * set default value to attribute of specific tag
     * @param {{tagName:{attr:string}}} opt 
     * @param {{clean:boolean}} optopt - options
     *  - clean : defalut false ,clean all other default values of all other tagnanes
     *  - cover:  default false, clean all other default values of specifced tag in opt
     * @example
     * this.use({
     *      line:{
     *          'stroke-width':10
     *      }
     * },{
     *  clean:true
     * })
     */
    use(opt , optopt){
        if(!opt)return;
        if(!(opt instanceof Object)){
            console.warn("optoins in Matchstick.use must be a object,but is ",opt);
            return ;
        }
        if(!optopt)optopt = {};
        let clean= optopt.clean || false;
        let cover = optopt.cover || false;

        if(!(this.defaultes instanceof Object) || clean){
            this.defaultes = {}
        }

        Object.keys(opt).forEach(tag=>{
            if(cover || !this.defaultes[tag]){
                this.defaultes[tag] = {}
            }

            Object.assign(this.defaultes[tag] , opt[tag]);
        })


    }

    /**
     * parse body obj 
     * @param {Array} obj - object build message
     *  - eles  - {Object[]|Object} - elements in the group 
     *  - trans - {String[]|String} - transforms for this group
     *  - subs  - Array subgroups
     */
    parseBody(obj){
        this.body = parse(obj , this.defaultes); 
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
        this.cleanAnims(`._${motionName}_motion`);
        return this;
    }

    /**
     * 
     * @param {String} motionName - motion's name like 'walk' 'idle'
     * @param {Object} frames - keyframes 
     * @example
     * this.registe('walk',{
     *      0:{
     *          body:{
     *              rotate:10
     *          }
     *      },
     *      50:{
     *          arm:{
     *              skewX:12
     *          }
     *      },
     *      100:{
     *          body:{
     *              rotate:20
     *          }
     *      }
     * })
     */
    registe(motionName , frames){
        this[motionName] = generateMotion(motionName,frames);
        if(this[motionName instanceof Function]){
            this.motions.add(motionName);
        }
    }

    //TODO for regexp detect group name
    getFlatList(prefix){
        this.flatMap = {};
        if(!this.body)return;

        let pre = prefix || "";

        
    }
}

module.exports = Matchstick;

window.Matchstick = Matchstick;