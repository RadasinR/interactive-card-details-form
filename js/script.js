/* create backup data for reset after continue */
const DEFAULTS = {
    cardHolder: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    cardCVC: "000",
    cardExpMM: "00",
    cardExpYY: "00",
}
/* disable default iput error */
window.onload = () => {
    let inputs = document.querySelectorAll(".input__card");
    for (let input of inputs) {
        input.addEventListener("input", (event) => {
            event.preventDefault();
            /* remove error state */
            input.classList.remove("invalid");
           
            input.nextElementSibling.innerText = "";

            let display = document.getElementById(input.name);
            if (input.value) {
                display.innerText = input.value;
            } else {
                display.innerText = DEFAULTS[input.name];
            }
        });
    }

    document.querySelector(".form__card").addEventListener("submit", (event) => {
        let inputs = document.querySelectorAll(".input__card");
        event.preventDefault();
        let valid = true;
        for (let input of inputs) {
            switch (input.name) {
                case "cardHolder":
                    if (!input.value) {
                        error(input, "Can't be blank.");
                        valid = false;
                    }
                    break;
                case "cardNumber":
                    if (!input.value) {
                        error(input, "Can't be blank.");
                        valid = false;
                        break;
                    }
                    const pattern = /\d{4} \d{4} \d{4} \d{4}/;
                    let match = pattern.exec(input.value);
                    if (!match) {
                        error(input, "Wrong format, numbers only.")
                        valid = false;
                    }
                    break;
                case "cardExpMM": case "cardExpYY": {
                    if (!input.value) {
                        error(input, "Can't be blank.");
                        valid = false;
                        break;
                    }
                    let number = Number(input.value);
                    if (isNaN(number)) {
                        error(input, "Wromg format, numbers only.");
                        valid = false;
                    }
                    break;
                }
                case "cardCVC": {
                    if (!input.value) {
                        error(input, "Can't be blank.");
                        valid = false;
                        break;
                    }

                    if (!/\d\d\d/.test(input.value)) {
                        error(input, "CVC must be a 3 digit number.");
                        valid = false;
                        break;
                    }
                   
                }
            }

        }
        if (valid) {
            hidden();
        }
    });
}

function error(input, message) {
    input.classList.add("invalid");
    input.nextElementSibling.innerText = message;
}

function reset() {
    hidden();
    document.querySelector(".form__card").reset();
}


function hidden() {
    let form = document.querySelector(".form__card");
    let thanks = document.querySelector(".submited");
    thanks.classList.toggle("hidden");
    form.classList.toggle("hidden");
}
