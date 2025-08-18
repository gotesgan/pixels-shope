"use client"
import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

// Common Policy Layout Component
const PolicyLayout = ({ title, children, lastUpdated }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center">{title}</h1>
          <div className="flex justify-center mt-4">
            <nav className="flex text-sm text-white">
              <Link to="/" className="hover:text-blue-100">Home</Link>
              <span className="mx-2 flex items-center">
                <FiChevronRight />
              </span>
              <span className="font-medium">{title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="prose max-w-none">
            {children}
          </div>
          {lastUpdated && (
            <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
              Last Updated: {lastUpdated}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;