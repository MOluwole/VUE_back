'use strict';

const Model = use('Model');

class Time extends Model {
  static get table(){
    return 'times'
  }

  static get primaryKey(){
    return 'id'
  }
}

module.exports = Time;
