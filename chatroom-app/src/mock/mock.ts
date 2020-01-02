// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
// const Random = Mock.Random
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
  account: '123456', password: '123456',
  allData: {
    // Nickname: '诗茵', //昵称这一块可以放在我的信息里
    chatList: [
      {
        name: '小明',
        id: 1,//最好通过唯一的id去判断聊天框
        img: '小明.jpg',
        state: 2,//state：已读未读状态  自己发的信息也可以标成未读（参考qq）已读标记0
        ExistingInformation: [
          { name: '小明', time: '2019-12-25 10:48:12', message: '诗茵,在吗' },
          { name: '诗茵', time: '2019-12-25 10:48:16', message: '在的,怎么了' },// 昵称需要注意
          { name: '小明', time: '2019-12-25 10:48:18', message: '明天一起去图书馆学习' },
          { name: '诗茵', time: '2019-12-25 10:48:22', message: '好的' }
        ]
      },
      {
        name: '小红',
        id: 2,
        img: '小红.jpg',
        state: 0,
        ExistingInformation: [
          { name: '小红', time: '2019-12-25 18:48:12', message: '你好,诗茵,在吗' },
          { name: '诗茵', time: '2019-12-25 20:48:16', message: '在的，但是我现在有些事情要处理，你有什么重要的事情吗' }
        ]
      },
      {
        name: '小小',
        id: 3,
        img: 'UI.jpg',
        state: 1,
        ExistingInformation: [
          { name: '小小', time: '2019-12-25 23:48:12', message: '你好,诗茵,在吗' },
          { name: '诗茵', time: '2019-12-25 1:48:16', message: '在的，但是我现在有些事情要处理，你有什么重要的事情吗' }
        ]
      }
    ]
  },
  addressBook: [

  ],
  myself: [

  ]
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

// 数据的删除操作
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

///123123123123123