import { createContext, ReactElement, useReducer, useEffect } from 'react';

import { Gnome } from 'types';
import useFetch from 'api/useFetch';

const genderLetters = {
  male: ['u', 'o'],
  female: ['a', 'e', 'i'],
};

type BrastlewarkStore = {
  gnomes: Array<Gnome>;
  loading: boolean;
  error: null | string;
};

type BrastlewarkStoreActions =
  | 'setGnomes'
  | 'setLoading'
  | 'setError'
  | 'reset';

type BrastlewarkAction = {
  type: BrastlewarkStoreActions;
  payload?: any;
};

function init(): BrastlewarkStore {
  return {
    gnomes: [],
    loading: true,
    error: null,
  };
}

function reducer(state: BrastlewarkStore, action: BrastlewarkAction) {
  switch (action.type) {
    case 'setGnomes':
      return {
        ...state,
        gnomes: action.payload,
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'reset':
      return init();
    default:
      throw new Error('You must use a function');
  }
}

export const GnomeContext = createContext<{
  state: BrastlewarkStore;
  dispatch: React.Dispatch<BrastlewarkAction>;
}>({
  state: init(),
  dispatch: () => undefined,
});

const GnomeProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const errorMsg = 'Error retrieving citizens';
  const { data, loading, error } = useFetch(
    'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json'
  );
  const [state, dispatch] = useReducer(reducer, null, init);

  useEffect(() => {
    if (error) {
      dispatch({ type: 'setError', payload: errorMsg });
    } else if (data) {
      if (data?.Brastlewark) {
        try {
          // Finding the gender based on the last vocal of their first name
          data.Brastlewark.forEach((e: Gnome) => {
            const match = e.name
              .split(' ')[0]
              .match(/[aAeEiIoOuU]/g)
              ?.pop();
            if (match && genderLetters.male.includes(match)) {
              e.gender = 'male';
            } else {
              e.gender = 'female';
            }
          });

          dispatch({ type: 'setGnomes', payload: data.Brastlewark });
        } catch (error) {
          console.error(error);
          dispatch({ type: 'setError', payload: errorMsg });
        }
      } else {
        dispatch({ type: 'setError', payload: errorMsg });
      }
    }
    dispatch({ type: 'setLoading', payload: loading });
  }, [data, error, loading]);

  return (
    <GnomeContext.Provider value={{ state, dispatch }}>
      {children}
    </GnomeContext.Provider>
  );
};

export default GnomeProvider;
