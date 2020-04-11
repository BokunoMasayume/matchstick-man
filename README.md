# matchstick-man 火柴-人（额鹅鹅鹅鹅鹅鹅）

我打算做这样一个东西
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


------
看了下svg animate和transform...看来套壳就好了

# todo
编辑器 导入`stickObj`，k完帧导出`motionFrames`。
