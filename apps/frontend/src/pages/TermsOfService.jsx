"use client";
import React, { useState, useEffect } from "react";
import PolicyLayout from "../components/PolicyLayout";
import { termsOfServiceData } from "./PolicyData";
import { fetchGraphQL } from "../lib/fetchGrap";

const TermsOfService = () => {
  const [policyData, setPolicyData] = useState(termsOfServiceData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicyData = async () => {
      setLoading(true);
      try {
        const hostname = window.location.hostname;
        const query = `
          query LegalDocument {
            legalDocument(type: "TERMS") {
              id
              type
              title
              lastUpdated
              sections {
                id
                heading
                content
                isOrdered
                listItems
              }
            }
          }
        `;

        const data = await fetchGraphQL(hostname, query);

        if (data?.legalDocument) {
          setPolicyData(data.legalDocument);
        } else {
          throw new Error("Terms of service not found");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchPolicyData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading terms of service: {error}</p>
          <button 
            className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <PolicyLayout title={policyData.title} lastUpdated={policyData.lastUpdated}>
      {policyData.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.heading}</h2>
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
          {section.listItems && (
            section.isOrdered ? (
              <ol className="list-decimal pl-6 mb-4">
                {section.listItems.map((item, i) => (
                  <li key={i} className="mb-2">{item}</li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc pl-6 mb-4">
                {section.listItems.map((item, i) => (
                  <li key={i} className="mb-2">{item}</li>
                ))}
              </ul>
            )
          )}
        </div>
      ))}
    </PolicyLayout>
  );
};

export default TermsOfService;
