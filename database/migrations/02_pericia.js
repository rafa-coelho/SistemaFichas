exports.up = async function (database, utf8 = false) {
    return database.schema.hasTable('pericia').then(function (exists) {
        if (!exists)
            return database.schema.createTable("pericia", table => {
                if (utf8)
                    table.collate('utf8_unicode_ci');

                table.string('id', 45).primary();
                table.string('personagem', 45);
                table.string('nome', 30).notNullable();
                table.string('atributo', 30).notNullable();

                table.integer('deleted').defaultTo(0);
            });

    });

}

exports.down = async function (database) {
    return database.schema.hasTable('pericia').then(function (exists) {
        if (exists)
            return database.schema.dropTable('pericia');
    });
}