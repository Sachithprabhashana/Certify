export type WinnerDto = {
    name: string;
    house: string;
    place: string;
    achievement: string;

}

export type CertificateDto = {
    ageRange: string;
    event: string;
    winners: WinnerDto[];
    type: string;
    year: string;
}

export type CertificateTeamDto = {
    ageRange: string;
    event: string;
    champion: WinnerDto[];
    runnersUp: WinnerDto[];
    thirdPlace: WinnerDto[];
    type: string;
    year: string;
}
