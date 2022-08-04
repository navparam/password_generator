function copyPassword() {
    const copyText = document.getElementById("password").value;
    navigator.clipboard.writeText(copyText).then(() => {
        showToast();
    });
}

function sliderValueChange() {
    const slider = document.getElementById("length");
    const output = document.getElementById("lengthValue");
    output.innerHTML = slider.value;
}

function generatePassword() {
    const length = parseInt(document.getElementById("length").value);
    let password = "";
    const isUpperCase = document.getElementById("uppercase").checked;
    const isLowerCase = document.getElementById("lowercase").checked;
    const isSymbol = document.getElementById("symbol").checked;
    const isNumeric = document.getElementById("numeric").checked;
    const possibleDictionary = {
        "small": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        "capital": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        "special": ["!", "(", ")", "-", ".", "?", "[", "]", "_", "~", ";", ":", "@", "#", "$", "%", "^", "&", "*", "+", "=", "`", "<", ">", "/"],
        "numeric": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    };
    let possibleDict = [];
    if (isUpperCase) {
        possibleDict.push(...possibleDictionary["capital"]);
    }
    if (isLowerCase) {
        possibleDict.push(...possibleDictionary["small"]);
    }
    if (isSymbol) {
        possibleDict.push(...possibleDictionary["special"]);
    }
    if (isNumeric) {
        possibleDict.push(...possibleDictionary["numeric"]);
    }
    const uid = new ShortUniqueId({ length: length, dictionary: possibleDict.length > 0 ? possibleDict : 'alphanum' });
    console.log(uid.collisionProbability(), uid.uniqueness());
    password = uid();
    document.getElementById("password").value = password;
    checkPasswordStrength(password);
}

function showToast() {
    const x = document.getElementById("copyToast");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function checkPasswordStrength(password) {
    let strengthBadge = document.getElementById('strengthDisp');
    let strength = 0;
    if (password.match(/[a-z]+/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
        strength += 1;
    }
    if (password.match(/\d+/)) {
        strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
        strength += 1;
    }
    if (password.length > 8) {
        strength += 1;
    }
    switch (strength) {
        case 0:
        case 1:
            strengthBadge.style.backgroundColor = 'red';
            strengthBadge.style.color = '#394053';
            strengthBadge.textContent = 'Very Weak';
            break;

        case 2:
            strengthBadge.style.backgroundColor = 'orange';
            strengthBadge.style.color = '#394053';
            strengthBadge.textContent = 'Weak';
            break;

        case 3:
            strengthBadge.style.backgroundColor = 'yellow';
            strengthBadge.style.color = '#394053';
            strengthBadge.textContent = 'Medium';
            break;

        case 4:
            strengthBadge.style.backgroundColor = 'lightgreen';
            strengthBadge.style.color = '#394053';
            strengthBadge.textContent = 'Strong';
            break;

        case 5:
            strengthBadge.style.backgroundColor = "green";
            strengthBadge.style.color = 'white';
            strengthBadge.textContent = 'Very Strong';
            break;
    }
}