# 비동기 프로그래밍

## 동기 처리와 비동기 처리
### 동기 처리
현재 실행 중인 태스크가 종료할 때까지 다음에 실행될 태스크가 대기하는 방식
> 대표적인 예시 : 콜백 함수를 호출하는 sleep()

장점 : 동기처리 방식은 태스크를 순서대로 하나씩 처리하므로 실행 순서가 보장
단점 : 앞선 태스크가 종료할 때까지 이후 태스크들이 블로킹 된다.

### 비동기 처리
현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식
> 대표적인 예시 : setTimeout()

장점 : 현재 실행 중인 태스크가 종료되지 않은 삳ㅇ태라 해도 다음 태스크가 실행하므로 블로킹이 발생하지 않는다.
단점 : 태스크의 실행 순서가 보장되지 않는다.

비동기 처리를 수해앟는 비동기 함수는 전통적으로 콜백(Callback) 패턴을 사용한다. 하지만 근래에는 콜백지옥(Callback Hall)을 해결하기 위해 프로미스(Promise)를 이용한다.
비동기 처리는 '이벤트 루프', '태스크 큐'와 깊은 관계가 있다.

## 이벤트 루프와 태스크 큐
### 이벤트 루프
자바스크립트의 동시성을 지원하는 것

이벤트 루프에는 `힙`, `콜 스택`, `백그라운드`, `태스크 큐` 이 존재한다.

1. 힙 : 객체가 저장되는 메모리 공간. 콜 스택의 요소인 실행 컨텐스트는 힙에 저장된 객체를 참조.
2. 콜 스택 : 소스코드 평가 과정에서 생성된 실행 컨텍스트가 추가되고 제거되는 스택 자료구조인 실행 컨텍스트 스택
3. 백그라운드 : 비동기 처리 시 `콜 스택`에서 넘어가는 단계로 이 곳으로 넘어온 실행 컨텍스트는 블로킹 당하지 않고 계속 실행된다.
4. 태스크 큐 : `백그라운드`에서 실행된 것이 `콜 스택`으로 넘어가기 전에 거치는 단계로, 이 단계에 있던 실행 컨텐스트는 `콜 스택`의 모든 실행 컨텍스트가 실행되고, 비어 있는 경우 `콜 스택`으로 이동 된다.

자바스크립트는 싱글 스레드 방식으로 동작한다. 이 때 싱글 스레드 방식으로 동작하는 것은 브라우저가 아니라 브라우저에 내장된 자바스크립트 엔진이라는 것에 주의해야 된다.
만약 모든 자바스크립트 코드가 자바스크립트 엔진에서 싱글 스레드 방식으로 동작한다면 자바스크립트는 비동기로 동작할 수 없다.
즉, 자바스크립트 엔진은 싱글 스레드로 동작하지만 브라우저는 멀티 스레드로 동작한다.

## 비동기 처리를 위한 콜백 패턴의 단점
### 콜백 지옥

GET 요청을 위한 함수로 알아보자.
```
'use strict';

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

get('https://jsonplaceholder.typicode.com/posts/1');
```

`get`함수는 비동기 함수다.
비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다. 즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다.
따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않을 수 있다.

> `get`이 비동기 함수인 이유 : `get`함수 내부의 `onload` 이벤트 핸들러가 비동기로 동작하기 때문.
> `get`함수를 호출하면 `GET` 요청을 전송하고 `onload` 이벤트 핸들러를 등록한다음 `Underfined`를 반환하고 즉시 종료

get 함수가 서버의 응답 결과를 반환하도록 수정진행

```
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
```

콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또 다시 비동기 함수를 호출해야 한다면, 콜백 함수의 중첩으로 `콜백 지옥`이 발생한다.

다음은 `콜백 지옥` 예제이다.

```
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
```






출처 
1. 모던 자바스크립트 Deep Dive : 자바스크립트의 기본 개념과 동작 원리
2. 드림코딩
 - 자바스크립트 11. 비동기 처리의 시작 콜백 이해하기, 콜백 지옥 체험
 - 자바스크립트 12. 프로미스 개념부터 활용까지
 - 자바스크립트 13. 비동기의 꽃 JavaScript async 와 await 그리고 유용한 Promise APIs
3. 인프런 : [리뉴얼] Node.js 교과서 - 기본부터 프로젝트 실습까지