var require = function () {
    var exports = {
        getUser: function () {
            return { id: 'test01', name: '투바투' };
        },
        group: { id: 'group01', name: '친구' }
    }
    return exports;
}

var user = require('./user6');
function showUser() {
    return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보 : %s', showUser());
