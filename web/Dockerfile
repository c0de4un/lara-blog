FROM node:20-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
#COPY . .

# Экспозиция порта (5173 для Vite)
EXPOSE 5173

# Команда запуска приложения в режиме разработки
CMD ["npm", "run", "dev"]