<template>
    <div id="finPartida">
        <h1 v-if="getVictoriaDerrota === 'derrota' "> Han gando los Espías</h1>
        <h1 v-else> La Rebelión ha sido un éxito</h1>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['getVictoriaDerrota']),

        }
    }



</script>




<style>
    #finPartida {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #finPartida h1 {
        text-align: center;
    }
</style>