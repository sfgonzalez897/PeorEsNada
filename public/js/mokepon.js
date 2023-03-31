const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotas = document.getElementById('botonMascotas')
const reinicioJuego = document.getElementById('brestart')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotajug = document.getElementById('mascotajug')

const spanMascotaenem = document.getElementById('mascotaenem')

const sectionReinicio = document.getElementById('reinicio')

const spanVidas1 = document.getElementById('vidasuno')
const spanVidas2 = document.getElementById('vidasdos')

const sectionMensajes = document.getElementById('resultado')
const ataqueJugadorr = document.getElementById('ataque-del-jugador')
const ataqueEnemigoo = document.getElementById('ataque-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador
let ataqueEnemigo = []
let vidasj = 3
let vidase = 3
let wins = 0
let winsPC = 0
let opcionDeMokepones
let inputHipodoge 
let mascotaJugador
let mascotaJugadorObjeto
let inputCapipepo 
let inputRatihuella
let inputVictortolo
let inputCostonto
let inputMimi
let opcionDeAtaques
let botonFuego
let botonAgua
let botonTierra
let botones = []
let ataqueDelJugador = []
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let intervalo

let mapaBackground = new Image()
mapaBackground.src = './assests/mokemap.png'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

const anchoMaximoDelMapa = 450

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)        
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }   
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho = 60,
            this.alto = 60
        )
    }
}

let patonto = new Mokepon('Patonto', './assests/patonto.png', 5, './assests/patontoMapa.png')
let josesino = new Mokepon('Josesino', './assests/josesino.png', 5,'./assests/josesino.png')
let elbol = new Mokepon('Elbol', './assests/mepng2.png', 5,'./assests/mepng2.png')
let victortolo = new Mokepon('Victortolo', './assests/victortolo.png', 5,'./assests/victortolo2.png')
let costonto = new Mokepon('Costonto', './assests/costonto.png', 5,'./assests/costonto2.png')
let mimi = new Mokepon('Mimi', './assests/mimi.png', 5,'./assests/mimi2.png')

const patonto_ataques = [
    { nombre: '💧', id: 'botonagua'},
    { nombre: '💧', id: 'botonagua'},
    { nombre: '💧', id: 'botonagua'},
    { nombre: '🔥', id: 'botonfuego'},
    { nombre: '🌱', id: 'botontierra'},
]

patonto.ataques.push(...patonto_ataques)

const josesino_ataques = [
    { nombre: '💧', id: 'botonagua'},
    { nombre: '🔥', id: 'botonfuego'},
    { nombre: '🔥', id: 'botonfuego'},
    { nombre: '🔥', id: 'botonfuego'},
    { nombre: '🌱', id: 'botontierra'},
]

josesino.ataques.push(...josesino_ataques)

const elbol_ataques = [ 
    { nombre: '💧', id: 'botonagua'},
    { nombre: '🔥', id: 'botonfuego'},
    { nombre: '🌱', id: 'botontierra'},
    { nombre: '🌱', id: 'botontierra'},
    { nombre: '🌱', id: 'botontierra'},
]

elbol.ataques.push(...elbol_ataques)

const victortolo_ataques = [
      { nombre: '💧', id: 'botonagua'},
    { nombre: '🔥', id: 'botonfuego'},
    { nombre: '🔥', id: 'botontierra'},
    { nombre: '🌱', id: 'botontierra'},
    { nombre: '🌱', id: 'botontierra'},
]

victortolo.ataques.push(...victortolo_ataques)

const costonto_ataques = [
    { nombre: '💧', id: 'botonagua'},
    { nombre: '💧', id: 'botonfuego'},
    { nombre: '🔥', id: 'botontierra'},
    { nombre: '🌱', id: 'botontierra'},
    { nombre: '🌱', id: 'botontierra'},
]

costonto.ataques.push(...costonto_ataques)


const mimi_ataques= [
    { nombre: '💧', id: 'botonagua'},
    { nombre: '💧', id: 'botonfuego'},
    { nombre: '🔥', id: 'botontierra'},
    { nombre: '🔥', id: 'botontierra'},
    { nombre: '🌱', id: 'botontierra'},
]

mimi.ataques.push(...mimi_ataques)

mokepones.push(patonto,josesino,elbol,victortolo,costonto,mimi)

