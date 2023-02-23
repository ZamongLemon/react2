import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
const MeetupDetails = (props) => {
  const router = useRouter();
  console.log("meetupDetail");
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
};
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://zamongo333:rdSMjbhx2CC0hhah@cluster0.qsxjuj7.mongodb.net/meetsup?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false,
  };
};
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://zamongo333:rdSMjbhx2CC0hhah@cluster0.qsxjuj7.mongodb.net/meetsup?retryWrites=true&w=majority"
  );
  const id = new ObjectId(meetupId);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({
    _id: id,
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        description: meetup.data.description,
      },
    },
  };
}

export default MeetupDetails;
