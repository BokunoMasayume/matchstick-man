const {getTransformTypeAndValue}  = require('./util');
const m3 = require('./m3');

/**
 * get origin position
 * @param {Object} body 
 * @param {Array[]} parentMat 
 */
function getOrigin(body , parentMat){
    let trans = body.trans;
    let mat = m3.unit();
    let scale = m3.unit();
    trans.forEach(tran=>{
        let res = getTransformTypeAndValue(tran);
        if(res === null)return;
        if(res.type == 'scale'){
            scale = m3.multipy(scale, m3[res.type](...res.args));
        }
        mat = m3.multipy(mat , m3[res.type](...res.args));
    });
    body.mat = mat;
    body.scale = scale;

    body.origin = {
        x:mat[0][2],
        y:mat[1][2]
    }

    if(body.subs){
        Object.keys(body.subs).forEach(sub=>{
            getOrigin(body.subs[sub], mat);
        })
    }
}

module.exports = getOrigin;
