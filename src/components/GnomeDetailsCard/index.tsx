import { round } from 'utils/math';
import { stringColorToHex, textColor } from 'utils/color';
import { Gnome } from 'types';

const GnomeCard = ({
  gnome,
  children,
}: {
  gnome: Gnome;
  children?: React.ReactNode;
}) => {
  const hexBackground = stringColorToHex(gnome.hair_color);
  const color = textColor(hexBackground);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
      <div className="rounded-t-lg md:rounded-t-none md:rounded-l-lg md:w-64 xl:w-80 ratio-8-5 md:ratio-none responsive-img">
        <img src={gnome.thumbnail} alt="Gnome thumbnail" className="" />
      </div>
      <div className="flex-auto p-6 ">
        <h1 className="flex-auto text-2xl font-semibold dark:text-gray-50">
          {gnome.name}
        </h1>
        <div className="mt-2 flex flex-row flex-wrap items-end">
          <h2 className="text-lg mr-2">Age:</h2>
          <span>{gnome.age}</span>
        </div>
        <div className="mt-2 flex flex-row flex-wrap items-end">
          <h2 className="text-lg mr-2">Gender:</h2>

          {gnome.gender === 'male' ? (
            <i className="fas text-blue-300 mr-1 text-lg fa-mars"></i>
          ) : (
            <i className="fas text-pink-300 mr-1 text-lg fa-venus"></i>
          )}
          <span>{gnome.gender}</span>
        </div>
        <div className="mt-2 flex flex-row flex-wrap items-end">
          <h2 className="text-lg mr-2">Weight:</h2>
          <span>{round(gnome.weight)}</span>
        </div>
        <div className="mt-2 flex flex-row flex-wrap items-end">
          <h2 className="text-lg mr-2">Height:</h2>
          <span>{round(gnome.height)}</span>
        </div>
        <div className="mt-2 flex flex-row flex-wrap items-end">
          <h2 className="text-lg mr-2">Hair color:</h2>
          <span
            className="px-3 rounded-lg"
            style={{ background: hexBackground, color }}
          >
            {gnome.hair_color}
          </span>
        </div>
        <div className="mt-2 flex flex-row flex-wrap items-end">
          <h2 className="text-lg mr-2">Professions:</h2>
          {gnome.professions.map((p, i) => {
            const isLast = i === gnome.professions.length - 1;
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
          {gnome.friends.length > 0
            ? gnome.friends.map((p, i) => {
                const isLast = i === gnome.friends.length - 1;
                return (
                  <span key={p} className={` ${isLast ? '' : 'mr-1'}`}>
                    {p}
                    {isLast ? '' : ', '}
                  </span>
                );
              })
            : 'No friends'}
        </div>
        {children}
      </div>
    </div>
  );
};

export default GnomeCard;
