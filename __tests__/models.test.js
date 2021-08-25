"use strict";

require('dotenv').config();
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=io.connect(`${HOST}/caps`);
const Events=require('events');
const events=new Events();
jest.useFakeTimers();
let payload=
{ store: '1-206-phones',
  orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Samah',
  address: 'california, USA' } 




describe("caps test",  () => {
    it('connection',async ()=>{
        const caps = await require("../caps/caps");
        expect(caps.emit('connection',payload)).toEqual(true);
    });
    it('pickup', async()=>{
        const caps = await require("../caps/caps");
        expect(caps.emit('driverPickup',payload)).toBeTruthy();
      });
      it('transit ',async ()=>{
        const caps = await require("../caps/caps");
        expect(caps.emit('driverTransit',payload)).toBeTruthy();
      });
      it('deleverd ', async ()=>{
        const caps = await require("../caps/caps");
        expect(caps.emit('deleverd',payload)).toBeTruthy();
        expect(caps.emit('vendorDileverd',payload)).toBeTruthy();
      });
});



describe("Node Module", () => {
  it("events", () => {
    expect(events).toBeInstanceOf(Events);
  });
});

