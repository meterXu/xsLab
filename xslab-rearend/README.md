# xslab-rearend
> 可视化图表编辑器后端

说明：生产环境请使用mysql数据库，不要使用sqlite

## 版本要求
node >= 14

## 开发模式
```bash
npm run dev
```

## 部署模式
```bash
npm run build
node dist/index.js
```

## 配置文件
```bash
src/config.js
dist/config.js
```

## swagger地址
```bash
http://localhost:11525/api/swagger-html
```



## oracle数据库支持
需要拷贝oracle客户端文件至`oracledb\oracledb\build\Release`
