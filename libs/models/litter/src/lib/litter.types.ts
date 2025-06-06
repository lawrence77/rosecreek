export type Litter = {
  damId: number;
  sireId: number;
  birthDate: Date;
  puppyIds: number[];
  photos: string[];

  description?: string;

  akcCertification?: string;
  certificationIssuedDate?: Date;
};
