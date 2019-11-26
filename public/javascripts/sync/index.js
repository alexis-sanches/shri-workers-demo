const button = document.querySelector('.btn');
const value = document.querySelector('.value');
const connections = document.querySelector('.connections');

let i = 1;
value.innerText = i.toString();

if (window.SharedWorker) {
    const worker = new SharedWorker('javascripts/sync/worker.js');

    worker.port.addEventListener('message', e => {
        value.innerText = e.data.value.toString();
        connections.innerText = `Количество подключений: ${e.data.connections}`;
    });

    worker.port.postMessage(i);

    button.addEventListener('click', () => {
        worker.port.postMessage(++i);
    });

    worker.port.start();
}
