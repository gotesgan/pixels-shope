'use client';

import { useNavigate } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import { useContext } from 'react';

export default function DomainSetup() {
  const { storeDomain } = useContext(StoreContext);
  const navigate = useNavigate();

  const formData = {
    cnameRecord: storeDomain
  };

  const handleNext = () => {
    localStorage.setItem('dnsRecords', JSON.stringify(formData));
    navigate('/domain-verify');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        DNS Configuration
      </h2>

      <div className="mb-6 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-400">
        <h3 className="font-semibold text-blue-900 mb-3">Instructions:</h3>
        <ul className="text-blue-800 text-sm list-disc list-inside space-y-2">
          <li>
            Log in to your domain provider’s control panel (e.g., GoDaddy, Namecheap, Google Domains).
          </li>
          <li>Locate the section to manage DNS or DNS Zone Records.</li>
          <li>
            Add the following DNS record exactly as shown:
            <ul className="ml-5 list-decimal list-inside mt-1 space-y-1">
              <li>
                <strong>CNAME Record</strong>: Ensures that <code>www.yourdomain.com</code> redirects to the root domain.
              </li>
            </ul>
          </li>
          <li>
            After adding the record, click the <strong>Next</strong> button below to proceed.
          </li>
          <li>
            Note: DNS changes might take a few minutes to propagate globally (up to 24 hours in rare cases).
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">CNAME Record</label>
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            disabled
            value="CNAME"
            className="p-3 border rounded-lg bg-gray-100 text-center text-gray-600 font-medium shadow-sm"
          />
          <input
            type="text"
            disabled
            value="www"
            className="p-3 border rounded-lg bg-gray-100 text-center text-gray-600 font-medium shadow-sm"
          />
          <input
            type="text"
            disabled
            value={formData.cnameRecord}
            className="p-3 border rounded-lg bg-gray-100 text-center text-gray-700 font-semibold shadow-sm"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Redirects <code>www</code> to your root domain
        </p>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition-all"
      >
        Next
      </button>
    </div>
  );
}
