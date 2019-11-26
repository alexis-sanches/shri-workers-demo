window.addEventListener('load', () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker
            .register('javascripts/push/worker.js')
            .then(function(registration) {
                var subscribeOptions = {
                    userVisibleOnly: true,
                    applicationServerKey: btoa(
                        'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
                    )
                };

                return registration.pushManager.subscribe(subscribeOptions);
            })
            .then(function(pushSubscription) {
                console.log('PushSubscription: ', JSON.stringify(pushSubscription));
                return pushSubscription;
            });
    }
});
