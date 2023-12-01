const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors({
  origin: "*",
}));
app.use(express.json());

const port = process.env.PORT || 5000;

// password
// jahangiralomtuf99
// hXljmWDmVcLziFWr


const uri = "mongodb+srv://jahangiralomtuf99:hXljmWDmVcLziFWr@cluster0.e9wqxpd.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
      await client.connect();
    
      const userCollection = client.db("userDB").collection("users");

    //   post koror jonno 
      app.post("/users", async (req, res) => {
          const user = req.body;
          const result = await userCollection.insertOne(user);
          res.send(result);
      })


      //  get korbo
    
      app.get('/users', async (req, res) => {
          const result = await userCollection.find().toArray();
          res.send(result);
    })
      //   deleted
      app.delete("/users/:id", async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) }
          const result = await userCollection.deleteOne(query)
          res.send(result);
        //   console.log(id);
    })    


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("welcome to my server side")
});


app.listen(port, () => {
    console.log(`listening my server side :${port}`);
});
