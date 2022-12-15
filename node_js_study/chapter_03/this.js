// this를 함수 밖에서 선언하는 경우
console.log(this);

// 빈 객체 {} 가 노출 === {} != global


// this를 함수 안에서 선언하는 경우
function a() {
    console.log(this === global);
}
a();
// global확인 === global이 맞다.

// 함수 밖에서 global을 시키고 싶은 경우
console.log(this === module.exports);
// 이경우 global이 된다.