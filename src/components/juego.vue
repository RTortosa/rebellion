<template>
    <div id="juego">
        <header id="menu">
            <button :class="seccion" id="menu__btnPerfil" @click="cambiarApartado('perfil')">
                <img v-if="seccion==='perfil'" src="../assets/Icon_Profile_White.svg" alt="">
                <img v-else src="../assets/Icon_Profile_Dark.svg" alt="">
            </button>
            <button :class="seccion" id="menu__btnJuego" @click="cambiarApartado('juego')">
                <img v-if="seccion==='juego'" src="../assets/Icon_Main_White.svg" alt="">
                <img v-else src="../assets/Icon_Main_Dark.svg" alt="">
            </button>
            <button :class="seccion" id="menu__btnChat" @click="cambiarApartado('chat')">
                <img v-if="seccion==='chat'" src="../assets/Icon_Chat_White.svg" alt="">
                <img v-else src="../assets/Icon_Chat_Dark.svg" alt="">
            </button>
        </header>
        <perfil v-if="seccion === 'perfil'"></perfil>
        <juego v-if="seccion === 'juego'"></juego>
        <chat v-if="seccion === 'chat'"></chat>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import perfil from './juego/perfil.vue'
    import juego from './juego/juego.vue'
    import chat from './juego/chat.vue'

    export default {
        data() {
            return {
                seccion: 'juego',
            }
        },
        components:{
            perfil,
            juego,
            chat,
        },
        methods: {
            cambiarApartado (apartado){
                this.seccion = apartado;
            },
            ...mapActions(['setVotoMision','setVotoEquipo']),
            ...mapMutations(['siguientePantalla', 'anteriorPantalla','votosVisible']),
        },
        computed: {
            // ...mapState(['jugadores', 'idPartida', 'idJugador',]),
            ...mapGetters(['getFaseActual','checkFinDePartida']),
        },
        watch: { // No usar arrow function,
            getFaseActual: function(value) {
                // Cuando volvemos a la fase de elegir Equipo resetea las votaciones anteriores
                if (value === 'Elegir Equipo') {
                    this.votosVisible(false);
                    this.setVotoEquipo('');
                    this.setVotoMision('');
                } else if (value === 'Misión'){
                    this.votosVisible(false);
                }
            },
            checkFinDePartida: function(value) {
                if (value){
                    this.siguientePantalla();
                }
            }
        },

    }

</script>

<style>
    #juego {
        height: 100%;
        /*border: 2px solid yellow;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #menu {
        width: 100%;
        flex-grow: 0;
        display: flex;
        z-index: 10;

    }
    #menu > button {
        padding: 10px 0 7px 0;
        flex-basis: 33.3%;
        background-color: #2E4D69;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #menu__btnPerfil.perfil,
    #menu__btnJuego.juego,
    #menu__btnChat.chat {
        background-color: #040525;
    }
</style>