import './Spinner.css';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center" title="Loading">
      <div className="spinner ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  );
};

export default Spinner;
