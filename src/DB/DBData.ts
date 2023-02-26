import { SingleEventDto } from '../Dto/SingleEvent.dto';
import { TeamEventDto } from '../Dto/TeamEvent.dto';
import {HouseDto} from "../Dto/House.dto";

export const SingleEventDBData: SingleEventDto[] = [
  {
    id: '1',
    name: '100 Meaters',
  },
  {
    id: '2',
    name: '100x4',
  },
  {
    id: '3',
    name: '200 Meaters',
  },
  {
    id: '4',
    name: '200x4',
  },
  {
    id: '5',
    name: '400 Meaters',
  },
  {
    id: '6',
    name: '400x4',
  },
  {
    id: '7',
    name: '1500 Meaters',
  },
  {
    id: '8',
    name: '5000 Meaters',
  },
  {
    id: '9',
    name: 'Marathon',
  },
  {
    id: '10',
    name: 'Shot Put (Yaguliya)',
  },
  {
    id: '11',
    name: 'Javelin (hella)',
  },
  {
    id: '12',
    name: 'Discus',
  },
  {
    id: '13',
    name: 'Tripple Jump',
  },
  {
    id: '14',
    name: 'Long Jump(Dura Paneema)',
  },
  {
    id: '15',
    name: 'High Jump',
  },
  {
    id: '16',
    name: 'Pole Jump',
  },
  {
    id: '17',
    name: '50x4',
  },
];

export const TeamEventDBData: TeamEventDto[] = [
  {
    id: '100',
    name: 'Badminton',
  },
  {
    id: '101',
    name: 'Elle',
  },
  {
    id: '102',
    name: 'Cricket',
  },
  {
    id: '103',
    name: 'Carrom',
  },
  {
    id: '104',
    name: 'Chess',
  },
  {
    id: '105',
    name: 'Volley Ball',
  },
  {
    id: '106',
    name: 'Foot Ball',
  },
  {
    id: '107',
    name: 'Teacwndo',
  },
  {
    id: '108',
    name: 'Swimming',
  },
  {
    id: '109',
    name: 'Karate',
  },
];

export const AGE_RANGE_JSON = {
  '1': ['13', '15', '17', '20'],
  '2': ['13', '15', '17', '20'],
  '3': ['13', '15', '17', '20'],
  '4': ['13', '15', '17', '20'],
  '5': ['13', '15', '17', '20'],
  '6': ['13', '15', '17', '20'],
  '7': ['12', '14', '16', '18', '20'],
  '8': ['12', '14', '16', '18', '20'],
  '9': ['20'],
  '10': ['12', '14', '16', '18', '20'],
  '11': ['12', '14', '16', '18', '20'],
  '12': ['12', '14', '16', '18', '20'],
  '13': ['12', '14', '16', '18', '20'],
  '14': ['12', '14', '16', '18', '20'],
  '15': ['12', '14', '16', '18', '20'],
  '16': ['12', '14', '16', '18', '20'],
  '17': ['12'],
  '100': ['13', '15', '17', '20'],
  '101': ['20'],
  '102': ['20'],
  '103': ['12', '14', '16', '18', '20'],
  '104': ['12', '14', '16', '18', '20'],
  '105': ['14', '16', '18', '20'],
  '106': ['14', '16', '18', '20'],
  '107': ['12', '14', '16', '18', '20'],
  '108': ['12', '14', '16', '18', '20'],
  '109': ['12', '14', '16', '18', '20'],
};

export const HOUSE_NAMES: HouseDto[] = ['Zues', 'Athens', 'Veenes'];
