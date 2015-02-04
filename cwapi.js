
var _ = require('underscore')
var rest = require('restler');

var cwapi = {};

var baseUrl = "https://api.chatwork.com/v1/"

cwapi.token = ""

/// args for restler
function args(){
  return {
    headers:{
      'X-ChatWorkToken': cwapi.token,
    }
  }
}

/// @section /me
cwapi.getMe = function(callback){
  rest.get(baseUrl+"me", args()).on('complete', callback)
}

/// @section /me
/// GET /my/status
/// GET /my/tasks

/// @section /contacts
/// GET /contacts

/// @section /rooms

/// GET /rooms/
cwapi.getRooms = function(callback){
  rest.get(baseUrl+"rooms", args()).on('complete', callback)
}

/// POST /rooms/
cwapi.postRoom = function(data, callback){
  var options = args()
  options.data = data
  rest.post(baseUrl+"rooms", options).on('complete', callback)
}

/// GET /rooms/{room_id}
cwapi.getRoom = function(roomId, callback){
  rest.get(baseUrl+"rooms/"+roomId, args()).on('complete', callback)
}

/// PUT /rooms/{room_id}
cwapi.putRoom = function(data, callback){
  var options = args()
  options.data = data
  rest.put(baseUrl+"rooms", options).on('complete', callback)
}

/// DELETE /rooms/{room_id}
cwapi.leaveRoom = function(roomId, callback){
  var options = args()
  options.query = {'action_type': 'leave'}
  rest.del(baseUrl+"rooms/"+roomId, options).on('complete', callback)
}

/// GET /rooms/{room_id}/members
cwapi.getRoomMembers = function(roomId, callback){
  rest.get(baseUrl+"rooms/"+roomId+"/members", args()).on('complete', callback)
}

/// PUT /rooms/{room_id}/members
cwapi.putRoomMembers = function(roomId, data, callback){
  var options = args()
  options.data = data
  rest.put(baseUrl+"rooms/"+roomId+"/members", options).on('complete', callback)
}

/// GET /rooms/{room_id}/messages
/// PUT /rooms/{room_id}/messages
/// GET /rooms/{room_id}/messages/{messages_id}

/// GET /rooms/{room_id}/tasks
/// POST /rooms/{room_id}/tasks
/// GET /rooms/{room_id}/tasks/{task_id}

/// GET /rooms/{room_id}/files
/// GET /rooms/{room_id}/files/{file_id}


/// additional actions
cwapi.addMembersToRoom = function(member, roomId, callback){
  cwapi.getRoomMembers(roomId, function(data, res){
    var ids = _.pluck(data, "account_id")
    ids = _.isArray(member) ? _.union(ids, member) : _.union(ids, [member])
    
    cwapi.putRoomMembers(roomId, {
      'members_admin_ids': ids.join(',')
    }, callback)
  })
}

cwapi.removeMembersFromRoom = function(member, room, callback){
  cwapi.getRoomMembers(room_id, function(data, res){
    var ids = _.pluck(data, "account_id")
    ids = _.isArray(member) ? _.difference(ids,member) : _.without(ids, member)
    
    cwapi.putRoomMembers(room_id, {
      'members_admin_ids': ids.join(',')
    }, callback)
  })
}

module.exports = cwapi
