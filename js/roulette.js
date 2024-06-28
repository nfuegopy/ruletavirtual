var objRuleta;
var winningSegment;
var distnaciaX = 150;
var distnaciaY = 50;
var ctx;

function Mensaje() {
    winningSegment = objRuleta.getIndicatedSegment();
    SonidoFinal();
    swal({
        title: " ¡Ganaste " + winningSegment.text + " !",
        imageUrl: "img/Muerte.gif",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "Reiniciar",
        cancelButtonText: "Continuar",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function (isConfirm) {
        if (isConfirm) {

        } else {
            leerElementos();
        }
        objRuleta.stopAnimation(false);
        objRuleta.rotationAngle = 0;
        objRuleta.draw();
        DibujarTriangulo();
        bigButton.disabled = false;
    });
}

function DibujarTriangulo() {
    ctx = objRuleta.ctx;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(distnaciaX + 170, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 230, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 200, distnaciaY + 40);
    ctx.lineTo(distnaciaX + 171, distnaciaY + 5);
    ctx.stroke();
    ctx.fill();
}

function DibujarRuleta(ArregloElementos) {
    objRuleta = new Winwheel({
        'canvasId': 'Ruleta',
        'numSegments': ArregloElementos.length,
        'outerRadius': 270,
        'innerRadius': 80,
        'segments': ArregloElementos,
        'animation': {
            'type': 'spinToStop',
            'duration': 4,
            'spins': 20,
            'callbackFinished': 'Mensaje()',
            'callbackAfter': 'DibujarTriangulo()'
        },
    });
    DibujarTriangulo();
}

function leerElementos() {
    var txtListaElementos = $('#ListaElementos').val().trim();
    var Elementos = txtListaElementos.split('\n');
    var ElementosRuleta = [];
    Elementos.forEach(function (Elemento) {
        var cantidad = 3;  // Ajusta la cantidad base para todos los elementos
        if (Elemento === "Gs. 200.000" || Elemento === "Gs. 50.000") {
            cantidad = 1;  // Reduce la cantidad para estos premios específicos
        }
        for (var i = 0; i < cantidad; i++) {
            ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': Elemento });
        }
    });

    mezclarElementosRuleta(ElementosRuleta);  // Mezclar los elementos antes de dibujar la ruleta
    DibujarRuleta(ElementosRuleta);
}

function mezclarElementosRuleta(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

leerElementos();


var audio = new Audio('alama.mp3');  // Create audio object and load desired file.
function SonidoFinal() {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}
