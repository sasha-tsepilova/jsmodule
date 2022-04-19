function reverseString1(str){
    let newStr = "";
    let n = str.length;
    for(let i = 0; i < n; i++){
        newStr += str.charAt(n-i-1);
    }
    return newStr;
}

function reverseString2(str){
    let newStr = "";
    let n = str.length;
    let i = 0;
    while(i < n){
        newStr += str.charAt(n-i-1);
        i++;
    }
    return newStr;
}

function reverseString3(str){
    let newStr = "";
    let n = str.length;
    for(let i = n-1; i >= 0; i--){
        newStr += str[i];
    }
    return newStr;
}

function reverseString4(str){
    let newStr = "";
    let n = str.length;
    let i = n-1;
    while(i >= 0){
        newStr += str[i];
        i--;
    }
    return newStr;
}

function reverseString5(str){
    let newStr = "";
    for(let symbol of str){
        newStr = symbol + newStr;
    }
    return newStr;
}

function reverseString6(str){
    let newStr = "";
    let n = str.length;
    for(let i = 0; i < n; i++){
        newStr = str.charAt(i) + newStr;
    }
    return newStr;
}

function reverseString7(str){
    let newStr = "";
    let n = str.length;
    let i = 0;
    while(i < n){
        newStr = str.charAt(i) + newStr;
        i++;
    }
    return newStr;
}

function reverseString8(str){
    let strArray = str.split("");
    strArray = strArray.reverse();
    return strArray.join("");
}


function reverseString9(str){
    if(str === ""){
        return str;
    }

    return reverseString9(str.substr(1))+str.charAt(0);
}

function reverseString10(str){
    return (str === "") ? "" : reverseString10(str.substr(1)) + str.charAt(0);
}

function reverseString11(str){
    let strArray = [...str];

    let reversedArray = []
    for(let i = strArray.length; i >= 0; i--){
        reversedArray.push(strArray[i]);
    }
    return reversedArray.join("");
}

function reverseString12(str){
    let strArray = [...str];
    let n = str.length

    for(let i = 0; i < n / 2; i++){
        [strArray[i], strArray[n-i-1]] = [strArray[n-i-1], strArray[i]];
    }
    return strArray.join("");
}

console.log(reverseString1("Hello world!"));
console.log(reverseString2("Hello world!"));
console.log(reverseString3("Hello world!"));
console.log(reverseString4("Hello world!"));
console.log(reverseString5("Hello world!"));
console.log(reverseString6("Hello world!"));
console.log(reverseString7("Hello world!"));
console.log(reverseString8("Hello world!"));
console.log(reverseString9("Hello world!"));
console.log(reverseString10("Hello world!"));
console.log(reverseString11("Hello world!"));
console.log(reverseString12("Hello world!"));
