# 🧾 Project Guide (English)

## 1. Overview

A minimal product management module (MERN-style):

* Create products via form (`name/price/desc/rating`)
* Render product list from MongoDB
* **Redux + Thunk** for front-end data flow
* **Express + Mongoose** for API & MongoDB access

## 2. Runtime & Ports

* Frontend: `webpack-dev-server` at **[http://localhost:3000](http://localhost:3000)**
* Backend: Express at **[http://127.0.0.1:9000](http://127.0.0.1:9000)**
* MongoDB: `mongodb://127.0.0.1:27017/shoppingCartDB25a`
* Dev proxy: map `/api/*` from 3000 → 9000

## 3. Start (root)

```bash
npm start
# equals running client and server concurrently
```

## 4. Key Structure

```
client/  (React)
  src/components/          ProductForm.jsx / ProductList.jsx
  src/redux/actions/       productActions.js (thunks + axios)
  src/redux/reducers/      productReducer.js (switch-case)
  src/redux/constants/     action type constants
  src/redux/store.js       configureStore + combineReducers
  webpack.config.js        devServer.proxy -> 9000

server/  (Express)
  server.js                cors/json/logger/routes/error/listen
  routes/productRoutes.js  POST/GET /api/products
  models/productModel.js   Mongoose Schema + Model
```

## 5. Frontend Data Flow (Redux + Thunk)

**Mantra: Grab → Send → Update**

* **Grab** values with `useRef` on submit
* **Send** with `dispatch(thunk)`; thunk does `axios` calls
* **Update** store via reducers on `SUCCESS/FAIL`; components re-render via `useSelector`

**Store shape (simplified)**

```js
{
  productAdd:  { loading, success, error, product },
  productList: { loading, error, items },
  cart:        { items, coupon }
}
```

**Lifecycle**

* On mount: `ProductList` → `dispatch(listProducts())`
  `REQUEST` → `axios.get('/api/products')` → `SUCCESS(items)` → render
* On submit: `ProductForm` → `dispatch(addProduct(payload))`
  `REQUEST` → `axios.post('/api/products')` → `SUCCESS(doc)`
  then `dispatch(listProducts())` to refresh

> Note: `ProductList` does **not** poll; we re-fetch after a successful create.

## 6. Backend (Express + Mongoose)

* `server.js` sets up `cors`, `express.json()`, a request logger, mounts `/api/products`, error middleware, and `listen(9000)`.
* `productRoutes.js`

  * `POST /api/products` → validate → `Product.create(...)` → **201**
  * `GET  /api/products` → `Product.find().sort({createdAt:-1})` → **200**
* `productModel.js` defines schema constraints and `timestamps:true`; `mongoose.model` compiles a Model with built-in `create/find/...`.

## 7. API Contract

* **POST** `/api/products`
  **Body**: `{ name, price, desc, rating }` → **201 Created** (new document)
  **400** on validation errors
* **GET** `/api/products` → **200 OK** (array)

## 8. Proxy & Integration

* `client/webpack.config.js`:

  ```js
  devServer: {
    port: 3000,
    proxy: [{ context: ['/api'], target: 'http://127.0.0.1:9000', changeOrigin:true }]
  }
  ```
* Or use direct baseURL with CORS enabled on server.

## 9. Quick Verification (curl)

```bash
curl -i http://127.0.0.1:9000/
curl -i -X POST http://127.0.0.1:9000/api/products -H "Content-Type: application/json" \
  -d '{"name":"Demo","price":9.9,"desc":"ok","rating":4}'
curl -i http://127.0.0.1:9000/api/products
```

## 10. Troubleshooting

* **403**: stayed on 3000; proxy not applied or rejected.
* **504**: backend not listening on the target port.
* **500**: server error; check Express logs/error middleware.
* **400**: validation failed.
* **Empty `req.body`**: missing `express.json()`.
* **List not refreshing**: call `dispatch(listProducts())` after a successful create.

---


# 🧾 项目说明（中文）

## 1. 项目简介

这是一个最小可用的购物车/商品管理模块（MERN 思路）。功能：

* 表单创建商品（name/price/desc/rating）
* 列表展示商品（从数据库读取）
* 使用 **Redux + Thunk** 管理前端数据流
* 使用 **Express + Mongoose** 提供后端 API 并对接 **MongoDB**

## 2. 运行环境与端口

* 前端：`webpack-dev-server` at **[http://localhost:3000](http://localhost:3000)**
* 后端：Express at **[http://127.0.0.1:9000](http://127.0.0.1:9000)**
* MongoDB：`mongodb://127.0.0.1:27017/shoppingCartDB25a`
* 开发时通过 **devServer.proxy** 将前端的 `/api/*` 代理到后端 `9000`

## 3. 启动命令（根目录）

```bash
npm start
# 等价于并发启动：
#  - 前端：npm --prefix client run start
#  - 后端：npm --prefix server run dev
```

## 4. 目录结构（关键位置）

```
ShoppingCart/
  client/                       # React 前端
    src/
      components/               # ProductForm.jsx / ProductList.jsx
      redux/
        actions/                # productActions.js（thunk + axios）
        reducers/               # productReducer.js（switch-case）
        constants/              # action type 常量
        store.js                # configureStore + combineReducers
    webpack.config.js           # devServer.proxy -> 9000
  server/                       # Express 后端
    server.js                   # 入口：cors/json/日志/路由/错误处理/listen
    routes/productRoutes.js     # POST/GET /api/products
    models/productModel.js      # Mongoose Schema + Model
```

## 5. 前端数据流（Redux + Thunk）

**口诀：Grab → Send → Update**

* **Grab**：`useRef` 在提交时一次性“抓”表单值（不触发重渲染）
* **Send**：`dispatch(thunk)`（在 thunk 里用 `axios` 调 API）
* **Update**：thunk 拿到响应后 `dispatch(SUCCESS)`，**reducer** 更新 **store**，组件用 `useSelector` 重渲染

**Store 形状（简化）**

```js
{
  productAdd:  { loading, success, error, product },
  productList: { loading, error, items },
  cart:        { items, coupon }
}
```

**生命周期**

* 页面加载：`ProductList` 在 `useEffect` 里 `dispatch(listProducts())`

  * `REQUEST` → `axios.get('/api/products')` → `SUCCESS(payload=数组)`
  * reducer 写入 `productList.items` → 列表渲染
* 表单提交：`ProductForm` 组装 `payload` → `dispatch(addProduct(payload))`

  * `REQUEST` → `axios.post('/api/products')` → `SUCCESS(payload=新文档)`
  * **随后再** `dispatch(listProducts())` → 列表刷新

> 注意：`ProductList` **不是持续轮询**；只有首渲染与新增成功后我们**主动**再拉一次列表。

## 6. 后端（Express + Mongoose）

* `server.js`：

  * `app.use(cors())`（直连时需要）
  * `app.use(express.json())`（解析 JSON 请求体）
  * 开发日志中间件（看见 `OPTIONS/GET/POST` 有助排错）
  * `app.use('/api/products', productRoutes)`
  * 统一错误处理中间件（四参 `(err, req, res, next)`）
  * `app.listen(9000)`
* `productRoutes.js`：

  * `POST /api/products`：校验 `name/price` → `Product.create(...)` → `201 + doc`
  * `GET  /api/products`：`Product.find({}).sort({createdAt:-1})` → `200 + 数组`
* `productModel.js`：

  * Schema 字段约束（`required/min/max/trim/default`）
  * `{ timestamps:true }` 自动维护 `createdAt/updatedAt`
  * `mongoose.model('Product', schema)` 生成 **Model**，自带 `create/find/...` API

## 7. API 契约

* **POST** `/api/products`
  **Body(JSON)**：`{ name:String, price:Number, desc:String, rating:Number }`
  **201 Created**：返回新建文档对象
  **400**：缺少必填或校验失败
* **GET** `/api/products`
  **200 OK**：返回文档数组（倒序）

## 8. 代理与联调

* 前端 `client/webpack.config.js`：

  ```js
  devServer: {
    port: 3000,
    proxy: [{ context: ['/api'], target: 'http://127.0.0.1:9000', changeOrigin:true }]
  }
  ```
* 直连模式（可选）：前端 `axios.create({ baseURL:'http://127.0.0.1:9000' })`，后端开启 `cors()`。

## 9. 快速验证（curl）

```bash
# 健康检查
curl -i http://127.0.0.1:9000/

# 新增
curl -i -X POST http://127.0.0.1:9000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo","price":9.9,"desc":"ok","rating":4}'

# 列表
curl -i http://127.0.0.1:9000/api/products
```

## 10. 常见问题排查

* **403**：请求落在 **3000**，代理未生效或被拒；看 Network 的 `Request URL` 是否 `http://localhost:3000/api/...`。
* **504**：代理指向的目标端口无服务（后端没启动/端口错）。
* **500**：后端异常（看 Express 日志/错误中间件）。
* **400**：校验失败（缺 `name/price` 等）。
* **`req.body` 是空**：忘了 `express.json()`。
* **列表不刷新**：新增成功后记得再 `dispatch(listProducts())`。