function iniciarJuego() {
     
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
       opcionDeMokepones = `
       <input type="radio" name="mascota" id= ${mokepon.nombre} />
       <label class="tarjeta-de-mokepon" for= ${mokepon.nombre}>
           <p>${mokepon.nombre}</p>
           <img src=${mokepon.foto} alt="${mokepon.nombre}">
       </label>
       `
   contenedorTarjetas.innerHTML += opcionDeMokepones


       inputHipodoge = document.getElementById('Patonto')
       inputCapipepo = document.getElementById('Josesino')
       inputRatihuella = document.getElementById('Elbol')
       inputVictortolo = document.getElementById('Victortolo')
       inputCostonto = document.getElementById('Costonto')
       inputMimi = document.getElementById('Mimi')

   })

    
    sectionReinicio.style.display = 'none'
    botonMascotas.addEventListener('click',seleccionarmascotajugador)
    
    reinicioJuego.addEventListener('click',reiniciarJuego)


    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.30:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarmascotajugador() {

    //sectionSeleccionarAtaque.style.display = 'flex'

     if(inputHipodoge.checked) {
      spanMascotajug.innerHTML = inputHipodoge.id
      mascotaJugador = inputHipodoge.id
     } else if(inputCapipepo.checked) {
      spanMascotajug.innerHTML = inputCapipepo.id
      mascotaJugador = inputCapipepo.id
     } else if(inputRatihuella.checked) {
      spanMascotajug.innerHTML = inputRatihuella.id
      mascotaJugador = inputRatihuella.id
     } else if (inputVictortolo.checked) {
      spanMascotajug.innerHTML = inputVictortolo.id
      mascotaJugador = inputVictortolo.id
    }  else if (inputCostonto.checked) {
      spanMascotajug.innerHTML = inputCostonto.id
      mascotaJugador = inputCostonto.id
    }  else if (inputMimi.checked) {
      spanMascotajug.innerHTML = inputMimi.id
      mascotaJugador = inputMimi.id
    }  else {
        alert("No ha seleccionado una mascota 😵‍💫")
        return
    }

    sectionSeleccionarMascota.style.display = 'none'
    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
} 

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.30:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataquess
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataquess = mokepones[i].ataques
        }
        
    }
    
    mostrarAtaques(ataquess)
}

function mostrarAtaques(ataquess) {
    ataquess.forEach((ataque) => {
        opcionDeAtaques = `<button id=${ataque.id} class="ataques BAtaque">${ataque.nombre}</button>
        `
    contenedorAtaques.innerHTML += opcionDeAtaques
    })

    botonFuego = document.getElementById('botonfuego')
    botonAgua = document.getElementById('botonagua')
    botonTierra = document.getElementById('botontierra')

    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) => {
           if (e.target.textContent === '🔥') {
              ataqueDelJugador.push('fuego')              
              boton.style.background = '#112f58'
              boton.disabled = true
            } else if (e.target.textContent === '💧') {
              ataqueDelJugador.push('agua')              
              boton.style.background = '#112f58'
              boton.disabled = true
            } else {
                ataqueDelJugador.push('tierra')
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueDelJugador.length === 5){
                enviarAtaques()
            }
            
        })
        
    })
    
}

