import { getUsers } from '../datas/users';
import { getTweets } from '../datas/tweets';

import { emailRegex, phoneNumberRegex } from "../utils/regex";

const users = [...getUsers];
let tweets = [...getTweets];

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(_: any, { id }: { id: string }) {
      return tweets.find(tweet => tweet.id === id);
    },
    allUsers() {
      console.log("allUsers Called");
      return users;
    }
  },
  Mutation: {
    postTweet(_: any, { text, userId }: { text: string, userId: string }) {
      try {
        const newTweet = {
          id: (tweets.length + 1).toString(),
          text,
          userId,
          status: "ACTIVE"
        };
        tweets.push(newTweet);
        return newTweet;
      } catch (error) {
        console.log(error); 
      }
    },
    deleteTweet(_: any, { id }: { id: string }) {
      const tweet = tweets.find(tweet => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter(tweet => tweet.id !== id);
      return true;
    }
  },
  User: {
    fullName({ firstName, lastName }: { firstName: string, lastName: string }) {
      return `${firstName}-${lastName}`;
    },
    email({ email }: { email: string }) {
      return emailRegex.test(email) ? email : "";
    },
    phoneNumber({ phoneNumber }: { phoneNumber: string }) {
      return phoneNumberRegex.test(phoneNumber) ? phoneNumber : "";
    },
  },
  Tweet: {
    author({ userId }: { userId: string }) {
      return users.find(user => user.id === userId);
    }
  }
}

export default resolvers;
  