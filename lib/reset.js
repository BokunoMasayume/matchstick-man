function resetTransform(obj){
    if(!obj.trans)obj.trans = [];
    obj.group.setAttribute("transform" , obj.trans.join(" "));
    obj.group.tmpTrans = [];
    if(!obj.subs)obj.subs = [];
    obj.subs.forEach(sub=>{
        resetTransform(obj.subs[sub]);
    });
}

module.exports = resetTransform;