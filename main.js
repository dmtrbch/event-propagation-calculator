let stringNumber = '0';
        let numbersToCalculate = {
            numbers: [],
            operands: []
        }
        let result = 0;

        function isSymbol() {
            if(event.target.innerText === '+' || event.target.innerText === '-' || 
               event.target.innerText === '×'|| event.target.innerText === '÷' || 
               event.target.innerText === '=' || event.target.innerText === 'C' ||
               event.target.innerText === '←' ) {
                   return true;
               }
            else {
                return false;
            }
        }

        function removeDigit() {
            let stringToCharArray = '';
            stringToCharArray = stringNumber.split('');
            stringToCharArray.pop();
            if(stringToCharArray.length === 0) {
                stringNumber = '0';
            } else {
                stringNumber = stringToCharArray.join('');
            }    
        }

        function setInitialScreen() {
            document.querySelector('.calculator-screen').innerText = '0';
            stringNumber = '0';
        }

        function setInitialValue() {
            result = 0;
            numbersToCalculate.numbers = [];
            numbersToCalculate.operands = [];
        }

        function mathematicalOperations() {
            result = numbersToCalculate.numbers.shift();
            numbersToCalculate.operands.forEach(function(operand, index) {
                switch(operand) {
                    case '+':
                        result += numbersToCalculate.numbers[index];
                        break;
                    case '-':
                        result -= numbersToCalculate.numbers[index];
                        break;
                    case '×':
                        result *= numbersToCalculate.numbers[index];
                        break;
                    case '÷':
                        result /= numbersToCalculate.numbers[index];
                        break;
                }
            });
        }

        function calculate (number) {

            switch(event.target.innerText) {
                //instead of using this i can use default:
                case '+':
                case '-':
                case '×':
                case '÷':
                    numbersToCalculate.numbers.push(number);
                    numbersToCalculate.operands.push(event.target.innerText)
                    setInitialScreen();
                    break;
                case '=':
                    numbersToCalculate.numbers.push(number);
                    mathematicalOperations();
                    if(result !== 0) {
                        document.querySelector('.calculator-screen').innerText = result.toString();
                        stringNumber = '0';
                        setInitialValue();
                    } 
                    else {
                        setInitialScreen();
                    }
                    break;
                case 'C':
                    setInitialValue();
                    setInitialScreen();
                    break;
                case '←':
                    removeDigit();
                    document.querySelector('.calculator-screen').innerText = stringNumber;
                    break;
            }
        }

        document.querySelector('.calculator-form-layout').addEventListener('click', function(event) {
            //check if the clicked element is button
            if(event.target.tagName === 'BUTTON') {

                //check if the clicked element is symbol
                if(isSymbol()) {
                    calculate(parseInt(stringNumber));
                }
                else {
                    //clicked element must be digit since it comes to this else

                    if(stringNumber === '0' && event.target.innerText !== '0') {
                        stringNumber = event.target.innerText;
                    }
                    else if(stringNumber === '0' && event.target.innerText === '0') {
                        stringNumber = '0';
                    }
                    else {
                        stringNumber += event.target.innerText;
                    }
                    document.querySelector('.calculator-screen').innerText = stringNumber;
                }
            }
            event.stopPropagation();
        });