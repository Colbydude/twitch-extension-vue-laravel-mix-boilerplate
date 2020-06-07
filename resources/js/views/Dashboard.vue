<template>
    <div class="live-config">
        <h2>And We're Live!</h2>
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
import Viewer from './Viewer';

// NOTE: Extends the viewer component, but changes the template.
export default {
    name: 'Dashboard',
    extends: Viewer,
}
</script>
