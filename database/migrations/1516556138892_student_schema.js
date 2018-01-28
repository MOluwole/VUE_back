'use strict';

const Schema = use('Schema');

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments();
      table.string('surname').nullable();
      table.string('other_names').nullable();
      table.string('dept').nullable();
      table.string('matric_num').nullable();
      table.string('level').nullable();
      table.string('programme').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema;
