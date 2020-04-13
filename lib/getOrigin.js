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
    let inverseMat = m3.unit();
    trans.forEach(tran=>{
        let res = getTransformTypeAndValue(tran);
        if(res === null)return;
        // if(res.type == 'scale'){
            // inverseMat = m3.multipy( inverseMat, m3.inverse[res.type](...res.args) );
            inverseMat = m3.multipy(m3.inverse[res.type](...res.args), inverseMat );
        // }
        // mat = m3.multipy( m3[res.type](...res.args) ,mat);
        mat = m3.multipy(mat , m3[res.type](...res.args) );
    });
    body.mat = mat;
    body.inverseMat = inverseMat;

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
