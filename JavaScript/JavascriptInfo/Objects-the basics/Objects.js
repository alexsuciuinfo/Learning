/*
Hello, object
Write the code, each line for an action:

Create an empty object user.
Add the property name with the value John.
Add the property surname with the value Smith.
Change the value of the name to Pete.
Remove the property name from the object.
*/
let user = {};
user.name = 'John';
user.surname = 'Smith';
user.name = 'Pete';
delete user.name;

/*
Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.
*/
function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

/*
Sum object properties
We have an object storing salaries of our team:
let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}
*/
function sumSalary(salaries) {
    let sum = 0;
    for (let person in salaries) {
        sum += salaries[person];
    }
    return sum;
}

//Create a function multiplyNumeric(obj) that multiplies all numeric properties of obj by 2.
function multiplyNumeric(obj) {
    for (let key in obj) {
        if (typeof obj[key] == 'number') {
            obj[key] *= 2;
        }
    }
}

