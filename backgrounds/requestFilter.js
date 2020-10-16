const keys = ['userNames', 'userIds', 'keywords']

// 安全 parse
const safeParse = str => {
  if (!str) {
    return {}
  }

  try {
    JSON.parse(str)
  } catch (error) {
    return {}
  }

  return JSON.parse(str)
}

// 判断评论是否应该展示
const shouldShow = ({ comment, filters }) => {
  if (filters.userIds.includes(comment.readerid)) {
    return false
  }

  if (filters.userNames.includes(comment.commentauthor)) {
    return false
  }

  for (let i = 0; i < filters.keywords.length; i ++) {
    if (comment.commentbody.indexOf(filters.keywords[i]) !== -1) {
      return false
    }
  }

  return true
}

// 过滤列表
const filterList = ({ list, filters }) => {
  let res = []
  if (Array.isArray(list)) {
    // 筛选回复
    res = list.map(comment => {
      let reply
      if (Array.isArray(comment.reply)) {
        reply = comment.reply.filter(comment => shouldShow({ comment, filters }))
      }

      return {
        ...comment,
        reply,
      }
    })

    // 筛选主评论
    res = list.filter(comment => shouldShow({ comment, filters }))
  }

  return res
}

const listener = (details) => {
  const filter = browser.webRequest.filterResponseData(details.requestId)
  const decoder = new TextDecoder('utf-8')
  const encoder = new TextEncoder()

  const data = []

  filter.ondata = event => {
    data.push(event.data)
  }

  filter.onstop = () => {
    let str = ''

    if (data.length === 1) {
      str = decoder.decode(data[0])
    } else {
      for (let i = 0; i < data.length; i++) {
        let stream = (i == data.length - 1) ? false : true
        str += decoder.decode(data[i], { stream })
      }
    }

    // parse 对象进行过滤
    const obj = safeParse(str)
    const { list } = obj.data
    let filters = {}
    browser.storage.local.get(keys).then(filterStrObj => {
      keys.forEach(key => {
        if (filterStrObj[key]) {
          filters[key] = filterStrObj[key].split(/,|，/)
        } else {
          filters[key] = []
        }
      })

      obj.data.list = filterList({ list, filters })
      str = JSON.stringify(obj)

      filter.write(encoder.encode(str))
      filter.close()
    })
  };
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  { urls: ["http://my.jjwxc.net/backend/novelcomment.php?action=getcommentlist"] },
  ["blocking"]
)
