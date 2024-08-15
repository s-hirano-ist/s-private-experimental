# s-private

## 初期設定

```bash
git clone --recursive https://github.com/s-hirano-ist/s-private.git
cd s-private
```

## 起動方法

### 開発環境

```bash
docker compose --profile dev up --build -d
pnpm dev
```

### 本番環境

```bash
docker compose --profile prod up --build -d
```
