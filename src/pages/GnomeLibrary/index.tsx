import { useReducer, useEffect, useState } from 'react';
import {
  trackWindowScroll,
  ScrollPosition,
} from 'react-lazy-load-image-component';

import useFetch from 'api/useFetch';
import ScrollObserver from 'components/ScrollObserver';
import GnomeCard from 'components/GnomeCard';
import NavBar from 'components/NavBar';
import GnomeFilters from 'components/GnomeFilters';
import Spinner from 'components/Spinner';
import { getPageElements } from 'utils/libraries';
import { Gnome, Profession } from 'types';

type BrastlewarkStore = {
  gnomes: Array<Gnome>;
  page: number;
  perPage: number;
  maxPages: number;
};

type BrastlewarkStoreActions = 'setGnomes' | 'setPage' | 'nextPage' | 'reset';

type BrastlewarkAction = {
  type: BrastlewarkStoreActions;
  payload?: any;
};

function init(): BrastlewarkStore {
  return {
    gnomes: [],
    page: 1,
    perPage: 20,
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
  const errorMsg = 'Error retrieving citizens';
  const { data, loading, error, setError } = useFetch('./data.json');
  const [state, dispatch] = useReducer(reducer, null, init);
  const [search, setSearch] = useState('');
  const [profession, setProfession] = useState('');

  useEffect(() => {
    if (error) {
      setError(errorMsg);
    } else if (data) {
      if (data.Brastlewark) {
        dispatch({ type: 'setGnomes', payload: data.Brastlewark });
      } else {
        setError(errorMsg);
      }
    }
  }, [data, error, setError]);

  const nextPage = () => {
    dispatch({ type: 'nextPage' });
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col ">
        <NavBar />
        <div className="flex flex-grow justify-center items-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col ">
        <NavBar />
        <div className="flex flex-grow justify-center items-center">
          <div
            className="text-red-600 bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md my-3 block text-left "
            role="alert"
          >
            {error}
          </div>
        </div>
      </div>
    );
  }

  const filteredGnomes = state.gnomes
    .filter((e: Gnome) => {
      let searchBool = true;
      let professionBool = true;
      if (search) {
        searchBool = e.name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      }
      if (profession) {
        professionBool = e.professions.includes(profession as Profession);
      }

      return searchBool && professionBool;
    })
    .slice(0, getPageElements(state.page, state.perPage, state.gnomes.length));

  return (
    <div>
      <NavBar>
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="flex-grow px-4 rounded-lg focus:outline-none"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            dispatch({ type: 'setPage', payload: 1 });
          }}
        />
      </NavBar>

      <div className="container mx-auto">
        <div className="mx-4 py-2 border-b-2 border-gray-200">
          <GnomeFilters profession={profession} setProfession={setProfession} />
        </div>
        <div className="flex flex-row justify-evenly flex-wrap pt-1">
          {filteredGnomes.map((gnome: Gnome) => (
            <GnomeCard
              key={gnome.id}
              gnome={gnome}
              scrollPosition={scrollPosition}
              className="m-3"
            />
          ))}
        </div>
        <ScrollObserver onIntersect={nextPage} rootMargin="1000px" />
      </div>
    </div>
  );
};

export default trackWindowScroll(GnomeLibrary);
