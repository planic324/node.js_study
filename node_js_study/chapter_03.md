# 3장 노드 기능
## 3.1 REPL 사용하기

- R : 읽고(Read)
- E : 해석하고(Eval)
- P : 결과물을 반환하고(Print)
- L : 종료할때까지 반복하고(Loop)

## 3.2 JS 파일 실행기
콘솔에서 Node [자바스크립트 파일 경로]로 실행합니다. 확장자(.js)는 생략해도 됩니다.

## 3.3 모듈로 만들기
노드는 코드를 모듈로 만들 수 있다는 점에서 브라우저의 자바스크립트와 다릅니다.
공통되는 요소를 나눠서 각 하나의 파일로 만들어서 언제든지 참조하여 사용할 수 있다.

- 모듈 : 특정한 기능을 하는 함수나 변수들의 집합입니다.

```
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
    odd,
    even,
};
```
두 개의 변수를 선언했습니다. 그리고 module.exports에 변수를 담은 객체를 대입했습니다. 이런 경우 하나의 모듈로서의 기능을 합니다. 다른 파일에서 해당 코드가 들어있는 파일을 불러오면 module.exports에 대입된 값을 사용할 수 있습니다.

### 참조하는 방법
```
const {odd, even} = require('./파일명'); // require는 함수로 '파일명'에 있던 값을 불러온다.

function checkOddOrEven(num){
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven; // '파일명'을 참조해서 가져온 것을 포함한 내용을 합쳐 다시 모듈(함수)로 만들 수 있다.
```

