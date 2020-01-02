// 引入mockjs
const Mock = require('mockjs')
// mock一组数据
var Data = new Array()
for (let i = 0; i < 10; i++) {
  let userLoginData = Mock.mock({
    'account': /^1[385][1-9]{9}/,
    'password': /^[1-9]{6}/
  })
  Data.push(userLoginData)//随机生成的数据,没有allData属性
}
Data.push({
  account: '111', password: '111', allData: { chatList: [], addressBook: [], myself: [] }//测试次account   主要测试来回沟通交互等
}, {
  account: '222', password: '222', allData: { chatList: [], addressBook: [], myself: [] }//测试次account   主要测试来回沟通交互等
}, {
  account: '333', password: '333', allData: { chatList: [], addressBook: [], myself: [] }//测试次account   主要测试来回沟通交互等
})
Data.push({
  account: '123456', password: '123456',//测试主account   主要用来测试数据的显示
  allData: {
    // Nickname: '诗茵', //昵称这一块可以放在我的信息里
    chatList: [
      {
        Nickname: '小明',
        account: 111,//最好通过唯一的（account）去判断聊天框
        img: '小明.jpg',
        state: 2,//state：已读未读状态  自己发的信息也可以标成未读（参考qq）已读标记0
        ExistingInformation: [
          { Nickname: '小明', time: '2019-12-25 10:48:12', message: '诗茵,在吗' },
          { Nickname: '诗茵', time: '2019-12-25 10:48:16', message: '在的,怎么了' },// 昵称需要注意
          { Nickname: '小明', time: '2019-12-25 10:48:18', message: '明天一起去图书馆学习' },
          { Nickname: '诗茵', time: '2019-12-25 10:48:22', message: '好的' }
        ]
      },
      {
        Nickname: '小红',
        account: 222,
        img: '小红.jpg',
        state: 0,
        ExistingInformation: [
          { Nickname: '小红', time: '2019-12-25 18:48:12', message: '你好,诗茵,在吗' },
          { Nickname: '诗茵', time: '2019-12-25 20:48:16', message: '在的，但是我现在有些事情要处理，你有什么重要的事情吗' }
        ]
      },
      {
        Nickname: '小小',
        account: 333,
        img: 'UI.jpg',
        state: 1,
        ExistingInformation: [
          { Nickname: '小小', time: '2019-12-25 23:48:12', message: '你好,诗茵,在吗' },
          { Nickname: '诗茵', time: '2019-12-25 1:48:16', message: '在的，但是我现在有些事情要处理，你有什么重要的事情吗' }
        ]
      }
    ],
    addressBook: [
      {
        Nickname: '小明',
        account: 111,
        img: 'UI.jpg',
      },
      {
        Nickname: '小红',
        account: 222,
        img: 'UI.jpg',
      },
      {
        Nickname: '小小',
        account: 333,
        img: 'UI.jpg',
      }
    ],
    myself: [

    ]
  },
})

// 登陆验证操作
let login = function (data) {
  let status = { status: 200, message: 'success' };
  let rtype = data.type.toLowerCase() // 获取请求的类型并转换为小写
  let User = JSON.parse(JSON.stringify(Data))
  switch (rtype) {
    case 'get':
      break
    case 'post':
      let account = parseInt(JSON.parse(data.body).params.account) // 获取请求的id，将options.body转换为JSON对象
      let password = parseInt(JSON.parse(data.body).params.password) // 获取请求的id，将options.body转换为JSON对象
      let flag = false;
      User = User.filter(function (val) {
        if (JSON.parse(val.account) === account && JSON.parse(val.password) === password) {
          flag = true;
          return val// 账户和密码相等，返回所有子数据
        }
      })
      if (!flag) {
        status = {
          status: 201, message: '账号密码验证失败'
        }
      }
      break
    default:
      break
  }
  return {
    User, status
  }
}
Mock.mock('/api/login', 'post', login)

// 消息框数据的删除操作
let deleteMessageList = function (data) {
  let rtype = data.type.toLowerCase() // 获取请求的类型并转换为小写
  let User = [];
  switch (rtype) {
    case 'get':
      break
    case 'post':
      let account = parseInt(JSON.parse(data.body).params.account);
      let deletedata = parseInt(JSON.parse(data.body).params.data);
      Data.filter(function (val) {
        let _data = [];
        if(JSON.parse(val.account) === account){
          val.allData.chatList.map((p)=>{
            if(deletedata !== p.account) {
              _data.push(p)
            }
          })
          val.allData.chatList = _data
        }
      })
      Data.filter(function (val) {
        if(JSON.parse(val.account) === account){
          User.push(val)
        }
      })
      break
    default:
      break
  }
  return {
    Data:User
  }
}
Mock.mock('/api/MessageListDelete', 'post', deleteMessageList)

// 账号的注销操作
let deleteList = function (data) {
  let rtype = data.type.toLowerCase() // 获取请求的类型并转换为小写
  switch (rtype) {
    case 'get':
      break
    case 'post':
      let account = parseInt(JSON.parse(data.body).params.account) // 获取请求的id，将options.body转换为JSON对象
      Data = Data.filter(function (val) {
        return JSON.parse(val.account) !== account // 过滤掉前台传过来的id对应的相应数据，并重新返回
      })
      break
    default:
      break
  }
  return {
    Data
  }
}
Mock.mock('/api/UserDelete', 'post', deleteList)
