'use strict';

const Model = use('Model');

class Department extends Model {
  static get table(){
    return 'departments'
  }

  static get primaryKey(){
    return 'id'
  }
}

module.exports = Department;
