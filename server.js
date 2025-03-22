const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (ws) => {
    clients.add(ws);
    console.log('����� ������������ �����������');

    ws.on('message', (message) => {
        console.log('�������� ���������:', message.toString());

        for (let client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());  // ���������� ��������� ����
            }
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('������������ ����������');
    });
});

console.log('WebSocket ������ ������� �� ws://localhost:8080');
