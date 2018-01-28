'use strict';

const Schema = use('Schema');

class UserLogSchema extends Schema {
  up () {
    this.create('user_logs', (table) => {
      table.increments();
      table.string('matric_num').nullable();
      table.integer('status').nullable();
      table.integer('time_remain').nullable();
      table.string('course').nullable();
      table.string('level').nullable();
      table.string('programme').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('user_logs')
  }
}

module.exports = UserLogSchema;
