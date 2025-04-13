import { useState } from "react";
import { phrases } from "./data/phrases";
import { PhraseTrainer } from "./components/PhraseTrainer";

function App() {
  const [index, setIndex] = useState(0);

  const nextPhrase = () => {
    setIndex((prev) => (prev + 1) % phrases.length);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Терміново вчимо латинь
      </h1>
      <PhraseTrainer phrase={phrases[index]} onNext={nextPhrase} />
    </div>
  );
}

export default App;
