import { professions } from 'types';

const GnomeFilters = ({
  profession,
  setProfession,
}: {
  profession: string;
  setProfession: Function;
}) => {
  return (
    <div className="flex flex-row flex-wrap justify-between md:justify-start items-center">
      <div className={`font-semibold md:mr-5`}>
        <i className="fas fa-sliders-h mr-1"></i>
        Filters:
      </div>
      <div className="xm:w-auto sm:px-1 flex flex-row flex-nowrap items-center">
        <label className="mr-1" htmlFor="profession">
          Profession
        </label>
        <select
          id="profession"
          className="filter-select border border-gray-300 px-4 py-1 rounded-lg focus:outline-none max-w-3xl"
          value={profession}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setProfession(e.target.value);
          }}
        >
          <option className="border-b" value="">
            All
          </option>
          {professions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div></div>
    </div>
  );
};

export default GnomeFilters;
