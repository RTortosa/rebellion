<template>
    <div id="fase">
        <div>
            <p id="fase__TextoFase">Fase: <span id="fase__TextoFase__FaseActual">{{getFaseActual}}</span>
            </p>
            <div id="fase__LineaHorizontal"></div>
        </div>
        <div id="fase__ContenedorFase">
            <elegirEquipo v-if="getFaseActual === 'Elegir Equipo'"></elegirEquipo>
            <aprobarEquipo v-if="getFaseActual === 'Aprobar Equipo'"></aprobarEquipo>
            <mision v-if="getFaseActual === 'Misión'"></mision>
        </div>
    </div>

</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import elegirEquipo from './fases/elegirEquipo.vue';
    import aprobarEquipo from './fases/aprobarEquipo.vue';
    import mision from './fases/mision.vue';

    export default {
        data() {
            return {}
        },
        components: {
            elegirEquipo,
            aprobarEquipo,
            mision,
        },
        computed: {
            ...mapGetters(['getFaseActual']),
        },
    }
</script>

<style>
    #fase {
        font-family: 'Exo 2', sans-serif;
        height: 100%;
        width: 100%;
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    #fase > div {
        /*border: 1px solid yellow;*/
    }
    #fase__TextoFase {
        margin-bottom: 2px;
    }

    #fase__TextoFase__FaseActual {
        color: #E5C513;
    }

    #fase__LineaHorizontal {
        height: 2px;
        width: 100%;
        background-color: #2E4D69;
    }
    #fase__ContenedorFase {
        flex-grow: 1;
    }
</style>