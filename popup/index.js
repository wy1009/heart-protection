// 预设项
// 正常来讲应该连模板都通过预设项生成的，但是……
// 连模板引擎都没有，还要啥自行车
const keys = ['userNames', 'userIds', 'keywords']

// 将配置作为默认项注入表单
const initForm = options => {
  Object.keys(options).forEach(key => {
    const el = document.querySelector(`#${key}`)
    if (el) {
      el.value = options[key]
    }
  })
}

// 初始化表单
browser.storage.local.get(keys).then(val => initForm(val))

// 修改配置提交事件
document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault()

  browser.storage.local.set({
    userNames: e.target.userNames.value,
    userIds: e.target.userIds.value,
    keywords: e.target.keywords.value,
  })
})
