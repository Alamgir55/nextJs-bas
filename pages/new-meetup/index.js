import router from 'next/router'
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from 'react'
import Head from 'next/head'

function NewMeetupPage(){
  async function addMeetupHandler(enteredMeetupData){
    console.log(enteredMeetupData)
     const response2 = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      statusText: 'text',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    const data = await response2.json();
    console.log(data);
    router.push('/');
  }
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Add your own and create amazing networking opportunities' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  ) 
}

export default NewMeetupPage;
