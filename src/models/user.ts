export interface User {
  createdAt: string;
  updatedAt: string;
  id: number;
  nickname: string;
  profileImage?: string;
  providerId: string;
  provider: 'KAKAO';
  role: 'USER';
}
