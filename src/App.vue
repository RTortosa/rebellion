<template>
    <div id="contenedorApp">

        <inicio v-if="pantallaActual === 'inicio'"></inicio>
        <espera v-if="pantallaActual === 'espera'"></espera>
        <juego v-if="pantallaActual === 'juego'"></juego>
        <fin v-if="pantallaActual === 'fin'"></fin>

    </div>
</template>

<script>
    import inicio from './components/inicio.vue';
    import espera from './components/espera.vue';
    import juego from './components/juego.vue';
    import fin from './components/fin.vue';

    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                nombreApp: 'Rebellion'
            }
        },
        components: {
            inicio,
            espera,
            juego,
            fin,
        },
        methods:{
            ...mapActions(['getPartidasEnCurso']),
        } ,
        computed: mapState(['pantallaActual']),

        created () {
           this.getPartidasEnCurso();
        },

    }
</script>

<style>
    html, body {
        height: 100%;
    }
    html *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-weight: normal;

    }
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        /*font-family: 'Exo 2', sans-serif;*/
        font-family: 'Audiowide', cursive;
        font-size: 1em;
    }
    #contenedorApp {  /** Dev **/
        /*border: 2px solid red;*/
        height: 100vh;
        width: 100vw;
        color: white;
        /*padding: 7%;*/
        position: relative;
        background-color: #040525;
        /*overflow: hidden;*/
    }
    /*** Colores
    rojo: #C13123
    amarillo: #E5C513
    Oscuro1: #040525 Azul Oscuro Fondo
    Oscuro2: #0D1F3E Azul Marino
    Oscuro3: #2E4D69 Verdecito claro
    blanco
    ***/

</style>

