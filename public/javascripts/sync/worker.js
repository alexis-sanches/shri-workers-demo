const clients = [];
let state = 1;

function notify() {
    clients.forEach(client => {
        client.postMessage({
            connections: clients.length,
            value: state
        });
    });
}

self.addEventListener('connect', e => {
    const port = e.ports[0];

    clients.push(port);
    notify();

    port.addEventListener('message', function(e) {
        state = e.data;
        notify();
    });

    port.start();
});