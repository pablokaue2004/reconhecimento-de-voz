import React, { useState } from "react";

function App() {
  const [output, setOutput] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const content = result[0].transcript.trim();
        setOutput(content);
      };

      recognition.onerror = (event) => {
        console.error("Erro de reconhecimento de fala:", event.error);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    } else {
      console.error("Reconhecimento de fala não suportado no seu navegador.");
    }
  };

  return (
    <div className="tw-bg-gray-900 tw-p-4 tw-w-full tw-h-screen tw-flex tw-items-center tw-justify-center tw-flex-col">
      <p className="tw-text-xl tw-font-semibold tw-text-white tw-mb-4">
        Falar para gravar palavras
      </p>
      <p className="tw-text-lg tw-text-white tw-mb-4">{output}</p>
      <button
        className={`tw-rounded-md tw-py-2 tw-px-4 ${
          listening ? "tw-bg-red-500" : "tw-bg-blue-500"
        } hover:tw-bg-blue-600 tw-text-white tw-font-semibold`}
        onClick={startListening}
      >
        {listening ? "Ouvindo..." : "Iniciar Gravação"}
      </button>
    </div>
  );
}

export default App;
