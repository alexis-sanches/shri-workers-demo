self.addEventListener('install', e => {

});

function requestPermission() {
    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then(function(permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('Permission not granted.');
        }
    });
}
