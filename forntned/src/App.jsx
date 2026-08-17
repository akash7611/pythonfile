import { useState } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Please use Google Chrome for voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.log("Speech error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div className="app">

      <header className="header">
        <div>
          <h1>🤖 ClassMate AI</h1>
          <p>Live AI Co-Teacher</p>
        </div>

        <div className="status">
          <span className={started ? "dot live" : "dot"}></span>
          {started ? "LIVE CLASS" : "READY"}
        </div>
      </header>

      <main className="dashboard">

        <section className="welcome">
          <h2>Your AI Co-Teacher is ready</h2>

          <p>
            Teach naturally. ClassMate AI listens to your lesson
            and helps you understand the classroom.
          </p>

          <button onClick={() => setStarted(!started)}>
            {started ? "⏹ End Class" : "▶ Start Live Class"}
          </button>
        </section>

        <section className="cards">

          <div className="card">

            <h3>🎤 Live Transcript</h3>

            <div className="transcript">
              {transcript ||
                "Click Start Listening and speak..."}
            </div>

            <button onClick={startListening}>
              {listening
                ? "🎙️ Listening..."
                : "🎤 Start Listening"}
            </button>

          </div>

          <div className="card">

            <h3>🧠 AI Co-Teacher</h3>

            <div className="ai-message">
              {transcript
                ? "💡 AI is analyzing the lesson..."
                : "AI suggestions will appear here."}
            </div>

          </div>

        </section>

        <section className="confusion">

          <h2>📊 Confusion Radar</h2>

          <div className="stats">

            <div>
              <strong>68%</strong>
              <span>Understanding</span>
            </div>

            <div>
              <strong>21%</strong>
              <span>Needs Revision</span>
            </div>

            <div>
              <strong>11%</strong>
              <span>Confused</span>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default App;