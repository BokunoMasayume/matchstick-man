const {getTransformTypeAndValue , transformTypes} = require('./util')

function getSubFrame(prefix,obj ,frame){
    if(obj.subs)Object.keys(obj.subs).forEach(sub=>{
        // console.log(sub);
        let pre =prefix? `${prefix}.${sub}`:sub;
        if(obj.subs[sub].tmpTrans ){
            frame[pre] = {};
            
            Object.keys(obj.subs[sub].tmpTrans).filter(attr=>{
                return ! transformTypes.includes(attr);
            }).map((tran)=>{
                frame[pre][tran] = obj.subs[sub].tmpTrans[tran];
            });

            transformTypes.forEach(tran=>{
                let res = getTransformTypeAndValue(obj.subs[sub].tmpTrans[tran]);
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