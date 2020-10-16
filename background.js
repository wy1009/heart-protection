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

    const obj = JSON.parse(str)
    console.log(obj, 'obj')
    filter.write(encoder.encode(str))
    filter.close()
  };
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  { urls: ["http://my.jjwxc.net/backend/novelcomment.php?action=getcommentlist"] },
  ["blocking"]
)
