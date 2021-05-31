// generate char codes
const genCharCodes = (num1, num2) => {
  let result = [];
  for (let i = num1; i <= num2; i++) {
    result.push(i);
  }
  return result;
};

const generatePassword = (options) => {
  const lowercase = genCharCodes(97, 122);
  const uppercase = genCharCodes(65, 90);
  const numbers = genCharCodes(48, 57);
  const symbols = genCharCodes(33, 47).concat(genCharCodes(58, 64)).concat(genCharCodes(91, 96)).concat(genCharCodes(123, 126));
  let draftPass = [];
  if (options.includeLowercase) {
    draftPass = draftPass.concat(lowercase);
  }
  if (options.includeUppercase) {
    draftPass = draftPass.concat(uppercase)
  }
  if (options.includeNumbers) {
    draftPass = draftPass.concat(numbers);
  }
  if (options.includeSymbols) {
    draftPass = draftPass.concat(symbols);
  }

  let finalPass = [];
  for (let i = 0; i < options.characterAmount; i++) {
    const char = String.fromCharCode(draftPass[Math.floor(Math.random() * draftPass.length)]);
    finalPass.push(char);
  }
  finalPass = finalPass.join('');
  return finalPass;
};

$(document).ready(function() {
  const resultDOM = document.getElementById('result');
  const copybtnDOM = document.getElementById('copy');
  const lengthDOM = document.getElementById('length');
  const lowercaseDOM = document.getElementById('lowercase');
  const uppercaseDOM = document.getElementById('uppercase');
  const numbersDOM = document.getElementById('numbers');
  const symbolsDOM = document.getElementById('symbols');
  const generatebtn = document.getElementById('generate');
  const form = document.getElementById('passwordGeneratorForm');


  // Copy Password
  copybtnDOM.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const passwordToCopy = resultDOM.innerText;

  // Edge Case when Password is Empty
    if (!passwordToCopy) return;

  // Copy Functionality
    textarea.value = passwordToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied to Clipboard');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const characterAmount = lengthDOM.value;
  const includeLowercase = lowercaseDOM.checked;
  const includeUppercase = uppercaseDOM.checked;
  const includeNumbers = numbersDOM.checked;
  const includeSymbols = symbolsDOM.checked;
  const options = {
    characterAmount,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  };
  const password = generatePassword(options);
  console.log(`password is ${password}`);
  $('#new_password').val(password);
  resultDOM.innerText = password;
});
})


//written by nemo011 on https://www.studytonight.com/post/building-a-password-generator-with-javascript and adapted by Zain, Moses & Jett
