/**
 * Created by Knaufux on 12/3/2015.
 */


var io = require('socket.io')();
var Database = require('./database.js');
var Entity = require('./entity.js');
var QuadTree = require('./lib/quadTree.js');
entities = new Database(['Test']);
var bound = {
    x: 0,
    y: 0,
    width: 300,
    height: 300
};
var tree = new QuadTree(bound, false, 4, 3);
var timeStart = 0;


var entDB;

entities.loadData(function(){
    entDB = entities.database.getCollection('Test');
    io.on('connection', function(socket){
        entities.addData(Entity, 'Test');
    });
    setTimeout(function(){
        console.log((new Date()).getTime() - timeStart);
        timeStart = (new Date()).getTime();
        for(var entity of entDB.find()){
            entity.update();
        }
        io.emit('data', entDB.find());
    }, 5000)
});

io.listen(3000);