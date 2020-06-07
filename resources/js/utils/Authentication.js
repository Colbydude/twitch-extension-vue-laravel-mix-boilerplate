/**
 * Helper class for authentication against an EBS service. Allows the storage of a token to be accessed across componenents.
 * This is not meant to be a source of truth. Use only for presentational purposes.
 *
 * @class Authentication
 */
export default class Authentication {
    /**
     * Create a new instance of the Authentication util.
     *
     * @param  {String} token
     * @param  {String} opaque_id
     * @constructor
     */
    constructor(token, opaque_id) {
        this.channel_id;
        this.opaque_id = opaque_id;
        this.role;
        this.token = token;
        this.user_id;
    }

    /**
     * Fetch the currently active channel id.
     *
     * @return {String}
     */
    getChannelId() {
        return this.channel_id;
    }

    /**
     * Fetch the auth'd opaque id.
     *
     * @return {String}
     */
    getOpaqueId() {
        return this.opaque_id;
    }

    /**
     * Fetch the auth'd user id.
     *
     * @return {String}
     */
    getUserId() {
        return this.user_id;
    }

    /**
     * Checks to ensure there is a valid token in the state.
     *
     * @return {Boolean}
     */
    isAuthenticated() {
        if (this.token && this.opaque_id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user is logged in or not.
     *
     * @return {Boolean}
     */
    isLoggedIn() {
        return this.opaque_id[0] === 'U' ? true : false;
    }

    /**
     * Set the token in the state.
     *
     * @param  {String}  token
     * @param  {String}  opaque_id
     * @return {Void}
     */
    setToken(token, opaque_id) {
        let channel_id = '';
        let role = '';
        let user_id = '';

        try {
            const parts = token.split('.');
            let decoded = JSON.parse(window.atob(parts[1]));

            channel_id = decoded.channel_id;
            role = decoded.role;
            user_id = decoded.user_id;
        } catch (e) {
            token = '';
            opaque_id = '';
        }

        this.channel_id = channel_id;
        this.opaque_id = opaque_id;
        this.role = role;
        this.token = token;
        this.user_id = user_id;
    }
}
