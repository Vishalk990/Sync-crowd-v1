import Loader from "@/utils/loader/loader";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 z-50 flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default GlobalLoader;