const pantalla = document.querySelector('.pantalla');
let operacionPendiente = '';
let numeroAnterior = '';
let operadorActual = null;
let reiniciarPantalla = false;

function agregar(valor) {
    if (reiniciarPantalla) {
        pantalla.value = '';
        reiniciarPantalla = false;
    }

    if (['+', '-', '*', '/', '√'].includes(valor)) {
        if (operadorActual !== null && operadorActual !== '√') {
            calcular(); //en este if se indica que se realicen cualquier operacion pendiente siempre que no sea raiz
        }

        if (valor === '√') {
            operadorActual = '√';
            calcular();  //este if hace que se calcule la raiz despues de agregar un solo numero
        } else {
            numeroAnterior = pantalla.value;
            operadorActual = valor;
            reiniciarPantalla = true;
        }
    } else {
        pantalla.value += valor;
    }
}


function limpiar() {
    pantalla.value = '';
    operacionPendiente = '';
    numeroAnterior = '';
    operadorActual = null;
}

function calcular() {
    if (operadorActual === null || reiniciarPantalla) return;

    let resultado;

    if (operadorActual === '√') { //para calcular raiz usamos un nuevo numero, ya que no necesitamos de dos valores para hacer este calculo, 
        const numeroRaiz = parseFloat(pantalla.value);
        if (numeroRaiz < 0) {
            pantalla.value = 'Error';
            setTimeout(limpiar, 1500);
            return;
        }
        resultado = Math.sqrt(numeroRaiz);
    } else {
        const numero1 = parseFloat(numeroAnterior);
        const numero2 = parseFloat(pantalla.value);

        if (isNaN(numero1) || isNaN(numero2)) {
            pantalla.value = 'Error';
            setTimeout(limpiar, 1500);
            return;
        }

        switch (operadorActual) {
            case '+':
                resultado = numero1 + numero2;
                break;
            case '-':
                resultado = numero1 - numero2;
                break;
            case '*':
                resultado = numero1 * numero2;
                break;
            case '/':
                if (numero2 === 0) {
                    pantalla.value = 'Error';
                    setTimeout(limpiar, 1500);
                    return;
                }
                resultado = numero1 / numero2;
                break;

        }
    }

    resultado = Math.round(resultado * 100000000) / 100000000;
    pantalla.value = resultado;
    operadorActual = null;
    numeroAnterior = '';
    reiniciarPantalla = true;
}

function retroceder() {
    pantalla.value = pantalla.value.slice(0, -1);
}

// Manejo de eventos del teclado
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;

    // Números y operadores
    if (/[0-9\+\-\*\/\.]/.test(key)) {
        agregar(key);
    }

    // Tecla Enter para calcular
    else if (key === 'Enter') {
        calcular();
    }

    // Tecla Escape para limpiar
    else if (key === 'Escape') {
        limpiar();
    }

    // Tecla backspace para borrar el último carácter
    else if (key === 'Backspace') {
        retroceder();
    }
});
