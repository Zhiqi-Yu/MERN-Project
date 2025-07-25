// 基础定义
// REST - Representational State Transfer protocol
// REST —— 表现层状态转移协议（是一种架构风格）

// REST is an architectural style for designing networked applications.
// REST 是用于设计网络应用程序的一种架构风格。
// It relies on a stateless, client-server, cacheable communications protocol -- typically HTTP.
// 它基于无状态、客户端-服务器模型的、可缓存的通信协议 —— 通常是 HTTP。

// 构成与用途
// These are the API's or Services to do data transactions over HTTP
// REST 通常用于通过 HTTP 进行数据交互的 API 或服务。
// These are also called as Endpoints, Microservices, or Web Services
// 它们也被称为端点（Endpoints）、微服务（Microservices）或 Web 服务。
// This becomes a service orientated architecture (SOA) where each service is responsible for a specific functionality.
// 它是一种面向服务的架构（SOA），每个服务都负责一个具体的功能。
// Data format is typically JSON or XML, but JSON is more common in modern applications.
// 数据格式通常是 JSON 或 XML，但现代应用中更常用的是 JSON。

// 协议与语言
// HTTP/s => Hypertext Transfer Protocol (Secure)
// HTTP/s —— 超文本传输协议（安全）
// HTTP methods are used to perform CRUD operations on resources.
// HTTP 方法用于对资源执行 CRUD 操作。
// HTML - Hypertext Markup Language
// HTML —— 超文本标记语言（前端页面语言）

// RESTful API 规范
// Specifications of RESTful APIs:
// RESTful API 的规范：
// 1. Use HTTP methods explicitly. - GET, POST, PUT, DELETE, PATCH
// 1. 明确使用 HTTP 方法：GET、POST、PUT、DELETE、PATCH
//    - GET: Retrieve data from the server.
//    - GET：从服务器获取数据。

//    - POST: Create a new resource on the server.
//    - POST：在服务器创建新的资源。

//    - PUT: Update an existing resource on the server.
//    - PUT：更新服务器上的现有资源。

//    - PATCH: Partially update an existing resource on the server.
//    - PATCH：部分更新服务器上的资源。

//    - DELETE: Remove a resource from the server.
//    - DELETE：从服务器删除资源。
// 2. Use URIs to identify resources.
// 2. 使用 URI 来唯一标识资源。
// 3. Use standard HTTP status codes to indicate the outcome of operations.
// 3. 使用标准 HTTP 状态码来表示操作结果（如 200、404、500）。
// 4. Use JSON or XML for data exchange.
// 4. 使用 JSON 或 XML 格式进行数据交换。
// 5. Stateless communication - each request from client to server must contain all the information needed to understand and process the request.
// 5. 无状态通信 —— 客户端每次请求必须包含处理该请求所需的**所有信息**。
