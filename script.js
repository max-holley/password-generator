const button = document.getElementById("generate")
const text = document.getElementById("password")
const slider = document.getElementById("slider")
const passwordLength = document.getElementById("password-length")
const optionsInputs = document.querySelectorAll(".option")
let characters = ["A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z"]
const numbers = ["1","2","3","4","5","6","7","8","9","0"]
const symbols = ["!","@","£","$","%","^","&","*","(",")"]
let options = {
    numbers: true,
    symbols: true
}

optionsInputs.forEach(input => {
    input.addEventListener("click",() => {

        options[input.id] = input.checked
        const label = document.getElementById(`${input.id}-label`)
        label.classList.toggle("active-option")
        text.innerHTML = ""

    })
})

passwordLength.innerHTML = `Length: ${slider.value}`;

slider.oninput = function() {
  passwordLength.innerHTML = `Length: ${this.value}`;
  text.innerHTML = ""
}

button.addEventListener("click", () => {

    const length = parseInt(slider.value)

    const newChars = createArray()

    let password = ""

    for(let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * newChars.length)
        password = password + newChars[randomNumber]
    }
    text.innerHTML = password
})

function createArray() {
    let tempArray = [...characters]
    if(options.numbers) {
        tempArray = [
            ...tempArray,
            ...numbers
        ]
    }
    if(options.symbols) {
        tempArray = [
            ...tempArray,
            ...symbols
        ]
    }
    return tempArray
}

const copyContent = async () => {

    if(text.innerHTML.toString() === "") return
    const copySvg = document.querySelector(".copy-svg")
    const copySvgComplete = document.querySelector(".copy-svg-complete")
    const copyButton = document.querySelector(".copy-button")
    try {

        await navigator.clipboard.writeText(text.innerHTML.toString());
       
        copySvgComplete.style.animation = "copy-svg-complete-active 2000ms ease 0ms 1"
        copySvg.style.animation = "copy-svg-active 2000ms ease 0ms 1"

        setTimeout(() => {
            copySvgComplete.style.animation = ""
            copySvg.style.animation = ""
        },2000)

    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}