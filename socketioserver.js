var ip = '192.168.1.17';
var port = 8080;

var server = require('./webServer').start(ip,port);

// Loading socket.io
var io = require('socket.io').listen(server);

var ClientMongo = require('mongodb').MongoClient;
var url = "mongodb://192.168.1.251:27017/";

var timer = setInterval(LlegirDades,5000);

var dades;


function LlegirDades() {
ClientMongo.connect(url,function(err, db) {
	if (err) throw err;
	var basededades = db.db("iotDB");
	basededades.collection("Machines").find({}).sort({_id:-1}).limit(1).toArray(function(err,result) {
		if(err) throw err;
		//dades = result;
		//console.log(result[0].Nivell);
		
		NumMaq = result[0].Mach_Num;
		CoFa1 = result[0].Corrent_Fase1;
		CoFa2 = result[0].Corrent_Fase2;
		CoFa3 = result[0].Corrent_Fase3;
		Ni = result[0].Nivell;
		Fl = result[0].Fluxe;
		
		tramaDades = NumMaq + ',' + CoFa1 + ',' + CoFa2 + ',' + CoFa3 + ',' + Ni + ',' + Fl 
		//console.log(tramaDades);
		
		io.sockets.send(result[0].Nivell + tramaDades);
		
		db.close();
	});
});
}


// When a client connects, we note it in the console
	io.sockets.on('connection', function (socket) {
		console.log('Nou client connectat!');
		//socket.emit('message','Esteu connectats !');
		//sockets.emit('dades',dades);
});


