### 一、管理员登录功能

1.访问url：/manager/login

2.调用方式：POST

3.携带参数：email（管理员邮箱），password（管理员密码）

4.返回json样例：

```json
{
    "msg": "登录成功",
    "state": 200,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjExMTExMSIsInBob25lIjoiMTMxMzEzMTMxMzEiLCJuYW1lIjoi55uWIiwiaWQiOiIxIiwiZXhwIjoxNjk3NTMzODU5LCJlbWFpbCI6ImdhaUB1am4uZWR1LmNuIn0.SuywGxXs-Tlgpyw-sUpTlcDdJk8PcBJb87X4llqAPBI"      // 后续操作需要携带的token，token要携带在请求的头部而不是参数体内
}
```

### 二、查看所有管理员

1.访问url：/manager/queryAllManager

2.调用方式：GET

3.携带参数：token（携带在请求头中）

4.返回json样例：

```json
[
    {
        "id": 1,         // 管理员的ID
        "name": "盖",    // 管理员的姓名
        "email": "gai@ujn.edu.cn",  // 管理员的邮箱
        "password": "111111",       // 管理员的密码
        "phone": "13131313131"    // 管理员的联系方式
    }
]
```

### 三、查询所有公司可生产的兽药信息

1.访问url：/manager/medicineDetail

2.调用方式：GET

3.携带参数：token（携带在请求头中）

4.返回json样例：

```json
{
    "medicines": [
        {
            "id": 1,                 // 兽药ID
            "name": "阿莫西林",       // 兽药名称
            "price": 42.5,           // 兽药价格
            "symptom": "用于严重的猪肺炎、子宫炎，乳房炎及泌尿道感染，组织穿透性比羟氨苄青霉素强。",  // 兽药药效
            "path": "amxl.png"       // 图片地址
        },
        {
            "id": 2,
            "name": "卡那霉素",
            "price": 29.33,
            "symptom": "对呼吸道感染，特别对咳嗽、喘气较好，但毒性较大。",
            "path": "knms.png"
        },
        {
            "id": 3,
            "name": "阿维菌素",
            "price": 23.0,
            "symptom": "新型驱虫药，对线虫、绦虫、吸虫及皮肤寄生虫疥癣均有较好效果，但毒性较大，易造成母猪流产。",
            "path": "awjs.png"
        },
        {
            "id": 4,
            "name": "安钠加",
            "price": 18.8,
            "symptom": "强心药。",
            "path": "anj.png"
        },
        {
            "id": 5,
            "name": "安乃近",
            "price": 11.9,
            "symptom": "起解热镇痛作用，临床上常用安乃近配合青霉素治疗一般性不吃料的猪病，但要注意，对怀孕母猪使用的剂量不能过大，否则会导致流产。",
            "path": "anjj.png"
        },
        {
            "id": 6,
            "name": "链霉素",
            "price": 34.99,
            "symptom": "抗革兰氏阴性菌。",
            "path": "lms.png"
        },
        {
            "id": 7,
            "name": "氨苄青霉素",
            "price": 48.0,
            "symptom": "作为二线药，用于严重的肺炎，子宫炎，乳房炎及泌尿道感染。",
            "path": "qms.png"
        },
        {
            "id": 8,
            "name": "氯前列腺素",
            "price": 55.0,
            "symptom": "有催情、催产、同期分娩等功效。",
            "path": "qlx.png"
        },
        {
            "id": 9,
            "name": "大黄",
            "price": 19.9,
            "symptom": "泻药。",
            "path": "dh.png"
        },
        {
            "id": 10,
            "name": "地塞米松",
            "price": 19.0,
            "symptom": "抗炎，抗毒，配合青霉素和安痛定使用，但会导致母猪流产和泌乳减少。",
            "path": "dsms.png"
        },
        {
            "id": 11,
            "name": "丁胺卡那",
            "price": 57.0,
            "symptom": "对呼吸道感染，特别对咳嗽、喘气较好，也有一定的毒性。",
            "path": "dakn.png"
        },
        {
            "id": 12,
            "name": "孕马血清",
            "price": 19.8,
            "symptom": "母猪的催情和助情作用，使用时往往与氯前列烯醇配合使用，但要注意：肌肉注射1~2小时内易过敏。",
            "path": "ymxq.png"
        }
    ]
}
```

### 四、录入生产订单功能

1.访问url：/manager/order

2.调用方式：POST

3.携带参数：date（该订单的期限），phone（公司电话），companyName（公司名称），（药品ID）：（药品数量），在请求头中携带token

4.返回json样例：

```json
{
    "msg": "Success!",
    "state": 200
}
```

