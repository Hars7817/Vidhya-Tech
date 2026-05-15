"use client";
import { useState } from "react";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [chat, setChat] = useState([
    { sender: "bot", text: "Hi 👋 Welcome to Vidhya Tech!\nWhat's your name?" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = async (inputText) => {
    if (!inputText.trim()) return;

    // user message add
    setChat((prev) => [...prev, { sender: "user", text: inputText }]);

    let nextStep = step + 1;
    let botReply = "";

    try {
      if (step === 0) {
        setForm((prev) => ({ ...prev, name: inputText }));
        botReply = "Great! Please enter your email:";
      } 
      else if (step === 1) {
        setForm((prev) => ({ ...prev, email: inputText }));
        botReply = "Your phone number?";
      } 
      else if (step === 2) {
        setForm((prev) => ({ ...prev, phone: inputText }));
        botReply = "Company or project name?";
      } 
      else if (step === 3) {
        setForm((prev) => ({ ...prev, company: inputText }));
        botReply = "Tell me your requirement:";
      } 
      else if (step === 4) {
        const finalData = { ...form, message: inputText };

        console.log("Sending Data:", finalData);

        // ✅ SAVE DATA
        const storeResponse = await fetch("/api/store-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        });

        if (!storeResponse.ok) {
          console.error("❌ Data save failed");
        } else {
          console.log("✅ Data saved");
        }

        // ✅ AI RESPONSE
        let aiText = "We will contact you soon.";

        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputText }),
          });

          const data = await res.json();

          if (data?.text) {
            aiText = data.text;
          } else {
            aiText = "AI not responding properly.";
          }
        } catch (err) {
          console.error("AI Error:", err);
          aiText = "⚠️ AI server error.";
        }

        botReply = `✅ Thank you! Our team will contact you soon.\n\n🤖 ${aiText}`;

        nextStep = 999;
      }

    } catch (err) {
      console.error("Error:", err);
      botReply = "⚠️ Something went wrong. Try again.";
    }

    setTimeout(() => {
      setChat((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 500);

    setStep(nextStep);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-yellow-400 text-black px-4 py-2 rounded-full z-50 shadow-lg"
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white text-black p-3 rounded-xl z-50 shadow-xl">

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto mb-2 space-y-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[70%] whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          {step !== 999 && (
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend(input);
                  }
                }}
                className="border flex-1 p-2 rounded"
                placeholder="Type..."
              />

              <button
                onClick={() => handleSend(input)}
                className="bg-black text-white px-4 rounded"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}