'use strict';

// // hoisting : var, function declaration
// // callback : 내가 선언할테니 너가 나중에 불러줘

// // 자바스크립트 동기화
// console.log(1);
// console.log(2);
// console.log(3);


// // 비동기(setTimeout) 알아보기
// console.log(1);
// setTimeout(function(){
//     console.log('2');
// }, 1000) // callback
// console.log(3);


// // 함수로 말고 다르게 적용하려면,
// console.log(1);
// setTimeout(() => console.log('2'), 1000)
// console.log(3);

// // 동기적 callback
// function printImmediately(print){
//     print();
// }
// printImmediatelyz(() => console.log('hello'));

// // 비동기적 callback
// function printWithDelay(print, timeout){
//     setTimeout(print, timeout);
// }
// printWithDelay(() => console.log('asyne callback'), 2000)

// callback hell ex
class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(() =>{
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

const UserStorage = new UserStorage(); // class라 new UserStorage()로 만듬
const id = prompt('enter you id'); // 데이터를 받아오는 거
const password = prompt('enter you password'); // 데이터를 받아오는거

UserStorage.loginUser(
    id, // 데이터 전달
    password, // 데이터 전달
    user =>{
        UserStorage.getRoles(
            UserwidhtRole =>{
                alert(`hello ${UserwidhtRole.name}, you have a ${UserwidhtRole.role} role`)
            },
            error =>{
                console.log('error')
            }
        )
    },
    error =>{
        console.log('error')
    }
)
