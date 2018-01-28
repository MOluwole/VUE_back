'use strict';

const Schema = use('Schema');

class TmpQuestionSchema extends Schema {
  up () {
    this.create('tmp_questions', (table) => {
      table.increments();
      table.string('matric_num').nullable();
      table.string('question_id').nullable();
      table.string('answer').nullable();
      table.string('correct_answer').nullable();
      table.string('level').nullable();
      table.string('programme').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('tmp_questions')
  }
}

module.exports = TmpQuestionSchema;
