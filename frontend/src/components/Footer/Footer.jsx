import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          
          {/* Logo & Branding */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white tracking-wide">Decentralized File Storage</h2>
            <p className="text-sm text-gray-400 mt-1">Secure & Transparent Storage Powered by Blockchain</p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              Home
            </Link>
            <Link to="/upload_file" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              Upload
            </Link>
            <Link to="/files" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
              View Files
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-md">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-md">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-md">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} <span className="text-white font-medium">FileChain</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
