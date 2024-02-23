import { Post } from "./post";
import { User } from "./user";

export interface Channel {
  id: number;
  name: string;
  deletable: boolean;
  idUser?: number;
  posts?: Post[];
  user?: User[];
}
