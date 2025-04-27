# PDF 页面旋转工具使用说明

## 项目介绍

这是一个基于 React 和 Next.js 的 PDF 页面旋转工具，允许用户上传 PDF 文件，旋转页面，并下载修改后的 PDF 文件。

## 功能特点

- 上传 PDF 文件
- 查看 PDF 页面缩略图
- 旋转单个或所有 PDF 页面
- 缩放缩略图视图
- 下载修改后的 PDF 文件

## 运行环境要求

- Node.js 16.x 或更高版本
- npm 7.x 或更高版本
- 现代浏览器（Chrome、Firefox、Edge 等）

## 本地运行步骤

### 1. 克隆项目

```bash
git clone https://github.com/wsmnnmm/20250427-pdf.git
cd 20250427-pdf
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 访问应用

打开浏览器，访问 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

如果需要部署到生产环境，可以执行以下命令：

```bash
npm run build
npm start
```

## 使用说明

1. 在首页点击上传区域或拖放 PDF 文件到上传区域
2. 上传成功后，页面将显示 PDF 的缩略图
3. 点击缩略图或右上角的旋转按钮可以旋转对应的页面
4. 点击"Rotate all"按钮可以旋转所有页面
5. 使用缩放按钮可以调整缩略图大小
6. 完成旋转操作后，点击"下载"按钮下载修改后的 PDF 文件

## 技术栈

- Next.js - React 框架
- React - 前端 UI 库
- Tailwind CSS - 样式框架
- pdf-lib - PDF 处理库
- react-pdf - PDF 渲染库
- react-dropzone - 文件上传组件

## 项目结构

```
pdf01/
├── public/          # 静态资源
├── src/             # 源代码
│   ├── app/         # Next.js应用目录
│   │   ├── components/  # React组件
│   │   │   └── PdfViewer.tsx  # PDF查看器组件
│   │   ├── store/    # 状态管理
│   │   │   └── pdfStore.ts  # PDF状态存储
│   │   ├── utils/    # 工具函数
│   │   │   └── pdfUtils.ts  # PDF处理工具
│   │   └── page.tsx  # 主页面
│   └── ...
├── package.json    # 项目依赖
└── README.md       # 项目说明
```

## 注意事项

- 大型 PDF 文件可能需要较长时间处理
- 所有操作都在浏览器中完成，不会上传文件到服务器
- 确保浏览器允许 JavaScript 运行，并有足够的内存处理 PDF 文件
