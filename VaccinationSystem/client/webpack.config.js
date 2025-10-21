// client/webpack.config.js
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    publicPath: "/",
    clean: true
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  resolve: { extensions: [".js", ".jsx"] },
  devServer: {
    port: 5173,
    historyApiFallback: true,
    // ✅ v5 推荐的数组写法
    proxy: [
      {
        context: ["/api"],              // 需要代理的路径前缀
        target: "http://localhost:9002",
        changeOrigin: true
      }
    ]
  },
  plugins: [ new HtmlWebpackPlugin({ template: "./public/index.html" }) ]
};
