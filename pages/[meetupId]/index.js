import MeetupDetail from "../../components/meetups/meetupDetail";
import { MongoClient, ObjectID } from 'mongodb'
import { Fragment } from 'react'
import Head from 'next/head'

function MeetupDetails(props){
  return (
    <Fragment>
      <Head>
      <title>{props.meetupData.title}</title>
      <meta name='description' content={props.meetupData.description} />
    </Head>
      <MeetupDetail
         image={props.meetupData.image}
         title={props.meetupData.title}
         address={props.meetupData.address}
         description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths(){
  const client = await MongoClient.connect('mongodb+srv://rax:rax01726@cluster0.wkwyv.mongodb.net/meetupsDb?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() }
    }))
  }
}

export async function getStaticProps(context){
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect('mongodb+srv://rax:rax01726@cluster0.wkwyv.mongodb.net/meetupsDb?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const seletedMeetup = await meetupsCollection.findOne({_id: ObjectID(meetupId)});

    client.close();


  return {
    props: {
      meetupData: {
        id: seletedMeetup._id.toString(),
        title: seletedMeetup.title,
        address: seletedMeetup.address,
        image: seletedMeetup.image,
        description: seletedMeetup.description
      }
    }
  }
}

export default MeetupDetails;
