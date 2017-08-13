var query=require('./mysql_pool')

query.query("select * from amv_artisan",function(err,results,fields){
    if(err){
        throw err;
    }
    if(results){
        console.log(results)
    }
});
