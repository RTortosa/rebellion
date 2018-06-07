import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
//import {firebaseMutations} from 'vuexfire'
//actions.js (que no hay)
// import {firebaseAction} from 'vuexfire'

Vue.use(Vuex);

let firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyBFC_RK0bdQtSmMmh1GUwJKdRQaTmq0KSo",
    authDomain: "rebelionapp.firebaseapp.com",
    databaseURL: "https://rebelionapp.firebaseio.com",
    projectId: "rebelionapp",
    storageBucket: "",
    messagingSenderId: "549341487903"

});
let db = firebaseApp.database();


//Creamos nuestro contenedor de variables
export const store = new Vuex.Store({
    state: {
        // Datos Locales

        estados: ['inicio', 'espera', 'juego', 'fin'],
        punteroEstado: 0,
        pantallaActual: 'inicio',
        popUpEstado: true, // PopUp abierto/Cerrado
        votacionEstado: false, // Ver resultado votación (pulgares)

        idJugador: null,
        idPartida: null,

        db: db,

        tablaEquipo: { // tabla jugadores requeridos en la mision [nº jugadores/ nº ronda]
            5: [2, 3, 2, 3, 3],
            6: [2, 3, 4, 3, 4],
            7: [2, 3, 3, 4, 4],
            8: [3, 4, 4, 5, 5],
            9: [3, 4, 4, 5, 5],
            10: [3, 4, 4, 5, 5]
        },
        tablaEspias:{ // numero de espías [nº jugadores: nº espias]
            5: 2,  6: 2,  7: 3,  8: 3,  9: 3,  10: 4,
        },

        // Datos on-line
        partidasCurso: {}, //objeto con las key partidas en curso
        datos: { // Ilustrativo se sobreescribe con la db
            iniciada: false,
            liderRechazadoVeces: 0,
            rondaActual: 3,
            resultadoRondas: {
                ronda1: 'exito',
                ronda2: 'fracaso',
                ronda3: 'actual',
                ronda4: 'futura',
                ronda5: 'futura',
            },
            faseActual: 0,
            fases: ['elegirEquipo', 'aprobarEquipo', 'mision'],

        },
        jugadores: { // Jugadores Partida Actual
            "player0": {
                nombre: "",
                listo: false,
                foto: "url",
                creador: true,
                equipo: false,
                lider: false,
                faccion: 'espia/agente',
                votoMision: false,
                votoEquipo: false,
                votoPositivo: false,

            },
        },
        chat: { // Chat Partida Actual
            mensajeTipo: {
                mensaje: "Mensaje de Prueba",
                origen: "sistema1 / sistema2 / jugadorX"
            }
        },
    },
    watch: {
        // meter watch por si la partida desaparece hacer algo
    },
    mutations: {
        irPantalla(state, pantalla) {
            state.punteroEstado = pantalla;
            state.pantallaActual = state.estados[state.punteroEstado];
        },
        siguientePantalla(state) {
            //Meter if para comprobar
            state.punteroEstado++;
            state.pantallaActual = state.estados[state.punteroEstado];
        },
        anteriorPantalla(state) {
            //Meter if para comprobar
            state.punteroEstado--;
            state.pantallaActual = state.estados[state.punteroEstado];
        },
        popUp(state, opcion) {
            state.popUpEstado = opcion;
        },
        votosVisible(state, opcion) {
            state.votacionEstado = opcion;
        }
    },
    getters: {
        checkSitio: (state) => { // ¿Hay sitio en la partida?
            return Object.keys(state.jugadores).length < 10;
        },
        checkPartida: (state) => (idPartida) => { // ¿La partida Existe?
            return !!state.partidasCurso[idPartida]; // Esto es como un if+else que comprueba que exite
        },
        checkPartidaIniciada: (state) => { // ¿La partida ha empezado?
            return state.datos.iniciada;
        },
        checkListo: (state) => { // ¿Jugador Listo?
            return state.jugadores[state.idJugador].listo;
        },
        checkCreador: (state) => { // ¿Eres el que ha creado la partida?
            return state.jugadores[state.idJugador].creador
        },
        checkLider: (state) => { // ¿Eres el lider actual?
            return state.jugadores[state.idJugador].lider
        },
        checkFaccion: (state) => { // devuelve la facción del usuario
            return state.jugadores[state.idJugador].faccion
        },
        checkEquipo: (state) => {
            return state.jugadores[state.idJugador].equipo;
        },
        checkVotado: (state) => {
            let tipoVotacion = state.datos.faseActual;
            if (tipoVotacion === 2)
                return state.jugadores[state.idJugador].votoMision === true
                    || state.jugadores[state.idJugador].votoMision === false;
            else if (tipoVotacion === 1)
                return state.jugadores[state.idJugador].votoEquipo === true
                    || state.jugadores[state.idJugador].votoEquipo === false;
        },
        checkVotacionTerminada: (state, getters) => {
            return getters.getJugadoresRestantes === 0
        },
        todosListos: (state) => { // ¿Todos los jugadores Listos?
            let ready = true;
            for (let jugador in state.jugadores) {
                ready = ready && state.jugadores[jugador].listo;
            }
            return ready;
        },
        getLider: (state) => { // Devielve la ID del líder actual
            for (let jugador in state.jugadores) {
                if (state.jugadores[jugador].lider) return jugador
            }
            return false
        },
        getNumeroJugadores: (state, getters) => {
            let tipoVotacion = state.datos.faseActual;
            if (tipoVotacion === 2)
                return Object.keys(getters.getJugadoresEquipo).length;
            else if (tipoVotacion === 1)
                return Object.keys(state.jugadores).length;
        },
        getEspias: (state) => { // devuelve todos los espías de la partida
            let espias = {};
            for (let jugador in state.jugadores) {
                if (state.jugadores[jugador].faccion === 'espia')
                    espias[jugador] = state.jugadores[jugador];
            }
            return espias
        },
        getJugadoresEquipo: (state) => { // devuelve todos los integranytes del equipo
            let equipo = {};
            for (let jugador in state.jugadores) {
                if (state.jugadores[jugador].equipo === true)
                    equipo[jugador] = state.jugadores[jugador];
            }
            return equipo
        },
        getMinimoJugadoresASeleccionar: (state) => { //Cuántos jugadores hay
            let jugadores = Object.keys(state.jugadores).length;

            return state.tablaEquipo[jugadores][state.datos.rondaActual - 1]
        },
        getNumeroJugadoresSeleccionados: (state) => { // numero de jugadores seleccionados
            let numSelec = 0;
            for (let jugador in state.jugadores) {
                if (state.jugadores[jugador].equipo === true)
                    numSelec += 1;
            }
            return numSelec
        },
        getEstadoRonda: (state) => (ronda) => { //devuelve el estado de la ronda 'exito', 'fracaso', etc
            return state.datos.resultadoRondas[ronda];
        },
        getFaseActual: (state) => {
            return state.datos.fases[state.datos.faseActual]
        },
        getVotoJugador: (state) => {
            let tipoVotacion = state.datos.faseActual;
            if (tipoVotacion === 2)
                return state.jugadores[state.idJugador].votoMision;
            else if (tipoVotacion === 1)
                return state.jugadores[state.idJugador].votoEquipo;
        },
        getNumeroVotos: (state, getters) => { //mision o equipo
            let resultado = 0;
            let tipoVotacion = state.datos.faseActual;
            if (tipoVotacion === 2) { //mision
                for (let jugador in getters.getJugadoresEquipo) {
                    if (state.jugadores[jugador].votoMision === true
                        || state.jugadores[jugador].votoMision === false)
                        resultado++;
                }
                return resultado;
            } else if (tipoVotacion === 1) { //equipo
                for (let jugador in state.jugadores) {
                    if (state.jugadores[jugador].votoEquipo === true
                        || state.jugadores[jugador].votoEquipo === false)
                        resultado++;
                }
                return resultado;
            }
        },
        getNumeroVotosNegativos: (state, getters) => { //mision o equipo
            let resultado = 0;
            let tipoVotacion = state.datos.faseActual;
            if (tipoVotacion === 2) { //mision
                for (let jugador in getters.getJugadoresEquipo) {
                    if (state.jugadores[jugador].votoMision === false)
                        resultado++;
                }
                return resultado;
            } else if (tipoVotacion === 1) { //equipo
                for (let jugador in state.jugadores) {
                    if (state.jugadores[jugador].votoEquipo === false)
                        resultado++;
                }
                return resultado;
            }
        },
        getResultadoVotacion: (state, getters) => {
            let resultado = 0;
            let tipoVotacion = state.datos.faseActual;
            let numJugadores = getters.getNumeroJugadores;
            if (tipoVotacion === 2) { // mision
                for (let jugador in numJugadores) {
                    if (state.jugadores[jugador].votoMision === true)
                        resultado++;
                }
                if (state.datos.rondaActual === 4){ // Mision 4 necesita 2 votos en contra
                    if (getters.getNumeroVotosNegativos < 2)
                        return 'Éxito';
                    else return 'Fracaso'
                } // resto misiones con uno negativo sobra
                if (getters.getNumeroVotosNegativos < 1)
                    return 'Éxito';
                else return 'Fracaso'

            } else if (tipoVotacion === 1) { // equipo
                for (let jugador in state.jugadores) {
                    if (state.jugadores[jugador].votoEquipo === true)
                        resultado++;
                }
                if (resultado > numJugadores - resultado)
                    return 'Aprobado';
                else return 'Rechazado'
            }
        },
        getIntentosRestantes: (state) => {
            return 4 - state.datos.liderRechazadoVeces
        },
        getJugadoresRestantes: (state, getters) => {
            return   getters.getNumeroJugadores - getters.getNumeroVotos
        },

    },
    actions: {
//------------- App.vue
        getPartidasEnCurso: (store) => { // Obtiene la lista de partidas actuales
            store.state.db.ref('/').on("value", function (snapshot) {
                snapshot.forEach(data => {
                    store.state.partidasCurso[data.key] = true;
                });
            });
        },
//------------ inicio.vue
        crearJugador(store) { //Crea un jugador Vacio
            let largo = Object.keys(store.state.jugadores).length;
            let crea = largo === 0;

            store.state.idJugador = 'player' + largo; // esto será la key del jugador en firebase

            store.state.db.ref(store.state.idPartida + '/jugadores/' + store.state.idJugador).update({
                nombre: '',
                listo: false,
                foto: "url",
                creador: crea,
                equipo: false,
                lider: false,
                faccion: 'no',
                votoMision: '',
                votoEquipo: '',
                votoPositivo: '',

            });

        },
        crearPartida(store, idPartida) {
            // Set id partida local con el introducido por el usuario
            store.state.idPartida = idPartida;
            // Creamos la partida en firebase
            store.state.db.ref(idPartida).set({
                datos: {
                    iniciada: false,
                    liderRechazadoVeces: 0,
                    // resultadoRondas: 'exito', 'fracaso', 'actual', 'futura'
                    resultadoRondas: {
                        ronda1: 'actual',
                        ronda2: 'futura',
                        ronda3: 'futura',
                        ronda4: 'futura',
                        ronda5: 'futura',
                    },
                    rondaActual: 0,
                },
                jugadores: false,
                chat: {
                    '-LDXXpb5nE0Y7ryqyUHw': {
                        mensaje: 'Bienvenidos al chat de Rebellion',
                        origen: 'sistema2',
                    },
                },
            });
            // Vinculamos datos locales con db
            store.state.db.ref(store.state.idPartida + '/datos/').on("value", snapshot => {
                store.state.datos = snapshot.val();
            }); // datos app
            store.state.db.ref(store.state.idPartida + '/jugadores/').on("value", snapshot => {
                store.state.jugadores = snapshot.val();
            }); // jugadores
            store.state.db.ref(store.state.idPartida + '/chat/').on("child_added", snapshot => {
                // No sé por qué pero sólo actualiza cuando se escribe en el input
                store.state.chat[snapshot.key] = snapshot.val();

            }); // chat
        },
        unirsePartida(store, idPartida) {
            // Set id partida local con el introducido por el usuario
            store.state.idPartida = idPartida;
            // Vinculamos datos locales con db
            store.state.db.ref(store.state.idPartida + '/datos/').on("value", snapshot => {
                store.state.datos = snapshot.val();
            }); // datos app
            store.state.db.ref(store.state.idPartida + '/jugadores/').on("value", snapshot => {
                store.state.jugadores = snapshot.val();
            }); // jugadores
            store.state.db.ref(store.state.idPartida + '/chat/').on("value", snapshot => {
                store.state.chat = snapshot.val(); //así va bien pero no es lo que toca
                // store.state.chat[snapshot.key]= snapshot.val();
            }); // chat
        },
// -------------- espera.vue
        borrarJugador(store) {
            store.state.db
                .ref('/' + store.state.idPartida + '/jugadores/' + store.state.idJugador)
                .remove();
        },
        borrarPartida(store) {
            store.state.db
                .ref('/' + store.state.idPartida)
                .remove();
        },
        iniciarPartida(store) {
            store.state.db
                .ref('/' + store.state.idPartida + '/datos/')
                .update({'iniciada': true});
        },
        setListo(store) {
            let estado = !store.state.jugadores[store.state.idJugador].listo;
            store.state.db
                .ref('/' + store.state.idPartida + '/jugadores/' + store.state.idJugador)
                .update({'listo': estado});
        },
        setNombre(store, nombre) {
            store.state.db
                .ref('/' + store.state.idPartida + '/jugadores/' + store.state.idJugador)
                .update({'nombre': nombre});
        },
        setFoto(store, url) {
            // ****** COMPLETAR *******
        },
// ---------------- juego - Chat
        pushMensaje(store, {mensaje, origen, lider}) {
            store.state.db
                .ref('/' + store.state.idPartida + '/chat/')
                .push({
                    'origen': origen,
                    'mensaje': mensaje,
                    'lider': lider,
                });
        },
// ---------------- juego
        setJugadorEquipo (store, jugador) {
            let faseActual = store.state.datos.faseActual;
            let lider =store.state.jugadores[store.state.idJugador].lider;
            if (faseActual === 0 && lider === true){
                // Si eres lider y estamos en la fase de elegir equipo fase '0'
                let toggle = !store.state.jugadores[jugador].equipo;
                store.state.db
                    .ref('/' + store.state.idPartida + '/jugadores/' + jugador)
                    .update({'equipo' : toggle});
            }
        },
        setVotoEquipo(store, voto){
            store.state.db
                .ref('/' + store.state.idPartida + '/jugadores/' + store.state.idJugador)
                .update({'votoEquipo': voto});
        },
        setVotoMision(store, voto){
            store.state.db
                .ref('/' + store.state.idPartida + '/jugadores/' + store.state.idJugador)
                .update({'votoMision': voto});
        },
        setFaseActual(store, fase){
            store.state.db
                .ref('/' + store.state.idPartida + '/datos/')
                .update({'faseActual': fase});
        },
        setLiderRechazadoVeces(store, veces){
            store.state.db
                .ref('/' + store.state.idPartida + '/datos/')
                .update({'liderRechazadoVeces': veces});
        },
    },

});

