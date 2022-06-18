// 생성자 함수
function User(id, name, mail) {
    this.id = id;
    this.name = name;
    this.mail = mail;
}
User.prototype.getUser = function () {
    return { id: this.id, name: this.name, mail: this.mail };
}
User.prototype.group = { id: '팀원', name: '윤채원의 친구' };
User.prototype.printUser = function () {
    console.log('user 이름 : %s, group 이름 : %s', this.name, this.group.name);
}
module.exports = new User('사용자', '3110윤채원', 's2033@e-mirim.hs.kr');

User.prototype.printUsermailadd = function () {
    console.log('user 이름 : %s, group 이름 : %s, user 메일 : %s 입니다.', this.name, this.group.name, this.mail);
}