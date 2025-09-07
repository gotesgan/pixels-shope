"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchGraphQL } from "../lib/fetchGrap";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostname = window.location.hostname;
        const ABOUT_QUERY = `
          query AboutPage {
            aboutPage {
              id
              storeId
              content
              createdAt
              updatedAt
            }
          }
        `;
        const response = await fetchGraphQL(hostname, ABOUT_QUERY);
        console.log("Fetched About Page:", response?.aboutPage?.content);
        setAboutData(response?.aboutPage?.content || null);
      } catch (err) {
        console.error("Error fetching about page:", err);
      }
    };

    fetchData();
  }, []);

  if (!aboutData) return <div className="p-10">Loading...</div>;

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Story Section */}
      <div className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 space-y-6"
          >
            <h1 className="text-4xl font-extrabold text-gray-900">Our Story</h1>
            <p className="text-gray-700 text-lg">{aboutData.story.text}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 relative"
          >
        <img
  src={`https://media.pixelperfects.in/${aboutData.story.image}`}
  alt="Story"
  className="rounded-xl shadow-2xl object-cover w-full max-h-[400px]"
/>

          </motion.div>
        </div>
      </div>

      {/* Milestones */}
  <div className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
    Milestones
  </h2>
  <div className="space-y-8">
    {aboutData.milestones.map((m, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: idx * 0.1 }}
        className="group relative bg-white border border-gray-200 hover:border-blue-300 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
              {m.year}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
            {m.event}
          </h3>
        </div>
      </motion.div>
    ))}
  </div>
</div>

      {/* Team */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {aboutData.team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
              >
              <img
  src={`https://media.pixelperfects.in/${member.image}`}
  alt={member.name}
  className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
/>

                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Hero Image */}
      {aboutData.storyImage && (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            src={`https://media.pixelperfects.in/${aboutData.story.image}`}
            alt="About us"
            className="rounded-2xl shadow-lg w-full max-h-[500px] object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default AboutPage;
