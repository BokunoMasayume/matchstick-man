/**
  * 获取最大可同事办公员工数
  * @param pos char字符型二维数组 工位分布
  * @return int整型
  */
 function GetMaxStaffs( pos ) {
    // write code here
    // let row = pos.length;
    // let col = pos[0].length;
    // let res = 0;
    
    
    // for(let i=0;i<row ; i++){
    //     for(let j=0 ; j<col ;j++){
    //         if(pos[i][j]=='.'){
    //             if(relatedNum(i,j,pos) <2){
    //                 res ++;
    //                 pink(i,j , pos);
    //             }
    //         }
    //     }
    // }
    
    // for(let i=0;i<row ; i++){
    //     for(let j=0 ; j<col ;j++){
    //         if(pos[i][j]=='.'){
    //            // if(relatedNum(i,j,pos) <2){
    //                 res ++;
    //                 pink(i,j , pos);
    //            // }
    //         }
    //     }
    // }
    
    // return res;

    return getmax(0,pos);
}
function getmax(idx ,pos){
    let row = pos.length;
    let col = pos[0].length;
    let tot = row *col;
    let i,j;
    let store = [];
    let res = 0;
    let res2=0;
    if(idx>=tot)return 0;
    for(let n=idx+1;n<tot ;n++){
        [x,y] = getPos(n, row, col);
        if(pos[i][j] == '.'){
            //pink x,y
            if(i>0 && pos[i-1][j]=='.'){
                store.push([i-1,j]);
                pos[i-1][j]='*'
            }
            if(i<row-1 && pos[i+1][j] == '.'){
                store.push([i+1,j]);
                pos[i+1][j]='*'
            }
            if(j>0 && pos[i][j-1]=='.'){
                store.push([i,j-1]);
                pos[i][j-1]='*'
            }
            if(j<col-1 && pos[i][j+1]=='.'){
                store.push([i,j+1]);
                pos[i][j+1]='*'
            }
            res = getmax(n , pos) +1;;
            while(store.length){
                let [px, py] = store.pop();
                pos[px][py] = '.'
            }
            //not pink x,y
            res2 = getmax(n,pos);
            
            return res>res2?res:res2;
        }
    }
    return 0;
}

function getPos(num , row, col){
    return [Math.floor(num/col) , num%col ];
}

function pink(i,j,pos){
    let row = pos.length;
    let col = pos[0].length;
    if(i>0 ) pos[i-1][j]='*';
    if(i<row-1 )pos[i+1][j] = '*';
    if(j>0 ) pos[i][j-1]='*';
    if(j<col-1 )  pos[i][j+1]='*';
}
function relatedNum (i,j,pos){
    let num = 0;
    let row = pos.length;
    let col = pos[0].length;
    if(i>0 && pos[i-1][j]=='.')num++;
    if(i<row-1 && pos[i+1][j] == '.')num++;
    if(j>0 && pos[i][j-1]=='.')num++;
    if(j<col-1 && pos[i][j+1]=='.')num++;
    
    return num;
}

module.exports = {
    GetMaxStaffs : GetMaxStaffs
};