### 五、获取所有车间信息

1.访问url：/manager/getAllOfWorkshop

2.调用方式：GET

3.携带参数：在请求头中携带token

4.返回json样例：

```json
{
    "workshops": [
        {
            "id": 1,                                  // 车间ID
            "number": "1-101",                        // 车间编号（类似于车间的姓名）
            "email": "ggg@qq.com",                    // 车间邮箱
            "password": "qweqwe",                     // 车间密码
            "registerTime": "2023-10-05 17:30:18",    // 车间注册时间
            "state": null,                            // 在本接口内没用
            "tasks": null                             // 在本接口内没用
        },
        {
            "id": 2,
            "number": "1-102",
            "email": "asd@qq.com",
            "password": "123456",
            "registerTime": "2023-10-05 17:30:37",
            "state": null,
            "tasks": null
        },
        {
            "id": 3,
            "number": "1-103",
            "email": "zxc@qq.com",
            "password": "123456",
            "registerTime": "2023-10-05 17:31:07",
            "state": null,
            "tasks": null
        },
        {
            "id": 4,
            "number": "1-104",
            "email": "poi@qq.com",
            "password": "123456",
            "registerTime": "2023-10-05 17:31:29",
            "state": null,
            "tasks": null
        },
        {
            "id": 5,
            "number": "1-105",
            "email": "lkj@qq.com",
            "password": "123456",
            "registerTime": "2023-10-05 17:31:58",
            "state": null,
            "tasks": null
        }
    ],
    "state": 200
}
```

### 六、修改车间信息

1.访问url：/manager/changeWorkshopDetail

2.调用方式：POST

3.携带参数：在请求头中携带token，车间ID(id)，车间名称(number)，车间邮箱(email)，车间密码(password)

4.返回json样例：

```json
{
    "msg": "Success!",
    "state": 200
}
```

### 七、获取所有订单信息

1.访问url：/manager/getAllOrders

2.调用方式：GET

3.携带参数：在请求头中携带token

4.返回json样例：

