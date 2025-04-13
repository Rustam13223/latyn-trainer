import { useState, useEffect } from "react";

interface Phrase {
  latin: string;
  polish: string;
}

interface Props {
  phrase: Phrase;
  onNext: () => void;
}

export const PhraseTrainer = ({ phrase, onNext }: Props) => {
  const words = phrase.latin.split(" ");
  const [hiddenIndex, setHiddenIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setHiddenIndex(Math.floor(Math.random() * words.length));
    setUserInput("");
    setShowTranslation(false);
    setShowHint(false);
    setIsCorrect(null);
  }, [phrase]);

  const hiddenWord = words[hiddenIndex];

  const checkAnswer = () => {
    setIsCorrect(userInput.trim().toLowerCase() === hiddenWord.toLowerCase());
  };

  const getMaskedPhrase = () =>
    words.map((word, i) => (i === hiddenIndex ? "_____" : word)).join(" ");

  const getHint = () =>
    hiddenWord.length > 2
      ? `${hiddenWord[0]}...${hiddenWord[hiddenWord.length - 1]}`
      : hiddenWord;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-xl mx-auto border rounded-lg p-4 shadow-md text-center">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 break-words">
        {getMaskedPhrase()}
      </h2>

      <input
        className="border px-3 py-2 rounded mb-3 w-full max-w-sm mx-auto"
        placeholder="Wpisz brakujące słowo"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
      />

      <div className="flex flex-wrap justify-center gap-2 mb-3">
        <button
          onClick={checkAnswer}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
        >
          Sprawdź
        </button>
        <button
          onClick={() => setShowHint(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded text-sm"
        >
          Podpowiedź
        </button>
        <button
          onClick={() => setShowTranslation(true)}
          className="bg-gray-600 text-white px-4 py-2 rounded text-sm"
        >
          Pokaż tłumaczenie
        </button>
        <button
          onClick={onNext}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          Następne
        </button>
      </div>

      {showHint && (
        <p className="text-yellow-700 text-sm sm:text-base">
          Podpowiedź: <strong>{getHint()}</strong>
        </p>
      )}

      {isCorrect !== null && (
        <p
          className={`mt-2 font-semibold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "✅ Poprawnie!" : `❌ Chodziło o: ${hiddenWord}`}
        </p>
      )}

      {showTranslation && (
        <p className="mt-4 italic text-gray-600 text-sm sm:text-base">
          Tłumaczenie: {phrase.polish}
        </p>
      )}
    </div>
  );
};
