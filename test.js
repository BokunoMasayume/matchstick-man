const m3 = require('./lib/m3');

let mat = m3.rotate(12);

mat = m3.multipy(mat, m3.inverse.rotate(12));

console.log(mat);