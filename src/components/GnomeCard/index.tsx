import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';

import { stringColorToHex, textColor, addHexAlpha } from 'utils/color';
import { Gnome } from 'types';
import './GnomeCard.css';

const GnomeCard = ({
  gnome,
  className = '',
  scrollPosition,
}: {
  gnome: Gnome;
  className?: string;
  scrollPosition?: ScrollPosition;
}) => {
  const hexBackground = stringColorToHex(gnome.hair_color);
  const color = textColor(hexBackground);
  const backgroundColor = addHexAlpha(hexBackground, 0.75);
  return (
    <div
      className={`p-3 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 will-change-transform ${className}`}
      style={{
        backgroundColor: backgroundColor,
        color: color,
      }}
    >
      <div className="w-sm">
        <LazyLoadImage
          wrapperClassName="rounded-xl responsive-img"
          key={gnome.id}
          alt="Gnome thumbnail"
          scrollPosition={scrollPosition}
          effect="blur"
          width="100%"
          src={gnome.thumbnail}
        />

        <div className="mt-4 text-center">
          <h1 className="text-xl font-bold">{gnome.name}</h1>
          {/* <p className="mt-4 text-gray-600">{gnome}</p> */}

          <button
            type="button"
            className={`mt-4 py-1 px-10 rounded-full bg-black bg-opacity-20 text-white tracking-widest border-2 hover:bg-black hover:bg-opacity-30 will-change-transform transition duration-200`}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default GnomeCard;
