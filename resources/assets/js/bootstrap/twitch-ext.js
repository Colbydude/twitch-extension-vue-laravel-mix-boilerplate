import { EventBus } from './../event-bus';

if (window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(function(auth) {
        // Attach the token to every Axios request.
        window.Twitch.ext.rig.log('Setting auth headers');
        window.axios.defaults.headers.common.Authorization = 'Bearer ' + auth.token;

        // Broadcast a "boot" event.
        EventBus.$emit('authentication-verified');
    });

    window.Twitch.ext.onContext(function(context, contextFields) {
        window.Twitch.ext.rig.log(context);
    });

    window.Twitch.ext.onError(function(err) {
        window.Twitch.ext.rig.log(err);
    });
}
