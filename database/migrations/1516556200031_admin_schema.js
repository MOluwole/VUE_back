'use strict';

const Schema = use('Schema');

class AdminSchema extends Schema {
  up () {
    this.create('admin', (table) => {
      table.increments();
      table.string('fullname').nullable();
      table.string('email').nullable();
      table.string('pwd').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('admin')
  }
}

module.exports = AdminSchema;
