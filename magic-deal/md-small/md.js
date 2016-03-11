var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
    host    :'localhost',
    port : 3306,
    user : 'md',
    password : '1111',
    database:'magic_deal',
    connectionLimit:20,
    waitForConnections:false
});

var app = express();

app.get("/magic-deal/checkId", function(req, res) {

  var chkId = req.param("chkId");
  var callback = req.param("callback");
  pool.getConnection(function(err, connection) {
    connection.query("select count(*) cnt from member where id='"+chkId+"'", function(err, rows, fields) {
      if(err) throw err;
      if(rows[0].cnt == 1) {
        res.send(callback+"({'result' : 'fail'})");
      }else {
        res.send(callback+"({'result' : 'ok'})");
      }
      connection.release();
    });
  });
});

app.get("/magic-deal/checkNick", function(req, res) {

  var chkNick = req.param("chkNick");
  var callback = req.param("callback");
  pool.getConnection(function(err, connection) {
    connection.query("select count(*) cnt from member where nname='"+chkNick+"'", function(err, rows, fields) {
      if(err) throw err;
      if(rows[0].cnt == 1) {
        res.send(callback+"({'result' : 'fail'})");
      }else {
        res.send(callback+"({'result' : 'ok'})");
      }
      connection.release();
    });
  });
});

app.listen(8000, function() {
  console.log("listening on port 8000!");
});
