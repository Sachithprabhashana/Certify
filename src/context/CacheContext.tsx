import React, { useContext, useEffect, useState } from 'react';
import { SingleEventDto } from '../Dto/SingleEvent.dto';
import { TeamEventDto } from '../Dto/TeamEvent.dto';
import { HOUSE_NAMES, SingleEventDBData, TeamEventDBData } from '../DB/DBData';
import { HouseDto } from '../Dto/House.dto';
import { CertificateDto } from '../Dto/Certificate.dto';
import {getAuth,onAuthStateChanged} from "firebase/auth";

export type CacheContextData = {
  singleEvents: SingleEventDto[];
  teamEvents: TeamEventDto[];
  houseNames: HouseDto[];
  currentEvent?: CertificateDto;
  setCurrentEvent: (value: CertificateDto) => void;

  user:any;
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
  const [user,setUser] = useState<any>();

   useEffect(()=> {
       const auth = getAuth();
       onAuthStateChanged(auth, (user) => {
           if (user) {
               // User is signed in, see docs for a list of available properties
               // https://firebase.google.com/docs/reference/js/firebase.User
               const uid = user.uid;
               console.log('uid', uid)
               setUser(user)
               // ...
           } else {
               // User is signed out
               // ...
               setUser(undefined);
           }
       });
   },[])

  useEffect(() => {
    setSingleEvents(SingleEventDBData);
    setTeamEvents(TeamEventDBData);
  }, []);
  return (
    <CacheProvider
      value={{
          user,
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
