import { StatusEnum } from "../enums/tweet";

export type Tweet = {
  id: string;
  text: string;
  userId: string;
  status: StatusEnum;
};
