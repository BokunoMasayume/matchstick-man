const {parse , reparse} = require('./lib/parse');
const generateMotion = require('./lib/generateMotion');
const getOrigin = require('./lib/getOrigin');
const {attach, detach} = require('./lib/events');
const resetTransform = require('./lib/reset');
const gf = require('./lib/getFrame');
const {parseFinder , getPathType , hasChildNode} = require('./lib/util')

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
    constructor(stickObj , defaults , className){
        this.use(defaults);
        //generate this.body
        this.parseBody(stickObj , className);

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
        return this;

    }

    /**
     * parse body obj 
     * @param {Array} obj - object build message
     *  - eles  - {Object[]|Object} - elements in the group 
     *  - trans - {String[]|String} - transforms for this group
     *  - subs  - Array subgroups
     * @param {String} className - class name attach to this.body.group
     */
    parseBody(obj , className){
        this.body = parse(obj , this.defaultes, className); 
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
        if(this[motionName] instanceof Function){
            this.motions.add(motionName);
        }

        return this;
    }

    /**
     * attacj origin object to every level group
     */
    attachOrigin(){
        let parentMat = [
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ]

        getOrigin(this.body , parentMat);

        return this;
        
    }

    //TODO for regexp detect group name
    // getFlatList(prefix){
    //     this.flatMap = {};
    //     if(!this.body)return;

    //     let pre = prefix || "";

        
    // }

    attachEvent(finder , type){
        attach(finder , type , this.body);
        return this;
    }

    detachEvent(finder, type){
        detach(finder , type , this.body);
        return this;
    }

    reset(){
        resetTransform(this.body);
        return this;
    }

    getFrame(){
        let frame = {}
        gf("" ,this.body , frame);
        return frame;
    }

    addSub(finder ,subname, subms){
        if(!subname|| /[.#*%@()]/.test(subname)){
            console.warn("not legal subname:",subname);
            return this;
        }
        if(!(subms instanceof Matchstick)){
            console.warn("must an instance of Matchstick");
            return this;
        }
        let p = parseFinder(finder);
        if(!p || p.type!="normal"){
            console.warn(`finder '${finder}' is not legal`);
            return this;
        }

        let parent = p.path.reduce((acc, e)=>{
            return acc.subs[e]
        } ,this.body);

        if(parent.subs[subname]){
            console.warn(`fail to add sub :under '${finder}' '${subname}' has already exist`);
            return this;
        }

        parent.subs[subname] = subms.body;

        this.reparseBody();
        return this;
    }

    removeSub(finder ){
        let p = parseFinder(finder);
        if(!p || p.type!='normal'){
            console.warn(`finder '${finder}' is not legal`);
            return this;
        }

        let parent;
        let subname;
        let sub = p.path.reduce((acc, e)=>{
            parent = acc;
            subname = e;
            return acc.subs[e]
        } ,this.body);

        if(hasChildNode(parent.group , sub.group)){
            parent.group.removeChild(sub.group);
        }
        delete parent.subs[subname];

    }

    reparseBody(){
        // let prev = this.body.group;
        reparse(this.body);
        // if(prev.parentElement){
        //     prev.parentElement.insertBefore(this.body.group , prev);
        //     prev.parentElement.removeChild(prev);
        // }
        return this;
    }
}



module.exports = Matchstick;

window.Matchstick = Matchstick;