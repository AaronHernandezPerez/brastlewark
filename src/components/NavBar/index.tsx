import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ children }: { children?: ReactElement }) => {
  return (
    <div className="w-full flex flex-row items-center p-2 px-8 justify-between shadow-xs bg-red-500">
      <div
        className={`text-xl text-center font-bold text-white sm:flex ${
          children ? 'hidden' : ' '
        }`}
      >
        <Link to="/">Brastlewark</Link>
      </div>
      {children && (
        <div className="w-full sm:w-1/3 h-8 text-sm flex">{children}</div>
      )}
      <div></div>
    </div>
  );
};

export default NavBar;
