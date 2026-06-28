# 📖 开发文档 — SaaS Kit 技术架构与实现

> 本文档用于项目介绍、技术面试准备。

---

## 1. 项目概述

SaaS Kit 是一个生产级全栈 SaaS 模板，解决的核心问题是：

**"从零搭建一个 SaaS 产品需要 2-3 个月，这个模板让你 0 天开始写业务代码。"**

不是玩具项目——是真正可以部署上线、接收付款、管理团队的完整系统。

---

## 2. 架构决策与选型理由

### 2.1 为什么选 Next.js（App Router）？

| 考虑因素 | Next.js App Router | 替代方案 |
|----------|-------------------|---------|
| SEO | 原生 SSR/SSG，营销页面必须 | Vite + React 需要额外配置 |
| API | 同一项目内写 API Route | 需要单独后端服务 |
| 部署 | Vercel 一键部署 | 需要自己运维 |
| 生态 | React 生态最大 | Vue/Nuxt 也行但团队更熟 React |

**面试回答点**：选择 App Router 而非 Pages Router，因为 Server Components 能减少客户端 JS 体积，Streaming 能提升首屏体验。

### 2.2 为什么选 Better Auth 而不是 NextAuth？

- Better Auth 原生支持团队/组织、API Key、2FA
- NextAuth（Auth.js）需要大量手动扩展才能实现这些
- Better Auth 的 Session 管理更灵活，支持数据库 Session

### 2.3 为什么选 Drizzle ORM 而不是 Prisma？

| 对比 | Drizzle | Prisma |
|------|---------|--------|
| 类型安全 | 直接写 SQL-like，TypeScript 原生推断 | 需要 codegen |
| 性能 | 更轻量，查询更接近原生 SQL | 有额外开销 |
| Bundle 大小 | 更小 | 较大 |
| 学习曲线 | 需要懂 SQL | Schema 文件直观 |

**面试回答点**：Drizzle 的 API 设计是"SQL 的 TypeScript 映射"，不会产生意外查询，对性能敏感的 SaaS 场景更合适。

### 2.4 为什么选 Stripe 而不是其他支付？

- 行业标准，文档最好
- Webhook 机制成熟，能处理各种支付事件
- Customer Portal 让用户自助管理订阅，减少客服压力

---

## 3. 核心模块详解

### 3.1 认证系统

```
用户流程:
注册 → 邮箱验证 → 登录 → 获取 Session → 访问受保护页面

支持方式:
├── 邮箱/密码（最基础）
├── OAuth（Google、GitHub 一键登录）
├── Magic Link（无密码，邮箱点击登录）
└── 2FA（双因素认证，安全增强）
```

**技术实现**：
- Better Auth 处理所有认证逻辑
- Session 存储在数据库（非 JWT），服务端可随时吊销
- OAuth 回调通过 `/api/auth/[...all]` 统一处理

**面试常见问题**：
> Q: 为什么不用 JWT？
> A: 数据库 Session 更安全——可以随时吊销单个会话，JWT 一旦签发无法作废，除非引入黑名单机制。

### 3.2 RBAC 权限系统

```
三级角色:
Owner（所有者）
  ├── 删除团队
  ├── 管理计费
  └── 所有 Admin 权限

Admin（管理员）
  ├── 邀请/移除成员
  ├── 编辑团队设置
  └── 所有 Member 权限

Member（成员）
  ├── 查看内容
  └── 基本操作
```

**实现方式**：
- `team_members` 表存储 `(user_id, team_id, role)`
- 中间件在每次请求时检查角色权限
- 前端根据角色渲染不同 UI（按钮、菜单项）

### 3.3 订阅计费系统

```
用户流程:
选择计划 → Stripe Checkout → 支付成功 → Webhook 通知 → 更新数据库

订阅生命周期:
创建 → 活跃 → 续期/升级/降级 → 取消 → 到期
```

**Stripe Webhook 处理的事件**：
```
checkout.session.completed   → 创建订阅记录
customer.subscription.updated → 更新订阅状态
customer.subscription.deleted → 标记取消
invoice.paid                 → 记录付款
invoice.payment_failed       → 通知用户更新支付方式
```

**面试常见问题**：
> Q: 为什么用 Webhook 而不是前端回调？
> A: 前端回调不可靠——用户可能关掉页面、网络中断。Webhook 是 Stripe 服务端直接通知，保证送达。前端回调只用于立即展示成功页面。

### 3.4 国际化（i18n）

```
messages/
├── en.json    ← 英文
└── zh.json    ← 中文

使用方式:
// 服务组件
import { useTranslations } from 'next-intl';
const t = useTranslations('pricing');
return <h1>{t('title')}</h1>;

// 路由: /en/pricing, /zh/pricing
```

**实现要点**：
- 中间件根据 `Accept-Language` 头自动选择语言
- URL 前缀 `/en`、`/zh` 区分语言版本
- 翻译文件集中管理，添加新语言只需加一个 JSON 文件

### 3.5 API 设计

```
/api/auth/[...all]        ← Better Auth 处理器
/api/webhooks/stripe      ← Stripe Webhook（不走前端）
/api/v1/users/me          ← 当前用户信息
/api/v1/teams             ← 团队 CRUD
/api/v1/teams/[id]/members ← 团队成员管理
/api/v1/notifications     ← 通知列表
/api/v1/webhooks          ← 用户自定义 Webhook
/api/health               ← 健康检查
```

