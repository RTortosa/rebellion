
<template>
    <div>
    <p>Beep</p>
        <pre>{{test}}</pre>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data () {
            return {}
        },
        computed: mapState(['test'])
    }
</script>

<style></style>