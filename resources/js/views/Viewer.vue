<template>
    <div class="viewer">
        <h2>Hello, World!</h2>
        <p>Would you care to cycle a color?</p>
        <div>
            <input type="button" id="cycle" value="Yes, I would" @click="cycleColor" :disabled="disabled">
        </div>
        <div style="float: left; position: relative; left: 50%;">
            <div id="color" :style="'border-radius: 50px; transition: background-color 0.5s ease; margin-top: 30px; width: 100px; height: 100px; background-color:' + color + '; float: left; position: relative; left: -50%'">
            </div>
        </div>
        <div id="list">
        </div>
    </div>
</template>

<script>
import Twitch from '../mixins/Twitch';

export default {
    name: 'Viewer',

    mixins: [
        Twitch
    ],

    data () {
        return {
            color: '#6441A4',
            disabled: 'disabled'
        }
    },

    mounted () {
        this.twitch.listen('broadcast', (target, contentType, color) => {
            logger('Received broadcast color ' + color);
            this.updateBlock(color);
        });
    },

    methods: {
        boot () {
            logger('Enabling...');
            this.disabled = false;
            this.getColor();

            this.finishedLoading = true;
        },

        cycleColor () {
            logger('Requesting a color cycle');

            this.$http.post('https://localhost:8081/color/cycle')
            .then(response => { this.updateBlock(response.data) })
            .catch(error => { this.logError(error); });
        },

        getColor () {
            this.$http.get('https://localhost:8081/color/query')
            .then(response => { this.updateBlock(response.data) })
            .catch(error => { this.logError(error); });
        },

        logError (error) {
            logger('EBS request returned '+error.status+' ('+error+')');
        },

        updateBlock (hex) {
            logger('Updating block color');
            this.color = hex;
        }
    }
}
</script>
