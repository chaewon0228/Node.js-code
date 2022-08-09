/*
 * 설정 파일
 */

module.exports = {
	server_port: 3000,
	//db_url: 'mongodb://localhost:27017/local',
	// db_url: 'mongodb://sunny5:sol0414@cluster0-shard-00-00-u6kid.mongodb.net:27017,cluster0-shard-00-01-u6kid.mongodb.net:27017,cluster0-shard-00-02-u6kid.mongodb.net:27017/myuserdb?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin',
	db_url: 'mongodb+srv://chaewon0228:hope@153@cluster0.urctzt1.mongodb.net/myuserdb',
	db_schemas: [
	    {file:'./user_schema', collection:'users3', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [
	    //===== User =====//
	    {file:'./user', path:'/process/login', method:'login', type:'post'}					// user.login 
	    ,{file:'./user', path:'/process/adduser', method:'adduser', type:'post'}				// user.adduser 
	    ,{file:'./user', path:'/process/listuser', method:'listuser', type:'post'}			// user.listuser 
        
	    //===== Test =====//
	    ,{file:'./test', path:'/process/test1', method:'test1', type:'post'}
	]
}