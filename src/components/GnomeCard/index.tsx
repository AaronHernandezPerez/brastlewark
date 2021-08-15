import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { stringColorToHex, textColor, addHexAlpha } from 'utils/color';
import { Gnome } from 'types';
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
      className={`w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 will-change-transform ${className}`}
      style={{
        backgroundColor: backgroundColor,
        color: color,
      }}
    >
      <LazyLoadImage
        wrapperClassName="rounded-t-xl responsive-img ratio-8-5"
        key={gnome.id}
        alt="Gnome thumbnail"
        scrollPosition={scrollPosition}
        effect="blur"
        width="100%"
        src={gnome.thumbnail}
      />

      <div className="p-3 text-center">
        <h1 className="text-xl font-bold">{gnome.name}</h1>
        <p className="mt-2 text-sm">{gnome.professions.join(', ')}</p>
        <Link to={`/gnome/${gnome.id}`}>
          <button
            type="button"
            className={`mt-3 py-1 px-10 rounded-lg bg-black bg-opacity-20 text-white tracking-widest border-2 hover:bg-black hover:bg-opacity-30 transition duration-200`}
          >
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GnomeCard;
