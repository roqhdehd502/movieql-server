import loadash from 'lodash';

import type { User } from '../types/user';
import type { Tweet } from '../types/tweet';

import { StatusEnum } from '../enums/tweet';

import { SearchInput, TweetPostInput, TweetUpdateInput } from '../inputs/tweet';

import { usersData } from '../datas/users';
import { tweetsData } from '../datas/tweets';

import { emailRegex, phoneNumberRegex } from "../utils/regex";

const users: User[] = [...usersData];
let tweets: Tweet[] = [...tweetsData];

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    searchTweets(_: any, { searchInput }: { searchInput: SearchInput }) {
      const { keyword } = searchInput;
      const filteredText = tweets.filter(tweet => tweet.text.includes(keyword));
      const filteredUserId = tweets.filter(tweet => tweet.userId.includes(keyword));
      const combinedFiltered: Tweet[] = [...filteredText, ...filteredUserId];
      return loadash.uniqBy(combinedFiltered, "id");
    },
    tweet(_: any, { id }: { id: string }) {
      return tweets.find(tweet => tweet.id === id);
    },
    allUsers() {
      return users;
    }
  },

  Mutation: {
    postTweet(_: any, { tweetPostInput }: { tweetPostInput: TweetPostInput }) {
      try {
        const { text } = tweetPostInput;
        tweets.push({
          id: (tweets.length + 1).toString(),
          text,
          userId: "1", // TODO: add userId in Session
          status: StatusEnum.ACTIVE
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    updateTweet(_: any, { tweetUpdateInput }: { tweetUpdateInput: TweetUpdateInput }) {
      try {
        const { id, text } = tweetUpdateInput;
        tweets.forEach((tweet) => {
          if (tweet.id === id) tweet.text = text;
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTweet(_: any, { id }: { id: string }) {
      const tweet = tweets.find(tweet => tweet.id === id);
      if (!tweet) return false;
      try {
        tweets = tweets.filter(tweet => tweet.id !== id);
        return true;
      } catch (error) {
        console.log(error);
      }
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
  