const superagent = require('superagent')
const cheerio = require("cheerio")
const fs = require("fs")

superagent.get('https://www.acfun.cn/v/list123/index.htm').set({
  // 'accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
  // 'accept-encoding': 'gzip, deflate, br',
  // 'accept-language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8',
  // 'cache-control': 'no-cache',
  // 'pragma': 'no-cache',
  // 'referer': 'https://www.mzitu.com/',
  // 'sec-fetch-mode': 'no-cors',
  // 'sec-fetch-site': 'cross-site',
  // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
}).then(res => {
  const $ = cheerio.load(res.text)
  let el = $('body').find('img')

  el.map((index, i) => {
    let img_src = $(i).attr('data-original') || $(i).attr('src'),
      news_title = $(i).attr('alt') || ''
    if (!img_src) return
    console.log(img_src, news_title)
    superagent.get(img_src).pipe(fs.createWriteStream('./image/' + index + '.jpg'));
  })

  // fs.writeFile('./' + $('title').text() + '.html', res.text, () => { })
}, function (error) {
  console.log(error)
})