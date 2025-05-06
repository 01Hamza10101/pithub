const DashboardLayout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-full bg-gray-900 text-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
