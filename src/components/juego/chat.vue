<template>
    <div id="chat">
        <div id="chat__contenedor">
                <div id="chat__mensajes" v-chat-scroll> <!-- No va el auto scroll-->
                    <template v-for="entrada in chat">
                        <globoMensaje :entrada="entrada"></globoMensaje>
                    </template>
                </div>
        </div>

        <form id="chat__formulario" @submit.prevent="enviarMensaje">
            <input id="chat__formulario__cajaTexto" v-model="mensajeTemp" type="text" placeholder="Vamos! Di algo" required>
            <input id="chat__formulario__btnEnviar" type="submit" value="">
        </form>

    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import globoMensaje from './globoMensaje.vue'

    export default {
        data() {
            return {
                mensajeTemp: '',
            }
        },
        components:{
            globoMensaje,
        },
        methods: {
            enviarMensaje() {
                this.pushMensaje({
                    origen: this.jugadores[this.idJugador].nombre,
                    mensaje: this.mensajeTemp,
                    lider: this.jugadores[this.idJugador].lider
                });
                this.mensajeTemp = '';
            },

            ...mapActions(['pushMensaje']),
            ...mapMutations(['siguientePantalla', 'anteriorPantalla']),
        },
        computed: {
            ...mapState(['chat', 'idPartida', 'idJugador','jugadores']),
            //...mapGetters([]),
        },


    }

</script>
<style>
    #chat   {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 5px;
        max-height: 100%;
        /*For firefox*/
        min-height: 0;

    }
    #chat__contenedor {
        flex-grow: 1;
        overflow: auto;
    }
    #chat__mensajes {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        font-family: 'Exo 2', sans-serif;
        font-size: 0.9rem;

    }
    #chat__mensajes > * { margin-bottom: 5px}
    #chat__mensajes .rojo {
        color: #C13123;
    }
    #chat__mensajes .amarillo {
        color: #E5C513;
    }
    #chat__mensajes .mensajeSistema{
        display: flex;
        justify-content: center;
        align-self: center;
    }
    #chat__mensajes .cuerpoMensajeSistema {
        background-image: url('../../Assets/Chat_Status_Center.svg');
        display: inline-block;
    }
    #chat__mensajes .mensajeSistema .bordeIzq{ background-image: url('../../Assets/Chat_Status_Left.svg'); }
    #chat__mensajes .mensajeSistema .bordeDer{ background-image: url('../../Assets/Chat_Status_Right.svg'); }
    #chat__mensajes .mensajeSistema .bordeDer, #chat__mensajes .mensajeSistema .bordeIzq {
        background-size: contain;
        width: 8px;
        background-repeat: no-repeat;
    }
    #chat__mensajes .mensajeSistema * { background-size: 100% 100%;}

    /* Es un grid porque no he encontrado otra manera de que el fondo se redimensione correctamente */
    #chat__mensajes .mensajeChat {
        align-self: flex-start;
        display: grid;
        grid: auto auto 7px / 16px auto 8px; /* File - Column */
    }
    #chat__mensajes .mensajeChat *{
       background-size: 100% 100%;
    }
    #chat__mensajes .mensajeChat .topLeft{ background-image: url('../../Assets/Chat_Mensaje_Top_Left.svg');}
    #chat__mensajes .mensajeChat .top{ background-image: url('../../Assets/Chat_Mensaje_Center.svg'); color:#040525;}
    #chat__mensajes .mensajeChat .topRight{ background-image: url('../../Assets/Chat_Mensaje_Top_Right.svg');}
    #chat__mensajes .mensajeChat .middleLeft{ background-image: url('../../Assets/Chat_Mensaje_Middle_Left.svg');}
    #chat__mensajes .mensajeChat .center{ background-image: url('../../Assets/Chat_Mensaje_Center.svg');}
    #chat__mensajes .mensajeChat .middleRight{ background-image: url('../../Assets/Chat_Mensaje_Center.svg');}
    #chat__mensajes .mensajeChat .bottomLeft{ background-image: url('../../Assets/Chat_Mensaje_Bottom_Left.svg');}
    #chat__mensajes .mensajeChat .bottom{ background-image: url('../../Assets/Chat_Mensaje_Center.svg');}
    #chat__mensajes .mensajeChat .bottomRight{ background-image: url('../../Assets/Chat_Mensaje_Bottom_Right.svg');}


    #chat__mensajes .mensajeJugador {
        align-self: flex-end;
        display: grid;
        grid: 8px auto 8px / 8px auto 16px; /* File - Column */
        /*border: 1px solid white;*/
    }

    #chat__mensajes .mensajeJugador .topLeft{ background-image: url('../../Assets/Chat_Jugador_Top_Left.svg');}
    #chat__mensajes .mensajeJugador .top{ background-image: url('../../Assets/Chat_Jugador_Top.svg');}
    #chat__mensajes .mensajeJugador .topRight{ background-image: url('../../assets/Chat_Jugador_Top_Right.svg');}
    #chat__mensajes .mensajeJugador .middleRight{ background-image: url('../../assets/Chat_Jugador_Middle_Right.svg');}

    #chat__mensajes .mensajeJugador *{
        background-size: 100% 100%;
    }
    #chat__formulario {
        width: 100%;
        z-index: 10;
        display: flex;
        justify-content:space-between;
        align-self: center;
    }
    #chat__formulario__cajaTexto, #chat__formulario__btnEnviar {
        font-family: 'Exo 2', sans-serif;
        font-size: 0.8rem;
        padding: 5px;
        background-color: transparent;
        border: 1px solid white;
        color: white;
    }
    #chat__formulario__cajaTexto {
        flex-basis: 89%;
    }
    #chat__formulario__btnEnviar {
        flex-basis: 10%;
        background: url("../../assets/Icon_Send.svg");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
    }
</style>