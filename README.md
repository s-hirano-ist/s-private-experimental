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

## その他

### 容量圧迫時

```bash
docker builder prune
```

├─ MIT: 80
├─ Apache-2.0: 6
├─ ISC: 5
├─ BSD-2-Clause: 3
├─ MIT OR Apache-2.0: 1
├─ Unlicense: 1
├─ BSD-3-Clause: 1
└─ Custom: https://github.com/s-hirano-ist/s-private.git: 1
