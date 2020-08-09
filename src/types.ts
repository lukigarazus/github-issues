import { Moment } from "moment";

export interface IUser {
  login: string;
}

export interface IIssueServer {
  id: number;
  title: string;
  state: string;
  created_at: string;
  body: string;
  user: IUser;
  comments_url: string;
}

export interface IComment {
  id: number;
  user: IUser;
  created_at: Moment;
  body: string;
}
