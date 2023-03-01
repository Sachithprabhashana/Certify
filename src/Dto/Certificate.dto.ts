export type WinnerDto = {
  name: string;
  house: string;
  place: string;
  achievement: string;
};

export type CertificateDto = {
  key: string;
  ageRange: string;
  event: string;
  winners: WinnerDto[];
  type: string;
  year: string;
  score: { [key: string]: number };
};

export type CertificateTeamDto = {
  key: string;
  ageRange: string;
  event: string;
  champion: WinnerDto[];
  runnersUp: WinnerDto[];
  thirdPlace: WinnerDto[];
  type: string;
  year: string;
  score: { [key: string]: number };
};
