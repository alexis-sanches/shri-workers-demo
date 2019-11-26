const clients = [];
let state = 1;

onconnect = function(e) {
    const port = e.ports[0];

    clients.push(port);

    port.postMessage({
        connections: clients.length,
        value: state
    });

    port.addEventListener('message', function(e) {
        state = e.data;
        clients.forEach(client => {
            client.postMessage({
                connections: clients.length,
                value: state
            });
        });
    });

    port.start();
};
