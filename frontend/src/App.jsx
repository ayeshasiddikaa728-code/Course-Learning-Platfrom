import React, { useState, useEffect } from 'react';

// ================= Certificate Screen Component =================
function CertificateScreen({ onBack, studentName = "Ayesha", courseTitle = "Data Analytics with Python" }) {
  const [name, setName] = useState(studentName);

  const downloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Background & Borders
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

    // Header / Title
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CAREGENICS LEARNING PLATFORM', canvas.width / 2, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Georgia';
    ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 200);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px sans-serif';
    ctx.fillText('THIS IS PROUDLY PRESENTED TO', canvas.width / 2, 270);

    // Student Name & Details
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 50px Georgia';
    ctx.fillText(name.toUpperCase(), canvas.width / 2, 350);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px sans-serif';
    ctx.fillText('for successfully completing the professional course on', canvas.width / 2, 420);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`"${courseTitle}"`, canvas.width / 2, 480);

    // Footer & Signature
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Date: ${today}`, 100, 590);

    ctx.textAlign = 'right';
    ctx.fillText('Authorized Signature: CAREGENICS', canvas.width - 100, 590);

    // Download Link Trigger
    const link = document.createElement('a');
    link.download = `${name.replace(/\s+/g, '_')}_Certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col p-6 text-white relative pb-24">
      <div className="flex justify-between items-center mb-6">
        <span onClick={onBack} className="cursor-pointer text-lg">←</span>
        <h3 className="text-sm font-bold">Download Certificate</h3>
        <span>📜</span>
      </div>

      <div className="bg-[#18181b] border-2 border-amber-500/60 p-6 rounded-3xl text-center shadow-2xl relative overflow-hidden my-auto space-y-4">
        <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Caregenics Verified</span>
        <h3 className="text-lg font-black text-amber-400">CERTIFICATE OF COMPLETION</h3>
        <p className="text-[11px] text-gray-400">Presented to:</p>

        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="bg-black/50 border border-zinc-700 text-center font-bold text-base py-2 px-3 rounded-xl text-white outline-none w-full focus:border-amber-500"
        />

        <p className="text-xs text-gray-300">For successfully completing:</p>
        <p className="text-sm font-bold text-sky-400">{courseTitle}</p>

        <button 
          onClick={downloadCertificate}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold py-3 rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 mt-4"
        >
          <span>📥</span> Download Certificate (PNG)
        </button>
      </div>
    </div>
  );
}

