exports.up = async function (database, utf8 = false) {
    return database.schema.hasTable('item').then(function (exists) {
        if (!exists)
            return database.schema.createTable("item", table => {
                if (utf8)
                    table.collate('utf8_unicode_ci');

                table.string('id', 45).primary();
                table.string('personagem', 45);
                table.string('nome', 45);
                table.integer('quantidade').defaultTo(0);
                table.string('peso', 5).defaultTo(0);
                table.integer('tipo');
                table.integer('dano');

                table.integer('deleted').defaultTo(0);
            });

    });

}

exports.down = async function (database) {
    return database.schema.hasTable('item').then(function (exists) {
        if (exists)
            return database.schema.dropTable('item');
    });
}