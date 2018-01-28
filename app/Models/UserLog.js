'use strict';

const Model = use('Model');

class UserLog extends Model {
  static get table(){
    return 'user_logs'
  }

  static get primaryKey(){
    return 'id'
  }
}

module.exports = UserLog;
