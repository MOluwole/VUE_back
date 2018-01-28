'use strict';

const Model = use('Model');

class TmpQuestion extends Model {
  static get table() {
    return 'tmp_questions'
  }
  static get primaryKey(){
    return 'id'
  }
}

module.exports = TmpQuestion;
