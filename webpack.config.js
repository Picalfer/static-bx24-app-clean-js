const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './app.js', // Входной файл
    output: {
        filename: 'bundle.js', // Выходной файл
        path: path.resolve(__dirname, 'dist'), // Папка для выходных файлов
    },
    devServer: {
        port: 9000, // Порт, на котором будет запущен сервер
        setupMiddlewares: (middlewares, devServer) => {
            // Обработчик для всех POST-запросов
            devServer.app.post('*', (req, res) => {
                console.log('Получен POST-запрос:', req.body);
                res.redirect(req.originalUrl); // Перенаправляем на тот же URL
            });
            return middlewares;
        },
        static: {
            directory: path.join(__dirname, 'dist'), // Папка с контентом
        },
    },
    mode: 'development', // Режим разработки
};

module.exports = config; 