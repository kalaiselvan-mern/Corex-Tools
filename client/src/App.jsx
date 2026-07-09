import Header from '../components/Header';
import CenterTools from '../components/CenterTools';
import Footer from '../components/Footer';
import InstaLoader from '../components/InstaLoader';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center selection:bg-cyan-500 selection:text-black">
      <Header />
      <main className="grow w-full flex justify-center items-center px-4">
        <CenterTools />
      </main>
      
      <InstaLoader />
      <Footer />
    </div>
    
  );
}