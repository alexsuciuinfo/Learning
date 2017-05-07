/*
Create an object calculator with three methods:

read() prompts for two values and saves them as object properties.
sum() returns the sum of saved values.
mul() multiplies saved values and returns the result.
*/
let calculator = {
    read: function() {
        this.a = prompt("a = ?", 0);;
        this.b = prompt("b = ?", 0);;
    },
    sum: function() {
        return parseInt(this.a) + parseInt(this.b);
    },
    mul: function() {
        return this.a * this.b;
    }
}

/*
There’s a ladder object that allows to go up and down:

let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};
Now, if we need to make several calls in sequence, can do it like this:

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
Modify the code of up and down to make the calls chainable, like this:
*/
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function() { // shows the current step
    alert( this.step );
    return this;
  }
};