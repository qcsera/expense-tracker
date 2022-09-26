import { MongoClient, ObjectId, ObjectID } from 'mongodb'

async function handler(req, res) {

 // Connect to database
let client;
    try {
        client = await MongoClient.connect('mongodb+srv://bishop:expense-tracker123@cluster0.gvpk9.mongodb.net/expense-tracker?retryWrites=true&w=majority')
    } catch(error) {
        res.status(500).json({message: "Could not connect to datatbase."})
        return;
    }

  if (req.method === "POST") {
    const { name, amount, type, date } = req.body;

    // INSERT TRANSACTION 
    if (
      !name ||
      name.length > 100 ||
      name.trim() === '' ||
      !amount ||
      !type
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    const newTransaction = {
      name,
      amount,
      type,
      date
    };
    

    const db = client.db()

    try {
        const result = await db.collection('expenses').insertOne(newTransaction)
        newTransaction.id = result.insertedId
    } catch(error) {
        client.close()
        res.status(500).json({message: "Storing transaction failed!"})
        return;
    }

    client.close()

    res
      .status(201)
      .json({
        message: "Successfully stored transaction",
        data: newTransaction,
      });
  }

  // GET ALL TRANSACTIONS
  if(req.method === 'GET') {
      const db = client.db()
    
    try {
        const transactions = await db.collection('expenses').find().sort({date: -1}).toArray()
        res.status(200).json({transactions: transactions})

    } catch(error) {
        client.close()
        res.status(500).json({message: "Could not fetch any data"})
        return;
    }

    client.close()
  }

  // DELETE TRANSACTION
  if(req.method === "DELETE") {
    const { id } = req.body
   
    const db = client.db()
    const ObjId = new ObjectId(id)

    try {
        const result = await db.collection('expenses').deleteOne({"_id": ObjId})
        res.status(200).json({message: "Transaction deleted successfully"})
    } catch(error) {
        client.close()
        res.status(500).json({message: "Transaction is not deleted"})
        return;
    }
    client.close()
  }


}

export default handler;
