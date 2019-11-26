const circle = document.createElement('div');
const innerCircle = document.createElement('div');
circle.classList.add('lds-circle');
circle.appendChild(innerCircle);

const array = Array.from(
    new Set(
        Array(50000)
            .fill(0)
            .map(() => Math.round(Math.random() * 1000000))
    )
);

const workerButton = document.querySelector('.worker');

if (workerButton) {
    workerButton.addEventListener('click', () => {
        sortWithWorker();
    });
}
const noWorkerButton = document.querySelector('.no-worker');

if (noWorkerButton) {
    noWorkerButton.addEventListener('click', () => {
        sortWithoutWorker();
    });
}

function sortWithWorker() {
    if (window.Worker) {
        const worker = new Worker('javascripts/bubble-sort/worker.js');

        worker.postMessage(array);

        worker.addEventListener('message', e => {
            if (typeof e.data === 'boolean') {
                renderAnimation(e.data);
            } else {
                renderText(e.data);
            }
        });
    }
}

function sortWithoutWorker() {
    const startTime = Date.now();

    renderAnimation(true);
    bubbleSort(array);
    renderAnimation(false);

    renderText(Date.now() - startTime);
}

function renderText(text) {
    const ctn = document.querySelector('.ctn');

    if (ctn) {
        document.body.removeChild(ctn);
    }

    const div = document.createElement('div');
    div.classList.add('ctn');
    div.innerText = `Задача выполнена за ${text} мс`;

    document.body.appendChild(div);
}

function renderAnimation(show) {
    if (show) {
        document.body.appendChild(circle);
    } else if (circle.parentElement === document.body) {
        document.body.removeChild(circle);
    }
}
