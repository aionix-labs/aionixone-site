🧾 AionixOne Website & Documentation Monorepo Specification

Version: 1.0
Status: Draft
Author: zhihao liu
Last Update: 2025-12-10

⸻

1. Overview

本规范定义 AionixOne 产品的网站架构，包括：
	•	主站（Landing Page）：aionixone.com
	•	文档站（Developer Docs）：docs.aionixone.com
	•	Demo / Showcase Site（可选）：demo.aionixone.com
	•	网站 UI 组件复用方式
	•	Vercel 多项目部署规则
	•	域名与 DNS 配置
	•	本地开发方式

采用 Monorepo 架构，多站点共享 UI 组件与配置，保证一致性与可维护性。

⸻

2. Goals
	1.	提供统一的 Monorepo 结构管理多个网站项目
	2.	支持每个站点独立部署，但共享资源
	3.	网站整体风格统一，可扩展可复用
	4.	完全兼容 Vercel，支持自动化构建与部署
	5.	支持未来加入博客、社区、API 文档等模块
	6.	适用于未来商业化、SEO、品牌展示

⸻

3. Repository Structure

aionixone-site/
  ├── apps/
  │   ├── web/              # 主站（Landing Page）
  │   │   ├── app/
  │   │   ├── components/
  │   │   ├── public/
  │   │   └── package.json
  │   │
  │   ├── docs/             # 文档站 (Nextra or MDX)
  │   │   ├── pages/
  │   │   ├── public/
  │   │   └── package.json
  │   │
  │   └── demo/             # 可选 Demo（展示 StepFlow UI）
  │       ├── app/
  │       ├── components/
  │       └── package.json
  │
  ├── packages/
  │   ├── ui/               # 公共 UI 组件库
  │   │   ├── src/
  │   │   └── package.json
  │   │
  │   └── config/           # tsconfig / tailwind / eslint 公共配置
  │       ├── tailwind/
  │       ├── tsconfig/
  │       ├── eslint/
  │       └── package.json
  │
  ├── turbo.json            # （可选）Turborepo 配置
  ├── package.json          # Workspace 根配置
  ├── pnpm-workspace.yaml   # 或 yarn workspaces / npm workspaces
  └── README.md


⸻

4. Technology Stack

Component	Technology
Framework	Next.js 14 (App Router)
Styling	Tailwind CSS
Docs Framework	Nextra (官方推荐的 Next.js 文档工具)
Component System	React + packages/ui
Build Pipeline	Vercel (每个 app 独立部署)
Package Manager	pnpm（强烈推荐）、或 yarn/npm
Optional	Turborepo 用于构建加速与缓存


⸻

5. Site Responsibilities

5.1 Web (Landing Page)

Domain: aionixone.com

目的:
	•	产品介绍
	•	核心卖点展示
	•	StepFlow & AionixFn 截图 / 视频
	•	“为什么选择 AionixOne”
	•	下载 / 安装教程链接
	•	链接到 docs / demo
	•	SEO 整体优化

功能模块:
	•	Hero Section
	•	Product Features
	•	Architecture Overview
	•	Demo Screenshots
	•	Testimonials / Use Cases（未来）
	•	CTA（Get Started）

⸻

5.2 Docs (Developer Documentation)

Domain: docs.aionixone.com

目的:
	•	安装指南
	•	产品架构说明
	•	StepFlow DSL / Execution Semantics
	•	AionixFn Runtime & Layers
	•	TRN 规范
	•	API 文档（引用 OpenAPI）
	•	CLI 文档
	•	示例与教程

推荐框架：Nextra

⸻

5.3 Demo Site（可选）

Domain: demo.aionixone.com

目的:
	•	展示 StepFlow Studio UI
	•	模拟执行流程（静态演示）
	•	UI Showcase / Gallery
	•	方便你面试展示

⸻

6. Shared Packages

6.1 packages/ui

统一 UI 组件库，包括：
	•	Button / Card / Section / Layout
	•	Typography
	•	颜色主题（保持一致视觉）
	•	Icon 组件（StepFlow, AionixFn, Igniter 等）
	•	常见布局组件（Hero, FeatureGrid, Footer）

所有 apps 均可共享。

⸻

6.2 packages/config

公共工具配置：
	•	tailwind preset
	•	eslint preset
	•	tsconfig base
	•	prettier config

减少重复，提高一致性。

⸻

7. Deployment Specification (Vercel)

每个站点在 Vercel 中注册为 独立 Project。

Site	Root Directory	Domain
AionixOne Web	apps/web	aionixone.com
AionixOne Docs	apps/docs	docs.aionixone.com
AionixOne Demo	apps/demo	demo.aionixone.com

7.1 Build Command

Vercel 自动识别 Next.js → 默认即可：

pnpm install
pnpm build

如果使用 Turborepo：

pnpm turbo run build --filter=web

（Vercel 会自动缓存构建）

⸻

8. DNS Configuration (Namecheap → Vercel)

为主站添加：

A     @       76.76.21.21
CNAME www     cname.vercel-dns.com

子域名：

CNAME docs    alias-of-vercel-project
CNAME demo    alias-of-vercel-project

Vercel 会给出每个项目的 CNAME 值。

⸻

9. Local Development

安装依赖：

pnpm install

启动 Web：

pnpm dev --filter web

启动 Docs：

pnpm dev --filter docs

启动 Demo：

pnpm dev --filter demo


⸻

10. Future Extensions
	•	加入 Blog（apps/blog）
	•	加入 Changelog（自动生成）
	•	添加 PR Preview（Vercel 默认支持）
	•	自动生成 Docs from OpenAPI
	•	加入推荐引擎（AI 自动跳转 docs）
	•	增加 i18n（多语言支持）

⸻

11. Non-Goals

本规范 不包括：
	•	后端部署（你的 Aionix Server 另属一个项目）
	•	SaaS 计费系统（未来再扩展）
	•	用户系统
	•	交互式 Demo 的后端执行（只展示 UI）

⸻

📌 12. Summary

本规范定义了：
	1.	一个 Monorepo 管理多个站点
	2.	每个站点独立部署到 Vercel
	3.	共享 UI + 配置，视觉统一
	4.	域名清晰分工（com = 主站 / dev = 文档）
	5.	支持未来无限扩展

这是你这种 开发者平台 / 本地云产品 最专业、最长期可维护的结构。
