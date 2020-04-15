
module.exports = {
  title: 'WaterFly',
  description: 'Just Coding',
  markdown: {
    toc: '{ includeLevel: [2, 3, 4,5,6] }'
  },
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    lastUpdated: 'Last Updated', // string | boolean
    sidebar: 'auto',
    huawei: false,
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'iOS', link: '/iOS/' },
      { text: 'Web', link: '/Web/' },
      { text: 'Other', link: '/Other/' },
      { text: 'TimeLine', link: '/Timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/waterfly' },
    ],
    sidebar: {
      '/iOS/': [
        '',
        './JavaSrciptCore/JavaSrciptCore',
        './WWDC19/WWDC19',
        './WK/WK_summary',
        './RN/RNGraph',
        './RN/RNProjectTips',
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
      '/': [
        '',        /* / */
      ]
    }
  }
}