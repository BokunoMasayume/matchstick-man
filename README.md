# matchstick-man 火柴-人（额鹅鹅鹅鹅鹅鹅）
> svg 动画辅助

# Usage
```js
//火柴人结构信息
let stickObj = {//一个<g>
    _:{ /*根图形*/ },
    "body"{
        _:{/*body 图形*/}
        "left_arm":{} //将放在一个<g>中，统一transform
        ...
    }
};
//新建火柴人
let matchstick = new Matchstick(stickObj);

//把火柴人放在随便哪里冒出的svg标签中
svg.appendChild(matchstick);

//行走关键帧信息
let walkFrames={
    0:{
        "body":{
            /*transform 信息*/
        }
        ...
    }，
    20:{
        ...
    },
    100{
        ...
    }
};

//给火柴人注册walk动作方法
matchstick.registe('walk' , walkFrames);

//动作方法选项
let opt = {
    repeat: Number | 'indefinite',
    duration: String
}
//动作
matchstick.walk(opt);

//停止动作
matchstick.cancelMotion('walk' );

//计算各个部分的转换矩阵，目前给attachEvent用，明天废弃吧
matchstick.attachOrigin();
//给指定部分添加事件监听，可以用鼠标拖动改变图形，目前只支持rotate
matchstick.attachEvent("body.right_leg.right_calf" , "rotate");
matchstick.attachEvent("body.right_leg","rotate");
...
//得到鼠标改变的图形变形信息，可用在注册动作中
let frame = matchstick.getFrame();
matchstick.registe("foo",{
    0:frame,
    100:matchstick.getFrame();
});


```


# log
translate -> rotate -> scale -> skewX -> skewY

- m3中的矩阵没转置
- svg坐标空间
     ——————————————————————————————————————————>x\
     |\
     |\
     |\
     |\
     y
- **变换是从内到外！！！！！**
e.g. 一条直线
```HTML
<g transform="translate(0,120 ) rotate(30)">
  <line transform="translate(70,0)" x1="0" y1="0" x2="0" y2="200" stroke="black"> </line>
</g>
```
- 转换过程：
    - 图形空间 -> translate(70,0) -> rotate(30) -> translate(0,120) -> 显示空间





# todo
- 编辑器 导入`stickObj`，k完帧导出`motionFrames`。
    - getFrame方法 ， 可视化3次贝塞尔曲线， 中间状态模拟（.bezier(bezierPoints , startObj, endObj, percent)） , 中间状态显示（.show(transObj)）
- 组件化 ，使Matchsitck实例中subs的值默认为Matchstick实例，可随时单独操作，更灵活
- 绑定数据，diff`虽然找个框架就能实现，但自己做着试试，熟悉熟悉mvvm实现`