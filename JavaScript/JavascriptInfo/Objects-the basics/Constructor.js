/*
Create a constructor function Accumulator(startingValue).

Object that it creates should:

Store the “current value” in the property value. The starting value is set to the argument of the constructor startingValue.
The read() method should use prompt to read a new number and add it to value.
*/
function Accumulator(startingValue) {
    this.value = startingValue;
    read = function() {
        this.value += prompt("Value = ?", 0);
    }
}

/*
Create a constructor function Calculator that creates “extendable” calculator objects.
The task consists of two parts.
First, implement the method calculate(str) that takes a string like "1 + 2" in the format “NUMBER operator NUMBER” (space-delimited) and returns the result. Should understand plus + and minus -.
Then add the method addOperator(name, func) that teaches the calculator a new operation. It takes the operator name and the two-argument function func(a,b) that implements it.
*/
function Calculator() {
    function Calculator() {
    
      let methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b
      };
    
      this.calculate = function(str) {
    
        let split = str.split(' '),
          a = parseInt(split[0]),
          op = split[1],
          b = parseInt(split[2])
    
        if (!methods[op] || isNaN(a) || isNaN(b)) {
          return NaN;
        }
    
        return methods[op](a, b);
      }
    
      this.addMethod = function(name, func) {
        methods[name] = func;
      };
    }
}