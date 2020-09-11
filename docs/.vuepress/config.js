
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
      {
        text: 'iOS',
        items: [
          { text: 'Swift', link: '/iOS/Swift/' },
          { text: 'RN', link: '/iOS/RN/' },
          { text: 'OC', link: '/iOS/OC/' }
        ]
      },
      { text: 'Web', link: '/Web/' },
      { text: 'Other', link: '/Other/' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/waterfly' },
    ],
    sidebar: {
      '/iOS/Swift/': [
        '',
        './SwiftGG/SwiftGG_note_1',
        './SwiftGG/SwiftGG_note_2',
        './SwiftGG/SwiftGG_note_3',
      ],
      '/iOS/RN/': [
        '',
        './RNGraph',
        './RNProjectTips',
      ],
      '/iOS/OC/': [
        '',
        './JavaSrciptCore/JavaSrciptCore',
        './WWDC19/WWDC19',
        './WK/WK_summary',
        './Thread/多用派发队列少用同步锁',
        './Runtime/关联对象实现week',
        './Component/京东组件化方案解析/京东组件化方案解析',
        './Component/iOS组件化开源库阅读/iOS组件化开源库阅读',
        './Thread/App延长后台时间和backgroundFetch',
        './Thread/iOS_IPC_线程通信',
        './Thread/iOS锁总结/iOS锁总结',
        './Kit/API_Reference系列之Mapkit解析',
        './Other/导航栏TitleView不显示的问题',
        './Other/Xcode_GPX文件Mock真机系统定位',
        './Other/《禅与Objective-C编程艺术》阅读笔记',
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