import { useState } from "react";
import { useCoreXStore } from "../src/store.js";

export default function CenterTools() {
  const [inputUrl, setInputUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("qr");

const { qrInputUrl, setQrInputUrl, qrResultImage, setQrResultImage } = useCoreXStore();

  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
  const BG_API_URL = import.meta.env.VITE_BG_API_URL;

  const handleQR = async () => {
    if (!qrInputUrl) return alert("Please Enter A Link");
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/qr?url=${encodeURIComponent(qrInputUrl)}`
      );
      const blob = await res.blob();
      
      setQrResultImage(URL.createObjectURL(blob));
    } catch (err) {
      alert("API Error!");
      console.error(err);
    }
    setLoading(false);
  }

  const handleBgRemove = async () => {
    if (!imageFile) return alert("Please Upload An Image");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    try {
      const res = await fetch(`${BG_API_URL}/api/bg-remove`, {
        method: "POST",
        body: formData,
      });
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) {
      alert("API Error!");
      console.error(err);
    }
    setLoading(false);
  };

const handleVideoDl = async () => {
    if (!inputUrl) return alert("Please Enter A Link");
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/video-dl?url=${encodeURIComponent(inputUrl)}`
      );

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      
      setResult(downloadUrl);

      
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "CoreX_Video.mp4");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("API Error! Link is not working.");
    }
    setLoading(false);
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setResult(null); 
    setInputUrl("");
    setImageFile(null);
  };

  return (
     <>
    <div className="bg-[#050505] border border-gray-800 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.05)] w-full max-w-lg overflow-hidden my-10 backdrop-blur-md">
         
      <div className="flex p-2 bg-[#0a0a0a] border-b border-gray-800">

        <button
          onClick={() => changeTab("qr")}
          className={`flex-1 py-2 mx-1 rounded-lg font-bold text-sm tracking-wider transition-all ${activeTab === "qr" ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "text-gray-400 hover:text-white"}`}
        >
          📱 QR
        </button>
        <button
          onClick={() => changeTab("bg")}
          className={`flex-1 py-2 mx-1 rounded-lg font-bold text-sm tracking-wider transition-all ${activeTab === "bg" ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "text-gray-400 hover:text-white"}`}
        >
          ✂️ BG REMOVE
        </button>
        <button
          onClick={() => changeTab("video")}
          className={`flex-1 py-2 mx-1 rounded-lg font-bold text-sm tracking-wider transition-all ${activeTab === "video" ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "text-gray-400 hover:text-white"}`}
        >
          🎥 YT/INSTA
        </button>
      </div>

      <div className="p-8">
        {/* QR Tab */}
        {activeTab === "qr" && (
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter Link..."
              className="w-full bg-transparent border border-gray-700 text-white p-3 rounded-lg focus:border-cyan-400 outline-none"
              value={qrInputUrl} // Zustand Value
              onChange={(e) => setQrInputUrl(e.target.value)} // Zustand Function
            />
            <button
              onClick={handleQR}
              className="w-full bg-white text-black py-3 rounded-lg font-bold hover:scale-[1.02] transition-transform"
            >
              {loading ? "GENERATING..." : "GENERATE QR"}
            </button>
            
        
            {qrResultImage && (
              <div className="flex flex-col items-center space-y-3 mt-4">
                <p className="text-cyan-400 font-bold text-sm animate-pulse">
                  GENERATED SUCCESSFULLY! 🎉
                </p>
                <img
                  src={qrResultImage} 
                  alt="QR"
                  className="w-40 h-40 border border-cyan-500/30 p-2 rounded-lg"
                />
                <a
                  href={qrResultImage} // Zustand Value
                  download="QR.png"
                  className="text-cyan-400 border border-cyan-400 px-6 py-2 rounded-full font-bold hover:bg-cyan-400 hover:text-black"
                >
                  DOWNLOAD QR
                </a>
              </div>
            )}
          </div>
        )}
  

        {/* BG Remove Tab */}
        {activeTab === "bg" && (
          <div className="flex flex-col space-y-4">
            <input
              type="file"
              className="w-full bg-transparent border border-gray-700 text-gray-300 p-3 rounded-lg"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <button
              onClick={handleBgRemove}
              className="w-full bg-white text-black py-3 rounded-lg font-bold hover:scale-[1.02] transition-transform"
            >
              {loading ? "PROCESSING..." : "REMOVE BG"}
            </button>
            {result && (
              <div className="flex flex-col items-center space-y-3 mt-4">
                <p className="text-cyan-400 font-bold text-sm animate-pulse">
                  IMAGE READY! 🎉
                </p>
                <img
                  src={result}
                  alt="No BG"
                  className="max-w-40 border border-cyan-500/30 p-2 rounded-lg"
                />
                <a
                  href={result}
                  download="No-BG.png"
                  className="text-cyan-400 border border-cyan-400 px-6 py-2 rounded-full font-bold hover:bg-cyan-400 hover:text-black"
                >
                  DOWNLOAD PNG
                </a>
              </div>
            )}
          </div>
        )}

        {/* Video DL Tab */}
        {activeTab === "video" && (
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Paste URL..."
              className="w-full bg-transparent border border-gray-700 text-white p-3 rounded-lg focus:border-cyan-400 outline-none"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <button
              onClick={handleVideoDl}
              className="w-full bg-white text-black py-3 rounded-lg font-bold hover:scale-[1.02] transition-transform"
            >
              {loading ? "FETCHING..." : "GET LINK"}
            </button>
            {result && (
              <div className="mt-4 text-center space-y-3">
                <p className="text-cyan-400 font-bold text-sm animate-pulse">
                  VIDEO READY! 🎉
                </p>
                <a
                  href={result}
                  target="_blank"
                  format="video/mp4"
                  rel="noreferrer"
                  className="inline-block border border-cyan-400 text-cyan-400 px-8 py-3 rounded-full font-bold hover:bg-cyan-400 hover:text-black"
                >
                  DOWNLOAD VIDEO
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
