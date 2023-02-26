import React, { useContext, useEffect, useState } from 'react';
import { SingleEventDto } from '../Dto/SingleEvent.dto';
import { TeamEventDto } from '../Dto/TeamEvent.dto';
import { HOUSE_NAMES, SingleEventDBData, TeamEventDBData } from '../DB/DBData';
import { HouseDto } from '../Dto/House.dto';
import { CertificateDto } from '../Dto/Certificate.dto';

export type CacheContextData = {
  singleEvents: SingleEventDto[];
  teamEvents: TeamEventDto[];
  houseNames: HouseDto[];
  currentEvent?: CertificateDto;
  setCurrentEvent: (value: CertificateDto) => void;
};
const CacheContext = React.createContext<CacheContextData>({} as any);

export const CacheProvider = CacheContext.Provider;
export default CacheContext;

export const useCache = () => {
  return useContext(CacheContext);
};

export const CacheContextWrapper = (props: any) => {
  const [singleEvents, setSingleEvents] = useState<SingleEventDto[]>([]);
  const [teamEvents, setTeamEvents] = useState<TeamEventDto[]>([]);
  const [currentEvent, setCurrentEvent] = useState<CertificateDto>();
  useEffect(() => {
    setSingleEvents(SingleEventDBData);
    setTeamEvents(TeamEventDBData);
  }, []);
  return (
    <CacheProvider
      value={{
        singleEvents,
        teamEvents,
        setCurrentEvent,
        currentEvent,
        houseNames: HOUSE_NAMES,
      }}>
      {props.children}
    </CacheProvider>
  );
};
