var mysql=require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chen258003',
    database: 'agent_manage_vesystem',
    port: 3306
});


var insert=function (sql,param,callback) {
    //var  userAddSql = 'INSERT INTO node_user(id,name,age) VALUES(0,?,?)';
    //var  userAddSql_Params = ['Wilson', 55];
    connection.connect()
    connection.query(sql,param,function (qerr, qresult) {
        if(qerr){
            console.log('[INSERT ERROR] - ',qerr);
            return;
        }
        console.log('INSERT ID:',qresult);
        callback(qerr,qresult);
    });
    connection.end();

}



exports.insert = insert