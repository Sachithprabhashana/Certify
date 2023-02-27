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
}
