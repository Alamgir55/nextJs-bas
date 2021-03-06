import { MongoClient } from 'mongodb'

async function handler(req, res){
  if(req.method === 'POST'){
    try {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://rax:rax01726@cluster0.wkwyv.mongodb.net/meetupsDb?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({message: 'Meetup inserted!'});
    }catch(e){
      console.log(e)
    }
  }
}

export default handler;
