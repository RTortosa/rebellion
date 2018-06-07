<template>
    <div class="jugador">
        <div v-show="jugador.equipo" class="seleccionado"></div>
        <div class="fotoFrame">
            <img :src="jugador.foto" alt="">
            <h2 class="nombreJugador">{{jugador.nombre}}</h2>
            <div v-show="votacionEstado" class="votoJugador">
                <img v-if="jugador.votoEquipo === true" src="../../assets/Voto_Si_Player.svg" alt="Sí">
                <img v-else src="../../assets/Voto_No_Player.svg" alt="No">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['jugador', 'votacionEstado'],
    }
</script>

<style>
    .jugador {
        height: 100%;
        width: 100%;
        position: relative;
        background: url("../../assets/Player_Foto.svg");
        background-size: 100% 100%;
        font-family: 'Exo 2', sans-serif;
    }
    .jugador .fotoFrame{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .jugador .fotoFrame .votoJugador {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        /*background-color: rgba(0,0,0,0.4);*/
    }
    .jugador .fotoFrame .votoJugador img{
        width: 50%;
        height: 50%;
    }
    .jugador .seleccionado {
        background: url("../../assets/Player_Selec.svg");
        background-size: 100% 100%;
        background-position: top right;
        position: absolute;
        top: -4%;
        right: -4%;
        height: 55%;
        width: 63%;
    }
    .jugador .nombreJugador {
        font-size: 1rem;
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: rgba(0,0,0,0.6);
    }
</style>