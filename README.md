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
//现将walkFrames分割成单个frame过程(比如0~20一个函数， 20~100一个函数)，每个frame生成一个函数，然后用类似koa-compose的方法连接起来，一个运行完自动启动下一个（next()），启动前检查cancel标签
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

```

以上是设想实现的结构和功能，等实现后还想要加个k帧的网页编辑器，导入`stickObj`，k完帧导出`motionFrames`。

------
看了下svg animate和transform...看来套壳就好了