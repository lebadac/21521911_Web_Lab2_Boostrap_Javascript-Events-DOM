const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const result = document.getElementById('result');
    
// Sum
document.getElementById('add').addEventListener('click', function() {
    const sum = parseFloat(num1.value) + parseFloat(num2.value);
    if (!isNaN(sum)) {
        result.textContent = sum; 
    } else {
        alert('Please enter valid numbers');
    }
});

//substract
document.getElementById('substract').addEventListener('click', function() {
    const substract = parseFloat(num1.value) - parseFloat(num2.value);
    if (!isNaN(substract)) {
        result.textContent = substract; 
    } else {
        alert('Please enter valid numbers');
    }
});

//multiply
document.getElementById('multiply').addEventListener('click', function() {
    const multiply = parseFloat(num1.value) * parseFloat(num2.value);
    if (!isNaN(multiply)) {
        result.textContent = multiply; 
    } else {
        alert('Please enter valid numbers');
    }
});

//divide
document.getElementById('divide').addEventListener('click', function() {
    const divide = parseFloat(num1.value) / parseFloat(num2.value);
    if (!isNaN(divide)) {
        result.textContent = divide; 
    } else {
        alert('Please enter valid numbers');
    }
});