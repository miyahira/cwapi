var expect = require("chai").expect;
var _ = require('underscore')

var cwapi = require('../cwapi.js')
cwapi.token = "YOUR_CW_API_KEY_HERE

var testRoomId = "2039061"


describe("Me APIs", function(){
  it("should get my info", function(done){
    cwapi.getMe(function(data, response){

      expect(response).to.be.ok

      //console.log(data)
      expect(data).to.be.ok
      expect(data).not.to.have.property("errors")
      _.each(["chatwork_id", "name"], function(k){
        expect(data).to.have.property(k)
      })

      done();
    })
  })

})

describe("Rooms APIs", function(){
  it("should get rooms", function(done){
    cwapi.getRooms(function(data, response){
      expect(response).to.be.ok

      //console.log(data)
      expect(data).to.be.ok
      expect(data).not.to.have.property("errors")

      done();
    })
  })

  it("should get a room", function(done){
    cwapi.getRoom(testRoomId, function(data, response){
      expect(response).to.be.ok

      //console.log(data)
      expect(data).to.be.ok
      expect(data).not.to.have.property("errors")
      _.each(["room_id", "name", "type"], function(k){
        expect(data).to.have.property(k)
      })

      done();
    })
  })

/*
  it("should make a room", function(done){
    cwapi.postRoom({
      'name': 'testign test test',
      'members_admin_ids': '528736'
    }, function(data, response){
      expect(response).to.be.ok

      //console.log(data)
      expect(data).to.be.ok
      expect(data).not.to.have.property("errors")
      expect(data).to.have.property("room_id")

      done();
    })
  })
  */

})

describe("Members APIs", function(){
  it("should get members for a room", function(done){
    cwapi.getRoomMembers(testRoomId, function(data, response){
      expect(response).to.be.ok

      console.log(data)
      expect(data).to.be.ok
      expect(data).not.to.have.property("errors")
      expect(data).to.be.a("Array")

      done();
    })
  })

})
