'use strict';

const Model = use('Model');

class Admin extends Model {
  static get table(){
    return 'admin'
  }

  static get primaryKey(){
    return 'id'
  }
}

module.exports = Admin;