**设计原则**：
- `/api/v1/` 前缀预留版本升级空间
- Webhook 端点需要签名验证（Stripe 签名、HMAC）
- 受保护路由通过 Session 中间件拦截

---

## 4. 安全措施

| 措施 | 实现方式 |
|------|---------|
| CSRF | Next.js Server Actions 自带 CSRF Token |
| CSP | `next.config.ts` 配置 Content-Security-Policy 头 |
| 速率限制 | 基于 IP 的滑动窗口限流（登录、注册、API） |
| 输入验证 | Zod Schema 验证所有用户输入 |
| 密码哈希 | Better Auth 自动处理（bcrypt/argon2） |
| SQL 注入 | Drizzle ORM 参数化查询，不拼接 SQL |
| XSS | React 默认转义 + CSP 限制脚本来源 |
| 环境变量 | `@t3-oss/env-nextjs` 编译时验证，泄露会报错 |

---

## 5. 数据库设计

### 核心表关系

```
users (1) ──→ (N) sessions        ← 一个用户多个会话
users (1) ──→ (N) accounts        ← 一个用户多个 OAuth 账户
users (1) ──→ (N) team_members    ← 一个用户可加入多个团队
teams  (1) ──→ (N) team_members   ← 一个团队多个成员
teams  (1) ──→ (N) subscriptions  ← 一个团队多个订阅（历史记录）
teams  (1) ──→ (N) api_keys       ← 一个团队多个 API 密钥
teams  (1) ──→ (N) audit_logs     ← 一个团队多条审计记录
```

### 为什么这样设计？

- **users 和 teams 分离**：支持"一人多团队"（比如个人 + 公司）
- **subscriptions 保留历史**：不只存当前订阅，方便查账和分析
- **audit_logs**：企业客户必须有操作审计，合规要求

---

## 6. 测试策略

```
测试金字塔:

        /  E2E (5 specs)  \        ← 少量，验证关键用户流程
       / 单元测试 (374 个) \       ← 大量，覆盖所有 lib 和组件
      /   TypeScript 类型   \      ← 编译时检查
```

| 测试类型 | 工具 | 覆盖范围 |
|----------|------|---------|
| 单元测试 | Vitest + Testing Library | 工具函数、RBAC、API Key、数据库 Schema |
| 组件测试 | Vitest + jsdom | React 组件渲染、交互 |
| E2E 测试 | Playwright | 页面渲染、导航、表单、响应式、SEO |
| 类型检查 | TypeScript | 编译时发现类型错误 |
| Lint | ESLint | 代码规范 |

---

## 7. 部署方案

### Vercel（推荐，零运维）

```
GitHub Push → Vercel 自动构建 → 自动部署
         ↓
  环境变量在 Vercel Dashboard 配置
  数据库用 Neon / Supabase（Serverless PostgreSQL）
  文件存储用 Vercel Blob / S3
```

### Docker 自部署

```yaml
# docker-compose.yml 包含:
services:
  app:       # Next.js 应用
  postgres:  # PostgreSQL 数据库
```

---

## 8. 性能优化

| 优化点 | 做法 |
|--------|------|
| 首屏加载 | Server Components 减少客户端 JS |
| 图片 | Next.js Image 组件自动优化（WebP、懒加载） |
| 字体 | `next/font` 自托管，避免 FOUT |
| 缓存 | 静态页面 ISR，API 路由 Cache-Control |
| 数据库 | 连接池复用，避免 N+1 查询 |
| Bundle | Tree-shaking + 动态 import |

---

## 9. 面试介绍话术

### 30 秒版本

> 我做了一个生产级 SaaS 模板，用 Next.js 16 + TypeScript。核心功能包括 Better Auth 认证（支持 OAuth、2FA）、Stripe 订阅计费、RBAC 三级权限、国际化。有 374 个单元测试和完整的 Storybook 文档。

### 2 分钟版本

> 这个项目解决的问题是：从零搭建一个 SaaS 产品需要 2-3 个月处理认证、支付、权限这些基础设施，这个模板把这些全部做好了。
>
> 技术选型上，我选了 Next.js App Router 利用 Server Components 优化首屏性能；认证用 Better Auth 而不是 NextAuth，因为它原生支持团队和 API Key；ORM 用 Drizzle 而不是 Prisma，因为它的查询更接近原生 SQL，性能更好。
>
> 数据库设计上，users 和 teams 是多对多关系，支持一人加入多个团队。订阅表保留完整历史，方便财务分析。所有敏感操作都有审计日志。
>
> 安全方面，有 CSRF、CSP、速率限制、Zod 输入验证，环境变量在编译时就验证完整性。
>
> 测试覆盖 374 个单元测试，5 个 E2E 测试文件，Storybook 组件文档完整。构建和测试全部通过。

---

## 10. 可扩展方向

如果要把它变成真正的产品，最简单的扩展路径：

1. **在现有仪表盘页面添加业务功能**（数据表格、图表已有基础）
2. **利用已有的 API Key 系统**提供 API 服务
3. **利用 Stripe 订阅**设置定价模型
4. **利用 RBAC**控制功能访问权限
5. **利用 i18n**拓展海外市场
