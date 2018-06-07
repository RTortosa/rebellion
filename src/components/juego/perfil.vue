<template>
    <div id="perfil">
        <h1 id="perfil__titulo">Tu Perfil</h1>
        <div id="perfil__contenedorFoto">
            <img :src="jugadores[idJugador].foto" alt="Foto Player">
            <button>+</button>
        </div>
        <div id="perfil__contenedorTexto">
            <h5>Los demás te conocen como:</h5>
            <div></div>
            <h2>{{jugadores[idJugador].nombre}}</h2>
        </div>

        <div id="perfil__contenedorBoton">
            <button @click="abrirPopUp">Facción</button>
        </div>
        <p id="perfil__idPartida">Game ID: #<span>{{idPartida}}</span></p>
        <popUp></popUp>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import popUp from './popUpFaccion.vue'
    export default {
        data() {
            return {
            }
        },
        components:{
            popUp,
        },
        methods: {
            abrirPopUp(){ this.popUp(true) },
            //...mapActions([]),
            ...mapMutations(['popUp']),
        },
        computed: {
            ...mapState(['jugadores', 'idPartida', 'idJugador',]),
            //...mapGetters([]),
        },


    }
</script>
<style>
    #perfil{
        flex-grow: 1;
        padding: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }
    #perfil__titulo{
        font-size: 2rem;
        margin-bottom: 10px;
    }
    #perfil__contenedorFoto {
        height: 30%;
        width: 60%;
        border: 1px solid white;
        position: relative;
    }
    #perfil__contenedorFoto button {
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: 0;
        left: 0;
        border: 1px solid white;
        background-color: #0D1F3E;
        color: white;
        font-family: inherit;
        font-size: 2rem;
    }
    #perfil__contenedorTexto {
        width: 100%;
        flex-grow: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #perfil__contenedorTexto h5{
        font-family: 'Exo 2', sans-serif;
        font-size: 1.1rem;
        color: #2E4D69;
        text-align: right;
        margin-bottom: 3px;
    }
    #perfil__contenedorTexto  div{
        border: 1px solid #2E4D69;
        width: 100%;
    }
    #perfil__contenedorTexto h2 {
        width: 100%;
        text-align: left;
        font-size: 2.2rem;
    }
    #perfil__contenedorBoton {
        width: 110%;
        height: 25%;
        background: url("../../assets/profile_Fondo_Btn.svg");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #perfil__contenedorBoton button {
        width: 60%;
        padding-bottom: 5px;
        font-family: 'Exo 2', sans-serif;
        font-size: 2.4rem;

        color: white;
        border: 1px solid white;
        background-color: #040525;
        box-shadow: 0 5px #2E4D69;
    }
    #perfil__idPartida {
        width: 100%;
        height: 10px;
        font-family: 'Exo 2', sans-serif;
        font-size: 1rem;
        color: #2E4D69;
        text-align: left;

    }
</style>