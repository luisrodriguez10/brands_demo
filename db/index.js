const pg = require("pg");

const client = new pg.Client("postgres://localhost/sneaker_world_db");

const syncAndSeed = async () => {
  const SQL = `
        DROP TABLE IF EXISTS "Sneaker";
        DROP TABLE IF EXISTS "Brand";
        CREATE TABLE "Brand"(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
        CREATE TABLE "Sneaker"(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            brand_id INTEGER REFERENCES "Brand"(id)
        );
        INSERT INTO "Brand"(id, name) VALUES(1, 'Nike');
        INSERT INTO "Brand"(id, name) VALUES(2, 'Converse');
        INSERT INTO "Brand"(id, name) VALUES(3, 'Adidas');
        INSERT INTO "Sneaker"(id, name, brand_id) VALUES(1, 'Air Jordan', 1);
        INSERT INTO "Sneaker"(id, name, brand_id) VALUES(2, 'Air Max', 1);
        INSERT INTO "Sneaker"(id, name, brand_id) VALUES(3, 'Chuck Taylor', 2);
        INSERT INTO "Sneaker"(id, name, brand_id) VALUES(4, 'One Star', 2);
    `;

  await client.query(SQL);
};

module.exports = {
  client,
  syncAndSeed
}
