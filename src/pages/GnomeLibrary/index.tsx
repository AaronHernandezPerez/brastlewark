import { useReducer, useState, useContext, useEffect } from 'react';
import {
  trackWindowScroll,
  ScrollPosition,
} from 'react-lazy-load-image-component';

import ScrollObserver from 'components/ScrollObserver';
import GnomeCard from 'components/GnomeCard';
import NavBar from 'components/NavBar';
import GnomeFilters from 'components/GnomeFilters';
import Spinner from 'components/Spinner';
import ErrorBox from 'components/ErrorBox';
import { GnomeContext } from 'context/GnomeContext';
import { getPageElements } from 'utils/libraries';
import { Gnome, Profession } from 'types';

type LibraryStore = {
  page: number;
  perPage: number;
  maxPages: number;
};

type LibraryStoreActions =
  | 'setGnomes'
  | 'setPage'
  | 'nextPage'
  | 'setMaxPages'
  | 'reset';

type BrastlewarkAction = {
  type: LibraryStoreActions;
  payload?: any;
};

function init(): LibraryStore {
  return {
    page: 1,
    perPage: 20,
    maxPages: 1,
  };
}

function reducer(state: LibraryStore, action: BrastlewarkAction) {
  switch (action.type) {
    case 'setPage':
      return { ...state, page: action.payload };
    case 'setMaxPages':
      return { ...state, maxPages: action.payload };
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
  const {
    state: { error, loading, gnomes },
  } = useContext(GnomeContext);
  const [search, setSearch] = useState('');
  const [profession, setProfession] = useState('');

  useEffect(() => {
    if (gnomes?.length > 0) {
      dispatch({ type: 'setMaxPages', payload: gnomes.length });
    }
  }, [gnomes.length]);

  const nextPage = () => {
    dispatch({ type: 'nextPage' });
  };

  let body;
  let activateSearch = false;

  if (loading) {
    body = <Spinner />;
  } else if (error) {
    body = <ErrorBox>{error}</ErrorBox>;
  } else {
    activateSearch = true;
    const filteredGnomes = gnomes
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
      .slice(0, getPageElements(state.page, state.perPage, gnomes.length));

    body = (
      <div className="self-baseline w-full">
        <div className="px-4 w-full py-2 border-b-2 border-gray-200">
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
    );
  }

  return (
    <div className="h-full flex flex-col ">
      <NavBar>
        {activateSearch && (
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
        )}
      </NavBar>
      <div className="container mx-auto">
        <div className="flex flex-grow justify-center items-center">{body}</div>
      </div>
    </div>
  );
};

export default trackWindowScroll(GnomeLibrary);
