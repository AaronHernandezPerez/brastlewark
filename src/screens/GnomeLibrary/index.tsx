import { useReducer, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import {
  trackWindowScroll,
  ScrollPosition,
} from 'react-lazy-load-image-component';
import { Gnome } from 'types';
import GnomeCard from 'components/GnomeCard';

type BrastlewarkStore = {
  gnomes: Array<Gnome>;
  filteredGnomes: Array<Gnome>;
  loading: boolean;
  error: string;
  page: number;
};

type BrastlewarkStoreActions =
  | 'setGnomes'
  | 'filterGnomes'
  | 'setLoading'
  | 'setError'
  | 'reset';

type BrastlewarkAction = {
  type: BrastlewarkStoreActions;
  data: any;
};

function init(): BrastlewarkStore {
  return { gnomes: [], filteredGnomes: [], loading: false, error: '', page: 1 };
}

function reducer(state: BrastlewarkStore, action: BrastlewarkAction) {
  switch (action.type) {
    case 'setGnomes':
      return {
        ...state,
        gnomes: action.data,
        filteredGnomes: [...action.data],
      };
    case 'filterGnomes':
      let filteredGnomes = state.gnomes.filter((e) =>
        e.name.includes(action.data)
      );
      if (action.data) {
        filteredGnomes = state.gnomes.filter((e) =>
          e.name.includes(action.data)
        );
      } else {
        filteredGnomes = [...state.gnomes];
      }
      return { ...state, filteredGnomes };
    case 'setLoading':
      return { ...state, loading: action.data };
    case 'setError':
      return { ...state, error: action.data };
    case 'reset':
      return init();
    default:
      throw new Error('You must use a function');
  }
}

const GnomeLibrary = ({
  scrollPosition,
}: {
  scrollPosition: ScrollPosition;
}) => {
  const [state, dispatch] = useReducer(reducer, null, init);
  useEffect(() => {
    dispatch({ type: 'setLoading', data: true });
    axios
      .get(
        // 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json'
        './data.json'
      )
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: 'setGnomes', data: data.Brastlewark.slice(0, 52) });
      })
      .catch((e) => {
        console.error(e);
        dispatch({ type: 'setError', data: e.toString() });
      })
      .finally(() => {
        dispatch({ type: 'setLoading', data: false });
      });
  }, []);

  const loader = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    console.log('handleObserver', entries);
    if (target.isIntersecting) {
      console.log('isIntersecting', entries);
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '500px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver, state]);

  if (state.error) {
    return <p>{state.error}</p>;
  }
  if (state.loading) {
    return <p>LOADING</p>;
  }
  return (
    <div className="container mx-auto">
      {scrollPosition}
      <div className="flex flex-row justify-center flex-wrap mt-4">
        {state.gnomes.map((gnome: Gnome) => (
          <GnomeCard
            key={gnome.id}
            gnome={gnome}
            scrollPosition={scrollPosition}
            className="m-3"
          />
        ))}
      </div>
      <div ref={loader} />
    </div>
  );
};
export default trackWindowScroll(GnomeLibrary);
