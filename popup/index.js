// 预设项
// 正常来讲应该连模板都通过预设项生成的，但是……
// 连模板引擎都没有，还要啥自行车
// 正常来讲应该放入公共部分导入各个文件的，但是……
// Uncaught SyntaxError: import declarations may only appear at top level of a module
// 算了算了，要啥自行车
const keys = ['userNames', 'userIds', 'minMark', 'keywords']

// 将配置作为默认项注入表单
const initForm = options => {
  Object.keys(options).forEach(key => {
    const el = document.querySelector(`#${key}`)
    if (el) {
      el.value = options[key]
    }
  })
}

// toast 方法
const { body } = document
const toast = document.createElement('div')
toast.setAttribute('class', 'toast')
let timer = null
const showToast = (msg, timeout) => {
  if (timer) {
    clearTimeout(timer)
    body.removeChild(toast)
  }
  toast.innerHTML = msg
  body.appendChild(toast)
  timer = setTimeout(() => {
    body.removeChild(toast)
    timer = null
  }, timeout || 2000)
}

// 初始化表单
browser.storage.local.get(keys).then(val => initForm(val))

// 修改配置提交事件
document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault()

  browser.storage.local.set({
    userNames: e.target.userNames.value,
    userIds: e.target.userIds.value,
    minMark: e.target.minMark.value,
    keywords: e.target.keywords.value,
  })

  showToast('修改成功~')
})
