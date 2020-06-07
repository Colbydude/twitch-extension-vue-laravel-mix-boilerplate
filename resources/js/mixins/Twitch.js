import Authentication from '../utils/Authentication';

export default {
    data () {
        return {
            auth: new Authentication(),                         // The auth object containing user and channel information.
            finishedLoading: false,                             // Whether or not the component has authenticated/finished loading.
            twitch: window.Twitch ? window.Twitch.ext : null    // The Twitch helper utility.
        };
    },

    async beforeMount () {
        if (this.twitch) {
            // Bind logger to the Twitch Developer Rig logger.
            if (process.env.NODE_ENV === 'development') {
                window.logger = this.twitch.rig.log.bind(this.twitch);
                logger('Logging set to use Twitch Developer Rig.');
            }

            // Setup our auth and API and ready the extension for use.
            this.twitch.onAuthorized((auth) => {
                // Set the token for use with Axios.
                this.auth.setToken(auth.token, auth.userId);
                window.axios.defaults.headers.common.Authorization = 'Bearer ' + auth.token;

                if (!this.finishedLoading) {
                    this.boot();
                }
            });

            // Handle context updates.
            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta);
            });
        }
    },

    methods: {
        /**
         * Prompt to ask for authentication.
         *
         * @return {void}
         */
        askForAuth() {
            this.twitch.actions.requestIdShare();
        },

        /**
         * Auth has been verified, finish "booting"
         *
         * @return {void}
         */
        boot() {
            this.finishedLoading = true;
        },

        /**
         * Handle Twitch context updates.
         *
         * @param  {any}  context
         * @param  {any}  delta
         * @return {void}
         */
        contextUpdate(context, delta) {
            // @TODO when needed
        },
    }
}
