var insert=require('./mysql_connection')

insert.insert('INSERT INTO amv_product(id,product_code,product_name)  VALUES(0,?,?)',
    ['111','prod1'],function(err,results){
        if(err){
            console.log("插入失败1")
        }else{
            console.log("插入成功")
            console.log(results)

        }

    })