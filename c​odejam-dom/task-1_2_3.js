console.log('task-1_2_3')
FindLongestString = (sen) => {

    if(typeof sen == 'string') {
        sen = sen.trim();
        let arrWord = sen.split(' ');

        let word = arrWord.reduce((prev, curr, index, arr) => {
            return (prev.length >= curr.length) ? prev : curr;
        })

        return word
    } else {
        alert('Введите строковое значение')
    }
}

WordReverse = (str) => {
    if(typeof str == "string") {
        str = str.trim();

        str = str.split("");
        str = str.reverse();
        str = str.join("");

        return str
    } else {
        alert('Введите строковое значение')
    }
}

ChangeLetters = (str) => {

    let regexp = /[a,e,i,o,u,y,A,E,I,O,U,Y]/;
    let regexp_2 = /[a-zA-Zа-яА-ЯёЁ]/g;
    
    changeСaseLetter =(letter)=> {
        return (letter.search(regexp) == -1) ? letter : letter.toUpperCase(); 
    }

    if(typeof str == 'string') {
        str = str.trim();

        let newStr = str.replace(regexp_2, (str) => {
            let nextCode = str.charCodeAt(0) + 1;
            let nextLetter = changeСaseLetter(String.fromCharCode(nextCode));
            return nextLetter
        })

        return newStr

    } else {
        alert('Введите строковое значение')
    }
}




