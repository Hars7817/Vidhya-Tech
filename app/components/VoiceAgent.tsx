'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Role = 'assistant' | 'user';

type ChatMessage = {
  id: string;
  role: Role;
  text: string;
};

type RecognitionAlternative = {
  transcript: string;
  confidence?: number;
};

type RecognitionResult = {
  0: RecognitionAlternative;
  isFinal: boolean;
  length: number;
};

type RecognitionEvent = {
  resultIndex: number;
  results: ArrayLike<RecognitionResult>;
};

type RecognitionErrorEvent = {
  error: string;
  message?: string;
};

interface BrowserSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
}

interface BrowserSpeechRecognitionConstructor {
  new (): BrowserSpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor;
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
    __vtVoiceAgentWelcomed?: boolean;
  }
}

const WELCOME_MESSAGE = 'Welcome to Vidhya Tech, may I help you?';
const VOICE_ENDPOINT = '/api/voice';

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function safeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeForComparison(value: string) {
  return safeText(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAnyKeyword(value: string, keywords: string[]) {
  const lower = value.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function pickVariant(options: string[], avoid?: string) {
  const normalizedAvoid = avoid ? normalizeForComparison(avoid) : '';
  const filtered = options.filter((option) => normalizeForComparison(option) !== normalizedAvoid);
  const pool = filtered.length ? filtered : options;

  if (!pool.length) {
    return '';
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

function buildFallbackReply(message: string, lastAssistant?: string) {
  const lower = safeText(message).toLowerCase();
  const options: string[] = [];

  if (hasAnyKeyword(lower, ['hello', 'hi', 'hey', 'namaste', 'hii'])) {
    options.push(
      'Namaste, main Vidhya Tech ka voice assistant hoon. Aapka naam aur requirement share kijiye, phir main help karta hoon.',
      'Hello! Main Vidhya Tech se hoon. Aap school ERP, website development, ya AI automation me kis cheez ki help chahte ho?',
    );
  }

  if (hasAnyKeyword(lower, ['school', 'erp', 'student', 'admission', 'fee', 'attendance', 'exam'])) {
    options.push(
      'School ERP ke liye hum admissions, fees, attendance, exams aur parent communication cover kar sakte hain. Aapka school ka size aur main requirement kya hai?',
      'School ERP me attendance, fees, timetable aur parent portal automate kiya ja sakta hai. Aap kis module se start karna chahte ho?',
    );
  }

  if (hasAnyKeyword(lower, ['website', 'web', 'site', 'landing', 'seo'])) {
    options.push(
      'Website development ke liye hum fast, modern aur SEO-friendly design bana sakte hain. Aapka business type aur website ka purpose kya hai?',
      'Agar website chahiye, to main responsive aur conversion-focused layout suggest karunga. Aapko kis type ki site chahiye?',
    );
  }

  if (hasAnyKeyword(lower, ['ai', 'automation', 'bot', 'chatbot', 'workflow', 'whatsapp'])) {
    options.push(
      'AI automation me hum lead capture, WhatsApp replies, follow-ups aur internal workflows automate kar sakte hain. Kaunsa process aap automate karna chahte ho?',
      'AI automation ke through repeated kaam kaafi smooth ho jata hai. Aap kis process ko smart banana chahte ho?',
    );
  }

  options.push(
    'Bilkul, main aapki help karunga. Aapka name, business type aur requirement ek line me share kar dijiye.',
    'Zaroor, thoda detail share kijiye so I can suggest the right solution for you.',
    'Perfect. Aap kaunsi service dekh rahe ho - School ERP, website development, ya AI automation?',
  );

  return pickVariant(options, lastAssistant);
}

function getRecognitionLanguage() {
  if (typeof navigator === 'undefined') {
    return 'en-IN';
  }

  const browserLanguage = navigator.language || 'en-IN';
  return browserLanguage.toLowerCase().startsWith('hi') ? browserLanguage : 'en-IN';
}

function getSpeechLanguage(text: string) {
  return /[\u0900-\u097F]/.test(text) ? 'hi-IN' : 'en-IN';
}

function getRecognitionConstructor() {
  if (typeof window === 'undefined') return null;

  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export default function VoiceAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: WELCOME_MESSAGE,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [draftTranscript, setDraftTranscript] = useState('');
  const [status, setStatus] = useState('Ready to listen');
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesRef = useRef<ChatMessage[]>(messages);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const transcriptRef = useRef('');
  const recognitionErrorRef = useRef(false);
  const shouldSendTranscriptRef = useRef(false);
  const welcomeSpokenRef = useRef(false);
  const speechIdRef = useRef(0);
  const panelBodyRef = useRef<HTMLDivElement | null>(null);
  const autoStartedRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;

    const panelBody = panelBodyRef.current;
    if (!panelBody) return;

    panelBody.scrollTo({
      top: panelBody.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, draftTranscript, error, isListening, isOpen]);

  function stopSpeaking() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    speechIdRef.current += 1;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  function markWelcomeHandled() {
    welcomeSpokenRef.current = true;

    if (typeof window !== 'undefined') {
      window.__vtVoiceAgentWelcomed = true;
    }
  }

  function stopListening() {
    shouldSendTranscriptRef.current = false;
    recognitionErrorRef.current = false;
    transcriptRef.current = '';
    setDraftTranscript('');

    const recognition = recognitionRef.current;
    recognitionRef.current = null;

    if (recognition) {
      try {
        recognition.abort();
      } catch {
        try {
          recognition.stop();
        } catch {
          // Ignore cleanup failures.
        }
      }
    }

    setIsListening(false);
    setStatus('Ready to listen');
  }

  function closeWidget() {
    stopListening();
    stopSpeaking();
    setError('');
    setIsOpen(false);
  }

  function speakText(text: string, options?: { markWelcome?: boolean }) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const phrase = safeText(text);
    if (!phrase) return;

    speechIdRef.current += 1;
    const speechId = speechIdRef.current;

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = getSpeechLanguage(phrase);
    utterance.rate = 0.98;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((voice) => voice.lang.toLowerCase() === utterance.lang.toLowerCase()) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('en-in')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('hi-in')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('hi')) ??
      null;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      if (speechId !== speechIdRef.current) return;
      if (options?.markWelcome) {
        markWelcomeHandled();
      }
      setIsSpeaking(true);
      setStatus('Speaking...');
    };

    utterance.onend = () => {
      if (speechId !== speechIdRef.current) return;
      if (options?.markWelcome) {
        markWelcomeHandled();
      }
      setIsSpeaking(false);
      setStatus('Ready to listen');
    };

    utterance.onerror = () => {
      if (speechId !== speechIdRef.current) return;
      setIsSpeaking(false);
      setStatus('Ready to listen');
    };

    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.__vtVoiceAgentWelcomed || welcomeSpokenRef.current) {
      return;
    }

    const tryWelcome = () => {
      if (window.__vtVoiceAgentWelcomed || welcomeSpokenRef.current) {
        return;
      }

      speakText(WELCOME_MESSAGE, { markWelcome: true });
      
      // Auto-start listening after welcome is spoken to prompt for mic permission
      if (!autoStartedRef.current) {
        autoStartedRef.current = true;
        setTimeout(() => {
          // Use refs instead of state variables to avoid closure issues
          if (!welcomeSpokenRef.current) {
            // Welcome is being spoken, wait a bit more
            setTimeout(() => startListening(), 1500);
          } else if (welcomeSpokenRef.current) {
            // Welcome has finished, start listening
            startListening();
          }
        }, 100);
      }
    };

    // Wait for voices to load before speaking
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        tryWelcome();
        window.removeEventListener('voiceschanged', handleVoicesChanged);
      }
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      tryWelcome();
    } else {
      window.addEventListener('voiceschanged', handleVoicesChanged);
      // Fallback: try after 500ms if voices don't load
      const timer = window.setTimeout(() => {
        tryWelcome();
        window.removeEventListener('voiceschanged', handleVoicesChanged);
      }, 500);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('voiceschanged', handleVoicesChanged);
      };
    }
  }, []);

  function appendMessage(role: Role, text: string) {
    const cleanText = safeText(text);
    if (!cleanText) return;

    const message = {
      id: createId(),
      role,
      text: cleanText,
    };

    setMessages((current) => {
      const next = [...current, message];
      messagesRef.current = next;
      return next;
    });
  }

  async function sendTranscriptToApi(transcript: string) {
    const cleanedTranscript = safeText(transcript);
    if (!cleanedTranscript) {
      setStatus('Ready to listen');
      return;
    }

    const historySnapshot = messagesRef.current
      .slice(-12)
      .map((message) => ({ role: message.role, text: message.text }));
    const lastAssistant = [...historySnapshot].reverse().find((message) => message.role === 'assistant')?.text;

    appendMessage('user', cleanedTranscript);
    setDraftTranscript('');
    setIsProcessing(true);
    setStatus('Thinking...');

    try {
      const response = await fetch(VOICE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          message: cleanedTranscript,
          history: historySnapshot,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        text?: unknown;
        error?: unknown;
      };

      // Check if the response indicates an error
      if (!response.ok || typeof payload.error === 'string') {
        const errorMsg = safeText(payload.error) || `API Error: ${response.status}`;
        console.error('[Voice Widget] API error:', errorMsg);
        
        // Use fallback for API errors
        const fallback = buildFallbackReply(cleanedTranscript, lastAssistant);
        appendMessage('assistant', fallback);
        speakText(fallback);
        setStatus('Ready to listen');
        return;
      }

      const reply = safeText(payload?.text);
      if (!reply) {
        // Empty response, use fallback
        const fallback = buildFallbackReply(cleanedTranscript, lastAssistant);
        appendMessage('assistant', fallback);
        speakText(fallback);
        setStatus('Ready to listen');
        return;
      }

      // Check if the reply is the same as last response (avoid repetition)
      const normalizedReply = normalizeForComparison(reply);
      const normalizedLast = normalizeForComparison(lastAssistant ?? '');
      
      if (normalizedReply === normalizedLast && normalizedReply) {
        // API returned same response, use different fallback
        const fallback = buildFallbackReply(cleanedTranscript, lastAssistant);
        appendMessage('assistant', fallback);
        speakText(fallback);
      } else {
        // API gave a good response
        appendMessage('assistant', reply);
        speakText(reply);
      }
    } catch (error) {
      console.error('[Voice Widget] Fetch error:', error);
      const fallback = buildFallbackReply(cleanedTranscript, lastAssistant);
      appendMessage('assistant', fallback);
      speakText(fallback);
    } finally {
      setIsProcessing(false);
      setStatus('Ready to listen');
    }
  }

  function startListening() {
    setError('');

    if (isProcessing) {
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    stopSpeaking();

    const Recognition = getRecognitionConstructor();
    if (!Recognition) {
      setStatus('Voice recognition unavailable');
      setError('This browser does not support speech recognition. Please try Chrome on desktop or Android.');
      return;
    }

    const recognition = new Recognition();
    recognitionRef.current = recognition;
    transcriptRef.current = '';
    recognitionErrorRef.current = false;
    setDraftTranscript('');

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = getRecognitionLanguage();

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('Listening...');
    };

    recognition.onresult = (event: RecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let index = 0; index < event.results.length; index += 1) {
        const result = event.results[index];
        const firstAlternative = result?.[0];
        const part = safeText(firstAlternative?.transcript);

        if (!part) {
          continue;
        }

        if (result?.isFinal) {
          finalTranscript += `${part} `;
        } else {
          interimTranscript += `${part} `;
        }
      }

      const cleanTranscript = `${finalTranscript}${interimTranscript}`.trim();
      transcriptRef.current = cleanTranscript;
      setDraftTranscript(cleanTranscript);
    };

    recognition.onerror = (event: RecognitionErrorEvent) => {
      recognitionErrorRef.current = true;
      setIsListening(false);
      recognitionRef.current = null;

      const friendlyMessage =
        event.error === 'not-allowed'
          ? 'Mic permission denied. Please allow microphone access and try again.'
          : event.error === 'no-speech'
            ? 'I could not hear anything. Please speak a little louder and try again.'
            : 'Voice recognition stopped unexpectedly. Please try again.';

      setError(friendlyMessage);
      setStatus('Ready to listen');
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;

      if (recognitionErrorRef.current) {
        recognitionErrorRef.current = false;
        setStatus('Ready to listen');
        return;
      }

      const transcript = transcriptRef.current.trim();
      if (!transcript) {
        setStatus('Ready to listen');
        return;
      }

      void sendTranscriptToApi(transcript);
    };

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setStatus('Ready to listen');
      setError('Could not start voice recognition. Please try again.');
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-0">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="popup-panel"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto mb-3 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 text-white shadow-[0_24px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#ffdf71] to-[#ffbf00] text-black shadow-[0_10px_28px_rgba(255,191,0,.20)]">
                  <MicIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#ffcc00]/90">
                    Voice AI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    isListening
                      ? 'border-[#ffcc00]/30 bg-[#ffcc00]/15 text-[#ffe99a]'
                      : isProcessing
                        ? 'border-sky-400/30 bg-sky-500/15 text-sky-100'
                        : isSpeaking
                          ? 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100'
                          : 'border-white/10 bg-white/5 text-white/70'
                  }`}
                  aria-live="polite"
                >
                  {status}
                </div>

                <button
                  type="button"
                  onClick={closeWidget}
                  aria-label="Close voice agent"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-white/20 hover:text-white/90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M18 6L6 18" strokeLinecap="round" />
                    <path d="M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div ref={panelBodyRef} className="max-h-64 space-y-2.5 overflow-y-auto px-4 py-3">
              {messages.map((message) => (
                <MessageBubble key={message.id} role={message.role} text={message.text} />
              ))}

              {isListening ? (
                <div className="rounded-xl border border-[#ffcc00]/25 bg-[#ffcc00]/10 px-3 py-2.5 text-sm text-[#ffe99a]">
                  <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#ffe99a]/80">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffcc00]" />
                    Listening
                  </div>
                  <p className="text-xs leading-relaxed text-white/85">
                    {draftTranscript || 'Bolte rahiye. Main aapki baat sun raha hoon.'}
                  </p>
                </div>
              ) : null}

              {error ? (
                <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-100">
                  {error}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={isOpen ? closeWidget : () => {
          setIsOpen(true);
          setTimeout(() => startListening(), 150);
        }}
        disabled={isProcessing}
        aria-pressed={isOpen}
        aria-label={isOpen ? 'Close voice agent' : 'Open voice agent'}
        className={`pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200 ${
          isOpen || isListening
            ? 'border-[#ffcc00]/40 bg-[#ffcc00]/14 shadow-[0_0_0_8px_rgba(255,204,0,0.08)]'
            : 'border border-white/10 bg-slate-950/85 shadow-[0_18px_60px_rgba(0,0,0,0.35)] hover:border-[#ffcc00]/40 hover:bg-slate-900'
        } ${isProcessing ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
      >
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#ffdf71] to-[#ffbf00] text-black shadow-[0_14px_40px_rgba(255,191,0,.28)]">
          <span
            className={`absolute inset-0 rounded-full bg-[#ffcc00]/25 ${isListening ? 'animate-ping' : 'opacity-0'}`}
          />
          <MicIcon className="relative z-10 h-5 w-5" />
        </span>
      </button>
    </div>
  );
}

function MessageBubble({ role, text }: { role: Role; text: string }) {
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAssistant
            ? 'border border-white/10 bg-white/5 text-white'
            : 'bg-linear-to-br from-[#ffdf71] to-[#ffbf00] text-black shadow-[0_12px_34px_rgba(255,191,0,.16)]'
        }`}
      >
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] opacity-70">
          {isAssistant ? 'Vidhya Tech' : 'You'}
        </div>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}

function MicIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 14.5C14.2 14.5 16 12.7 16 10.5V6.5C16 4.3 14.2 2.5 12 2.5C9.8 2.5 8 4.3 8 6.5V10.5C8 12.7 9.8 14.5 12 14.5Z"
        fill="currentColor"
      />
      <path
        d="M5.5 11.5C5.5 15.1 8.4 18 12 18C15.6 18 18.5 15.1 18.5 11.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 18V21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 21H15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
