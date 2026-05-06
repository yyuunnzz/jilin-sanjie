# 吉林三杰 · 数字文旅行迹图

一个基于 React + TypeScript + Vite 构建的交互式数字文旅地图，展示「吉林三杰」（宋小濂、成多禄、徐鼐霖）的跨地域人生行迹，融合数字技术赋能文旅体验。

🔗 **在线预览**：[https://你的用户名.github.io/你的仓库名](https://你的用户名.github.io/你的仓库名)

---

## 功能亮点

- **横版卷轴浏览** — 像展开古画卷一样从左到右滑动浏览三杰行迹
- **四大区域** — 吉林故里 → 东北幕府 → 北京晚年 → 江南游历
- **15个互动节点** — 出生地、任职地、诗社、故居、墓地等关键地标
- **脉冲热点动画** — 节点呼吸灯效果，悬停弹出大字信息卡
- **详情弹窗** — 人物简介 + 地点详情 + 技术标签（VR/AR/AI等）
- **VR沉浸体验** — 全屏360°视场角模拟，带诗句氛围与朗诵按钮
- **缩放/平移** — 支持滚轮缩放、拖拽平移、键盘方向键导航
- **双视图切换** — 古风地图 / 现代路线视图

---

## 技术栈

- React 19 + TypeScript
- Vite（构建工具）
- Tailwind CSS
- shadcn/ui 组件库
- Lucide React 图标

---

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/你的用户名/你的仓库名.git
cd 你的仓库名

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

---

## 部署到 GitHub Pages

本项目已配置 **GitHub Actions 自动部署**：

1. 在 GitHub 上新建仓库（建议设为 **Public**）
2. 将本项目代码 push 到仓库的 `main` 分支
3. 进入仓库 **Settings → Pages**
4. **Source** 选择 **GitHub Actions**
5. 等待 Actions 运行完成（约 1-2 分钟）
6. 访问 `https://你的用户名.github.io/你的仓库名`

> ⚠️ 如果仓库名是 `你的用户名.github.io`，则访问 `https://你的用户名.github.io/`

---

## 项目结构

```
├── .github/workflows/    # GitHub Actions 自动部署配置
├── dist/                 # 构建产物（由 GitHub Actions 自动生成）
├── public/
│   └── images/
│       └── vintage_map.png   # 古风地图底图
├── src/
│   ├── components/
│   │   ├── InfoPanel.tsx     # 地点详情弹窗
│   │   ├── MapHotspot.tsx    # 地图热点组件
│   │   └── VRView.tsx        # VR沉浸视图
│   ├── data/
│   │   └── mapNodes.ts       # 15个节点数据
│   ├── App.tsx               # 主应用组件
│   └── main.tsx              # 入口文件
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 数据来源

「吉林三杰」历史地理节点基于公开文献整理：
- 宋小濂：《北徼纪游》《宋氏家谱》
- 成多禄：《澹堪诗草》《吉林通志》
- 徐鼐霖：《吉林通志》《憩园诗存》

---

## License

MIT License — 本项目可用于学术、教育、文旅等非商业用途。
 
