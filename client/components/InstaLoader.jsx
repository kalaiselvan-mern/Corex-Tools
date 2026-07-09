import { useState } from "react";

export default function InstaLoader() {
  const [username, setUsername] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000";

  const fetchStories = async () => {
    if (!username) return alert("Please Enter Instagram Username");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/ig-stories/${username}`);
      const data = await res.json();

      if (res.ok) {
        setStories(data.stories);
        if (data.stories.length === 0) {
          alert("No stories found for this user today!");
        }
      } else {
        alert(data.detail || "Error fetching stories! Account might be private.");
      }
    } catch (error) {
      console.error(error);
      alert("API Error! Backend might be down.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#050505] border border-gray-800 rounded-2xl shadow-[0_0_30px_rgba(255,0,128,0.05)] w-full max-w-lg overflow-hidden my-10 backdrop-blur-md">
      <div className="flex p-3 bg-[#0a0a0a] border-b border-gray-800 justify-center">
        <h2 className="text-white font-bold tracking-wider flex items-center gap-2">
          📸 INSTA STORY VIEWER
        </h2>
      </div>

      <div className="p-8 flex flex-col space-y-4">
        <h1 className="w-full bg-transparent border  text-center font-bold tracking-wider flex items-center gap-2 border-gray-700 capitalize lg:text-3xl text-white mx-auto p-3 rounded-lg text-2xl md:text-sm focus:border-pink-500 outline-none" > 
       This Feature Is Coming Soon! 🚧 
        </h1>
      

        {/* Stories Output UI */}
        {stories.length > 0 && (
          <div className="mt-6 space-y-4">
            <p className="text-pink-400 font-bold text-sm text-center">
              FOUND {stories.length} STORIES! 🎉
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stories.map((url, index) => (
                <div key={index} className="flex flex-col items-center gap-2 border border-gray-800 p-2 rounded-lg">
                  {url.includes(".mp4") ? (
                    <video src={url} controls className="w-full h-32 object-cover rounded-md" />
                  ) : (
                    <img src={url} alt={`Story ${index}`} className="w-full h-32 object-cover rounded-md" />
                  )}
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white bg-gray-800 px-3 py-1 rounded hover:bg-pink-500 transition-colors"
                  >
                    Open Original
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}