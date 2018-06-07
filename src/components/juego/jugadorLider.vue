<template>
    <div id="lider">
        <div v-show="lider.equipo" class="seleccionado"></div>
        <div class="fotoFrame">
            <h6 id="etiquetaLider">Líder</h6>
            <img :src="lider.foto" alt="">
            <h2 class="nombreLider">{{lider.nombre}}</h2>
            <div v-show="votacionEstado" class="votoJugador">
                <img v-if="lider.votoEquipo === true" src="../../assets/Voto_Si_Player.svg" alt="Sí">
                <img v-else src="../../assets/Voto_No_Player.svg" alt="No">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['lider','votacionEstado'],
    };
</script>

<style>
    #lider {
        height: 100%;
        width: 100%;
        position: relative;
        background: url("../../assets/Player_Foto.svg");
        background-size: 100% 100%;
        font-family: 'Exo 2', sans-serif;
    }
    #lider .seleccionado {
        background: url("../../assets/Player_Selec.svg");
        background-size: 100% 100%;
        background-position: top right;
        position: absolute;
        top: -4%;
        right: -4%;
        height: 55%;
        width: 63%;
    }
    #lider .nombreLider {
        font-size: 1.2rem;
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: rgba(0,0,0,0.6);
    }
    #lider .fotoFrame .votoJugador {
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
    #lider .fotoFrame .votoJugador img{
        width: 50%;
        height: 50%;
    }
    #lider  #etiquetaLider {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 2px;
        color: #040525;
        width: 30%;
        background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0) );
    }

</style>