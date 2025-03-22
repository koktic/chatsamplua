const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (ws) => {
    clients.add(ws);
    console.log('Новый пользователь подключился');

    ws.on('message', (message) => {
        console.log('Получено сообщение:', message.toString());

        for (let client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());  // Отправляем сообщение всем
            }
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Пользователь отключился');
    });
});

console.log('WebSocket сервер запущен на ws://localhost:8080');
