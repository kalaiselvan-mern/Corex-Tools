import { useState } from 'react';

export default function CenterTools() {
  const [activeTab, setActiveTab] = useState('qr');
  
  const [inputUrl, setInputUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Vite-ல இருந்து .env வேரியபிளை எடுக்குறோம் 
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  // 1. QR Code Logic
  const handleQR = async () => {
    if (!inputUrl) return alert("Please Enter A Link");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/qr?url=${encodeURIComponent(inputUrl)}`);
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) { alert("API Error!"); }
    setLoading(false);
  };

  // 2. Background Remove Logic
  const handleBgRemove = async () => {
    if (!imageFile) return alert("Please Upload An Image");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await fetch(`${API_URL}/api/bg-remove`, {
        method: "POST",
        body: formData,
      });
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) { alert("API Error!"); }
    setLoading(false);
  };

  // 3. Video DL Logic
  const handleVideoDl = async () => {
    if (!inputUrl) return alert("Please Enter A (YouTube/Insta) Link");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/video-dl?url=${encodeURIComponent(inputUrl)}`);
      const data = await res.json();
      if (data.success) {
        setResult(data.download_url);
      } else {
        alert("Link Is Not Worked!");
      }
    } catch (err) { alert("API Error!"); }
    setLoading(false);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setResult(null);
    setInputUrl('');
    setImageFile(null);
  };

  return (

    <>
    
    <div className="bg-[#050505] border border-gray-800 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.05)] w-full max-w-lg overflow-hidden my-10 backdrop-blur-md">
      
      {/* Tabs Header - Styled like portfolio navigation */}
      <div className="flex p-2 bg-[#0a0a0a] border-b border-gray-800">
        <button 
          onClick={() => changeTab('qr')} 
          className={`flex-1 py-2 mx-1 rounded-lg font-bold text-sm tracking-wider transition-all duration-300 ${activeTab === 'qr' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
        >
          📱 QR
        </button>
        <button 
          onClick={() => changeTab('bg')} 
          className={`flex-1 py-2 mx-1 rounded-lg font-bold text-sm tracking-wider transition-all duration-300 ${activeTab === 'bg' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
        >
          ✂️ BG REMOVE
        </button>
        <button 
          onClick={() => changeTab('video')} 
          className={`flex-1 py-2 mx-1 rounded-lg font-bold text-sm tracking-wider transition-all duration-300 ${activeTab === 'video' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
        >
          🎥 YT/INSTA
        </button>
      </div>

      <div className="p-8">
        
        {/* QR Tab */}
        {activeTab === 'qr' && (
          <div className="flex flex-col space-y-5">
            <input 
              type="text" 
              placeholder="Enter any Link..." 
              className="w-full bg-transparent border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500" 
              value={inputUrl} 
              onChange={(e) => setInputUrl(e.target.value)} 
            />
            <button 
              onClick={handleQR} 
              className="w-full bg-white text-black py-3 rounded-lg font-extrabold tracking-wide hover:scale-[1.02] transition-transform duration-300"
            >
              {loading ? "GENERATING..." : "GENERATE QR"}
            </button>
            {result && <img src={result} alt="QR" className="mx-auto w-48 h-48 border border-gray-700 p-2 rounded-xl mt-4 shadow-[0_0_20px_rgba(0,255,255,0.1)]" />}
          </div>
        )}

        {/* BG Remove Tab */}
        {activeTab === 'bg' && (
          <div className="flex flex-col space-y-5">
            <input 
              type="file" 
              accept="image/*" 
              className="w-full bg-transparent border border-gray-700 text-gray-300 p-3 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700" 
              onChange={(e) => setImageFile(e.target.files[0])} 
            />
            <button 
              onClick={handleBgRemove} 
              className="w-full bg-white text-black py-3 rounded-lg font-extrabold tracking-wide hover:scale-[1.02] transition-transform duration-300"
            >
              {loading ? "REMOVING BACKGROUND..." : "REMOVE BG"}
            </button>
            {result && <img src={result} alt="No BG" className="mx-auto border border-gray-700 p-2 mt-4 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.1)]" />}
          </div>
        )}

        {/* Video DL Tab */}
        {activeTab === 'video' && (
          <div className="flex flex-col space-y-5">
            <input 
              type="text" 
              placeholder="Paste YouTube or Insta Reels Link..." 
              className="w-full bg-transparent border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-500" 
              value={inputUrl} 
              onChange={(e) => setInputUrl(e.target.value)} 
            />
            <button 
              onClick={handleVideoDl} 
              className="w-full bg-white text-black py-3 rounded-lg font-extrabold tracking-wide hover:scale-[1.02] transition-transform duration-300"
            >
              {loading ? "FETCHING LINK..." : "GET DOWNLOAD LINK"}
            </button>
            {result && (
              <div className="mt-6 text-center">
                <p className="text-cyan-400 font-bold mb-4 tracking-wider text-sm">VIDEO READY! 🎉</p>
                <a 
                  href={result} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-block border border-cyan-400 text-cyan-400 px-8 py-3 rounded-full font-bold hover:bg-cyan-400 hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                >
                  DOWNLOAD VIDEO NOW
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}