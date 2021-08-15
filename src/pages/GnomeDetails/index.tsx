import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { GnomeContext } from 'context/GnomeContext';
import NavBar from 'components/NavBar';
import GnomeDetailsCard from 'components/GnomeDetailsCard';
import Spinner from 'components/Spinner';
import ErrorBox from 'components/ErrorBox';
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
      body = (
        <GnomeDetailsCard gnome={selectedGnome}>
          <div className="mt-2 flex justify-center">
            <Link to="/">
              <button
                type="button"
                className={`mt-3 py-1 px-10 rounded-lg bg-red-500 text-white tracking-widest border-2 border-red-400 hover:bg-opacity-90 active:bg-red-600 transition duration-200`}
              >
                Back
              </button>
            </Link>
          </div>
        </GnomeDetailsCard>
      );
    }
  }

  return (
    <div className="h-full flex flex-col ">
      <NavBar />
      <div className="container mx-auto p-2 sm:p-0 flex-grow">
        <div className="flex flex-grow justify-center items-center h-full">
          {body}
        </div>
      </div>
    </div>
  );
}

export default GnomeDetails;
