<template>
    <div id="misionVotar" v-if="checkEquipo && !checkVotado">
        <p class="textoAyuda">Éxito, Fracaso, tu decides.</p>
        <div class="contenedorVotos">
            <div @click="votoTemporal=true" class="votoPositivo">
                <img v-if="votoTemporal === true" src="../../../assets/Voto_Si_Act.svg" alt="">
                <img v-else src="../../../assets/Voto_Si.svg" alt="">
            </div>
            <div @click="votoTemporal=false" class="votoNegativo">
                <img v-if="votoTemporal === false" src="../../../assets/Voto_No_Act.svg" alt="">
                <img v-else src="../../../assets/Voto_No.svg" alt="">
            </div>
        </div>
        <div @click="clickListo" class="botonListo"> Listo </div>
    </div>


    <div v-else-if="checkVotacionTerminada" id="misionResultado">
        <p class="textoAyuda">Misión finalizada</p>
        <div>
            <p class="textoInfo">La misión ha sido un:</p>
            <p class="resultado" :class="getResultadoVotacion">{{getResultadoVotacion}}</p>
        </div>
        <p class="textoInfo2"> Con {{getNumeroVotosNegativos}} votos negativos</p>
        <p v-if="getResultadoVotacion === 'Fracaso'" class="textoInfo3">Elegid mejor al equipo</p>
        <div v-if="checkCreador" @click="clickOk" class="textoSiguienteFase">Ok</div>
        <div v-else class="textoEsperandoFase">Esperando...</div>
    </div>


    <div id="misionEsperando" v-else>
        <p v-if="!checkEquipo" class="textoAyuda"> Los agentes enviados están en la misión</p>
        <p v-else class="textoAyuda2"> Ya has votado.</p>
        <img src="../../../assets/esperarLider.svg" alt="Esperando resultado">
    </div>

</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        created() {
            // this.setVotoEquipo('');
        },
        data () {
            return {
                votoTemporal: '',
            }
        },

        computed: {

              ...mapGetters(['checkEquipo','checkVotado','checkCreador','checkVotacionTerminada',
                  'getResultadoVotacion','getNumeroVotosNegativos',
                  'getNumeroJugadores','getNumeroVotos',]),
        },
        methods: {
            clickListo () {
                this.setVotoMision(this.votoTemporal);
                this.votoTemporal ='';
            },
            clickOk(){

            },
            ...mapActions(['setVotoMision']),
        },
    }
</script>

<style>
        #misionVotar,
        #misionEsperando,
        #misionResultado,{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        #misionResultado .textoAyuda,
        #misionEsperando .textoAyuda2,
        #misionVotar .textoAyuda {
            color: #2E4D69;
            text-align: right;
            font-size: 0.8rem;
        }

        #misionEsperando .textoAyuda {
            color: #2E4D69;
            text-align: left;
            font-size: 0.8rem;
        }
        #misionVotar .contenedorVotos {
            display: flex;
            justify-content: space-around;
        }
        #misionVotar .botonListo {
            padding-bottom: 5px;
            text-align: center;
            font-family: 'Audiowide', cursive;
            font-size: 1.2rem;
            background-image: url("../../../assets/Btn_2.svg");
            background-size: 60% 100%;
            background-repeat: no-repeat;
            background-position: center;
        }
        #misionResultado .textoInfo {
            font-size: 1rem;
        }
        #misionResultado .textoInfo3 {
            font-size: 0.8rem;
            text-align: center;
            color: #E5C513;
        }
        #misionResultado .textoInfo2 {
            font-size: 0.8rem;
            text-align: center;
            color: #2E4D69;
        }
        #misionResultado .resultado {
            font-size: 1.2rem;
            font-family: 'Audiowide', cursive;
            text-align: right;
        }
        #misionResultado .resultado.Fracaso { color: #C13123; }
        #misionResultado .resultado.Éxito { color: #E5C513; }

        #misionResultado .textoEsperandoFase {
            text-align: center;
            font-family: 'Audiowide', cursive;
            font-size: 1.2rem;
        }
        #misionResultado .textoSiguienteFase {
            padding-bottom: 5px;
            text-align: center;
            font-family: 'Audiowide', cursive;
            font-size: 1.2rem;
            background-image: url("../../../assets/Btn_2.svg");
            background-size: 60% 100%;
            background-repeat: no-repeat;
            background-position: center;
        }

</style>