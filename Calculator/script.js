//To store operands selected by user 
class Calculator {        
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement      //store first operand in previous-operand
    this.currentOperandTextElement = currentOperandTextElement        //store second operand in current-operand
    this.clear()                                                      //to clear display
  }

  
  clear() {                                                           //It will clear the display
    this.currentOperand = ''                                          //clear first-operand
    this.previousOperand = ''                                         //clear second-operand
    this.operation = undefined                                        
  }
  
  delete() {                                                          //delete current-operand one-by-one
    this.currentOperand = this.currentOperand.toString().slice(0, -1) //slice is used to remove last character of string
  }
  
                                                                      
  appendNumber(number) {                                              //for operation decimal numbers
    if (number === '.' && this.currentOperand.includes('.')) return   //it check the input number is decimal number (or not) OR only one decimal point
    this.currentOperand = this.currentOperand.toString() + number.toString() //format the decimal with input number
  }
 
  chooseOperation(operation) {                                   //function for choose operation
    if (this.currentOperand === '') return                       //if second operand is empty return nothing
    if (this.previousOperand !== '') {                           //if first operand is not empty 
      this.compute()                                             //compute function called to perform mathematical operation
    }
    this.operation = operation                                   //operation selected stored
    this.previousOperand = this.currentOperand          //operation computed and stored in previous-operand area
    this.currentOperand = ''                                     //then current-operand area empty
  }

  compute() {                                                   //perform mathematical operation
    let computation                                             //initilizes a variable computation                   
    const prev = parseFloat(this.previousOperand)                //conversion into float
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return                    //if not a number
    switch (this.operation) {                                    //switch statement to choose which operation is to be performed
      case '+':                                                  //case for addition
        computation = prev + current
        break
      case '-':                                                   //case for sub
        computation = prev - current
        break
      case '*':                                                   //case for multiply
        computation = prev * current
        break
      case '÷':                                                   //case for divide
        computation = prev / current
        break
      default:                                                    //if any of above case doesn't match
        return
    }
    this.currentOperand = computation                             //after complete compution result will store in current-operand area
    this.operation = undefined
    this.previousOperand = ''                                     //perious-operand will clear
    return computation                                             //return result of computation
    
  }
  clearDisplay() {                                                //for all clear display
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    this.updateDisplay()                                          //update function called
  }

  getDisplayNumber(number) {                                      //to format input number to display on screen
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])  //convert number into string
    const decimalDigits = stringNumber.split('.')[1]              //separate number and decimal component
    let integerDisplay                                            //initilize a variable
    if (isNaN(integerDigits)) {                                   //is result is not a int number the it will empty
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })  //convert into string with decimal number(toLocaleString) and no decimal digits are included in the output string( maximumFractionDigits:0)
    }
    if (decimalDigits != null) {                                   //if decimal digit is not null
      return `${integerDisplay}.${decimalDigits}`                  //format number with decimal as a separator
    } else {
      return integerDisplay                                        //return formated number to display on screen
    }
  }

  updateDisplay() {                                                         //function for update
    this.currentOperandTextElement.innerText =                              
      this.getDisplayNumber(this.currentOperand)                            //getdisplaynumber is responsible for display on the screen
    if (this.operation != null) {                                           //if operation is selected it will format with previous operand
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''                        //else empty it
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')                  //to connect html buttons to js buttons
const operationButtons = document.querySelectorAll('[data-operation]')            
const equalsButton = document.querySelector('[data-equals]')                      
const deleteButton = document.querySelector('[data-delete]')                         
const allClearButton = document.querySelector('[data-all-clear]')                      
const previousOperandTextElement = document.querySelector('[data-previous-operand]')  
const currentOperandTextElement = document.querySelector('[data-current-operand]')   

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)   

numberButtons.forEach(button => {                                                 
  button.addEventListener('click', () => {                                   //on click of number button number is selected e.g first num=2
    calculator.appendNumber(button.innerText)                                //change the number when selected next      e.g on next click=23
    calculator.updateDisplay()                                               //on every click display will update
  })
})

operationButtons.forEach(button => {                                         //on click of operation button operation will be selected
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)                             //chooseOperation button called
    calculator.updateDisplay()                                               //update display                          
  })
})

equalsButton.addEventListener('click', button => {                           //for equals button
  calculator.compute()                                                       //compute funtion called                      
  calculator.updateDisplay()                                                 //update display
})

allClearButton.addEventListener('click', button => {                         //for all clear button        
  calculator.clear()                                                         //clear function called              
  calculator.updateDisplay()                                                 //update display
})

deleteButton.addEventListener('click', button => {                           //on click delete
  calculator.delete()                                                        //delete function called                  
  calculator.updateDisplay()                                                 //update display                   
})