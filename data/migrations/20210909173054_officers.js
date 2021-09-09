
exports.up = function(knex) {
  return knex.schema
    .createTable('officers', tbl => {
        tbl.increments('id')
        tbl.text("name", 128)
            .unique()
            .notNullable()
    })
};

exports.down = function(knex) {
  return knex.shcema
    .dropTableIfExists('officers')
};
