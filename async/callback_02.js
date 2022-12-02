'use strict';

// callback hell ex
class UserStorage{
    loginUser(id, password){
        return new Promise ((resolve, reject) => {
            setTimeout(() =>{
                if(
                    (id === 'ellie' && password === 'dream') ||
                    (id === 'coder' && password === 'academy')
                ) {
                    resolve(id);
                } else{
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }

    getRoles(user){
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                if(user === 'ellie'){
                    resolve({name: 'ellie', role: 'admin'});
                } else{
                    reject(new Error('no access'));
                }
            }, 1000);
        })
    }
}

const UserStorage = new UserStorage();
const id = prompt('enter you id'); // 데이터를 받아오는 거
const password = prompt('enter you password'); // 데이터를 받아오는거

UserStorage
    .loginUser(id, password)
    .then(UserStorage.getRoles)
    .then(user => alert(`hello ${UserwidhtRole.name}, you have a ${UserwidhtRole.role} role`))
    .catch(console.log('error'))