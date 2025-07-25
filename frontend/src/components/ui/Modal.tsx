const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-4 rounded-lg min-w-[300px] max-w-[500px] w-full">
        {children}
      </div>
    </div>
  );
};

export default Modal;
