# trpc-sample
TRPC学習のため、Todoアプリを作成。

サーバー側で型定義。クライアント側で型を参照。

|サーバー|クライアント|
|---|---|
|Express|React|

CSSはstyled-componentを使用。

バリデーションにはzodを使用。

urlはこちら
https : //github.com/massu-159/trpc-sapmle


## 目次
1. 環境構築
2. アプリケーションの仕様

## 1. 環境構築

### 1-1. ライブラリ インストール
clientとserver両方で実施。

```
npm install

または

yarn
```

### 1-2. アプリケーション実行

```
npm run dev

または

yarn dev
```

## 2. アプリケーションの仕様

### 2-1. 仕様
- Todo
  - Todo一覧表示
  - Todo追加
  - Todo削除

### 2-2. 構成技術
- client
  - @tanstack/react-query :  ^4.35.3,
  - @trpc/client :  ^10.38.4,
  - @trpc/react-query :  ^10.38.4,
  - @trpc/server :  ^10.38.4,
  - react :  ^18.2.0,
  - eslint :  ^8.45.0,
  - typescript :  ^5.0.2,
  - vite :  ^4.4.5
- server
  - @trpc/server :  ^10.38.4,
  - cors :  ^2.8.5,
  - express :  ^4.18.2,
  - zod :  ^3.22.2
  - nodemon :  ^3.0.1,
  - ts-node :  ^10.9.1,
  - typescript :  ^5.2.2
