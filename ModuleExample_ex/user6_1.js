let object = {
    getUser: function () {
        return { id: 'test01', name: '투바투' };
    },
    group: { id: 'group01', name: '친구' }
}
module.exports = object;
exports.group = { id: 'group02', name: '가족' };