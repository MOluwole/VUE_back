'use strict'

const Schema = use('Schema')

class CourseSchema extends Schema {
  up () {
    this.create('courses', (table) => {
      table.increments()
      table.string('title').nullable();
      table.string('code').nullable();
      table.string('dept').nullable();
      table.string('level').nullable();
      table.string('programme').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('courses')
  }
}

module.exports = CourseSchema
