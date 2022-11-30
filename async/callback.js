'use strict';

// hoisting : var, function declaration
// callback : 내가 선언할테니 너가 나중에 불러줘

// 자바스크립트 동기화
console.log(1);
console.log(2);
console.log(3);


// 비동기(setTimeout) 알아보기
console.log(1);
setTimeout(function(){
    console.log('2');
}, 1000) // callback
console.log(3);


// 함수로 말고 다르게 적용하려면,
console.log(1);
setTimeout(() => console.log('2'), 1000)
console.log(3);

// 동기적 callback
function printImmediately(print){
    print();
}
printImmediatelyz(() => console.log('hello'));

// 비동기적 callback
function printWithDelay(print, timeout){
    setTimeout(print, timeout);
}
printWithDelay(() => console.log('asyne callback'), 2000)


// callback hell ex
class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(( ) =>{
            if(
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ) {
                onSuccess(id);
            } else{
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if(user === 'ellie'){
                onSuccess({name: 'ellie', role: 'admin'});
            } else{
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const UserStorage = new UserStorage();
const id = prompt('enter you id');
const password = prompt('enter you password');
UserStorage.loginUser(
    id,
    password,
    user =>{
        UserStorage.getRoles(
            UserStorage =>{
                console.log(성공)
            },
            error =>{
                console.log('성공/어드민 x')
            }
        )
    },
    error =>{
        console.log(error)
    }
)