# netease-music-app

使用react + nodejs + es6 技术实现高仿网易云音乐网页版
!["图片缺失"](https://github.com/lilongllong/netease-music-react/blob/master/docs/netease-music-juke-music.png?raw=true)

## 部署
本项目存在Dockerfile,可以再daocluod等平台直接github库部署:tada:  
app已经部署到daocloud的net-ease应用🎉[net-ease-music应用](http://devin6-net-ease.daoapp.io/)(daocloud不稳定，不能保证能正常访问到);

/lib 和 /public 是部署所需文件
```
// 部署环境运行
npm start
```


## 环境
- 安装nodejs
- 安装git
- 安装npm

## 下载和使用
```
git clone https://github.com/lilongllong/netease-music-react.git
cd netease-music-react
npm install -g webpack
npm install

// for window
npm install -dev

```
## 运行
```
// 开发环境
npm run dev
```
## 实现功能
### app 功能
- 网易云音乐歌单列表PlayList
- 网易云音乐歌单TrackInfo
- 网易云音乐歌单歌曲列表TrackTable
- 歌曲播放及进度控制，音量控制, 模块隐藏控制Player
- 搜索Search
- 搜索结果展示SuggestionList
- 播放列表Songlist
- 歌词展示-随时间滚动待做

### 开发者功能
- webpack
- 热更新，react-hot-loader.
- docker file
- babel es6 -> es5
- nodejs server

## 不足
因为个人精力原因，相当多的部分未来得及优化，之后有时间我会继续work.
### 任务列表
- 歌曲播放顺序控制。现在采用的是列表顺序播放，预留了代码接口，详情看代码(player component audio控制部分)
- 歌词展示模块。这一部分同样预留了代码接口，详情看代码(songlist component song-lyric模块)
- 个人网易云音乐ID的更换。一开始仅仅想自己用，并未为它设计图形界面，但在代码('src/service/ServiceClient.js'- __pseudoLogin function)可以修改
- suggestionlist的样式需要优化。选中效果，scroll的样式，条目的展示效果等等

### 开发寄语
我发现react面对复杂状态控制出现1，state冗余; 2,component联动设计不合理。建议各位可以采用 react + redux 来重构该项目。

## 作者寄语
该app设计和代码还存在缺陷，欢迎各位的批评和指正，具体请到issue版块反馈，我会及时回复:smile:
