const {getTransformTypeAndValue} = require('./util')

function getSubFrame(prefix,obj ,frame){
    if(obj.subs)Object.keys(obj.subs).forEach(sub=>{
        // console.log(sub);
        let pre =prefix? `${prefix}.${sub}`:sub;
        if(obj.subs[sub].tmpTrans && obj.subs[sub].tmpTrans.length){
            frame[pre] = {};
            
            obj.subs[sub].tmpTrans.forEach(tran=>{
                let res = getTransformTypeAndValue(tran);
                if(!res)return;
                res.args = res.args.filter(arg=>{
                    return arg;
                })
                frame[pre][res.type] = res.args.join();
            })
        }

        getSubFrame( pre , obj.subs[sub] , frame);
    })
}

module.exports = getSubFrame;