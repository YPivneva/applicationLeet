# LeetCode Task Manager API

## Описание

LeetCode Task Manager API — это RESTful API, разработанный для управления задачами и пользователями. API позволяет создавать, просматривать, обновлять и удалять информацию о задачах и пользователях. Это приложение может быть полезно для разработчиков, которые могут решать задачи, отправлять свои решения и проверять их на корректность. Кроме того, на платформе есть обсуждения, где пользователи могут обсудить различные подходы к решению задач, а также учебные материалы и мок-интервью.

## Стек технологий

- Node.js
- Express
- MongoDB
- Body-Parser

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/YPivneva/applicationLeet.git
   cd applicationLeet

    Установите зависимости:

    npm install

    Настройте MongoDB:
        Убедитесь, что MongoDB запущен на вашем локальном компьютере. Вы можете установить MongoDB, следуя официальной документации.
    Запустите сервер:

    node index.js

    Сервер будет запущен на http://localhost:3000.
   ```

API Эндпоинты
Пользователи
Создать пользователя

    POST /api/users
    Тело запроса:

    {
        "name": "John Doe",
        "email": "john@example.com"
    }

Получить всех пользователей

    GET /api/users

Обновить пользователя

    PATCH /api/users/:id
    Тело запроса:

    {
        "name": "Jane Doe"
    }

Удалить пользователя

    DELETE /api/users/:id

Задачи
Создать задачу

    POST /api/tasks
    Тело запроса:

    {
        "title": "Task 1",
        "description": "Description for Task 1",
        "userId": "user_id_here"
    }

Получить все задачи

    GET /api/tasks

Обновить задачу

    PATCH /api/tasks/:id
    Тело запроса:

    {
        "completed": true
    }

Удалить задачу

    DELETE /api/tasks/:id

Модели данных
Модель пользователя (User )

    name: строка, обязательное поле
    email: строка, обязательное поле, уникальное

Модель задачи (Task)

    title: строка, обязательное поле
    description: строка, необязательное поле
    completed: булевое значение, по умолчанию false
    userId: идентификатор пользователя, обязательное поле, ссылается на модель User

Примеры запросов

Вот несколько примеров запросов, которые вы можете использовать с помощью инструмента, такого как Postman или cURL.
Пример создания пользователя

curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'

Пример получения всех пользователей

curl -X GET http://localhost:3000/api/users

Пример создания задачи

curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title": "Task 1", "description": "Description for Task 1", "userId": "user_id_here"}'
