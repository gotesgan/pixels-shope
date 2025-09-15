'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Plus, Save, Trash2, Upload, Users, ImageIcon } from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const iconMap = { Users, ImageIcon };
const renderIcon = (iconName, className = 'h-6 w-6') => {
  const IconComponent = iconMap[iconName] || ImageIcon;
  return <IconComponent className={className} />;
};

const fetcher = (url, token) =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
    res.json(),
  );

const MEDIA_HOST = 'https://media.pixelperfects.in/';

export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('story');
  const [aboutData, setAboutData] = useState({
    story: { text: '', image: null, file: null, preview: null },
    milestones: [],
    team: [],
  });

  const [authToken, setAuthToken] = useState(null);
  const aboutApiUrl = 'https://api.pixelperfects.in/api/v1/ui/about-page';

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const fallbackJwt = 'YOUR_FALLBACK_JWT_TOKEN_HERE';
    setAuthToken(stored ? stored.replace(/^Bearer /, '') : fallbackJwt);
  }, []);

  const { data: payload, error: fetchError } = useSWR(
    authToken ? [aboutApiUrl, authToken] : null,
    async ([url, token]) => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      return res.json();
    },
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (payload?.success && payload?.data) {
      const data = payload.data.content || {};
      setAboutData({
        story: {
          text: data.story?.text || '',
          image: data.story?.image ? `${MEDIA_HOST}${data.story.image}` : null,
          file: null,
          preview: data.story?.image
            ? `${MEDIA_HOST}${data.story.image}`
            : null,
        },
        milestones: (data.milestones || []).map((m) => ({
          year: m.year,
          event: m.event,
        })),
        team: (data.team || []).map((t) => ({
          name: t.name,
          role: t.role,
          image: t.image ? `${MEDIA_HOST}${t.image}` : null,
          file: null,
          preview: t.image ? `${MEDIA_HOST}${t.image}` : null,
        })),
      });
    }
  }, [payload]);

  if (fetchError)
    console.error('Error fetching about page, using defaults:', fetchError);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('story', JSON.stringify({ text: aboutData.story.text }));
    if (aboutData.story.file)
      formData.append('storyImage', aboutData.story.file);

    formData.append('milestones', JSON.stringify(aboutData.milestones));
    formData.append(
      'team',
      JSON.stringify(
        aboutData.team.map((t) => ({ name: t.name, role: t.role })),
      ),
    );
    aboutData.team.forEach(
      (t, i) => t.file && formData.append(`team[${i}].image`, t.file),
    );

    try {
      const response = await fetch(aboutApiUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });
      if (!response.ok)
        throw new Error(`Failed to save: ${response.statusText}`);
      const result = await response.json();
      console.log('Saved successfully:', result);
    } catch (err) {
      console.error('Error saving about page:', err);
    }
  };

  const handleStoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAboutData((prev) => ({
      ...prev,
      story: { ...prev.story, file, preview: URL.createObjectURL(file) },
    }));
  };

  const addMilestone = () =>
    setAboutData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { year: new Date().getFullYear(), event: '' },
      ],
    }));
  const removeMilestone = (idx) =>
    setAboutData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== idx),
    }));
  const updateMilestone = (idx, key, value) =>
    setAboutData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m, i) =>
        i === idx ? { ...m, [key]: value } : m,
      ),
    }));

  const addTeamMember = () =>
    setAboutData((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        { name: '', role: '', image: null, file: null, preview: null },
      ],
    }));
  const removeTeamMember = (idx) =>
    setAboutData((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== idx),
    }));
  const updateTeamMember = (idx, key, value) =>
    setAboutData((prev) => ({
      ...prev,
      team: prev.team.map((t, i) => (i === idx ? { ...t, [key]: value } : t)),
    }));
  const handleTeamImageUpload = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    setAboutData((prev) => ({
      ...prev,
      team: prev.team.map((t, i) =>
        i === idx ? { ...t, file, preview: URL.createObjectURL(file) } : t,
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar isOpen={sidebarOpen} />
      <Navbar
        toggleSidebar={toggleSidebar}
        storeName="My Store"
        sidebarOpen={sidebarOpen}
      />
      <main
        className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-16`}
      >
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                About Page
              </h1>
              <p className="text-gray-600">Manage your about page content</p>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-5 w-5" />
              <span>Save All Changes</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'story', label: 'Story' },
                  { id: 'milestones', label: 'Milestones' },
                  { id: 'team', label: 'Team' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === 'story' && (
                <div className="space-y-4">
                  <textarea
                    value={aboutData.story.text}
                    onChange={(e) =>
                      setAboutData((prev) => ({
                        ...prev,
                        story: { ...prev.story, text: e.target.value },
                      }))
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex items-center space-x-4">
                    <label className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleStoryImageUpload}
                        accept="image/*"
                      />
                      {aboutData.story.preview ? (
                        <img
                          src={aboutData.story.preview}
                          alt="Story"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Upload className="h-6 w-6 text-gray-400" />
                      )}
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'milestones' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Milestones</h3>
                    <button
                      onClick={addMilestone}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Milestone</span>
                    </button>
                  </div>
                  {aboutData.milestones.map((m, idx) => (
                    <div key={idx} className="flex space-x-2">
                      <input
                        type="number"
                        value={m.year}
                        onChange={(e) =>
                          updateMilestone(idx, 'year', e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={m.event}
                        onChange={(e) =>
                          updateMilestone(idx, 'event', e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeMilestone(idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Team Members</h3>
                    <button
                      onClick={addTeamMember}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Member</span>
                    </button>
                  </div>
                  {aboutData.team.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 border p-2 rounded-lg"
                    >
                      <label className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleTeamImageUpload(e, idx)}
                          accept="image/*"
                        />
                        {t.preview ? (
                          <img
                            src={t.preview}
                            alt={t.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Upload className="h-6 w-6 text-gray-400" />
                        )}
                      </label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) =>
                          updateTeamMember(idx, 'name', e.target.value)
                        }
                        placeholder="Name"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={t.role}
                        onChange={(e) =>
                          updateTeamMember(idx, 'role', e.target.value)
                        }
                        placeholder="Role"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeTeamMember(idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
