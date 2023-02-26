import React, { useContext, useEffect, useState } from 'react';
import { SingleEventDto } from '../Dto/SingleEvent.dto';
import { TeamEventDto } from '../Dto/TeamEvent.dto';
import { HOUSE_NAMES, SingleEventDBData, TeamEventDBData } from '../DB/DBData';
import { HouseDto } from '../Dto/House.dto';

export type CacheContextData = {
  singleEvents: SingleEventDto[];
  teamEvents: TeamEventDto[];
  houseNames: HouseDto[];
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
  useEffect(() => {
    setSingleEvents(SingleEventDBData);
    setTeamEvents(TeamEventDBData);
  }, []);
  return (
    <CacheProvider
      value={{
        singleEvents,
        teamEvents,
        houseNames: HOUSE_NAMES,
      }}>
      {props.children}
    </CacheProvider>
  );
};
