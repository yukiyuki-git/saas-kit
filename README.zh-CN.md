# 🚀 SaaS Kit

**生产级全栈 SaaS 模板**

一个完整的、开箱即用的 SaaS 模板，使用现代技术栈构建。数天内即可发布你的 SaaS 产品。

**[🇨🇳 中文文档](./README.zh-CN.md)** | **[📖 English](./README.md)** | **[🔧 开发文档](./DEVELOPMENT.md)**

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🔐 **认证系统** | 邮箱/密码、OAuth（Google、GitHub）、Magic Link、双因素认证、会话管理 |
| 💳 **订阅计费** | Stripe 订阅、结账页面、Webhook、客户门户 |
| 👥 **团队管理** | 创建团队、邀请成员、三级角色权限（Owner/Admin/Member） |
| 🔑 **API 密钥** | 程序化 API 访问、密钥管理 |
| 📊 **仪表盘** | 数据统计、图表、数据表格、活动流 |
| 🌍 **国际化** | 中文 + 英文，易于扩展更多语言 |
| 🔔 **通知系统** | 应用内通知 + 邮件通知，支持偏好设置 |
| 📧 **邮件模板** | 基于 React Email 的完整事务性邮件模板 |
| 🛡️ **安全防护** | CSRF、CSP 安全头、速率限制、输入验证 |
| 🧪 **测试覆盖** | Vitest 单元测试 + Playwright E2E 测试（374 个测试） |
| 📖 **组件文档** | Storybook 组件文档（16 个 Stories） |
| 🐳 **容器化部署** | 多阶段 Dockerfile + docker-compose |
| 🔄 **CI/CD** | GitHub Actions 自动化流水线 |

---

## 🛠️ 技术栈

- **框架：** [Next.js 16](https://nextjs.org/)（App Router + Turbopack）
- **语言：** [TypeScript](https://www.typescriptlang.org/)
- **样式：** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **认证：** [Better Auth](https://www.better-auth.com/)
- **数据库：** [PostgreSQL](https://www.postgresql.org/) + [Drizzle ORM](https://orm.drizzle.team/)
- **支付：** [Stripe](https://stripe.com/)
- **邮件：** [Resend](https://resend.com/) + [React Email](https://react.email/)
- **测试：** [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) + [Storybook](https://storybook.js.org/)
- **部署：** [Docker](https://www.docker.com/) + [Vercel](https://vercel.com/)

---

## 🚀 快速开始

### 1. 克隆并安装

```bash
git clone https://github.com/yukiyuki-git/saas-kit.git
cd saas-kit
pnpm install
```

### 2. 环境配置

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的配置：

| 变量名 | 说明 |
|--------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 |
| `BETTER_AUTH_SECRET` | 随机 32+ 字符密钥 |
| `STRIPE_SECRET_KEY` | Stripe 密钥 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公钥 |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 密钥 |
| `RESEND_API_KEY` | Resend API 密钥 |
| `NEXT_PUBLIC_APP_URL` | 应用 URL（如 `http://localhost:3000`） |

### 3. 数据库

```bash
# 推送 Schema 到数据库
pnpm db:push

# 打开 Drizzle Studio（可选）
pnpm db:studio
```

### 4. 运行

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 项目结构

```
src/
├── app/
│   ├── (auth)/              # 认证页面（登录、注册等）
│   ├── (dashboard)/         # 仪表盘（设置、团队、账单）
│   ├── (marketing)/         # 营销页面（定价、博客、文档）
│   ├── api/
│   │   ├── auth/[...all]/   # Better Auth 处理器
│   │   ├── webhooks/stripe/ # Stripe Webhook 处理器
│   │   ├── v1/              # 公开 API 端点
│   │   ├── checkout/        # Stripe 结账
│   │   └── portal/          # Stripe 客户门户
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   ├── not-found.tsx        # 404 页面
│   └── error.tsx            # 错误页面
├── components/
│   ├── ui/                  # shadcn/ui 组件 + Storybook Stories
│   ├── dashboard/           # 仪表盘组件
│   └── shared/              # 共享组件（导航栏、页脚等）
├── lib/
│   ├── auth.ts              # Better Auth 配置
│   ├── db/
│   │   ├── schema.ts        # Drizzle 数据库 Schema
│   │   └── index.ts         # 数据库客户端
│   ├── stripe.ts            # Stripe 客户端 + 计划定义
│   ├── email.ts             # Resend 邮件客户端
│   ├── rbac.ts              # 角色权限控制
│   ├── api-key.ts           # API 密钥管理
│   └── utils.ts             # 工具函数
├── emails/                  # React Email 邮件模板
├── hooks/                   # 自定义 React Hooks
├── i18n/                    # 国际化配置
├── middleware.ts             # 中间件
└── env.ts                   # 环境变量验证
```

---

## 🗄️ 数据库架构

| 表名 | 说明 |
|------|------|
| `users` | 用户账户 |
| `sessions` | 认证会话 |
| `accounts` | OAuth 账户 |
| `verifications` | 邮箱验证令牌 |
| `teams` | 组织/团队 |
| `team_members` | 团队成员（含角色） |
| `team_invitations` | 待接受邀请 |
| `subscriptions` | Stripe 订阅 |
| `invoices` | 账单发票 |
| `api_keys` | API 密钥 |
| `webhook_endpoints` | Webhook 配置 |
| `webhook_deliveries` | Webhook 投递记录 |
| `notifications` | 应用内通知 |
| `audit_logs` | 审计日志 |

---

## 🧪 测试

```bash
# 单元测试（374 个）
pnpm test

# E2E 测试（5 个 spec 文件）
pnpm test:e2e

# E2E 测试 UI 模式
pnpm test:e2e:ui

# Storybook
pnpm storybook
```

---

## 🐳 Docker 部署

```bash
# 一键启动（应用 + 数据库）
docker-compose up -d

# 或仅构建应用（使用外部数据库）
docker build -t saas-kit .
docker run -p 3000:3000 saas-kit
```

---

## 📦 脚本命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm start` | 启动生产服务器 |
| `pnpm lint` | 运行 ESLint |
| `pnpm tsc` | TypeScript 类型检查 |
| `pnpm test` | 运行单元测试 |
| `pnpm test:e2e` | 运行 E2E 测试 |
| `pnpm db:push` | 推送 Schema |
| `pnpm db:studio` | 打开 Drizzle Studio |
| `pnpm db:migrate` | 运行数据库迁移 |
| `pnpm db:generate` | 生成迁移文件 |
| `pnpm email:dev` | 预览邮件模板 |

---

## 🌐 部署

### Vercel（推荐）

1. Push 到 GitHub
2. 在 Vercel 中导入项目
3. 添加环境变量
4. 部署！

### 自部署

1. 构建 Docker 镜像
2. 准备 PostgreSQL 数据库
3. 配置环境变量
4. 使用 docker-compose 或 Kubernetes 运行

---

## 🔐 RBAC 角色权限

| 角色 | 权限 |
|------|------|
| **Owner** | 完全控制，管理团队成员和计费 |
| **Admin** | 管理成员、编辑设置，不能删除团队 |
| **Member** | 基本访问权限，查看和编辑内容 |

---

## 🤝 参与贡献

欢迎贡献！请先阅读 [贡献指南](CONTRIBUTING.md)。

```bash
# Fork 并克隆
git clone https://github.com/your-username/saas-kit.git

# 创建分支
git checkout -b feature/amazing-feature

# 提交
git commit -m "feat: add amazing feature"

# 推送并创建 PR
git push origin feature/amazing-feature
```

---

## 📄 许可证

[MIT](LICENSE) © SaaS Kit
