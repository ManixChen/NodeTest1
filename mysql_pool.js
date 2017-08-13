var mysql=require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'chen258003',
    database: 'agent_manage_vesystem',
    port: 3306
});

var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,qresult,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,qresult,fields);
            });
        }
    });
};

// module.exports=query;
exports.query = query
