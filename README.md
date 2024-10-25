# s-private

![License](https://img.shields.io/badge/license-MIT-blue)
![Build status](https://img.shields.io/github/actions/workflow/status/s-hirano-ist/s-private/build.yaml?branch=main)
![GitHub stars](https://img.shields.io/github/stars/s-hirano-ist/s-private.svg)

> [!IMPORTANT]
> This is a sample app made by s-hirano.

**Main Framework** - [Next.js](https://nextjs.org/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Package Manager** - [pnpm](https://pnpm.io/)  
**Styling** - [Shadcn/ui](https://ui.shadcn.com/)  
**Database** - [PostgreSQL](https://www.postgresql.org/)  
**ORM** - [Prisma](https://www.prisma.io/)  
**Vulnerabilities Check** - [npm-audit](https://docs.npmjs.com/cli/v10/commands/npm-audit)  [Dependabot alert](https://docs.github.com/ja/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)  

## 初期設定

```bash
git clone --recursive https://github.com/s-hirano-ist/s-private.git
cd s-private
```

## DockerImageのビルドとプッシュ

```bash
docker login
bash ./docker/docker-push.sh
```

## 起動方法

### 開発環境

```bash
docker compose --profile dev up --build -d
pnpm dev
```

### 本番環境

```bash
vim .env # TAG="X.X.X" の箇所を変更する
docker compose --profile prod up --build -d
```

### Storybook

```bash
docker compose --profile storybook up --build -d
```

## 🪝 Tags & Realease

1. Run one of the following commands

```bash
pnpm release:major
pnpm release:minor
pnpm release:patch
```

## 📜 License

Licensed under the MIT License, Copyright © 2024

### Licenses of used libraries

See [library-license.txt](https://github.com/s-hirano-ist/s-private/blob/main/library-license.txt) for summary of used licenses.

## 🔒 Security

[s-hirano.com/summary/coding-security](https://s-hirano.com/summary/coding-security)を参照。
