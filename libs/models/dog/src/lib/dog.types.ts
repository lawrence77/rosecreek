export type Dog = {
  // Dog attributes
  name: string;
  breed: string;
  birthDate: Date;
  gender: 'Male' | 'Female';

  photos?: string[];
  description?: string;
  healthClearances?: string[];

  // Awards and Acknowledgments
  titles?: string[];
  awards?: string[];
  other?: string;

  // Associated Humans
  breeders?: string[];
  residence?: string;
  owners?: string[];

  // Registration and Identification
  pedigree?: string; // TODO: History of the dog (maybe just reference k9data.com)
  damId?: number;
  sireId?: number;
  id: number;

  registrationNumber?: string;
};
