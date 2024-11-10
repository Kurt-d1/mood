export interface Post {
  id: number;
  dateToPost: string;
  driveLink: string;
  platforms: string[];
  media: string;
  caption: string;
  designApproved: boolean;
  contentDone: boolean;
  status: string;
  posted: boolean;
  company: string;
  comments: Comment[];
  needsAttention: boolean;
}

export interface Comment {
  id: number;
  text: string;
}