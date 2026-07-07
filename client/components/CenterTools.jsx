import { useState } from 'react';

export default function CenterTools() {
  const [activeTab, setActiveTab] = useState('qr');
  
  const [inputUrl, setInputUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Vite-ல இருந்து .env வேரியபிளை எடுக்குறோம் (ஒருவேளை கிடைக்கலைனா லோக்கல் லிங்க் எடுத்துக்கும்)
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
    <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden my-10">
      <div className="flex border-b">
        <button onClick={() => changeTab('qr')} className={`flex-1 py-3 font-semibold ${activeTab === 'qr' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>📱 QR</button>
        <button onClick={() => changeTab('bg')} className={`flex-1 py-3 font-semibold border-l border-r ${activeTab === 'bg' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>✂️ BG Remove</button>
        <button onClick={() => changeTab('video')} className={`flex-1 py-3 font-semibold ${activeTab === 'video' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>🎥 YT/Insta</button>
      </div>

      <div className="p-6">
        {activeTab === 'qr' && (
          <div className="flex flex-col space-y-4">
            <input type="text" placeholder="Enter any Link..." className="w-full border p-3 rounded" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
            <button onClick={handleQR} className="bg-blue-600 text-white p-3 rounded font-bold">{loading ? "Generating..." : "Generate QR"}</button>
            {result && <img src={result} alt="QR" className="mx-auto w-48 h-48 border mt-4" />}
          </div>
        )}

        {activeTab === 'bg' && (
          <div className="flex flex-col space-y-4">
            <input type="file" accept="image/*" className="w-full border p-3 rounded" onChange={(e) => setImageFile(e.target.files[0])} />
            <button onClick={handleBgRemove} className="bg-blue-600 text-white p-3 rounded font-bold">{loading ? "Removing Background..." : "Remove BG"}</button>
            {result && <img src={result} alt="No BG" className="mx-auto border mt-4 bg-gray-200" />}
          </div>
        )}

        {activeTab === 'video' && (
          <div className="flex flex-col space-y-4">
            <input type="text" placeholder="Paste YouTube or Insta Reels Link..." className="w-full border p-3 rounded" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
            <button onClick={handleVideoDl} className="bg-red-600 hover:bg-red-700 text-white p-3 rounded font-bold">{loading ? "Fetching Link..." : "Get Download Link"}</button>
            {result && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-bold mb-2">Video Ready! 🎉</p>
                <a href={result} target="_blank" rel="noreferrer" className="inline-block bg-green-500 text-white px-6 py-2 rounded shadow">
                  Download Video Now
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}