import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { CertificateDto, CertificateTeamDto } from '../Dto/Certificate.dto';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { LoginDto } from '../Dto/Login.dto';

// const firebaseConfig = {
//   apiKey: 'AIzaSyA9a1bbQZ_UReNqitBSDIwr4fDEmQNrSbM',
//   authDomain: 'certify-codes.firebaseapp.com',
//   projectId: 'certify-codes',
//   storageBucket: 'certify-codes.appspot.com',
//   messagingSenderId: '855127998456',
//   appId: '1:855127998456:web:94aa34557458a84bb5600d',
//   measurementId: 'G-RSKH79WH2Q',
// };

const firebaseConfig = {
  apiKey: "AIzaSyCSPTE_zGK64oJSs2ccaoOCjbW_N256_MA",
  authDomain: "certify-5baff.firebaseapp.com",
  projectId: "certify-5baff",
  storageBucket: "certify-5baff.appspot.com",
  messagingSenderId: "441398045232",
  appId: "1:441398045232:web:ce2916a757f524ddff9bf5",
  measurementId: "G-JYQP9RQK9P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

export const login = async (values: LoginDto) => {
  await signInWithEmailAndPassword(auth, values.email, values.password);
};

export const logout = async () => {
  await signOut(auth);
};
const handlerScoreData = (docs: any[]) => {
  const allEvents = [];
  let venusScore = 0;
  let athensScore = 0;
  let zuesScore = 0;
  for (const sEvent of docs) {
    const id = sEvent.id;
    const detail = sEvent.data();
    const scoreData = detail.score[0];
    const venus = scoreData?.['venus'];
    const athens = scoreData?.['athens'];
    const zues = scoreData?.['zues'];
    venusScore = venusScore + venus;
    athensScore = athensScore + athens;
    zuesScore = zuesScore + zues;

    allEvents.push({
      id,
      event: detail.event,
      ageRange: detail.ageRange,
      venus,
      athens,
      zues,
    });
  }
  return { allEvents, venusScore, athensScore, zuesScore };
};
export const getScoreData = async () => {
  const eventsCol = collection(db, 'events');
  const teamEventsCol = collection(db, 'teamEvents');
  const eventSnapshot = await getDocs(eventsCol);
  const teamEventSnapshot = await getDocs(teamEventsCol);
  const singleEventRes = handlerScoreData(eventSnapshot.docs);
  const teamEventRes = handlerScoreData(teamEventSnapshot.docs);
  const venusScore = (singleEventRes?.venusScore ?? 0) + (teamEventRes?.venusScore ?? 0);
  const athensScore = (singleEventRes?.athensScore ?? 0) + (teamEventRes?.athensScore ?? 0);
  const zuesScore = (singleEventRes?.zuesScore ?? 0) + (teamEventRes?.zuesScore ?? 0);
  return {
    events: [...(singleEventRes?.allEvents ?? []), ...(teamEventRes?.allEvents ?? [])],
    total: { venusScore, athensScore, zuesScore },
  };
};
export const getEvents = async () => {
  const citiesCol = collection(db, 'events');
  const citySnapshot = await getDocs(citiesCol);
  return citySnapshot.docs.map((doc) => ({ ...doc.data(), key: doc.id }));
};
export const getTeamEvents = async () => {
  const citiesCol = collection(db, 'teamEvents');
  const citySnapshot = await getDocs(citiesCol);
  return citySnapshot.docs.map((doc) => ({ ...doc.data(), key: doc.id }));
};
export const saveEvent = async (values: CertificateDto) => {
  const citiesCol = collection(db, 'events');
  const cityRef = doc(citiesCol, Date.now().toString());
  await setDoc(cityRef, values);
};
export const saveTeamEvent = async (values: CertificateTeamDto) => {
  const citiesCol = collection(db, 'teamEvents');
  const cityRef = doc(citiesCol, Date.now().toString());
  await setDoc(cityRef, values);
};
export const deleteTeamEvent = async (id: string) => {
  const citiesCol = collection(db, 'teamEvents');
  const cityRef = doc(citiesCol, id);
  await deleteDoc(cityRef);
};
export const deleteEvent = async (id: string) => {
  const citiesCol = collection(db, 'events');
  const cityRef = doc(citiesCol, id);
  await deleteDoc(cityRef);
};
