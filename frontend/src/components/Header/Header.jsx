import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4 px-6 bg-gray-800 text-gray-100">
      <nav className="flex justify-between items-center">
      
        <Link to="/" className="text-3xl font-bold  text-gray-300 font-[Montserrat]">FileChain</Link>
        <button 
          className="lg:hidden text-3xl" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <IoMenu />
        </button>

        {/* Nav Links (Desktop) */}
        <div className="hidden lg:flex gap-10">
          <Link to="/" className="hover:text-blue-400 transition-all duration-300">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition-all duration-300">About Us</Link>
          <Link to="/upload_file" className="hover:text-blue-400 transition-all duration-300">Upload Files</Link>
          <Link to="/all_files" className="hover:text-blue-400 transition-all duration-300">All Files</Link>
        </div>

        {/* Login Button */}
        <div className="hidden lg:flex">
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white transition duration-300"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center mt-4 bg-gray-900 p-4 rounded-lg shadow-md">
          <Link to="/" className="py-2 hover:text-blue-400 transition-all duration-300">Home</Link>
          <Link to="/about" className="py-2 hover:text-blue-400 transition-all duration-300">About Us</Link>
          <Link to="/upload_file" className="py-2 hover:text-blue-400 transition-all duration-300">Upload Files</Link>
          <Link to="/all_files" className="py-2 hover:text-blue-400 transition-all duration-300">All Files</Link>
          <Link 
            to="/login" 
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};
