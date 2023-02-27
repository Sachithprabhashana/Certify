import {initializeApp} from 'firebase/app';
import {collection, getDocs, getFirestore, setDoc, doc} from 'firebase/firestore';
import {CertificateDto} from "../Dto/Certificate.dto";
const firebaseConfig = {
    apiKey: "AIzaSyA9a1bbQZ_UReNqitBSDIwr4fDEmQNrSbM",
    authDomain: "certify-codes.firebaseapp.com",
    projectId: "certify-codes",
    storageBucket: "certify-codes.appspot.com",
    messagingSenderId: "855127998456",
    appId: "1:855127998456:web:94aa34557458a84bb5600d",
    measurementId: "G-RSKH79WH2Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const getEvents = async () => {
    const citiesCol = collection(db, 'events');
    const citySnapshot = await getDocs(citiesCol);
    return citySnapshot.docs.map(doc => doc.data());
}
export const saveEvent = async (values: CertificateDto) => {
    const citiesCol = collection(db, 'events');
    const cityRef = doc(citiesCol, Date.now().toString());
    await setDoc(cityRef, values);
}
