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
    import { EventBus } from './../event-bus';

    export default {
        data () {
            return {
                color: '#6441A4',
                disabled: 'disabled'
            }
        },

        mounted () {
            EventBus.$on('authentication-verified', this.enable);

            window.Twitch.ext.listen('broadcast', function (target, contentType, color) {
                window.Twitch.ext.rig.log('Received broadcast color');
                this.updateBlock(color);
            });
        },

        methods: {
            cycleColor () {
                window.Twitch.ext.rig.log('Requesting a color cycle');

                this.$http.post('https://localhost:8081/color/cycle')
                .then(response => { this.updateBlock(response.data) })
                .catch(error => { this.logError(error); });
            },

            enable () {
                window.Twitch.ext.rig.log('Enabling...');
                this.disabled = false;
                this.getColor();
            },

            getColor () {
                this.$http.get('https://localhost:8081/color/query')
                .then(response => { this.updateBlock(response.data) })
                .catch(error => {
                    console.log(error);
                    this.logError(error);
                });
            },

            logError (error) {
                window.Twitch.ext.rig.log('EBS request returned '+error.status+' ('+error+')');
            },

            updateBlock (hex) {
                window.Twitch.ext.rig.log('Updating block color');
                this.color = hex;
            }
        }
    }
</script>
