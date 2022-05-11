const {client, syncAndSeed} = require('./db/index')
const express = require("express");
const path = require('path')

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", async (req, res, next) => {
  try {
    const response = await client.query('SELECT * FROM "Brand";');
    const brands = response.rows;
    res.send(`
        <html>
            <head>
                <title>Brands Page</title>
                <link rel='stylesheet' href='/assets/styles.css'/>
            </head>
            <body>
                <h1>Sneaker World</h1>
                <h2>Brands</h2>
                <ul>
                    ${brands
                      .map(
                        (brand) => `
                        <li>
                            <a href="/brands/${brand.id}">
                            ${brand.name}
                            </a>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            </body>
        </html>
    `);
  } catch (ex) {
    next(ex);
  }
});

const port = process.env.PORT || 3000;

const setUp = async () => {
  try {
    await client.connect();
    await syncAndSeed();
    console.log("connected to DB");
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

setUp();
