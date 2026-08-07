import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import Ebooks from './pages/Ebooks';
import Certificates from './pages/Certificates';
import BottomNav from './components/BottomNav';

function MainApp() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black border-x border-neutral-900 relative">
      {selectedCourseId ? (
        <CourseDetail courseId={selectedCourseId} onBack={() => setSelectedCourseId(null)} />
      ) : (
        <>
          {activeTab === 'courses' && <Dashboard onSelectCourse={setSelectedCourseId} />}
          {activeTab === 'ebooks' && <Ebooks />}
          {activeTab === 'certificates' && <Certificates />}
          {activeTab === 'settings' && (
            <div className="p-5 text-white space-y-4">
              <h1 className="text-lg font-bold">Settings</h1>
              <p className="text-xs text-neutral-400">Logged in as: {user.name}</p>
              <button
                onClick={logout}
                className="w-full py-2.5 bg-red-600 text-xs font-bold rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}