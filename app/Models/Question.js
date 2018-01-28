'use strict';

const Model = use('Model');

class Question extends Model {
  static get table(){
    return 'questions'
  }

  static get primaryKey(){
    return 'id'
  }
}

module.exports = Question;