// ================= Quiz Screen Component =================
function QuizScreen({ onFinish, onGoCertificates }) {
  const quizQuestions = [
    {
      id: 1,
      question: "Which language is primarily used for React development?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: 1
    },
    {
      id: 2,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Machine Language",
        "Hyperlink Text Management Language",
        "Home Tool Markup Language"
      ],
      answer: 0
    },
    {
      id: 3,
      question: "Which HTTP method is used to send data to create a resource?",
      options: ["GET", "PUT", "POST", "DELETE"],
      answer: 2
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOption === null) return;

    if (selectedOption === quizQuestions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  const currentQ = quizQuestions[currentIndex];
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="flex-1 flex flex-col p-6 text-white relative pb-24">
      <div className="flex justify-between items-center mb-6">
        <span onClick={onFinish} className="cursor-pointer text-lg">←</span>
        <h3 className="text-sm font-bold">Course Quiz</h3>
        <span>🎓</span>
      </div>

      {!isFinished ? (
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
              <span>{Math.round(((currentIndex + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-[#4f46e5] h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            <div className="bg-[#27272a] p-5 rounded-2xl mb-6 border border-zinc-700 shadow-md">
              <h4 className="text-sm font-bold leading-relaxed">{currentQ.question}</h4>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold border transition flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[#4f46e5] border-[#6366f1] text-white shadow-lg' 
                        : 'bg-[#18181b] border-zinc-800 text-gray-300 hover:bg-zinc-800'
                    }`}
                  >
                    <span>{option}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'border-white bg-white text-indigo-600' : 'border-gray-500'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition mt-6 ${
              selectedOption === null 
                ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' 
                : 'bg-[#16a34a] hover:bg-[#15803d] text-white'
            }`}
          >
            {currentIndex + 1 === quizQuestions.length ? 'Submit Quiz' : 'Next Question →'}
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto space-y-6">
          <div className="w-24 h-24 rounded-full border-4 border-[#4f46e5] border-t-emerald-400 flex items-center justify-center shadow-xl bg-zinc-900">
            <span className="text-2xl font-black">{percentage}%</span>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1">
              {percentage >= 60 ? '🎉 Congratulations!' : '💪 Keep Practicing!'}
            </h3>
            <p className="text-xs text-gray-400">
              You scored {score} out of {quizQuestions.length} correct.
            </p>
          </div>

          <div className="w-full space-y-3 pt-4">
            {percentage >= 60 && (
              <button
                onClick={onGoCertificates}
                className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold py-3 rounded-xl text-xs shadow-lg transition"
              >
                Claim Certificate 🎓
              </button>
            )}

            <button
              onClick={handleRestart}
              className="w-full bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl text-xs transition"
            >
              Try Again 🔄
            </button>

            <button
              onClick={onFinish}
              className="w-full text-gray-400 hover:text-white font-medium text-xs py-2"
            >
              Back to Courses
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= Main App Component =================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('courses');
  const [filter, setFilter] = useState('all'); 
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses(filter);
  }, [filter]);

  const fetchCourses = async (cat) => {
    let url = 'http://localhost:5000/api/courses';
    if (cat === 'running') url = 'http://localhost:5000/api/courses/running';
    if (cat === 'offers') url = 'http://localhost:5000/api/courses/offers';

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setCourses(data.data);
      } else {
        setFallbackCourses();
      }
    } catch (err) {
      setFallbackCourses();
    }
  };

  const setFallbackCourses = () => {
    setCourses([
      {
        id: 1,
        title: 'System Analysis & Design',
        code: 'MIS 4181',
        progress: 75,
        original_price: '500',
        discount_price: '400',
        is_offer: true,
        bgColor: 'bg-[#5e548e]',
        status: 'running'
      },
      {
        id: 2,
        title: 'Investment Banking',
        code: 'FIN 17189',
        progress: 60,
        original_price: '600',
        discount_price: '450',
        is_offer: true,
        bgColor: 'bg-[#2a524a]',
        status: 'running'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#111111] flex justify-center items-center p-0 md:p-4 font-sans text-white">
      {/* Mobile Frame */}
      <div className="w-full max-w-[390px] h-[820px] bg-black border border-zinc-800 rounded-[45px] overflow-hidden relative flex flex-col justify-between shadow-2xl">
        
        {/* 1. Sign In Screen */}
        {currentScreen === 'signin' && (
          <div className="relative h-full flex flex-col justify-center px-8 text-white bg-black overflow-hidden">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#d1d5db] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#00a896] rounded-full"></div>

            <div className="z-10 text-center">
              <h1 className="text-3xl font-bold mb-1">Sign in</h1>
              <p className="text-xs text-gray-300 mb-8">sign in and start learning</p>

              <form onSubmit={(e) => { e.preventDefault(); setCurrentScreen('courses'); }} className="space-y-4">
                <input type="text" placeholder="Login" className="w-full bg-[#0d9488] text-white placeholder-emerald-100 p-3.5 rounded-xl outline-none text-sm" />
                <input type="password" placeholder="Password" className="w-full bg-[#16a34a] text-white placeholder-emerald-100 p-3.5 rounded-xl outline-none text-sm" />

                <div className="flex items-center justify-between text-xs pt-1 pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-[#00a896] rounded" />
                    <span>Remember me</span>
                  </label>
                </div>

                <p className="text-xs text-gray-300">
                  Don't have an account?{' '}
                  <span onClick={() => setCurrentScreen('register')} className="font-bold underline cursor-pointer">Register now</span>
                </p>

                <button type="submit" className="w-32 bg-[#6b21a8] hover:bg-[#581c87] py-2.5 rounded-lg font-bold text-white shadow-md transition mx-auto block mt-4">Login</button>
              </form>

              <div className="space-y-2.5 pt-6">
                <button onClick={() => setCurrentScreen('courses')} className="w-full bg-[#2563eb] text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow">Log In with Facebook</button>
                <button onClick={() => setCurrentScreen('courses')} className="w-full bg-white text-gray-700 text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow">Log In with Google</button>
                <button onClick={() => setCurrentScreen('courses')} className="w-full bg-black border border-gray-700 text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow">Log In with Apple</button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Register Screen */}
        {currentScreen === 'register' && (
          <div className="h-full flex flex-col justify-center px-8 text-white bg-black relative">
            <h2 className="text-2xl font-bold text-center mb-6">Register Account</h2>

            <form onSubmit={(e) => { e.preventDefault(); setCurrentScreen('courses'); }} className="space-y-3">
              {[
                { label: 'user name', icon: '👤' },
                { label: 'email', icon: '✉️' },
                { label: 'date of birth', icon: '📅' },
                { label: 'age', icon: '💬' },
                { label: 'educational status', icon: '🎓' },
                { label: 'password', icon: '🔒' }
              ].map((item) => (
                <div key={item.label} className="border border-gray-600 rounded-lg p-2.5 bg-black flex items-center gap-3">
                  <span className="text-sm text-gray-300">{item.icon}</span>
                  <input type={item.label === 'password' ? 'password' : 'text'} placeholder={item.label} className="bg-transparent text-xs text-white placeholder-gray-400 outline-none w-full" />
                </div>
              ))}

              <p className="text-[11px] text-gray-400 text-center pt-3">
                Already have an account? <span onClick={() => setCurrentScreen('signin')} className="text-blue-400 underline cursor-pointer">Login</span>
              </p>

              <button type="submit" className="w-28 bg-[#27272a] border border-gray-600 hover:bg-zinc-800 text-xs font-semibold py-2 rounded-md mx-auto block mt-4">Register</button>
            </form>
          </div>
        )}

        {/* 3. Courses Home Screen */}
        {currentScreen === 'courses' && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar pb-24">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-gray-400"></span>
              <div className="flex items-center gap-4 text-xl">
                <span onClick={() => setCurrentScreen('notifications')} className="cursor-pointer">🔔</span>
                <span onClick={() => setCurrentScreen('account')} className="cursor-pointer">👤</span>
                <span onClick={() => setCurrentScreen('settings')} className="cursor-pointer">☰</span>
              </div>
            </div>

            <h1 className="text-2xl font-black tracking-wide mb-4">CAREGENICS</h1>

            <div className="relative mb-5">
              <input type="text" placeholder="Search courses" className="w-full bg-white text-black py-2.5 px-4 pr-10 rounded-full text-xs font-medium outline-none shadow" />
              <span className="absolute right-3 top-2.5 text-gray-500 text-sm">🔍</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 text-xs">
              <span className="text-gray-300 font-medium">Category:</span>
              <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-full font-bold transition ${filter === 'all' ? 'bg-[#d8b4fe] text-purple-950' : 'bg-white text-black'}`}>All</button>
              <button onClick={() => setFilter('running')} className={`px-3 py-1 rounded-full font-bold transition ${filter === 'running' ? 'bg-[#d8b4fe] text-purple-950' : 'bg-white text-black'}`}>🔥 Running</button>
              <button onClick={() => setFilter('offers')} className={`px-3 py-1 rounded-full font-bold transition ${filter === 'offers' ? 'bg-red-500 text-white' : 'bg-white text-black'}`}>🎁 Offers</button>
              <button className="px-3 py-1 rounded-full bg-white text-black font-semibold">BBA</button>
              <button className="px-3 py-1 rounded-full bg-white text-black font-semibold">CSE</button>
              <button className="px-3 py-1 rounded-full bg-white text-black font-semibold">EEE</button>
            </div>

            <div className="space-y-4">
              {courses.map((course, idx) => (
                <div key={course.id || idx} onClick={() => { setSelectedCourse(course); setCurrentScreen('details'); }} className={`${course.bgColor || (idx % 2 === 0 ? 'bg-[#5e548e]' : 'bg-[#2a524a]')} p-5 rounded-2xl cursor-pointer shadow-lg transition text-center relative`}>
                  {course.is_offer && <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">OFFER!</span>}
                  <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                  <p className="text-xs text-gray-200 mb-4">{course.code || 'MIS 4181'}</p>
                  <div className="w-20 h-20 rounded-full border-4 border-gray-300/30 border-t-white flex items-center justify-center mx-auto my-2">
                    <span className="text-sm font-extrabold">{course.progress || 75}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Course Details Screen */}
        {currentScreen === 'details' && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar relative pb-24">
            <div className="flex justify-between items-center mb-4">
              <span onClick={() => setCurrentScreen('courses')} className="text-xl cursor-pointer">←</span>
              <div className="flex gap-3 text-lg"><span>📡</span><span>⋮</span></div>
            </div>

            <h2 className="text-xl font-bold mb-4">{selectedCourse?.title || "Fundamentals of UI/UX design"}</h2>

            <div className="flex gap-3 text-xs mb-4">
              <button className="bg-[#1f1f23] px-6 py-2 rounded-xl text-white font-semibold">Lessons</button>
              <button className="text-gray-400 px-4 py-2">About the course</button>
            </div>

            <div className="w-full bg-[#38bdf8] rounded-2xl p-4 flex items-center justify-between mb-4 relative overflow-hidden h-36">
              <p className="text-sm font-bold text-black z-10">¿Qué es User Experience?</p>
              <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-blue-600 text-lg z-10">▶</div>
            </div>

            <div className="bg-[#141416] p-4 rounded-2xl border border-zinc-800 mb-4">
              <h4 className="text-sm font-bold">Tannia Obregón</h4>
              <p className="text-[10px] text-gray-400 mb-2">Mentor</p>
              <p className="text-[11px] text-gray-400">Design is the visual representation of an idea...</p>
            </div>

            <div className="bg-[#1e293b] p-4 rounded-3xl flex items-center justify-between mt-auto">
              <div>
                <span className="text-xl font-black">${selectedCourse?.discount_price || '500'}</span>
                <span className="text-[10px] text-gray-400 block">Al mes</span>
              </div>
              <button onClick={() => setCurrentScreen('checkout')} className="bg-[#7c3aed] text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg">Subscribe</button>
            </div>
          </div>
        )}

        {/* 5. Checkout Screen */}
        {currentScreen === 'checkout' && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar relative pb-24 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span onClick={() => setCurrentScreen('details')} className="text-amber-500 text-lg cursor-pointer">❮</span>
              <h3 className="text-sm font-bold mx-auto">Checkout</h3>
            </div>
            <div className="space-y-2 text-xs mb-6">
              <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total:</span>
                <span>$545.00</span>
              </div>
            </div>
            <button onClick={() => { alert('Enrolled Successfully!'); setCurrentScreen('courses'); }} className="w-full bg-[#15803d] text-white py-3.5 rounded-full font-bold text-sm shadow-xl mt-auto">Enroll Now</button>
          </div>
        )}

        {/* 6. Notifications Screen */}
        {currentScreen === 'notifications' && (
          <div className="flex-1 flex flex-col p-6 text-white relative">
            <div className="flex justify-between items-center mb-6">
              <span onClick={() => setCurrentScreen('courses')} className="cursor-pointer text-lg">←</span>
              <h3 className="text-sm font-bold">Notification</h3>
              <span>🔔</span>
            </div>
            <div className="space-y-4">
              <div className="bg-[#27272a] p-4 rounded-2xl">
                <h4 className="font-bold text-sm mb-1">Congratulation !!</h4>
                <p className="text-xs text-gray-300 mb-3">you have completed course on python</p>
                <button onClick={() => setCurrentScreen('certificates')} className="bg-[#4f46e5] text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg">Download certificate</button>
              </div>
            </div>
          </div>
        )}

        {/* 7. Accounts Screen */}
        {currentScreen === 'account' && (
          <div className="flex-1 flex flex-col p-6 text-white relative">
            <div className="flex justify-between items-center mb-8">
              <span onClick={() => setCurrentScreen('courses')} className="cursor-pointer text-lg">←</span>
              <h3 className="text-base font-bold">Accounts</h3>
              <span>👤</span>
            </div>
            <div className="space-y-3 max-w-[260px] mx-auto w-full">
              {['User name', 'Email', 'Address', 'Age & D.O.B', 'Educational status', 'Share', 'Logout'].map((item) => (
                <button key={item} onClick={() => item === 'Logout' && setCurrentScreen('signin')} className="w-full bg-[#ff5722] text-white text-xs font-bold py-3 rounded-lg text-center">{item}</button>
              ))}
            </div>
          </div>
        )}

        {/* 8. eBooks Screen */}
        {currentScreen === 'ebooks' && (
          <div className="flex-1 flex flex-col p-6 text-white bg-black relative pb-28">
            <div className="mb-4 pt-2">
              <h2 className="text-xl font-bold mb-2">eBooks</h2>
              <span 
                onClick={() => setCurrentScreen('courses')} 
                className="cursor-pointer text-2xl hover:text-gray-300 transition inline-block"
              >
                ←
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-10 gap-x-6 text-center my-auto px-2">
              {[
                { name: 'Python', level: 'beginner', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                { name: 'Java', level: 'beginner', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { name: 'C++', level: 'beginner', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
                { name: 'Javascript', level: 'beginner', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                { name: 'R', level: 'beginner', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
                { name: 'swift', level: 'beginner', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' }
              ].map((book) => (
                <div 
                  key={book.name} 
                  onClick={() => alert(`Opening ${book.name} eBook...`)}
                  className="flex flex-col items-center justify-center cursor-pointer active:scale-95 transition"
                >
                  <img src={book.icon} alt={book.name} className="w-16 h-16 object-contain mb-3" />
                  <p className="text-sm font-bold text-white tracking-wide">{book.name}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{book.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. Certificates Screen */}
        {currentScreen === 'certificates' && (
          <CertificateScreen 
            onBack={() => setCurrentScreen('courses')} 
            studentName="Ayesha"
            courseTitle="Data Analytics with Python"
          />
        )}

        {/* 10. Settings Screen */}
        {currentScreen === 'settings' && (
          <div className="flex-1 flex flex-col p-6 text-white relative">
            <div className="flex justify-between items-center mb-6">
              <span onClick={() => setCurrentScreen('courses')} className="cursor-pointer text-lg">←</span>
              <h3 className="text-base font-bold">Settings</h3>
            </div>
            <div className="bg-[#27272a] p-6 rounded-3xl space-y-4 text-xs">
              <div onClick={() => setCurrentScreen('account')} className="cursor-pointer">👤 Accounts settings</div>
              <div onClick={() => setCurrentScreen('signin')} className="cursor-pointer text-red-400">↪ Logout</div>
            </div>
          </div>
        )}

        {/* 11. Quiz Screen */}
        {currentScreen === 'quiz' && (
          <QuizScreen 
            onFinish={() => setCurrentScreen('courses')} 
            onGoCertificates={() => setCurrentScreen('certificates')} 
          />
        )}

        {/* Bottom Navigation Bar */}
        {currentScreen !== 'signin' && currentScreen !== 'register' && (
          <div className="absolute bottom-3 left-4 right-4 bg-white text-black py-2.5 px-6 rounded-full flex justify-between items-center text-xs font-bold shadow-2xl z-30">
            <button 
              onClick={() => setCurrentScreen('courses')} 
              className={`flex flex-col items-center ${currentScreen === 'courses' ? 'text-emerald-600' : 'text-gray-500'}`}
            >
              <span>📗</span>
              <span className="text-[9px]">Courses</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('ebooks')} 
              className={`flex flex-col items-center ${currentScreen === 'ebooks' ? 'text-emerald-600' : 'text-gray-500'}`}
            >
              <span>📖</span>
              <span className="text-[9px]">eBooks</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('quiz')} 
              className={`flex flex-col items-center ${currentScreen === 'quiz' ? 'text-emerald-600' : 'text-gray-500'}`}
            >
              <span>🎓</span>
              <span className="text-[9px]">Quiz</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('settings')} 
              className={`flex flex-col items-center ${currentScreen === 'settings' ? 'text-emerald-600' : 'text-gray-500'}`}
            >
              <span>⚙️</span>
              <span className="text-[9px]">Settings</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}