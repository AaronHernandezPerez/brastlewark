const ErrorBox = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
      className="text-red-600 bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md my-3 block text-left "
      role="alert"
    >
      {children}
    </div>
  );
};

export default ErrorBox;