function enviarAtaques() {
    fetch(`http://192.168.1.30:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueDelJugador
        })
    })  
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.30:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                  .then(function ({ataques}) {
                    if (ataques.length === 5) { console.log(ataques)
                    ataqueEnemigo = ataques
                     combate()
                    }
                })
            }
        })
}

function seleccionarmascotaenem(enemigo) {
   spanMascotaenem.innerHTML = enemigo.nombre
   ataquesMokeponEnemigo = enemigo.ataques
   secuenciaAtaque()
}



function ataqueE() {

    op = aleatorio(0,ataquesMokeponEnemigo.length -1)
    console.log("op.main = " + op)
    if (ataquesMokeponEnemigo[op].nombre == '🔥'){
        ataqueEnemigo.push('fuego') 
        ataquesMokeponEnemigo[op].nombre = 'usado'
        iniciarPelea()
        
    } else if(ataquesMokeponEnemigo[op].nombre == '💧'){
        ataqueEnemigo.push('agua')
        ataquesMokeponEnemigo[op].nombre = 'usado'
        iniciarPelea()
    
    } else if(ataquesMokeponEnemigo[op].nombre == 'usado'){
        console.log('enemigo repite')
        cambiarOP(op)
    } else {
        ataqueEnemigo.push('tierra')
        ataquesMokeponEnemigo[op].nombre = 'usado'
        iniciarPelea()
        
    }
    console.log(ataqueEnemigo)
    console.log(ataquesMokeponEnemigo)
}

function cambiarOP(op) {

    let op2 = op
    while(op2 === op) {

    op2 = aleatorio(0,ataquesMokeponEnemigo.length -1)    

        if (op2 !== op) {

            console.log("op = " + op,"op2 = " + op2)
            if (ataquesMokeponEnemigo[op2].nombre == '🔥'){
                ataqueEnemigo.push('fuego') 
                ataquesMokeponEnemigo[op2].nombre = 'usado'
            } else if(ataquesMokeponEnemigo[op2].nombre == '💧'){
                ataqueEnemigo.push('agua')
                ataquesMokeponEnemigo[op2].nombre = 'usado'   
            } else if(ataquesMokeponEnemigo[op2].nombre == '🌱'){ 
                ataqueEnemigo.push('tierra')
                ataquesMokeponEnemigo[op2].nombre = 'usado'  
            } else {
              op2 = op
            }
            console.log(ataqueEnemigo)
            console.log(ataquesMokeponEnemigo)
            iniciarPelea()
        } 
    }
}

function iniciarPelea() {
    if (ataqueEnemigo.length == 5 && ataqueDelJugador.length == 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador,enemigo) {
    indexAtaqueJugador = ataqueDelJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    clearInterval(intervalo)

    for (let index = 0; index < ataqueDelJugador.length; index++) {
        if(ataqueDelJugador[index] == ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index)
            crearMensaje("Empatee, vuelve a jugar 😤😤")
        } else if (ataqueDelJugador[index] == 'fuego' && ataqueEnemigo[index] == 'tierra' || ataqueDelJugador[index] == 'agua' && ataqueEnemigo[index] == 'fuego' || ataqueDelJugador[index] == 'tierra' && ataqueEnemigo[index] == 'agua') {
            indexAmbosOponentes(index,index)
            crearMensaje("Ganaste!! 😊👌👌 ")
            // spanVidas2 = document.getElementById('vidasdos')
            wins++
            spanVidas1.innerHTML = wins
        } else {
            indexAmbosOponentes(index,index)
            crearMensaje("Perdiste! 😭😭😔 ")   
            // spanVidas1 = document.getElementById('vidasuno')
            winsPC++
            spanVidas2.innerHTML = winsPC
        }     
    }
    revisarVidas()
}

function revisarVidas() {
    if(wins == winsPC){
        crearMensajeFinal("Es un Empate!! 🤔🤔")
    } else if(wins > winsPC) {
        crearMensajeFinal("Ganaste!!! has superado al enemigo 😁")
    } else {
        crearMensajeFinal("Has sido derrotado por el enemigo. Vuellve a intentarlo :c")
    }
}


function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueJugadorr.appendChild(nuevoAtaqueDelJugador)
    ataqueEnemigoo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadofinal) {
    sectionMensajes.innerHTML = resultadofinal 
    
    sectionReinicio.style.display = 'flex'
}

function reiniciarJuego() {
    location.reload()
}


function aleatorio(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
        )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion( mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x,y) {
    fetch(`http://192.168.1.30:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if (res.ok) {
            res.json()
             .then(function ({enemigos}) {
                    console.log(enemigos)
                    mokeponesEnemigos= enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Patonto") {
                            mokeponEnemigo = new Mokepon('Patonto', './assests/patonto.png', 5, './assests/patontoMapa.png', enemigo.id)
                        } else if (mokeponNombre === "Josesino") {
                            mokeponEnemigo = new Mokepon('Josesino', './assests/josesino.png', 5, './assests/josesino.png', enemigo.id)
                        } else if(mokeponNombre === "Elbol") {
                            mokeponEnemigo = new Mokepon('Elbol', './assests/mepng2.png', 5, './assests/mepng2.png', enemigo.id)
                        } else if (mokeponNombre === "Victortolo") {
                            mokeponEnemigo = new Mokepon('Victortolo', './assests/victortolo.png', 5, './assests/victortolo2.png', enemigo.id)
                        } else if (mokeponNombre === "Costonto") {
                            mokeponEnemigo = new Mokepon('Costonto', './assests/costonto.png', 5, './assests/costonto2.png', enemigo.id)
                        } else if (mokeponNombre === "Mimi") {
                            mokeponEnemigo = new Mokepon('Mimi', './assests/mimi.png', 5, './assests/mimi2.png', enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })    
             })
                
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    
    mascotaJugadorObjeto.velocidadX = -5
}

function detenerMovimiento() {
    
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {

    const arribaEnemigo    = enemigo.y
    const abajoEnemigo     = enemigo.y + enemigo.alto
    const derechaEnemigo   = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota    = mascotaJugadorObjeto.y
    const abajoMascota     = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota   = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    // alert("hay colision" + enemigo.nombre)
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarmascotaenem(enemigo)

}


 window.addEventListener('load',iniciarJuego)