```json
{
    "orders": [
        {
            "id": "1",                       // 订单id
            "companyName": "高效兽药公司",     // 订单买家
            "price": 17016.0,                // 订单总额
            "phone": "151515",               // 买家电话
            "dates": "3",                    // 订单期限
            "distribute": "1",               // 0：未下发给车间；1：已下发给车间
            "state": "1",                    // 0：未完成；1：已完成
            "uploadTime": "2023-09-08 17:16:53",           // 管理员录入订单时间
            "finishTime": "2023-09-30 17:17:03",           // 订单完成时间
            "orderItems": [    // 订单的条目
                {
                    "id": null,        // 没用
                    "orderId": "1",    // 订单ID
                    "medicineId": 1,   // 药物ID
                    "counts": 100      // 该药物数量
                },
                {
                    "id": null,
                    "orderId": "1",
                    "medicineId": 2,
                    "counts": 200
                },
                {
                    "id": null,
                    "orderId": "1",
                    "medicineId": 3,
                    "counts": 300
                }
            ],
            "taskItems": null
        },
        {
            "id": "2",
            "companyName": "XX牧场",
            "price": 11560.0,
            "phone": "131313",
            "dates": "4",
            "distribute": "1",
            "state": "1",
            "uploadTime": "2023-09-01 17:16:58",
            "finishTime": "2023-09-30 17:17:00",
            "orderItems": [
                {
                    "id": null,
                    "orderId": "2",
                    "medicineId": 10,
                    "counts": 100
                },
                {
                    "id": null,
                    "orderId": "2",
                    "medicineId": 11,
                    "counts": 100
                },
                {
                    "id": null,
                    "orderId": "2",
                    "medicineId": 12,
                    "counts": 200
                }
            ],
            "taskItems": null
        },
        {
            "id": "399f4dd3977e40aeb8072b02d329a70f",
            "companyName": "sdabfgo",
            "price": 6402484.9,
            "phone": "12359461332",
            "dates": "3",
            "distribute": "1",
            "state": "0",
            "uploadTime": "2023-09-30 18:01:33",
            "finishTime": null,
            "orderItems": [
                {
                    "id": null,
                    "orderId": "399f4dd3977e40aeb8072b02d329a70f",
                    "medicineId": 4,
                    "counts": 14
                },
                {
                    "id": null,
                    "orderId": "399f4dd3977e40aeb8072b02d329a70f",
                    "medicineId": 7,
                    "counts": 123
                },
                {
                    "id": null,
                    "orderId": "399f4dd3977e40aeb8072b02d329a70f",
                    "medicineId": 9,
                    "counts": 321423
                }
            ],
            "taskItems": null
        },
        {
            "id": "e619cbc16cc442f1a615c6d080bd93a7",
            "companyName": "zxcv",
            "price": 6409249.9,
            "phone": "12359461332",
            "dates": "5",
            "distribute": "0",
            "state": "0",
            "uploadTime": "2023-10-05 20:06:57",
            "finishTime": null,
            "orderItems": [
                {
                    "id": null,
                    "orderId": "e619cbc16cc442f1a615c6d080bd93a7",
                    "medicineId": 4,
                    "counts": 14
                },
                {
                    "id": null,
                    "orderId": "e619cbc16cc442f1a615c6d080bd93a7",
                    "medicineId": 7,
                    "counts": 123
                },
                {
                    "id": null,
                    "orderId": "e619cbc16cc442f1a615c6d080bd93a7",
                    "medicineId": 8,
                    "counts": 123
                },
                {
                    "id": null,
                    "orderId": "e619cbc16cc442f1a615c6d080bd93a7",
                    "medicineId": 9,
                    "counts": 321423
                }
            ],
            "taskItems": null
        },
        {
            "id": "6809908794274b92926d1ff1737a516f",
            "companyName": "zxcv",
            "price": 1.26414883E7,
            "phone": "12359461332",
            "dates": "12",
            "distribute": "0",
            "state": "0",
            "uploadTime": "2023-10-05 20:08:41",
            "finishTime": null,
            "orderItems": [
                {
                    "id": null,
                    "orderId": "6809908794274b92926d1ff1737a516f",
                    "medicineId": 4,
                    "counts": 14232
                },
                {
                    "id": null,
                    "orderId": "6809908794274b92926d1ff1737a516f",
                    "medicineId": 7,
                    "counts": 123123
                },
                {
                    "id": null,
                    "orderId": "6809908794274b92926d1ff1737a516f",
                    "medicineId": 8,
                    "counts": 1231
                },
                {
                    "id": null,
                    "orderId": "6809908794274b92926d1ff1737a516f",
                    "medicineId": 9,
                    "counts": 321423
                }
            ],
            "taskItems": null
        },
        {
            "id": "53b0181a89b24316b5b8b90ef41a6087",
            "companyName": "",
            "price": 2924000.0,
            "phone": "13241412334",
            "dates": "20",
            "distribute": "0",
            "state": "0",
            "uploadTime": "2023-10-10 17:27:42",
            "finishTime": null,
            "orderItems": [
                {
                    "id": null,
                    "orderId": "53b0181a89b24316b5b8b90ef41a6087",
                    "medicineId": 3,
                    "counts": 20000
                },
                {
                    "id": null,
                    "orderId": "53b0181a89b24316b5b8b90ef41a6087",
                    "medicineId": 4,
                    "counts": 30000
                },
                {
                    "id": null,
                    "orderId": "53b0181a89b24316b5b8b90ef41a6087",
                    "medicineId": 10,
                    "counts": 100000
                }
            ],
            "taskItems": null
        }
    ],
    "state": 200
}
```

### 八、制定计划（下发今日车间生产计划）

1.访问url：/manager/makeTasks

2.调用方式：POST

3.携带参数：在请求头中携带token，id（订单的ID，注：未完成的订单）

4.返回json样例：

```json
{
    "msg": "Success!",
    "state": 200,
    "content": [
        {
            "id": null,            // 没用
            "medicineId": 3,       // 药物ID
            "orderId": "53b0181a89b24316b5b8b90ef41a6087",  // 订单ID
            "counts": 201,         // 今日每个车间需要完成的数量
            "state": null          // 没用
        },
        {
            "id": null,
            "medicineId": 4,
            "orderId": "53b0181a89b24316b5b8b90ef41a6087",
            "counts": 301,
            "state": null
        },
        {
            "id": null,
            "medicineId": 10,
            "orderId": "53b0181a89b24316b5b8b90ef41a6087",
            "counts": 1001,
            "state": null
        }
    ]
}
```

### 九、查看车间今日订单

1.访问url：/workshop/order

2.调用方式：GET

3.携带参数：在请求头中携带token

4.返回json样例：

