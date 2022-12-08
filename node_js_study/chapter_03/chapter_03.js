// 3.2 JS 파일 실행기
// function helloWorld(){
//     console.log('hellow world');
//     helloNode();
// }

// function helloNode(){
//     console.log('hellow node');
// }

// helloWorld();

// 3.3 모듈로 만들기
// 모듈 제작
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
    odd,
    even,
};

// 참조하는 방법
const {odd, even} = require('./파일명'); // node에서 제공하는 함수 'require'

function checkOddOrEven(num){
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;
