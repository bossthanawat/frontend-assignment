export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
}

export interface GroupedUserData {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: { [color: string]: number };
    addressUser: { [userAddress: string]: string };
  };
}
