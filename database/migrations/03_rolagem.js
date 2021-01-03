exports.up = async function (database, utf8 = false) {
    return database.schema.hasTable('rolagem').then(function (exists) {
        if (!exists)
            return database.schema.createTable("rolagem", table => {
                if (utf8)
                    table.collate('utf8_unicode_ci');

                table.string('id', 45).primary();
                table.string('personagem', 45);
                table.integer('valor');
                table.string('tipo', 30);
                table.string('titulo', 30);
                table.integer('modificador');
                table.string('data', 20);

                table.integer('deleted').defaultTo(0);
            });

    });

}

exports.down = async function (database) {
    return database.schema.hasTable('rolagem').then(function (exists) {
        if (exists)
            return database.schema.dropTable('rolagem');
    });
}