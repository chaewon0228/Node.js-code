// user2.js의 코드는 객체를 할당 : 불가능(오류나는 경우)
// : exports에 속성을 추가하면 모듈에서 접근하지만,
// exports에 객체를 할당하면 자바스크립트에서 새로운 변수로 처리함

exports = {
    getUser: function () {
        return { id: 'test01', name: '투바투' };
    },
    group: { id: 'group01', name: '친구' }
}