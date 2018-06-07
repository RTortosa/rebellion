<template>
    <div :class="claseMensaje">
        <template v-if="mensajeSistema">
            <div class="bordeIzq"></div>
            <p class="cuerpoMensajeSistema">{{entrada.mensaje}}</p>
            <div class="bordeDer"></div>
        </template>
        <template v-if="!mensajeSistema && !mensajeJugador">
            <div class="topLeft"></div>
            <div class="top">{{entrada.origen}} <span v-if="entrada.lider"> - Líder</span> </div>
            <div class="topRight"></div>
            <div class="middleLeft"></div>
            <div class="center">{{entrada.mensaje}}</div>
            <div class="middleRight"></div>
            <div class="bottomLeft"></div>
            <div class="bottom"></div>
            <div class="bottomRight"></div>
        </template>
        <template v-if="mensajeJugador">
            <div class="topLeft"></div>
            <div class="top"></div>
            <div class="topRight"></div>
            <div class="middleLeft"></div>
            <div class="center">{{entrada.mensaje}}</div>
            <div class="middleRight"></div>
            <div class="bottomLeft"></div>
            <div class="bottom"></div>
            <div class="bottomRight"></div>
        </template>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        data() {
            return {
            }
        },
        props: ['entrada'],
        computed: {
            claseMensaje() {

                if (this.entrada.origen === 'sistema1'){
                    return 'mensajeSistema rojo';

                } else if (this.entrada.origen === 'sistema2') {
                    return 'mensajeSistema amarillo';

                }
                else if (this.entrada.origen === this.jugadores[this.idJugador].nombre) {

                    return 'mensajeJugador';

                }
                else  return 'mensajeChat';
            },
            mensajeSistema(){
                if (this.entrada.origen === 'sistema1' || this.entrada.origen === 'sistema2'){
                    return true;

                } else return false;

            },
            mensajeJugador(){
              if (this.entrada.origen === this.jugadores[this.idJugador].nombre)
                  return true;
                else
                  return false;
            },
            ...mapState(['idJugador', 'jugadores']),
        },
    }
</script>

<style scoped>

</style>