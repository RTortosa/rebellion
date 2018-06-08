<template>
    <div id="inicio">
        <span v-on:click.stop="volver">VOLVER</span>
        <h1>Bienvenido</h1>
        <img id="inicio__Logo" src="../assets/logo.svg" alt="Logo Rebelion">
        <div id="inicio__Botones">
            <button v-if="!unirse" v-on:click="crearClick"> Crear</button>
            <input type="text" v-if="unirse" v-model="IDTemp" placeholder="Introducir ID #55 66 88">
            <button v-if="!crear" v-on:click="unirseClick"> Unirse</button>
            <input type="text" v-if="crear" v-model="IDTemp" placeholder="Crear ID # 44 55 66">
            <span id="inicio__Error" class="rojo">{{msg}}</span>
        </div>
    </div>
</template>

<script>
    //import {mapState, mapActions} from 'vuex'; //Importamos el mapeador de Vuex
    export default {
        data() {
            return {
                crear: false,
                unirse: false,
                IDTemp: null,
                msg: null,
            }
        },
        methods: {
            crearClick() {
                if (this.crear) {
                    if (!this.$store.getters.checkPartida(this.IDTemp)) {

                        this.$store.dispatch('crearPartida', this.IDTemp);
                        this.$store.dispatch('crearJugador');
                        this.$store.commit('siguientePantalla');

                    } else this.mostrarMensaje('La partida ya existe'); // mostrar error
                } else this.crear = true;
            },
            unirseClick() {
                if (this.unirse) {
                    if (this.$store.getters.checkPartida(this.IDTemp)) { // Existe partida

                        this.$store.dispatch('unirsePartida', this.IDTemp);

                        if (this.$store.getters.checkSitio) {

                            this.$store.dispatch('crearJugador');
                            this.$store.commit('siguientePantalla');

                        } else this.mostrarMensaje('No hay sitio en esa partida');
                    } else this.mostrarMensaje('La partida no existe');

                } else this.unirse = true;
            },
            volver() {
                this.unirse = false;
                this.crear = false;
            },
            mostrarMensaje(error) {
                this.msg = error;
                setTimeout(function () {
                    this.msg = ''
                }.bind(this), 1500); // sin bind no va. PREGUNTAR
            },
        },
        //...mapActions(['']),
        // no hace falta mapearlas porque las llamo explicitamente en Js por probar un poco como se hace :)

        computed: {
            //...mapState(['', '', '',]),
            //...mapGetters(['checkSitio', 'checkPartida']),
        },

    };
</script>

<style>

    /*#inicio > *> * { border: 1px solid red;}*/

    #inicio {
        padding: 5%;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #inicio > span {
        color: #2e4d69;
    }

    #inicio > h1 {
        text-align: center;
        font-size: 2.8rem;
    }

    #inicio__Logo {
        height: 65%;
    }

    #inicio__Botones {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #inicio__Botones button, #inicio__Botones input {
        /*flex-basis: 50%;*/
        flex-grow: 1;
        background-color: transparent;
        border: 1px solid white;
        margin: 0 1px;
        color: white;
        height: 45px;
        text-align: center;
        font-family: 'Audiowide', cursive;

    }

    #inicio__Botones.activado button, #inicio__Botones.activado input {
        /*Clase para activar y hacer la animación de los botones con js*/
    }

    #inicio__Botones input {
        font-size: 0.9rem;
    }

    #inicio__Botones button {
        font-size: 1.2rem;
        background-color: #0d1f3e;

        background-size: contain;
        background-repeat: no-repeat;
    }

    #inicio__Error {
        font-family: 'Exo 2', sans-serif;
        text-align: center;
        color: #C13123;
        flex-basis: 100%;
        min-height: 30px;
        margin-top: 5px;
    }
</style>