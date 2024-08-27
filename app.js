// Selección de elementos del DOM
let textareaInput = document.querySelector("#textarea-input");
let textareaOutputContainer = document.querySelector("#textarea-output-container");
let textareaOutput = document.querySelector(".container__output__textarea");
let textWarning = document.querySelector(".container__warning__text");
let buttonTextCopy = document.querySelector(".text__button");
let buttonImgCopy = document.querySelector(".img__copy");
let buttonImgCopied = document.querySelector(".img__copied");
let imgOutput = document.querySelector("#doll");

// Mapa de encriptación
const map = new Map([
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
]);

// Función para encriptar palabras
const encryptWords = (words) => {
    if (!words) return '';
    return words.split('').map(letter => map.get(letter) || letter).join('');
}

// Función para desencriptar palabras
const decryptWords = (words) => {
    if (!words) return '';
    return words
        .replace(/ai/gi, "a")
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");
}

// Funciones para mostrar u ocultar elementos
const hideElement = (element) => element.style.display = "none";
const showElement = (element) => element.style.display = "block";

// Función para mostrar un mensaje en un elemento
const showMessage = (element, message) => element.value = message;

// Función para mostrar una advertencia temporal
const showWarning = (element, initialMessage, initialColor, temporaryMessage, temporaryColor) => {
    const originalColor = initialColor;

    element.textContent = temporaryMessage;
    element.style.color = temporaryColor;

    setTimeout(() => {
        element.textContent = initialMessage;
        element.style.color = originalColor;
    }, 2000);
};

// Función para verificar si el texto está en minúsculas y no contiene caracteres especiales
const isLowercaseWithoutSpecials = (text) => /^[a-z0-9\s]+$/.test(text);

// Función para copiar texto al portapapeles
const copyToClipboard = () => {
    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(textareaOutput.value);
            showWarning(buttonTextCopy, 'Copiar texto', '#0A3871', "¡Texto copiado!", '#0A3871');

            hideElement(buttonImgCopy);
            showElement(buttonImgCopied);

            setTimeout(() => {
                hideElement(buttonImgCopied);
                showElement(buttonImgCopy);
            }, 2000);
        } catch (err) {
            console.error('Error al copiar: ', err);
        }
    }
    copyContent();
}

// Función para procesar el texto (encriptar o desencriptar)
const processText = (action) => {
    let words = textareaInput.value;

    if (!words) {
        showWarning(textWarning, "Solo letras minúsculas y sin acentos", '#495057', "¡Por favor ingresa texto antes de encriptar!", 'red');
        hideElement(textareaOutputContainer);
        showElement(imgOutput);
    } else if (!isLowercaseWithoutSpecials(words)) {
        showWarning(textWarning, "Solo letras minúsculas y sin acentos", '#495057', "Solo letras minúsculas y sin acentos", 'red');
        hideElement(textareaOutputContainer);
        showElement(imgOutput);
    } else if (action === "encrypt") {
        hideElement(imgOutput);
        showElement(textareaOutputContainer);
        showMessage(textareaOutput, encryptWords(words));
        showMessage(textareaInput, "");
    } else if (action === "decrypt") {
        hideElement(imgOutput);
        showElement(textareaOutputContainer);
        showMessage(textareaOutput, decryptWords(words));
        showMessage(textareaInput, "");
    }
}