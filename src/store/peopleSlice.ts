import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  mass: string;
  url: string;
  liked?: boolean | any;
  index?: number | any;
}

interface People {
  count: number;
  list: Person[] | any;
  loading: boolean;
  error: string | null;
}

interface PeopleState extends People {
  firstPersonIdx: number;
  lastPersonIdx: number;
  person: any;
  counter: any;
}

// Creating async request to the API using AsyncThunk.
// Making API request for all people list.
export const fetchPeople = createAsyncThunk<
  People,
  number,
  {rejectValue: string}
>('people/fetchPeople', async function (page, {rejectWithValue}) {
  const request = await fetch(`https://swapi.dev/api/people/?page=${page}`);

  // Handling the error, if server response isn't good.
  if (!request.ok) {
    return rejectWithValue('Server Error!');
  }

  const response = await request.json();
  return response;
});

// Making API request for exact person.
export const fetchPerson = createAsyncThunk<
  Person,
  string,
  {rejectValue: string}
>('people/fetchPerson', async function (url, {rejectWithValue}) {
  const request = await fetch(`${url}`);

  // Handling the error, if server response isn't good.
  if (!request.ok) {
    return rejectWithValue('Server Error!');
  }

  const response = await request.json();
  return response;
});

const initialState: PeopleState = {
  count: 0,
  firstPersonIdx: 0,
  lastPersonIdx: 10,
  list: [],
  person: {
    name: '',
    birth_year: '',
    gender: '',
    height: '',
    mass: '',
    url: '',
  },
  counter: {
    female: 0,
    male: 0,
    others: 0,
  },
  loading: false,
  error: '',
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    resetPersonState(state) {
      state.person = initialState.person;
    },
    likePerson(state, action) {
      state.list[action.payload].liked = true;
    },
    dislikePerson(state, action) {
      state.list[action.payload].liked = false;
    },
    addToFavourite(state, action) {
      if (action.payload === 'male' || action.payload === 'female') {
        state.counter[action.payload] += 1;
      } else {
        state.counter.others += 1;
      }
    },
    removeFromFavourite(state, action) {
      if (action.payload === 'male' || action.payload === 'female') {
        state.counter[action.payload] -= 1;
      } else {
        state.counter.others -= 1;
      }
    },
    clearFavourites(state) {
      state.counter = {female: 0, male: 0, others: 0};
      state.list = [...state.list].map(el => {
        if ('liked' in el) {
          return {...el, liked: false};
        }
      });
    },
    pagination(state, action) {
      state.lastPersonIdx = action.payload * 10;
      state.firstPersonIdx = state.lastPersonIdx - 10;
    },
  },
  // Handling every status of API request using extraReducers.
  extraReducers: builder => {
    builder
      .addCase(fetchPeople.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPeople.fulfilled, (state, action: PayloadAction<any>) => {
        state.count = action.payload.count;
        state.list = state.list.concat(action.payload.results);
        state.list = [...state.list].map(el => {
          if ('liked' in el) {
            return {...el, index: state.list.indexOf(el)};
          } else {
            return {...el, liked: false, index: state.list.indexOf(el)};
          }
        });
        state.loading = false;
      })
      .addCase(fetchPerson.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPerson.fulfilled, (state, action) => {
        state.person = action.payload;
        state.loading = false;
      })
      // addMatcher() is available with builder and receives function which return boolean status of the error.
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default peopleSlice.reducer;
export const {
  resetPersonState,
  likePerson,
  dislikePerson,
  addToFavourite,
  removeFromFavourite,
  clearFavourites,
  pagination,
} = peopleSlice.actions;

// Function which returns "true" if our async request executed with an error.
function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
