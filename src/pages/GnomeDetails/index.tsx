import NavBar from 'components/NavBar';
import { useParams } from 'react-router-dom';
import { stringColorToHex, textColor } from 'utils/color';
import { round } from 'utils/math';
import { testGnome } from 'utils/tests';
interface RouteParams {
  id: string;
}
function GnomeDetails() {
  const { id } = useParams<RouteParams>();

  const hexBackground = stringColorToHex(testGnome.hair_color);
  const color = textColor(hexBackground);
  return (
    <div className="h-full flex flex-col">
      <NavBar />
      <div className="container mx-auto flex-grow flex justify-center items-center">
        <div className="flex bg-white  rounded-lg shadow-lg">
          <div className="flex-none w-24 md:w-48  relative">
            <img
              src={testGnome.thumbnail}
              alt="shopping"
              className="absolute rounded-lg inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex-auto p-6">
            <h1 className="flex-auto text-2xl font-semibold dark:text-gray-50">
              {testGnome.name}
            </h1>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Age:</h2>
              <span>{testGnome.age}</span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Weight:</h2>
              <span>{round(testGnome.weight)}</span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Height:</h2>
              <span>{round(testGnome.height)}</span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Hair color:</h2>
              <span
                className="px-3 rounded-lg"
                style={{ background: hexBackground, color }}
              >
                {testGnome.hair_color}
              </span>
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Professions:</h2>
              {testGnome.professions.map((p, i) => {
                const isLast = i === testGnome.professions.length - 1;
                return (
                  <span className={` ${isLast ? '' : 'mr-1'}`}>
                    {p}
                    {isLast ? '' : ', '}
                  </span>
                );
              })}
            </div>
            <div className="mt-2 flex flex-row flex-wrap items-end">
              <h2 className="text-lg mr-2">Friends:</h2>
              {testGnome.friends.map((p, i) => {
                const isLast = i === testGnome.friends.length - 1;
                return (
                  <span className={` ${isLast ? '' : 'mr-1'}`}>
                    {p}
                    {isLast ? '' : ', '}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GnomeDetails;
