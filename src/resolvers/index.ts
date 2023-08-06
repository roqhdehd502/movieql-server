import { emailRegex, phoneNumberRegex } from "../utils/regex";

let tweets = [
  {
    id: "1",
    text: "Hello",
    userId: "2",
    status: "ACTIVE"
  },
  {
    id: "2",
    text: "Yello",
    userId: "1",
    status: "ACTIVE"
  }
];

let users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "010-1234-5678"
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "Musk",
    email: "elon@example.com",
    phoneNumber: "010-5678-2333"
  }
]

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
  