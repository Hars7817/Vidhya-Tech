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
    { sender: "bot", text: "Hi there! I'm the Vidhya Tech sales assistant.\nWhat's your name?" },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Added this so they can't spam enter while waiting

  const isWeakReply = (text) => {
    const value = (text || "").toLowerCase();
    return (
      !value ||
      value.includes("having trouble thinking") ||
      value.includes("trouble thinking right now") ||
      value.includes("brief moment of confusion") ||
      value.includes("could you rephrase") ||
      value.includes("i'm not sure how to respond") ||
      value.includes("i am not sure how to respond") ||
      value.includes("i'm having trouble") ||
      value.includes("i am having trouble") ||
      value.includes("i can't think") ||
      value.includes("i cannot think")
    );
  };

  const getSalesFallback = (lead = {}) => {
    const name = lead?.name?.trim();
    const company = lead?.company?.trim();
    const intro = name ? `Thanks, ${name}.` : "Thanks for sharing that.";
    const companyClause = company ? ` for ${company}` : "";

    return `${intro} We can help${companyClause} with web development, AI automation, digital marketing, video editing, social media management, AI integration, and custom IT solutions. What result are you aiming for, and when would you like to get started?`;
  };

  const handleSend = async (inputText) => {
    if (!inputText.trim()) return;

    // 1. Instantly add user message and clear input
    setChat((prev) => [...prev, { sender: "user", text: inputText }]);
    setInput("");
    setIsTyping(true);

    // ==========================================
    // PHASE 1: THE ONBOARDING FORM (Steps 0 to 4)
    // ==========================================
    if (step < 5) {
      let nextStep = step + 1;
      let botReply = "";

      try {
        if (step === 0) {
          setForm((prev) => ({ ...prev, name: inputText }));
          botReply = "Great. Please enter your email address:";
        } else if (step === 1) {
          setForm((prev) => ({ ...prev, email: inputText }));
          botReply = "What is the best phone number to reach you?";
        } else if (step === 2) {
          setForm((prev) => ({ ...prev, phone: inputText }));
          botReply = "Which company or project is this for?";
        } else if (step === 3) {
          setForm((prev) => ({ ...prev, company: inputText }));
          botReply = "Tell me a little about what you want to build or improve:";
        } else if (step === 4) {
          const finalData = { ...form, message: inputText };
          setForm(finalData);
          console.log("Sending data:", finalData);

          // Save Data to Google Sheets
          const storeResponse = await fetch("/api/store-info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          });

          if (!storeResponse.ok) {
            const errorText = await storeResponse.text().catch(() => "");
            console.error("Data save failed:", storeResponse.status, errorText);
          }

          // Ask the sales AI to answer on behalf of the company.
          let aiText =
            "Thanks for sharing that. We can help with web development, AI automation, digital marketing, video editing, social media management, AI integration, and custom IT solutions. What timeline are you working with?";
          try {
            const res = await fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: inputText,
                lead: finalData,
                history: chat,
              }),
            });
            const data = await res.json();
            if (res.ok && data?.text && !isWeakReply(data.text)) aiText = data.text;
          } catch (err) {
            console.error("AI Fetch Error:", err);
          }

          botReply = aiText;
          nextStep = 5; // Move to continuous chat phase!
        }
      } catch (err) {
        console.error("Error:", err);
        botReply =
          "Sorry, something went wrong. We can still help with web development, AI automation, digital marketing, and more. What would you like to do next?";
        nextStep = step; // Keep them on the same step if it fails
      }

      setTimeout(() => {
        setChat((prev) => [...prev, { sender: "bot", text: botReply }]);
        setIsTyping(false);
      }, 500);

      setStep(nextStep);
    } 
    // ==========================================
    // PHASE 2: CONTINUOUS AI CHAT (Step 5+)
    // ==========================================
    else {
      const currentLead = { ...form };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: inputText,
            lead: currentLead,
            history: chat,
          }),
        });

        const data = await res.json();

        if (res.ok && data.text && !isWeakReply(data.text)) {
          setChat((prev) => [...prev, { sender: "bot", text: data.text }]);
        } else {
          setChat((prev) => [
            ...prev,
            {
              sender: "bot",
              text: getSalesFallback(currentLead),
            },
          ]);
        }
      } catch {
        setChat((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Sorry, I hit a network issue. If you share your goal, I can still help guide you toward the right service.",
          },
        ]);
      }
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-yellow-400 text-black px-4 py-2 rounded-full z-50 shadow-lg transition-transform hover:scale-105"
      >
        {open ? "Close" : "Ask me"}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white text-black p-3 rounded-xl z-50 shadow-2xl border border-gray-200">
          
          <div className="bg-yellow-400 text-center font-bold py-2 -mx-3 -mt-3 mb-3 rounded-t-xl">
            Vidhya Tech Assistant
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto mb-3 space-y-2 pr-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[85%] whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-yellow-400 text-black rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box (Now permanently visible!) */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isTyping) {
                  handleSend(input);
                }
              }}
              className="border border-gray-300 flex-1 p-2 rounded-lg text-sm focus:outline-none focus:border-yellow-400"
              placeholder={isTyping ? "AI is typing..." : "Type your message..."}
            />

            <button
              onClick={() => handleSend(input)}
              disabled={isTyping || !input.trim()}
              className="bg-black text-white px-4 rounded-lg text-sm font-semibold disabled:bg-gray-400 hover:bg-gray-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
