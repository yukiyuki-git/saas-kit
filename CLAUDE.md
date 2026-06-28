# SaaS Kit - 全栈SaaS模板

## 概述
生产级全栈 SaaS 模板，Next.js 16 + TypeScript，路径 `D:\saas-kit`。

## 技术栈
- **框架**: Next.js 16 (App Router, Turbopack)
- **数据库**: PostgreSQL + Drizzle ORM
- **认证**: Better Auth (邮箱/密码、OAuth、Magic Link、2FA)
- **支付**: Stripe (订阅、Webhook、Customer Portal)
- **UI**: Tailwind CSS v4 + shadcn/ui + Framer Motion
- **i18n**: next-intl (中/英)
- **邮件**: Resend + React Email
- **测试**: Vitest (单元) + Playwright (E2E), 目前 374 个测试
- **部署**: Docker + GitHub Actions CI/CD

## 项目结构
```
src/
├── app/
│   ├── (auth)/         # 登录、注册等认证页面
│   ├── (dashboard)/    # 仪表盘（设置、团队、账单）
│   ├── (marketing)/    # 定价、博客、文档
│   ├── api/            # API 路由 (auth, stripe, webhooks, v1)
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 首页
├── components/
│   ├── ui/             # shadcn/ui 组件
│   ├── dashboard/      # 仪表盘组件
│   └── shared/         # Navbar, Footer 等
├── lib/
│   ├── auth.ts         # Better Auth 配置
│   ├── db/             # Drizzle schema + client
│   ├── stripe.ts       # Stripe 客户端 + 计划定义
│   ├── email.ts        # Resend 客户端
│   ├── rbac.ts         # 角色权限控制
│   └── api-key.ts      # API Key 管理
├── emails/             # React Email 邮件模板
├── hooks/              # 自定义 hooks
├── i18n/               # 国际化配置
├── middleware.ts        # 中间件
└── env.ts              # 环境变量验证
```

## 数据库表
users, sessions, accounts, verifications, teams, team_members,
team_invitations, subscriptions, invoices, api_keys,
webhook_endpoints, webhook_deliveries, notifications, audit_logs

## 常用命令
- `pnpm dev` — 开发服务器
- `pnpm build` — 构建
- `pnpm test` — 单元测试
- `pnpm test:e2e` — E2E 测试
- `pnpm db:push` — 推送 schema
- `pnpm db:studio` — Drizzle Studio

## 开发进度 (截至 2026-06-28)
- [x] 项目脚手架 (Next.js 16)
- [x] 核心功能 (认证、计费、团队、仪表盘、API、i18n)
- [x] 构建修复 (Stripe/DB 延迟初始化、Suspense、auth secret)
- [x] 补充功能 (API 文档、变更日志、法律页面、通知/Webhook API、SEO)
- [x] 测试覆盖 (374 个单元测试)
- [x] Storybook 组件文档 (16 个 stories 文件)
- [x] E2E 测试扩展 (5 个 spec 文件: auth, landing, marketing, navigation, accessibility)
- [x] Storybook 组件文档 (16 个 stories 文件)
- [x] E2E 测试扩展 (5 个 spec 文件: auth, landing, marketing, navigation, accessibility)

## 注意事项
- 使用 pnpm 作为包管理器
- 环境变量通过 `@t3-oss/env-nextjs` 验证
- RBAC 三级角色: Owner / Admin / Member
