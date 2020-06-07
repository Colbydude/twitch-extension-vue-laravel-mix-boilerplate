<template>
    <p>This is the config page!</p>
</template>

<script>
import Twitch from '../mixins/Twitch';

export default {
    name: 'Config',

    mixins: [
        Twitch
    ]
}
</script>
