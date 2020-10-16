# 心灵保护器

FireFox 扩展，用于晋江后台评论过滤。

可通过读者客户号、读者 id、特定关键字等屏蔽评论，免于被人攻击。

没错，我们女孩子就是这样脆弱的生物，怎样啦！

## 使用方法

下载火狐浏览器，安装该扩展。输入想要屏蔽的条件，点击“确定”。
访问 PC 端[晋江作者评论后台](http://my.jjwxc.net/backend/novelcomment.php)（常规进入途径为 写作-我收到的评论）。此时，触发屏蔽条件的评论已不会显示在后台中。

## 目前支持的屏蔽条件

用户名
用户客户号
评论内容关键字

## 目录

.
├── README.md
├── backgrounds // 后台运行 js
│   └── requestFilter.js // 监听请求，更改响应
├── icon.svg
├── manifest.json
└── popup // 插件弹窗本身
    ├── index.css
    ├── index.html
    └── index.js
