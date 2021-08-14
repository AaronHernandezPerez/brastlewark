import { useReducer, useEffect } from 'react';
import axios from 'axios';
import {
  trackWindowScroll,
  ScrollPosition,
} from 'react-lazy-load-image-component';

import ScrollObserver from 'components/ScrollObserver';
import GnomeCard from 'components/GnomeCard';
import { getPageElements } from 'utils/libraries';
import { Gnome } from 'types';

type BrastlewarkStore = {
  gnomes: Array<Gnome>;
  loading: boolean;
  error: string;
  page: number;
  perPage: number;
  maxPages: number;
};

type BrastlewarkStoreActions =
  | 'setGnomes'
  | 'setLoading'
  | 'setError'
  | 'setPage'
  | 'nextPage'
  | 'reset';

type BrastlewarkAction = {
  type: BrastlewarkStoreActions;
  payload?: any;
};

function init(): BrastlewarkStore {
  return {
    gnomes: [],
    loading: false,
    error: '',
    page: 1,
    perPage: 4,
    maxPages: 1,
  };
}

function reducer(state: BrastlewarkStore, action: BrastlewarkAction) {
  switch (action.type) {
    case 'setGnomes':
      return {
        ...state,
        gnomes: action.payload,
        page: 1,
        maxPages: Math.ceil(action.payload.length / state.perPage),
      };
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setError':
      return { ...state, error: action.payload };
    case 'setPage':
      return { ...state, page: action.payload };
    case 'nextPage':
      let page = state.page;
      if (page < state.maxPages) {
        return { ...state, page: state.page + 1 };
      }
      return state;
    case 'reset':
      return init();
    default:
      throw new Error('You must use a function');
  }
}

const GnomeLibrary = ({
  scrollPosition,
}: {
  scrollPosition?: ScrollPosition;
}) => {
  const [state, dispatch] = useReducer(reducer, null, init);
  useEffect(() => {
    dispatch({ type: 'setLoading', payload: true });
    axios
      .get(
        // 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json'
        './data.json'
      )
      .then(({ data }) => {
        dispatch({ type: 'setGnomes', payload: data.Brastlewark });
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'setError', payload: 'Error retrieving citizens' });
      })
      .finally(() => {
        dispatch({ type: 'setLoading', payload: false });
      });
  }, []);

  const nextPage = () => {
    dispatch({ type: 'nextPage' });
    console.log('Next Page');
  };

  if (state.error) {
    return <p>{state.error}</p>;
  }
  if (state.loading) {
    return <p>LOADING</p>;
  }

  const filteredGnomes = state.gnomes.slice(
    0,
    getPageElements(state.page, state.perPage, state.gnomes.length)
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-center flex-wrap pt -4">
        {filteredGnomes.map((gnome: Gnome) => (
          <GnomeCard
            key={gnome.id}
            gnome={gnome}
            scrollPosition={scrollPosition}
            className="m-3"
          />
        ))}
      </div>
      <ScrollObserver onIntersect={nextPage} />
    </div>
  );
};

export default trackWindowScroll(GnomeLibrary);
