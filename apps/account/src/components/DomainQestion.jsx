'use client';
import { useNavigate } from 'react-router-dom';

export default function DomainQuestion() {
  const navigate = useNavigate();

  const handleNoDomain = () => {
   
  navigate("/login")
  };

  const handleHasDomain = () => {
    navigate('/domain-setup');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Domain Setup</h2>
        <p className="text-gray-600 mb-8">Do you have your own domain?</p>

        <div className="space-y-4">
          <button
            onClick={handleHasDomain}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors"
          >
            Yes, I have a domain
          </button>

          <button
            onClick={handleNoDomain}
            className="w-full py-3 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 focus:ring focus:ring-gray-300 transition-colors"
          >
            No, I need a domain
          </button>
        </div>
      </div>
    </div>
  );
}
