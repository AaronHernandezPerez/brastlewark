import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from 'components/NavBar';
import { stringColorToHex, textColor } from 'utils/color';
import { round } from 'utils/math';
import { GnomeContext } from 'state/GnomeContext';
import Spinner from 'components/Spinner';
import ErrorBox from 'components/ErrorBox';
import './GnomeDetails.css';

interface RouteParams {
  id: string;
}
function GnomeDetails() {
  const { id } = useParams<RouteParams>();

  const {
    state: { loading, error, gnomes },
  } = useContext(GnomeContext);

  let body;

  if (loading) {
    body = <Spinner />;
  } else if (error) {
    body = <ErrorBox>{error}</ErrorBox>;
  } else {
    const selectedGnome = gnomes.find((g) => g.id.toString() === id);

    if (!selectedGnome) {
      body = <ErrorBox>Gnome not found 😥</ErrorBox>;
    } else {
      const hexBackground = stringColorToHex(selectedGnome.hair_color);
      const color = textColor(hexBackground);
      body = (
        <div className="flex bg-white rounded-lg shadow-lg">
          <div className="w-24 md:w-48 xl:w-72  relative">
            <img
              src={selectedGnome.thumbnail}
              alt="Thumbnail"
              className="absolute rounded-lg inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex-auto p-6 ">
            <h1 className="flex-auto text-2xl font-semibold dark:text-gray-50">
              {selectedGnome.name}
            </h1>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Age:</h2>
              <span>{selectedGnome.age}</span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Gender:</h2>

              {selectedGnome.gender === 'male' ? (
                <i className="fas text-blue-300 mr-1 icon fa-mars"></i>
              ) : (
                <i className="fas text-pink-300 mr-1 icon fa-venus"></i>
              )}
              <span>{selectedGnome.gender}</span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Weight:</h2>
              <span>{round(selectedGnome.weight)}</span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Height:</h2>
              <span>{round(selectedGnome.height)}</span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Hair color:</h2>
              <span
                className="px-3 rounded-lg"
                style={{ background: hexBackground, color }}
              >
                {selectedGnome.hair_color}
              </span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Professions:</h2>
              {selectedGnome.professions.map((p, i) => {
                const isLast = i === selectedGnome.professions.length - 1;
                return (
                  <span key={p} className={` ${isLast ? '' : 'mr-1'}`}>
                    {p}
                    {isLast ? '' : ', '}
                  </span>
                );
              })}
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Friends:</h2>
              {selectedGnome.friends.length > 0
                ? selectedGnome.friends.map((p, i) => {
                    const isLast = i === selectedGnome.friends.length - 1;
                    return (
                      <span key={p} className={` ${isLast ? '' : 'mr-1'}`}>
                        {p}
                        {isLast ? '' : ', '}
                      </span>
                    );
                  })
                : 'No friends'}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="h-full flex flex-col ">
      <NavBar />
      <div className="flex flex-grow justify-center items-center">{body}</div>
    </div>
  );
}

export default GnomeDetails;
