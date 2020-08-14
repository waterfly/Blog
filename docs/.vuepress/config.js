
module.exports = {
  title: 'WaterFly',
  description: 'Just Coding',
  markdown: {
    toc: '{ includeLevel: [2, 3, 4,5,6] }'
  },
  theme: 'reco',
  themeConfig: {
    authorAvatar: '/bike.png',
    type: 'blog',
    lastUpdated: 'Last Updated', // string | boolean
    sidebar: 'auto',
    huawei: false,
    vssueConfig: {
      platform: 'github',
      owner: 'waterfly',
      repo: 'waterfly.github.io',
      clientId: '49f809ce546d0570f0a1',
      clientSecret: '3cf4a1a125abf5f31b037afc66153403588a230d',
    },
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'iOS', link: '/iOS/' },
      { text: 'Web', link: '/Web/' },
      { text: 'Other', link: '/Other/' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/waterfly' },
    ],
    sidebar: {
      '/iOS/': [
        {
          title: 'OC',   // 必要的
          path: '/iOS/OC/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 6,    // 可选的, 默认值是 1
          children: [
            './OC/',
            './OC/JavaSrciptCore/JavaSrciptCore',
            './OC/WWDC19/WWDC19',
            './OC/WK/WK_summary',
            './OC/RN/RNGraph',
            './OC/RN/RNProjectTips',
            './OC/Thread/多用派发队列少用同步锁',
            './OC/Runtime/关联对象实现week',
            './OC/Component/京东组件化方案解析/京东组件化方案解析',
            './OC/Component/iOS组件化开源库阅读/iOS组件化开源库阅读',
            './OC/Thread/App延长后台时间和backgroundFetch',
            './OC/Thread/iOS_IPC_线程通信',
            './OC/Thread/iOS锁总结/iOS锁总结',
            './OC/Kit/API_Reference系列之Mapkit解析',
            './OC/Other/导航栏TitleView不显示的问题',
            './OC/Other/Xcode_GPX文件Mock真机系统定位',
            './OC/Other/《禅与Objective-C编程艺术》阅读笔记',
          ]
        },
        {
          title: 'Swift',   // 必要的
          path: '/iOS/Swift/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 6,    // 可选的, 默认值是 1
          children: [
            './Swift/',
            './Swift/SwiftGG/SwiftGG_note_1',
            './Swift/SwiftGG/SwiftGG_note_2',
          ]
        },

      ],
      '/Web/': [
        '',     /* /foo/ */
        'FrontLearning',
        'VSCode',
        './BuildVuePress/buildVuePress',
        './AppBuild/BuildSystemWorkDiary',  /* /foo/one.html */
        './Hexo/服务器上搭建hexo博客',
      ],
      '/Other/': [
        '',
        './源码学习与重构/源码学习与重构.md',
      ],
    }
  }
}