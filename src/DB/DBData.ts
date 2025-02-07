import { SingleEventDto } from '../Dto/SingleEvent.dto';
import { TeamEventDto } from '../Dto/TeamEvent.dto';
import { HouseDto } from "../Dto/House.dto";

export const SingleEventDBData: SingleEventDto[] = [
  {
    value: '1',
    label: '100 Metres',
  },
  {
    value: '2',
    label: '100x4',
  },
  {
    value: '3',
    label: '200 Metres',
  },
  {
    value: '4',
    label: '200x4',
  },
  {
    value: '5',
    label: '400 Metres',
  },
  {
    value: '6',
    label: '400x4',
  },
  {
    value: '7',
    label: '1500 Metres',
  },
  {
    value: '8',
    label: '5000 Metres',
  },
  {
    value: '9',
    label: 'Marathon',
  },
  {
    value: '10',
    label: 'Shot Put',
  },
  {
    value: '11',
    label: 'Javelin',
  },
  {
    value: '12',
    label: 'Discus',
  },
  {
    value: '13',
    label: 'Tripple Jump',
  },
  {
    value: '14',
    label: 'Long Jump',
  },
  {
    value: '15',
    label: 'High Jump',
  },
  {
    value: '16',
    label: 'Pole Jump',
  },
  {
    value: '17',
    label: '50x4',
  },
  {
    value: '18',
    label: '60 Metres',
  },
  {
    value: '19',
    label: '80 Metres',
  },
  {
    value: '20',
    label: '80 Metres Hurdle',
  },
  {
    value: '21',
    label: '100 Metres Hurdle',
  },
  {
    value: '22',
    label: '110 Metres Hurdle',
  },
  {
    value: '23',
    label: '800 Metres',
  },
  {
    value: '24',
    label: '3000 Metres',
  },
  {
    value: '25',
    label: 'Swimming 400m Open Freestyle'
  }
  ,
  {
    value: '26',
    label: 'Swimming Brest Stock',
  }
  ,
  {
    value: '27',
    label: 'Swimming Medley Relay 50*4',
  }
  ,
  {
    value: '28',
    label: 'Swimming Open Relay 50*4',
  }
  ,
  {
    value: '29',
    label: 'Swimming',
  }
  ,
  {
    value: '30',
    label: 'Swimming Free Style 50m'
  }
  ,
  {
    value: '31',
    label: 'Swimming Free style 100m',
  }
  ,
  {
    value: '32',
    label: 'Swimming Backstroke 50m',
  }
  ,
  {
    value: '33',
    label: 'Swimming Backstrock 100m',
  }
  ,
  {
    value: '34',
    label: 'Swimming Breaststroke 50m',
  }
  ,
  {
    value: '35',
    label: 'Swimming Breaststroke 100m',
  },
  {
    value: '36',
    label: 'Swimming Butterfly 50m',
  }
  ,
  {
    value: '37',
    label: 'Swimming Butterfly 100m',
  }

];

export const TeamEventDBData: TeamEventDto[] = [
  {
    value: '100',
    label: 'Badminton',
  },
  {
    value: '101',
    label: 'Elle',
  },
  {
    value: '102',
    label: 'Cricket',
  },
  {
    value: '103',
    label: 'Carrom',
  },
  {
    value: '104',
    label: 'Chess',
  },
  {
    value: '105',
    label: 'Volley Ball',
  },
  {
    value: '106',
    label: 'Foot Ball',
  },
  {
    value: '107',
    label: 'Teacwndo',
  },
  {
    value: '108',
    label: 'Swimming',
  },
  {
    value: '109',
    label: 'Karate',
  },
];
export const AGE_RANGES = ['Open', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
export const AGE_RANGE_JSON: any = {
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
  '18': ['12', '14', '16', '18', '20'],
  '19': ['12', '14', '16', '18', '20'],
  '20': ['12', '14', '16', '18', '20'],
  '21': ['12', '14', '16', '18', '20'],
  '22': ['12', '14', '16', '18', '20'],
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

export const HOUSE_NAMES: HouseDto[] = ['Zeus', 'Athens', 'Venus'];
export const HOUSE_JSON = {
  zeus: 'Zeus',
  athens: 'Athens',
  venus: 'Venus',
}
export const WINNER_PLACES: string[] = ['1st', '2nd', '3rd', 'Participation'];
export const TEAM_WINNER_PLACES: string[] = ['Champion', 'RunnersUp', '3rd Place'];

