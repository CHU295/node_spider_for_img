const superagent = require('superagent')
const fs = require("fs")

superagent.get('https://api.bilibili.com/x/space/arc/search?mid=72956117&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp').set({
  'accept': 'application/json, text/plain, */*',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
  'cookie': "buvid3=0C0FF40F-47B9-445E-6A4B-C7DB2184435C36409infoc; _uuid=9BC7E141-3663-B0A5-BB32-6F3B7A1293C938520infoc; bfe_id=1e33d9ad1cb29251013800c68af42315",
  'origin': 'https://www.bilibili.com',
  'referer': 'https://www.bilibili.com/v/music/perform/',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
  
}).then(res => {
  let data = JSON.parse(res.text)
  let nums = data.data.list.vlist.length
  let num1 = 0
  let num2 = 0
  data.data.list.vlist.map((i, index) => {
    let url = 'http:' + i.pic // 文件地址
    let name = url.split(/.+\//g)[1] // 获取的hash文件名，带文件格式后缀
    let title = i.title // 原始文件名 新世纪福音战士 OP 残酷な天使のテーゼ 高橋洋子
    let fileType = url.split(/.+\./g)[1] //文件后缀 .png
    // name = title + '.' + fileType //如果需要输出文件名为原始的，打开这个注释。部分文件名带有特殊字符。可能会导致部分图片保存失败
    superagent.get(url).timeout({
      response: 5000,
      deadline: 10000,
    }).end((err, sres) => {
      if (err) {
        console.log('下载文件出错了，错误是：' + err);
      }
      else {
        num1++
        console.log(`下载进度:${num1}/${nums}`)
        fs.writeFile('./image/' + name, sres.body, function (err) {
          if (err) {
            console.log('写文件出错了，错误是：' + err);
          }
          else {
            num2++;
            if (num2 === nums) {
              console.log(`图片全部保存成功`);
            } else {
              console.log(`存储进度：${num2}/${nums}`);
            }
          }
        })
      }
    })
  })
}, function (error) {
  console.log(error)
})

