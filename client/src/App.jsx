import Header from "../components/Header";
import CenterTools from "../components/CenterTools";
import Footer from "../components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />

      <main className="grow flex justify-center items-center w-full px-4">
        <CenterTools />
      </main>

      <Footer />
    </div>
  );
}
