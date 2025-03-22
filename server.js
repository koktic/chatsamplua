const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', (message) => {
        // Рассылка сообщения всем клиентам
        for (let client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

console.log('WebSocket сервер запущен на ws://localhost:8080');