```json
{         // 注意这是当日计划
    "orders": [       // 各个公司的生产计划
        {
            "id": "399f4dd3977e40aeb8072b02d329a70f",    // orderID
            "companyName": "sdabfgo",                    // 公司名称
            "price": null,                               // 没用
            "phone": "12359461332",                      // 公司电话
            "dates": "3", 
            // 总共期限（不是三天生产完，而是今天的任务，这个字段只是说明整个订单从开始到结束要连着完成三次这样子的计划）
            "distribute": null,                          // 没用
            "state": null,                               // 没用
            "uploadTime": "2023-09-30 18:01:33",         // 下发日期
            "finishTime": null,                          // 没用
            "orderItems": null,                          // 没用
            "taskItems": [
                {
                    "id": null,
                    "medicineId": 4,                    // 药物ID
                    "orderId": "399f4dd3977e40aeb8072b02d329a70f",  //订单ID
                    "counts": 1,                                    // 当日该种兽药需要生产几盒
                    "state": 0                                      // 暂时没用
                },
                {
                    "id": null,
                    "medicineId": 7,
                    "orderId": "399f4dd3977e40aeb8072b02d329a70f",
                    "counts": 9,
                    "state": 0
                },
                {
                    "id": null,
                    "medicineId": 9,
                    "orderId": "399f4dd3977e40aeb8072b02d329a70f",
                    "counts": 21429,
                    "state": 0
                }
            ]
        },
        {
            "id": "53b0181a89b24316b5b8b90ef41a6087",
            "companyName": "asd",
            "price": null,
            "phone": "13241412334",
            "dates": "20",
            "distribute": null,
            "state": null,
            "uploadTime": "2023-10-10 17:27:42",
            "finishTime": null,
            "orderItems": null,
            "taskItems": [
                {
                    "id": null,
                    "medicineId": 3,
                    "orderId": "53b0181a89b24316b5b8b90ef41a6087",
                    "counts": 201,
                    "state": 0
                },
                {
                    "id": null,
                    "medicineId": 4,
                    "orderId": "53b0181a89b24316b5b8b90ef41a6087",
                    "counts": 301,
                    "state": 0
                },
                {
                    "id": null,
                    "medicineId": 10,
                    "orderId": "53b0181a89b24316b5b8b90ef41a6087",
                    "counts": 1001,
                    "state": 0
                }
            ]
        }
    ]
}
```

### 十、添加新的车间

1.访问url：/manager/newWorkshop

2.调用方式：POST

3.携带参数：在请求头中携带token，email（车间注册邮箱），number（车间房间号）

4.返回json样例：

```json
{
    "msg": "账号创建成功，初始密码为123456，请及时修改！",
    "state": 200
}
```

### 十一、车间账号登录

1.访问url：/workshop/login

2.调用方式：POST

3.携带参数：email（车间邮箱），password（密码）

4.返回json样例：

```json
{
    "msg": "登录成功",
    "state": 200,
    "id":'1',
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IjEyMzQ1NiIsInBob25lIjoiMjAyMy0xMC0yNCAyMTowODoyNSIsIm5hbWUiOiI1LTEwMSIsImlkIjoiOSIsImV4cCI6MTY5ODc1ODA0OSwiZW1haWwiOiJxd3F3cXdAcXEuY29tIn0.DtgTeQuazafdXF0G_nCeTbwKENNRGvfjlSs4yToiWTU"
}
```

### 十二、车间修改密码

1.访问url：/workshop/changePassword

2.调用方式：POST

3.携带参数：email（车间邮箱），password（密码），请求头携带对应token

4.返回json样例：

```json
{
    "msg": "修改成功！",
    "state": 200
}
```

### 十三、车间完成当日任务的完成功能

1.访问url：/workshop/finish

2.调用方式：POST

3.携带参数：orderId（订单ID），请求头携带对应token

4.返回json样例：

```json
{
    "count": 119   // 账单对应任务剩余数量
}
```

### 十四、轮询接口查看任务剩余数量

1.访问url：/workshop/count

2.调用方式：GET

3.携带参数：orderId（订单ID），请求头携带对应token

4.返回json样例：

```json
{
    "counts": 119
}
```

### 十五、返回药物名称及ID的接口

1.访问url：/manager/getMedicineIdAndName

2.调用方式：GET

3.携带参数：请求头携带对应token

4.返回json样例：

```json
{
    "data": [
        {
            "id": 1,
            "name": "阿莫西林",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 2,
            "name": "卡那霉素",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 3,
            "name": "阿维菌素",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 4,
            "name": "安钠加",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 5,
            "name": "安乃近",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 6,
            "name": "链霉素",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 7,
            "name": "氨苄青霉素",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 8,
            "name": "氯前列腺素",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 9,
            "name": "大黄",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 10,
            "name": "地塞米松",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 11,
            "name": "丁胺卡那",
            "price": null,
            "symptom": null,
            "path": null
        },
        {
            "id": 12,
            "name": "孕马血清",
            "price": null,
            "symptom": null,
            "path": null
        }
    ],
    "state": 200
}
```

