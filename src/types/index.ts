export interface PeopleItemProps {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
}

export interface CounterProps {
  female: number;
  male: number;
  others: number;
  onPress: () => void;
}
