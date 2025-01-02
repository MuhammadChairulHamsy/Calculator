"use strict";

const calculator = {
    displayNumber: '0', // Untuk menampilkan angka saat ini
    calculationDisplay: '', // Untuk menampilkan proses kalkulasi lengkap
    operator: null, // Untuk menyimpan operator
    firstNumber: null, // Untuk menyimpan angka pertama
    isWaitForSecondNumber: false, // Menandai apakah menunggu input angka kedua
};

function updateNumber(displayContent = null) {
    // Menampilkan angka atau proses kalkulasi di layar
    document.querySelector("#displayNumber").textContent = displayContent || calculator.calculationDisplay || calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.calculationDisplay = '';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
    updateNumber();
}

function inputNumber(digit) {
    if (calculator.isWaitForSecondNumber) {
        // Jika sedang menunggu angka kedua, reset displayNumber
        calculator.displayNumber = digit;
        calculator.isWaitForSecondNumber = false;
    } else {
        calculator.displayNumber = calculator.displayNumber === '0' ? digit : calculator.displayNumber + digit;
    }

    // Update tampilan proses kalkulasi
    calculator.calculationDisplay += digit;
    updateNumber();
}

function handleOperator(operator) {
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.firstNumber = calculator.displayNumber;
        calculator.isWaitForSecondNumber = true;

        // Update tampilan proses kalkulasi
        calculator.calculationDisplay += ` ${operator} `;
        updateNumber();
    } else {
        // Jika operator sudah ditetapkan sebelumnya
        alert("Operator sudah ditetapkan. Selesaikan operasi sebelumnya terlebih dahulu.");
    }
}

function performCalculator() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Operator atau angka pertama belum ditetapkan.");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else if (calculator.operator === "-") {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    } else if (calculator.operator === "x") {
        result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
    } else if (calculator.operator === "/") {
        if (calculator.displayNumber === "0") {
            alert("Tidak bisa membagi dengan nol.");
            return;
        }
        result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
    }

    const history = {
        firstNumber: calculator.firstNumber,
        operator: calculator.operator,
        secondNumber: calculator.displayNumber,
        result: result
    };
    putHistory(history); // Simpan riwayat
    renderHistory(); // Perbarui tabel riwayat

    // Update hasil dan reset kalkulator
    calculator.displayNumber = result.toString();
    calculator.calculationDisplay = result.toString(); // Tampilkan hasil akhir
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;

    updateNumber();
}

function inverseNumber() {
    if (calculator.displayNumber !== '0') {
        calculator.displayNumber = (parseInt(calculator.displayNumber) * -1).toString();
        calculator.calculationDisplay = calculator.calculationDisplay.slice(0, -1) + calculator.displayNumber; // Perbarui tampilan
    }
    updateNumber();
}

const buttons = document.querySelectorAll(".button");

for (const button of buttons) {
    button.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("clear")) {
            clearCalculator();
            return;
        }

        if (target.classList.contains("negative")) {
            inverseNumber();
            return;
        }

        if (target.classList.contains("equals")) {
            performCalculator();
            return;
        }

        if (target.classList.contains("operator")) {
            handleOperator(target.innerText);
            return;
        }

        inputNumber(target.innerText); // Masukkan angka ke kalkulator
    });
}
