'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DomainVerify() {
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    if (!domain) {
      setError('Please enter your domain');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/verify-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ domain }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setVerified(true);
      localStorage.setItem('verifiedDomain', domain);

      // Auto redirect to login after 2s
      setTimeout(() => navigate('/Login'), 2000);
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (verified) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Domain Verified!</h2>
        <p className="text-gray-600 mb-4">Your domain {domain} has been successfully verified.</p>
        <p className="text-sm text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Domain</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1" htmlFor="domain">
          Enter Your Domain *
        </label>
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="e.g., yourdomain.com"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Enter the domain you configured with DNS records</p>
      </div>

      <button
        onClick={handleVerify}
        disabled={isVerifying || !domain}
        className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 focus:ring focus:ring-green-300 disabled:opacity-50 transition-colors"
      >
        {isVerifying ? 'Verifying...' : 'Verify Domain'}
      </button>
    </div>
  );
}
