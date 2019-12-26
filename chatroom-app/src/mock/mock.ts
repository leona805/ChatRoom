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
        name: '小明', ExistingInformation: [
          { name: '小明', time: '2019-12-25 10:48:12', message: '诗茵,在吗' },
          { name: '诗茵', time: '2019-12-25 10:48:16', message: '在的,怎么了' },// 昵称需要注意
          { name: '小明', time: '2019-12-25 10:48:18', message: '明天一起去图书馆学习' },
          { name: '诗茵', time: '2019-12-25 10:48:22', message: '好的' }
        ]
      },
      {
        name: '小红', ExistingInformation: [
          { name: '小红', time: '2019-12-25 10:48:12', message: '你好,诗茵,在吗' },
          { name: '诗茵', time: '2019-12-25 10:48:16', message: '有事,下次聊' }
        ]
      }
    ]
  },
  addressBook: [

  ],
  myself: [

  ]
}) //测试数据
Mock.mock('/api/login', 'post', Data)

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
