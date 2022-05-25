const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { get } = require("express/lib/response");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.biesg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    client.connect();
    
    const reviewCollection = client.db("Toolkits").collection("user");
    const productCollection = client.db("Toolkits").collection("product");

    // all product
    // http://localhost:5000/products
    app.get("/products", async (req, res) => {
      const cursor = await productCollection.find({}).toArray();
      res.send(cursor);
    });

    

    // user /review
    // http://localhost:5000/review
    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = await reviewCollection.find(query).toArray();
      res.send(cursor);
    });

    app.post("/review", async (req, res) => {
      const data = req.body;
      const result = await reviewCollection.insertOne(data);
      res.send(result);
    });
    console.log("connect");
  } finally {
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});