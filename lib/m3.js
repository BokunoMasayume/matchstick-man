/**
 * Math.cos/tan/sin ... 是使用弧度制！！！
 */

module.exports.multipy = function(m1 , m2){
    let m = [[],[],[]];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            m[i][j] = 0;
            for(let k=0;k<3;k++){
                m[i][j] += m1[i][k]*m2[k][j]
            }
        }
    }
    return m;
}

module.exports.rotate = function(degree){
    let radian = Math.PI *degree/180;
    return [
        [Math.cos(radian) , -Math.sin(radian) , 0],
        [Math.sin(radian) ,  Math.cos(radian) , 0],
        [0                ,  0                , 1]
    ];
}

module.exports.scale = function(sx,sy){
    let x = (sx=== undefined)?1:sx;
    let y = (sy=== undefined)?x:sy;
    return [
        [ x , 0 , 0],
        [ 0 , y , 0],
        [ 0 , 0 , 1]
    ];
}

module.exports.translate = function(tx , ty){
    let x = (tx === undefined)?0:tx;
    let y = (ty === undefined)?x:ty;

    return [
        [1 , 0 , x],
        [0 , 1 , y],
        [0 , 0 , 1]
    ];
}

module.exports.skewX =function(degree){
    let radian = Math.PI *degree/180;

    return [
        [1 , Math.tan(radian) , 0],
        [0 , 1 , 0],
        [0 , 0 , 1]
    ]
}

module.exports.skewY = function(degree){
    let radian = Math.PI *degree/180;

    return [
        [1 , 0 , 0],
        [Math.tan(radian) , 1 , 0],
        [0 , 0 , 1]
    ]
}

module.exports.unit = function(){
    return [
        [1,0,0],
        [0,1,0],
        [0,0,1]
    ]
}