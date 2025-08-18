"use client";
import React, { useState, useEffect } from "react";
import PolicyLayout from "../components/PolicyLayout";
import { fetchGraphQL } from "../lib/fetchGrap";

const PrivacyPolicy = () => {
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicyData = async () => {
      setLoading(true);
      try {
        const host = window.location.hostname;
        const query = `
          query LegalDocument {
            legalDocument(type: "PRIVACY") {
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
        const data = await fetchGraphQL(host, query);
        setPolicyData(data.legalDocument);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
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
          <p>Error loading privacy policy: {error}</p>
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

  if (!policyData) return null;

  return (
    <PolicyLayout
      title={policyData.title}
      lastUpdated={new Date(Number(policyData.lastUpdated)).toLocaleDateString()}
    >
      {policyData.sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {section.heading}
          </h2>
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
          {section.listItems && section.listItems.length > 0 && (
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

export default PrivacyPolicy;
