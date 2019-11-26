importScripts('./sort.js');

self.addEventListener('message', e => {
    const startTime = Date.now();
    postMessage(true);

    bubbleSort(e.data);
    postMessage(false);

    postMessage(Date.now() - startTime);
});
