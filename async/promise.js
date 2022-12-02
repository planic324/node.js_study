'use strict';

// Promise is a javascript object for asynchronous opration
// states : pending -> fulfilled or rejected
// Producer vs Consumer

// 1. producer
// when new Promise is created, the exeutor runs automatically.
const promise = new Promise((resolve, reject) => {
    // doing some havy work (ex:network, fileLoad)
    console.log('doing somthing...');
    setTimeout(() => {
        // resolve('ellie');
        reject(new Error('no network'))
    }, 2000)
})

// 2. consumer: then, catch, fianlly 로 가져올 수 있다.
promise
    .then((value) => {
        console.log(value)
    }) //then >> 프로그램이 잘 실행이되서, 리졸브에 있는 value가 들어오는 것이라 한다. (성공적인 경우)
    .catch(error =>{
        console.log(error)
    }) // 실패하는 경우 호출되어지는 것
    .finally(() => {
        console.log('finally')
    })


// 3. promise chaining
const fetcNumber = new Promise((resolve, reject) =>{
    setTimeout(( ) => resolve(1), 1000);
});
fetcNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(( ) => resolve(num - 1), 1000);
        });
    })
    .then(num => console.log(num));


// 4. Error Handle