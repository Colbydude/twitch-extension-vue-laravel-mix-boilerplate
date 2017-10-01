if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function(auth) {
        console.log(auth);
    });

    window.Twitch.ext.onContext(function(context, contextFields) {
        console.log(context);
        console.log(contextFields);
    });

    window.Twitch.ext.onError(function(err) {
        console.error(err);
    });
}
