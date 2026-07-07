import Header from '../components/Header';
import CenterTools from '../components/CenterTools';
import Footer from '../components/Footer';

export default function App() {
  return (
    // மெயின் பேக்கிரவுண்ட் #050505 - போர்ட்ஃபோலியோ தீம்
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center selection:bg-cyan-500 selection:text-black">
      <Header />
      <main className="flex-grow w-full flex justify-center items-center px-4">
        <CenterTools />
      </main>
      <Footer />
    </div>
  );
}