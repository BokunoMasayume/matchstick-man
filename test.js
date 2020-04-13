const m3 = require('./lib/m3');

let mat = m3.scale(12);

mat = m3.vMulMat([1,0,1], m3.inverse.translate(100,10));
// mat = m3.mMulVec( m3.inverse.translate(10,20) , [100,0,1]);
console.log(mat);