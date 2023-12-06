# 使用 Node.js 的官方镜像
FROM node:20.9.0

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN pnpm install

# 复制项目文件到工作目录
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]
