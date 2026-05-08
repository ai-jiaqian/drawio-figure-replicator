# Draw.io Figure Replicator

[English](README.md) | [中文](README.zh-CN.md)

把参考图复刻成可编辑的 draw.io / diagrams.net 文件。

大多数 AI 画图工具从文字开始，这个 skill 从参考图开始：论文图、架构截图、白板照片、流程图、生成图概念稿都可以作为输入。Agent 的目标不是生成一张新图片，而是重建一个可编辑、可维护、可导出、可继续迭代的 `.drawio` 文件。

![SkillCircuit 参考图到 draw.io 对比](examples/skillcircuit/comparison.png)

## 核心价值

AI 生成图很适合探索视觉方向，但经常变成不可编辑的死图。团队真正需要的是能改文字、改箭头、改框、改结构、能进版本库的图。

这个 skill 给 Agent 一套稳定工作流：

- 读取参考图尺寸、区域、颜色、字体、箭头、重复组件
- 判断哪些元素用 draw.io 原生形状，哪些元素需要独立 SVG
- 用坐标化 XML 生成 `.drawio`，而不是手工拖拽
- 将 SVG asset 以 data URI 方式嵌入，保证文件可迁移
- 保持文字、框、箭头、表格、标签可编辑
- 导出 PNG 预览并和参考图对比

## 适合场景

- 论文图复刻
- 架构图重绘
- 截图转可编辑图
- 流程图和项目图整理
- 生成图概念稿转 draw.io
- 沉淀可复用 SVG 图标资产

## 不适合场景

- 泛化的文字生成图
- 只需要 Mermaid 的简单图
- 整张 PNG 贴进 draw.io
- 未授权描摹品牌 logo
- 本质上应该保留为图片的复杂插画

## 安装

复制 skill 到你的 Agent skills 目录。

Codex：

```bash
mkdir -p ~/.codex/skills
cp -R skills/drawio-figure-replication ~/.codex/skills/
```

Claude Code：

```bash
mkdir -p ~/.claude/skills
cp -R skills/drawio-figure-replication ~/.claude/skills/
```

然后重启或刷新 Agent。

## 推荐工具

没有额外工具时，skill 仍然可以指导 Agent 生成 XML。但如果要稳定验证，建议安装：

- diagrams.net Desktop / draw.io Desktop
- `xmllint`
- PIL、ImageMagick 或 Agent 自带图片查看能力

macOS 上通常可以这样导出 PNG：

```bash
/Applications/draw.io.app/Contents/MacOS/draw.io -x -f png -o output.png input.drawio
```

## 示例 Prompt

```text
把这张参考架构图复刻成可编辑 draw.io。

要求：
- 保留主要区域、阅读顺序和信息密度
- 文字、箭头、框和标签都要可编辑
- 只有可复用图标才单独做 SVG asset
- 导出 PNG 预览，并和参考图对比后再交付
```

## 示例

### SkillCircuit：模块化大图复刻

![SkillCircuit 参考图到 draw.io 完整对比](examples/skillcircuit/comparison.png)

[SkillCircuit](examples/skillcircuit/README.md) 展示了大图的模块化复刻流程：先把参考图拆成 7 个 panel，每个模块单独做局部 QA，再统一集成跨模块连线。

- Task Stream
- Team Execution
- Trace Mining
- Skill Registry
- Distillation Lab
- Deployment Monitoring
- Experience Accumulation Timeline

文件：[draw.io](examples/skillcircuit/skillcircuit.drawio)、[PNG 预览](examples/skillcircuit/skillcircuit.png)、[完整对比图](examples/skillcircuit/comparison.png)、[模块 QA 图](examples/skillcircuit/module-qa-contact-sheet.png)。

### ContextForge：高密度论文框架图

![ContextForge 参考图到 draw.io 对比](examples/contextforge/comparison.png)

[ContextForge](examples/contextforge/README.md) 是一个高密度论文风格框架图复刻示例，包含多源上下文组装、冲突解决、质量门禁、引用追踪包和组装缓冲区。

文件：[draw.io](examples/contextforge/contextforge.drawio)、[PNG 预览](examples/contextforge/contextforge.png)、[完整对比图](examples/contextforge/comparison.png)。

### 更多概念样例

另见 [examples/concept-board](examples/concept-board/README.md)。当前包含四个独立的参考图复刻示例：

- Research Framework
- Agent Platform Architecture
- Model Pipeline
- Experience Flywheel

每个示例都包含可编辑 `.drawio`、导出 PNG 预览、独立 SVG assets 和可重新生成的脚本。

## 输出标准

一次合格输出应该生成独立文件夹：

```text
figure-name_recreated/
├── figure-name.drawio
├── figure-name.png
├── SVG_ASSETS.md
└── svg/
    ├── icon-1.svg
    └── icon-2.svg
```

`.drawio` 不能只是把原图整张贴进去。主要形状、文字、连接线、表格和标签都应该是可编辑 draw.io cells。

## 差异化

draw.io 的 AI 生态已经有官方 MCP、社区 text-to-diagram skill 和各种编程式生成工具。这个项目刻意不做泛图生成，而是聚焦一个更尖锐的问题：

> 参考图输入，可编辑 draw.io 复刻输出。

详细竞品调研见 [research/market-scan.md](research/market-scan.md)。

## License

MIT。本项目与 draw.io / diagrams.net 无官方关联。
