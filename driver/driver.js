"use strict";

require('dotenv').config();
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=io.connect(`${HOST}/caps`);

socket.emit('get_all');

socket.on('driverPickup', meassage=>{
    setTimeout(()=>{
        console.log('DRIVER: picked up this meassage :',meassage.id);
        socket.emit('received',meassage);
    },5000);
});


socket.on('driverTransit',meassage=>{
    setTimeout(()=>{
        console.log(`DRIVER: delivered  up ${meassage.id}`);
        socket.emit('deleverd',meassage);
        
    },3000)
});