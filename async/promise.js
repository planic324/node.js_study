'use strict';

// const get = url =>{
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.send();
//     xhr.onload = () =>{
//         if(xhr.status === 200){
//             // 서버의 응답을 콘솔에 출력한다.
//             console.log(JSON.parse(xhr.response));
//         } else{
//             console.error(`${xhr.status} ${xhr.statusText}`)
//         }
//     }
// }

// get('https://jsonplaceholder.typicode.com/posts/1');


const get = url =>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status === 200){
            // 서버의 응답을 콘솔에 출력한다.
            console.log(JSON.parse(xhr.response));
        } else{
            console.error(`${xhr.status} ${xhr.statusText}`)
        }
    }
}

const response = get('https://jsonplaceholder.typicode.com/posts/1');
console.log(response);