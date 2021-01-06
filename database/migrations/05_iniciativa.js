exports.up = async function (database, utf8 = false) {
    return database.schema.hasTable('iniciativa').then(function (exists) {
        if (!exists)
            return database.schema.createTable("iniciativa", table => {
                if (utf8)
                    table.collate('utf8_unicode_ci');

                table.string('id', 45).primary();
                table.string('personagem', 45);
                table.integer('valor');

                table.integer('deleted').defaultTo(0);
            });

    });

}

exports.down = async function (database) {
    return database.schema.hasTable('iniciativa').then(function (exists) {
        if (exists)
            return database.schema.dropTable('iniciativa');
    });
}