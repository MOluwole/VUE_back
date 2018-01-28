'use strict';

const Schema = use('Schema');

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments();
      table.string('dept').nullable();
      table.string('course').nullable();
      table.string('question').nullable();
      table.string('optA').nullable();
      table.string('optB').nullable();
      table.string('optC').nullable();
      table.string('optD').nullable();
      table.string('ans').nullable();
      table.string('level').nullable();
      table.string('programme').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema;
