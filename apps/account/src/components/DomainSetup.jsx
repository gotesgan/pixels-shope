"use client"

import { useNavigate } from "react-router-dom"

export default function DomainSetup() {
  const navigate = useNavigate()

  const formData = {
    aRecord: "62.72.58.149",
    cnameRecord: "srv679222",
  }

  const handleNext = () => {
    // Store DNS records for verification
    localStorage.setItem("dnsRecords", JSON.stringify(formData))
    navigate("/domain-verify")
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-3 text-center">DNS Configuration</h2>

      <div className="mb-3 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-2">
          <li>
            Log in to your domain provider’s control panel (e.g., GoDaddy, Namecheap, Google Domains).
          </li>
          <li>
            Locate the section to manage DNS or DNS Zone Records.
          </li>
          <li>
            Add the following two DNS records exactly as shown below:
            <ul className="ml-4 list-decimal list-inside mt-1 space-y-1">
              <li>
                <strong>A Record</strong>: Points your domain to our server using an IP address.
              </li>
              <li>
                <strong>CNAME Record</strong>: Ensures that www.yourdomain.com redirects to the root domain.
              </li>
            </ul>
          </li>
          <li>
            After you’ve added the records, click the <strong>Next</strong> button below to proceed with domain verification.
          </li>
          <li>
            Note: DNS changes might take a few minutes to propagate globally (up to 24 hours in rare cases).
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">A Record *</label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            disabled
            value="A"
            className="p-2 border rounded bg-gray-100 text-center"
          />
          <input
            type="text"
            disabled
            value="@"
            className="p-2 border rounded bg-gray-100 text-center"
          />
          <input
            type="text"
            disabled
            value={formData.aRecord}
            className="p-2 border rounded bg-gray-100 text-center"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Points your domain to our server IP address</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">CNAME Record *</label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            disabled
            value="CNAME"
            className="p-2 border rounded bg-gray-100 text-center"
          />
          <input
            type="text"
            disabled
            value="www"
            className="p-2 border rounded bg-gray-100 text-center"
          />
          <input
            type="text"
            disabled
            value={formData.cnameRecord}
            className="p-2 border rounded bg-gray-100 text-center"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Redirects www to your root domain</p>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors"
      >
        Next
      </button>
    </div>
  )
}
