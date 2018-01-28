'use strict'

const Model = use('Model')

class Course extends Model {
  static get table(){
    return 'courses'
  }

  static get primaryKey(){
    return 'id'
  }
}

module.exports = Course
