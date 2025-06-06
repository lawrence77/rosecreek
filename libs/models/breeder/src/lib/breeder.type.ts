export type Breeder = {
  id: number;
  name: string;

  // people
  staff: Member[];
  handlers: Member[];
  sponsors: Member[];
  support: Member[];

  // words and photos
  description: string;
  history?: string;
  mission?: string;
  photos: string[];

  // dogs
  litters: number[];

  // TODO: add account fields to login
};

export type Member = {
  id: number;
  name: string;
  role: 'Owner' | 'Staff' | 'Dog Handler' | 'Sponsor' | 'Supporter';
  bio: string;
  photo?: string;
};
