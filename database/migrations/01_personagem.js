exports.up = async function(database, utf8 = false) {
    return database.schema.hasTable('personagem').then(function(exists) {
        console.log(exists)
        if (!exists) {
            return database.schema.createTable("personagem", table => {
                if (utf8)
                    table.collate('utf8_unicode_ci');
                table.string('id', 45).primary();

                table.string('nome', 30).notNullable();
                table.string('raca', 30);
                table.string('classe', 30);
                table.integer('nivel');
                table.integer('hp').defaultTo(0);
                table.integer('hp_maximo').defaultTo(0);
                table.integer('sanidade').defaultTo(0);
                table.integer('sanidade_maxima').defaultTo(0);
                table.integer('forca').defaultTo(0);
                table.integer('destreza').defaultTo(0);
                table.integer('constituicao').defaultTo(0);
                table.integer('inteligencia').defaultTo(0);
                table.integer('sabedoria').defaultTo(0);
                table.integer('carisma').defaultTo(0);
                table.integer('pc').defaultTo(0);
                table.integer('pp').defaultTo(0);
                table.integer('pe').defaultTo(0);
                table.integer('po').defaultTo(0);
                table.integer('pl').defaultTo(0);
                table.integer('npc').defaultTo(0);
                table.string('dado_vida', 25);

                table.integer('deleted').defaultTo(0);
            });
        }

    });

}

exports.down = async function(database) {
    return database.schema.hasTable('personagem').then(function(exists) {
        if (exists)
            return database.schema.dropTable('personagem');
    });
}