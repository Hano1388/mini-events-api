import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('events', (t: Knex.TableBuilder): void => {
        t.increments('id').primary();
        t.string('title');
        t.text('description');
        t.dateTime('date');
        t.string('address');
        t.float('latitude');
        t.float('longitude');
        t.bigInteger('user_id').notNullable().references('users.id').onDelete('cascade');
        t.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('events');
}

