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
var http = require('http').Server(app);
var io = require('socket.io')(http);

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


var socket_ids = {};

var registUser = function(socket, data) {
	socket.auth =  data;
	socket_ids[data.mNo] = socket;
};

var deleteUser = function(socket) {
	if(socket_ids[socket.auth.mNo]) {
		delete socket_ids[socket.auth.mNo];
	}
};

io.on("connection", function(socket) {
	console.log('user connected');
	
	socket.on("disconnect", function() {
		deleteUser(socket);
		console.log("user disconnected");
	});
	
	socket.on("login_member", function(data) {
		registUser(socket, data);
	});
	
	socket.on("logout_member", function() {
		deleteUser(socket);
		console.log("user logout");
	});
	
	socket.on("send_msg", function(data) {
		socket.broadcast.to(data.room.room_key).emit("recive_msg", data);
		
		var currRoom = io.sockets.adapter.rooms[data.room.room_key];
		var roomLength = currRoom.length;
		var insertData = {
			room_no : 	data.room.room_no,
			writer_no : data.writer.mNo,
			msg : data.msg,
			read_flag : 'n'
		};
		
		if(roomLength < 2) {
			// DB에 안읽은 표시 후 저장
			pool.getConnection(function(err, connection) {
				if(err) {
					console.log("커넥션 받아오는데 실패함");
				}
			    connection.query(
			    		'INSERT INTO chat_msg SET ?', 
			    		insertData, function(err, result) {
			    			if(err)
			    				console.log("쿼리 실패함");
			    			connection.release();
			    });
			});
			
			// 접속중이라면 메세지가 왔다고 알림
			if(socket_ids[data.room.m_no]) {
				socket_ids[data.room.m_no].emit("notice_msg", {
					nick : data.writer.nickName,
					photo : data.writer.mPhoto,
					roomNo : data.room.room_no
				});
			}
		}else {
			//DB에 읽은 표시후 저장
			insertData.read_flag = 'y';
			
			pool.getConnection(function(err, connection) {
				if(err) {
					console.log("커넥션 받아오는데 실패함");
				}
			    connection.query(
			    		'INSERT INTO chat_msg SET ?', 
			    		insertData, function(err, result) {
			    			if(err)
			    				console.log("쿼리 실패함");
			    			connection.release();
			    });
			});
		}
	});
	
	socket.on("join_room", function(roomKey) {
		socket.join(roomKey);
	});
	
	socket.on("out_room", function(roomKey) {
		socket.leave(roomKey);
	});
});

http.listen(8000, function() {
  console.log("listening on port 8000!");
});
