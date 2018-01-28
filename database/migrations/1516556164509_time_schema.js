'use strict';

const Schema = use('Schema');

class TimeSchema extends Schema {
  up () {
    this.create('times', (table) => {
      table.increments();
      table.integer('tme').nullable();
      table.string('course').nullable();
      table.string('qtotal').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('times')
  }
}

module.exports = TimeSchema;
