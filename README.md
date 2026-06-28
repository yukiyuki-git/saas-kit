# 🚀 SaaS Kit

**Production-Ready Full-Stack SaaS Template**

A complete, production-ready SaaS template built with modern technologies. Ship your SaaS product in days, not months.

**[🇨🇳 中文文档](./README.zh-CN.md)** | **[📖 English](./README.md)**

---

## ✨ Features / 功能特性

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Email/password, OAuth (Google, GitHub), magic links, 2FA, session management |
| 💳 **Billing** | Stripe subscriptions, checkout, webhooks, customer portal |
| 👥 **Team Management** | Create teams, invite members, RBAC (Owner/Admin/Member) |
| 🔑 **API Keys** | Programmatic API access with key management |
| 📊 **Dashboard** | Stats, charts, data tables, activity feeds |
| 🌍 **Internationalization** | English + Chinese, easy to add more |
| 🔔 **Notifications** | In-app + email notifications with preferences |
| 📧 **Email Templates** | React Email templates for all transactional emails |
| 🛡️ **Security** | CSRF, CSP headers, rate limiting, input validation |
| 🧪 **Testing** | Vitest unit tests + Playwright E2E tests |
| 🐳 **Docker** | Multi-stage Dockerfile + docker-compose |
| 🔄 **CI/CD** | GitHub Actions for lint, type check, test, build |

---

## 🛠️ Tech Stack / 技术栈

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Auth:** [Better Auth](https://www.better-auth.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) + [Drizzle ORM](https://orm.drizzle.team/)
- **Payments:** [Stripe](https://stripe.com/)
- **Email:** [Resend](https://resend.com/) + [React Email](https://react.email/)
- **Testing:** [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Deployment:** [Docker](https://www.docker.com/) + [Vercel](https://vercel.com/)

---

## 🚀 Quick Start / 快速开始

### 1. Clone & Install / 克隆并安装

```bash
git clone https://github.com/your-username/saas-kit.git
cd saas-kit
pnpm install
```

### 2. Environment Setup / 环境配置

```bash
cp .env.example .env
```

Edit `.env` with your values:
- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Random 32+ character string
- `STRIPE_SECRET_KEY` — Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook secret
- `RESEND_API_KEY` — Resend API key
- `NEXT_PUBLIC_APP_URL` — Your app URL (http://localhost:3000)

### 3. Database / 数据库

```bash
# Push schema to database
pnpm db:push

# Open Drizzle Studio (optional)
pnpm db:studio
```

### 4. Run / 运行

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure / 项目结构

```
src/
├── app/
│   ├── (auth)/              # Auth pages (login, register, etc.)
│   ├── (dashboard)/         # Dashboard pages (settings, team, billing)
│   ├── (marketing)/         # Marketing pages (pricing, blog, docs)
│   ├── api/
│   │   ├── auth/[...all]/   # Better Auth handler
│   │   ├── webhooks/stripe/ # Stripe webhook handler
│   │   ├── v1/              # Public API endpoints
│   │   ├── checkout/        # Stripe checkout
│   │   └── portal/          # Stripe customer portal
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── not-found.tsx        # 404 page
│   └── error.tsx            # Error page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard/           # Dashboard components
│   └── shared/              # Shared components (Navbar, Footer)
├── lib/
│   ├── auth.ts              # Better Auth configuration
│   ├── db/
│   │   ├── schema.ts        # Drizzle database schema
│   │   └── index.ts         # Database client
│   ├── stripe.ts            # Stripe client + plan definitions
│   ├── email.ts             # Resend email client
│   ├── rbac.ts              # Role-based access control
│   ├── api-key.ts           # API key management
│   └── utils.ts             # Utility functions
├── emails/                  # React Email templates
├── hooks/                   # Custom React hooks
└── env.ts                   # Environment validation
```

---

## 🗄️ Database Schema / 数据库架构

| Table | Description |
|-------|-------------|
| `users` | User accounts |
| `sessions` | Auth sessions |
| `accounts` | OAuth accounts |
| `verifications` | Email verification tokens |
| `teams` | Organizations/teams |
| `team_members` | Team membership with roles |
| `team_invitations` | Pending invitations |
| `subscriptions` | Stripe subscriptions |
| `invoices` | Billing invoices |
| `api_keys` | API key management |
| `webhook_endpoints` | Webhook configurations |
| `webhook_deliveries` | Webhook delivery logs |
| `notifications` | In-app notifications |
| `audit_logs` | Activity audit trail |

---

## 🧪 Testing / 测试

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test with UI
pnpm test:e2e:ui
```

---

## 🐳 Docker / Docker 部署

```bash
# Build and run
docker-compose up -d

# Or just the app (external DB)
docker build -t saas-kit .
docker run -p 3000:3000 saas-kit
```

---

## 📦 Scripts / 脚本命令

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm db:push` | Push schema to database |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm db:migrate` | Run migrations |
| `pnpm email:dev` | Preview email templates |

---

## 🌐 Deployment / 部署

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/saas-kit)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Self-Hosted

1. Build the Docker image
2. Set up PostgreSQL and Redis
3. Configure environment variables
4. Run with docker-compose or Kubernetes

---

## 🤝 Contributing / 贡献

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

欢迎贡献！请先阅读我们的[贡献指南](CONTRIBUTING.md)。

```bash
# Fork & clone
git clone https://github.com/your-username/saas-kit.git

# Create branch
git checkout -b feature/amazing-feature

# Commit
git commit -m "feat: add amazing feature"

# Push & PR
git push origin feature/amazing-feature
```

---

## 📄 License / 许可证

[MIT](LICENSE) © SaaS Kit

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

如果觉得有用，请给个 Star！⭐
