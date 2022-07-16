// get html elements
let buttons_container = document.getElementById('calculator');
let displayCurrent = document.getElementById('displayCurrent');
let displayFinal = document.getElementById('displayFinal');

// event listeners
buttons_container.addEventListener('click', function(event){ calculatorFun(event) },false);

// variables
let currentCalculationString = "0";
let finalCalculationString = "";
let displayCurrentCalculation = "0";
let displayFinalCalculation = "";
const numbers = [0-9];
const operators = ["*","×", "/", "÷", "+","-"];
const specials = [".", "(", ")"];
let showingResult = false;


// functions
function resetCalculator(){
    currentCalculationString = "0";
    finalCalculationString = "";
    displayCurrentCalculation = "0";
    displayFinalCalculation = "";
}

function updateDisplay(data){
    if(data.current.update == true){
        displayCurrentCalculation = data.current.value;
        displayCurrent.innerText = displayCurrentCalculation;
    }
    if(data.final.update == true){
        displayFinalCalculation = data.final.value
        displayFinal.innerText = displayFinalCalculation;
    }

}

function solveCalculation(input){
    console.log(`this calculation enteres the function: ${input}`)
    let calculation = validateOperator(input);

    console.log(`this calculation is leaving the function: ${calculation}`)
    console.log(`i'm going to return ${eval(calculation)}`)
    return String(eval(calculation));
}

function validateOperator(input){
    return input.replace(/÷/g, "\/").replace(/×/g, "*");
}

function validateSpecial(input){

    if(input === "."){
        let decimalPattern = /\./;
        if( decimalPattern.test(currentCalculationString) ){
            return ""
        }
    }
    
    return input
}

function validateNumber(input){
    if(input === "0"){
        let zeroPattern = /^0+[^1-9]/;
        let tempString = currentCalculationString + input
        if( zeroPattern.test(tempString) ){
            return ""
        }       
    }

    return input
}

function updateCalculations(input, attribute){
    if(input === ""){
        return
    }

    if(attribute === 'result'){
        console.log(`current is: ${currentCalculationString}`);
        console.log(`final is: ${finalCalculationString}`);
        finalCalculationString = finalCalculationString + currentCalculationString;
        console.log(`final is now: ${finalCalculationString}`);
        return;
    }

    const lastInput = currentCalculationString.substring(currentCalculationString.length - 1)

    if((attribute === 'number' || (input === "(" || ")")) && currentCalculationString === "0"){
        currentCalculationString = input;
        updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: false}})
        
        return;
    }
    
    if(attribute === 'number'){
        if(operators.includes(lastInput)){
            finalCalculationString = finalCalculationString + currentCalculationString;
            currentCalculationString = input;
            updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: true, value: finalCalculationString}})
        }
        else {
            currentCalculationString = currentCalculationString + input;
            updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: false}})
            
        }

        return;

    }

    if(attribute === 'operator' && input !== "-" && lastInput !== "-"){
        // if the last input was an operator, replace it with the current input
        if(operators.includes(lastInput)){
            currentCalculationString = currentCalculationString.replace(/.$/,input);
        }
        // add the current input to current
        else {
            currentCalculationString = currentCalculationString + input;
        }
        
        updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: false}});
        return;
    }

    if(input === "."){
        currentCalculationString = currentCalculationString + input;
        updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: false}})
        return;
    }

    if(lastInput === "-" || input === "-"){
        currentCalculationString = currentCalculationString + input;
        updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: false}})

        if(/^[0-9][*×/÷+]-[*×/÷+]/.test(currentCalculationString+input)){
            currentCalculationString = currentCalculationString.replace(/[*×/÷+]-[*×/÷+]/,input);
            updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: false}});
            return;
        }
        

    }

}

function calculatorFun(event){
    let attribute = event.target.getAttribute('data-button-type');
    let eventText = event.target.innerText;

    if(showingResult === true){
        if(attribute === 'number'){
            currentCalculationString = "";
        }
        showingResult = false;
    }

    switch(attribute){
        case 'clear':
            resetCalculator();
            updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: true, value: finalCalculationString}});
            break;
        case 'result':
            updateCalculations(eventText, attribute);
            const result = solveCalculation(finalCalculationString);
            console.log(result)
            currentCalculationString = result;
            console.log(currentCalculationString)
            finalCalculationString = "";
            console.log(finalCalculationString)
            updateDisplay({current:{update: true, value: currentCalculationString}, final:{update: true, value: finalCalculationString}});
            showingResult = true;
            break;
        case 'operator':
        case 'special':
            eventText = validateSpecial(eventText);
        case 'number':
            eventText = validateNumber(eventText);
            updateCalculations(eventText, attribute);
            break;
        default:
            console.log('unexpected button pressed!');
            break;
    };

}