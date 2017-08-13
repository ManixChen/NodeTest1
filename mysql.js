var mysql = require('mysql');

var TEST_DATABASE = 'agent_manage_vesystem';
var TEST_TABLE = 'amv_artisan';

//创建连接
var client = mysql.createConnection({
    user: 'root',
    password: 'chen258003',
});

client.connect();
client.query("use " + TEST_DATABASE);

client.query(
    'SELECT * FROM '+TEST_TABLE,
    function selectCb(err, results, fields) {
        if (err) {
            throw err;
        }

        if(results)
        {
            console.log(results);
            for(var i = 0; i < results.length; i++)
            {
                console.log("%t\t%s\t%s", results[i].id, results[i].address, results[i].email);
            }
        }
        client.end();
    }
);