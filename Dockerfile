FROM node:20.18-alpine

# Устанавливаем рабочую директорию
WORKDIR /src/app

# Копируем package.json и package-lock.json (или yarn.lock) в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы приложения в рабочую директорию
COPY . .

# Сборка TypeScript (если необходимо)
RUN npm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "dist/index.js"]
# Запуск проекта
#CMD ["npm", "start"]