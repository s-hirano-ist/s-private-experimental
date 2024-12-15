# s-private-experimental

![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)
![Build status](https://img.shields.io/github/actions/workflow/status/s-hirano-ist/s-private/build.yaml?branch=main)
![GitHub stars](https://img.shields.io/github/stars/s-hirano-ist/s-private.svg)

> [!IMPORTANT]
> This is a sample app made by s-hirano. Some codes are not best practices due to trying experimental features and new techs.
> See [s-hirano-ist/s-private](https://github.com/s-hirano-ist/s-private) for production used versions.

**Main Framework** - [Next.js](https://nextjs.org/)  
**Type Checking** - [TypeScript](https://www.typescriptlang.org/)  
**Package Manager** - [pnpm](https://pnpm.io/)  
**Styling** - [Shadcn/ui](https://ui.shadcn.com/)  
**Database** - [PostgreSQL](https://www.postgresql.org/)  
**Object Storage** [MinIO](https://min.io/)  
**ORM** - [Prisma](https://www.prisma.io/)  

## 初期設定

```bash
git clone --recursive https://github.com/s-hirano-ist/s-private-experimental.git
cd s-private-experimental
cd minio
./minio-keygen.sh
cd ..
```

## Docker Imageのビルドとプッシュ

詳細は[DockerHub](https://hub.docker.com/repository/docker/s0hirano/s-private/general)を参照願う。

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

[s-tools/s-private](https://github.com/s-hirano-ist/s-tools/tree/main/s-private)を参照。

## 🪝 Tags & Realease

Add commits to main branch using `git-cz` command will automatically create a tag and release.

## 📜 License

Licensed under the AGPL-3.0 License, Copyright © 2024
