export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface ResponseData {
  code: number;
  message: string;
  data: UserProfile;
}

export interface ResponseListUser {
  code: number;
  message: string;
  data: UserProfile[];
}