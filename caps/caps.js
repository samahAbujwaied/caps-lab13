"use strict";

require('dotenv').config();
const uuid = require('uuid').v4;
const port=process.env.PORT || 3000;
const io=require('socket.io')(port);
const caps=io.of('/caps')

const msgQueue = {chores : {}}

let time = new Date()

io.on('connection',socket=>{
    console.log('CONNECTED SUCCESSFULLY ',socket.id);
});

caps.on('connection',socket=>{
    console.log('CONNECTED SUCCESSFULLY ',socket.id);

    socket.on('pickup',payload=>{
        console.log("adding a new task ....")
        const id = uuid();
        console.log("id ====> ", id)
        msgQueue.chores[id] = payload;
        socket.emit('added', payload); 
        caps.emit('driverPickup',{id: id, payload: msgQueue.chores[id]});
        console.log("after add msgQueue ========> ", msgQueue)
    });

    socket.on('get_all', ()=> {
        console.log("get_all : driver wants to get its msgs ")
        Object.keys(msgQueue.chores).forEach(id=> {
            socket.emit('driverPickup', {id: id, payload: msgQueue.chores[id] })
        });
    });

    socket.on('received',msg=>{
        console.log("received on queue will remove it ...")
        delete msgQueue.chores[msg.id];
        console.log("after delete meassage Queue  ", msgQueue)
        caps.emit('driverTransit',msg);
    });


    socket.on('deleverd',msg=>{
        console.log('event:',{
            event:'deleverd',
            time:time,
            msg:msg
        });
        caps.emit('deleverd',msg);
        caps.emit('vendorDileverd',msg);
    });


})

module.exports=caps