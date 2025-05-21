const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2025 ShopHub. All rights reserved.</p>
          </div>

          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="text-gray-300 hover:text-white">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-xl">f</span>
              </div>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-xl">t</span>
              </div>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-xl">in</span>
              </div>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-xl">ig</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
