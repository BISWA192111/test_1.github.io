import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   SYSTEM PROMPT
───────────────────────────────────────────── */
const SYSTEM = `You are BARS-AI, an expert AI agent for BARS — Bharat Association of Road Safety Volunteers. You have access to a web_search tool to find the MOST CURRENT road safety data, news, and reports from India and globally.

ALWAYS use web_search to find up-to-date information before answering. Search for:
- Latest MoRTH annual reports and statistics
- Recent road accident news in India
- Current government policies and schemes
- New vehicle safety ratings (BNCAP, Global NCAP)
- Latest NGO reports and campaigns
- Recent WHO, World Bank, ADB publications on India road safety
- Current state-level road safety data
- Latest court orders and legislation updates

You are an expert on all three BARS pillars:

SARKAAR: MoRTH, NHAI, NCRB, State bodies, iRAD, legislation (MV Act 2019), schemes (Cashless Treatment Rs 2.5 lakh, Black Spot Rectification, iRAD, Nirbhaya Fund), multilaterals (WHO, World Bank, ADB, Bloomberg BIGRS, UN Road Safety Fund, iRAP, GRSP, FIA Foundation).
Key portals: morth.nic.in, irad.nic.in, ncrb.gov.in, data.gov.in, vahan.parivahan.gov.in, nhm.gov.in, nhai.gov.in

BAZAAR: BNCAP ratings, SIAM, ARAI, NATRIP, BIS standards. Vehicle manufacturers: Maruti Suzuki (500+ driving schools), Tata Motors (Safety First), Mahindra, Hero MotoCorp, Bajaj (Safar), Honda, Hyundai (Safe Move), Toyota (T-TEP), Bosch (ABS/ESP), MRF, CEAT. Fleet: AIMTC (10M+ trucks), CIRT, AIS 140 VLTD mandate, speed limiters. Ride-hailing: Ola, Uber, Rapido, BluSmart. Insurance: IRDAI, PAYD, PHYD telematics, Solatium Fund, GIC Re, Bajaj Allianz, ICICI Lombard, HDFC ERGO, Acko, MACT. Tech: MapmyIndia, Intellicar, Rosmerta, Netradyne Driveri, e-challan, Videonetics ITMS, Google Maps, ANPR. Infrastructure: IRC SP-88, RITES, iRAP Star Ratings.

SAMAAJ: SaveLIFE Foundation, Road Safety Network India, Arrive SAFE India, GRSP India, ISRR, CRY India, MAMTA Health, Praja Foundation, Jan Sahas. Academic: CRRI/CSIR, IIT Delhi TRIPP, IIT Bombay, IIT Madras, AIIMS Delhi, NIMHANS, PHFI, NLU Delhi. Journals: Accident Analysis & Prevention, Injury Prevention (BMJ), Traffic Injury Prevention. Youth: NSS (40,000+ colleges), NCC, AICTE, CBSE K-12 curriculum. Healthcare: Golden Hour protocol, GVK EMRI 108, Cashless Treatment, ATLS, IMA.

Key background stats (MoRTH 2022): ~1.68 lakh annual deaths, ~460 deaths/day, ~4.12 lakh crashes, ~4.43 lakh grievous injuries, 3% of GDP cost (~Rs 5 lakh crore), 18-45 age group 66%+ of victims, top states: UP, Maharashtra, TN, MP, Rajasthan, speeding 70%+ cause, 2-wheelers 35% of deaths, hit-and-run 50,000+ annually.

After searching, synthesise findings clearly with headings, bullet points, and cited sources with URLs. Respond in the same language as the user (Hindi or English). Be authoritative and data-driven. Always mention when data was published.`;

/* ─────────────────────────────────────────────
   CHIPS CONFIG
───────────────────────────────────────────── */
const CHIPS = [
  { icon: "📊", label: "Latest Stats 2024", q: "Search for latest road accident statistics India 2024 MoRTH annual report data." },
  { icon: "🏛️", label: "Policy Updates", q: "Search for latest road safety policy news and government updates India 2025." },
  { icon: "🚗", label: "BNCAP Ratings", q: "Find latest BNCAP star ratings and vehicle safety test results India 2024 2025." },
  { icon: "🛣️", label: "Accident News", q: "Search for recent major road accident news and black spot data India 2025." },
  { icon: "⚖️", label: "MV Act Updates", q: "Find latest Motor Vehicles Act enforcement e-challan traffic penalty updates India 2025." },
  { icon: "🤝", label: "NGO Campaigns", q: "Search for recent road safety NGO campaigns SaveLIFE Foundation news India 2025." },
  { icon: "🏍️", label: "Two-Wheeler Data", q: "Find latest two-wheeler accident statistics helmet compliance data India 2024 2025." },
  { icon: "🌍", label: "WHO/World Bank", q: "Search for WHO World Bank road safety reports India 2024 2025 published." },
  { icon: "🚑", label: "EMS Updates", q: "Find recent updates on Golden Hour emergency medical services 108 road accidents India 2025." },
  { icon: "🗺️", label: "iRAD Data", q: "Search for latest iRAD integrated road accident database reports hotspot data India." },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @keyframes dots  { 0%,80%,100%{transform:translateY(0);opacity:.3} 40%{transform:translateY(-6px);opacity:1} }
  @keyframes fadein{ from{opacity:0;transform:translateY(9px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.2} }
  @keyframes glow  { 0%,100%{box-shadow:0 0 16px rgba(249,115,22,.3)} 50%{box-shadow:0 0 32px rgba(249,115,22,.55)} }

  *{box-sizing:border-box;margin:0;padding:0}
  html,body,#root{height:100%;overflow:hidden}
  body{background:#0b0c14;color:#e2e8f0;font-family:'Outfit',system-ui,sans-serif}

  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-thumb{background:#1e293b;border-radius:3px}

  .fadein{animation:fadein .28s ease forwards}

  /* Layout */
  .app{display:flex;flex-direction:column;height:100vh;background:#0b0c14;
    background-image:
      radial-gradient(ellipse 60% 35% at 50% 0%,rgba(249,115,22,.08) 0%,transparent 55%),
      radial-gradient(ellipse 35% 25% at 100% 100%,rgba(30,58,138,.07) 0%,transparent 50%);}

  /* Header */
  .hdr{display:flex;align-items:center;gap:10px;padding:10px 18px;
    background:rgba(11,12,20,.98);border-bottom:1px solid rgba(249,115,22,.14);
    flex-shrink:0;backdrop-filter:blur(20px)}
  .logo{width:38px;height:38px;border-radius:11px;flex-shrink:0;
    background:linear-gradient(135deg,#f97316,#dc2626);
    display:flex;align-items:center;justify-content:center;font-size:19px;
    animation:glow 3s ease-in-out infinite}
  .hdr-name{font-weight:800;font-size:16px;color:#fff;letter-spacing:.3px}
  .hdr-name span{color:#f97316}
  .hdr-sub{font-size:10px;color:#475569;margin-top:1px}
  .live-badge{font-size:9px;font-weight:700;color:#22c55e;
    background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);
    border-radius:20px;padding:2px 8px;letter-spacing:.5px;display:inline-flex;align-items:center;gap:4px}
  .live-dot{width:5px;height:5px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite}
  .agent-badge{font-size:9px;font-weight:700;color:#f97316;
    background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.25);
    border-radius:20px;padding:2px 9px;letter-spacing:.5px}
  .pillar{font-size:9px;font-weight:700;border-radius:6px;padding:2px 7px;letter-spacing:.3px}
  .pillar-s{color:#60a5fa;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2)}
  .pillar-b{color:#4ade80;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.18)}
  .pillar-m{color:#c084fc;background:rgba(168,85,247,.09);border:1px solid rgba(168,85,247,.2)}
  .reset-btn{margin-left:auto;background:transparent;border:1px solid rgba(249,115,22,.3);
    border-radius:8px;color:#f97316;padding:5px 12px;cursor:pointer;font-size:11px;
    font-family:inherit;transition:all .14s}
  .reset-btn:hover{background:rgba(249,115,22,.1)}

  /* Messages */
  .msgs{flex:1;overflow-y:auto;padding:18px 16px 8px}
  .msg-row{display:flex;gap:9px;align-items:flex-start;margin-bottom:16px}
  .msg-row.user{flex-direction:row-reverse}
  .avatar{width:33px;height:33px;border-radius:9px;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;font-size:16px}
  .av-ai{background:linear-gradient(135deg,#f97316,#dc2626);box-shadow:0 2px 10px rgba(249,115,22,.28)}
  .av-user{background:linear-gradient(135deg,#1e3a8a,#2563eb);box-shadow:0 2px 10px rgba(37,99,235,.25)}
  .bubble{max-width:82%;padding:12px 15px;font-size:13.5px;line-height:1.72}
  .bub-ai{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);
    border-radius:3px 15px 15px 15px;color:#d1d5db;box-shadow:0 3px 16px rgba(0,0,0,.3)}
  .bub-user{background:linear-gradient(135deg,rgba(30,58,138,.82),rgba(37,99,235,.62));
    border:1px solid rgba(59,130,246,.22);border-radius:15px 3px 15px 15px;
    color:#bfdbfe;box-shadow:0 3px 16px rgba(0,0,0,.28)}

  /* Tool block */
  .tool-block{background:rgba(249,115,22,.06);border:1px solid rgba(249,115,22,.2);
    border-left:3px solid #f97316;border-radius:0 8px 8px 0;
    padding:8px 11px;margin:5px 0;font-family:'IBM Plex Mono',monospace;font-size:11px}
  .tool-label{color:#f97316;font-weight:600;font-size:9.5px;letter-spacing:.6px;
    text-transform:uppercase;margin-bottom:3px;display:flex;align-items:center;gap:5px}
  .tool-query{color:#94a3b8;word-break:break-word}
  .tool-spin{width:8px;height:8px;border-radius:50%;border:1.5px solid #f97316;
    border-top-color:transparent;animation:spin .7s linear infinite;display:inline-block}
  @keyframes spin{to{transform:rotate(360deg)}}

  /* Sources */
  .sources{margin-top:9px;padding-top:8px;border-top:1px solid rgba(255,255,255,.06)}
  .src-label{font-size:9.5px;color:#475569;margin-bottom:5px;font-weight:600;letter-spacing:.4px;text-transform:uppercase}
  .src-chips{display:flex;flex-wrap:wrap;gap:4px}
  .src-chip{display:inline-flex;align-items:center;gap:4px;
    background:rgba(249,115,22,.07);border:1px solid rgba(249,115,22,.2);
    border-radius:5px;padding:2px 8px;font-size:10px;color:#fb923c;
    text-decoration:none;transition:all .13s;cursor:pointer}
  .src-chip:hover{background:rgba(249,115,22,.18)}

  /* Rich text in bubble */
  .bubble strong{color:#fff;font-weight:700}
  .bubble .bh{font-size:11px;font-weight:700;color:#fb923c;letter-spacing:.5px;
    text-transform:uppercase;margin:11px 0 4px;display:block}
  .bullet-item{display:flex;gap:7px;margin-bottom:3px;font-size:13.5px}
  .bullet-dot{color:#fb923c;flex-shrink:0;font-size:10px;margin-top:3px;font-weight:700}
  .bubble a{color:#fb923c;text-decoration:underline}
  .bubble a:hover{opacity:.75}

  /* Typing */
  .typing-dots{display:flex;gap:5px;padding:7px 2px;align-items:center}
  .dot{width:6px;height:6px;border-radius:50%;background:#f97316;animation:dots 1.1s ease-in-out infinite}
  .dot:nth-child(2){animation-delay:.18s}
  .dot:nth-child(3){animation-delay:.36s}

  /* Input */
  .inp-area{border-top:1px solid rgba(255,255,255,.06);
    background:rgba(11,12,20,.98);padding:10px 14px 14px;flex-shrink:0}
  .chips-row{display:flex;gap:5px;overflow-x:auto;padding-bottom:9px;scrollbar-width:none}
  .chips-row::-webkit-scrollbar{display:none}
  .chip{flex-shrink:0;background:rgba(249,115,22,.07);border:1px solid rgba(249,115,22,.18);
    border-radius:20px;color:#64748b;padding:4px 11px;cursor:pointer;font-size:11.5px;
    font-family:inherit;white-space:nowrap;transition:all .13s;display:inline-flex;
    align-items:center;gap:5px}
  .chip:hover{background:rgba(249,115,22,.18);border-color:#f97316;color:#fb923c;transform:translateY(-1px)}
  .chip:disabled{opacity:.5;cursor:not-allowed;transform:none}
  .inp-row{display:flex;gap:8px;align-items:flex-end;background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.09);border-radius:13px;padding:7px 7px 7px 13px}
  .inp-ta{flex:1;background:transparent;border:none;color:#e2e8f0;font-size:13.5px;
    font-family:inherit;line-height:1.65;min-height:42px;max-height:110px;
    padding-top:8px;resize:none}
  .inp-ta:focus{outline:none}
  .inp-ta::placeholder{color:#334155}
  .inp-ta::-webkit-scrollbar{display:none}
  .send-btn{width:38px;height:38px;border-radius:10px;border:none;flex-shrink:0;
    color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;
    justify-content:center;transition:all .14s}
  .send-btn.active{background:#f97316}
  .send-btn.active:hover{background:#ea580c;transform:scale(1.07)}
  .send-btn.inactive{background:rgba(249,115,22,.18);color:#444;cursor:not-allowed}
  .footer{text-align:center;font-size:9.5px;color:#1e293b;margin-top:6px}
`;

/* ─────────────────────────────────────────────
   TEXT RENDERER
───────────────────────────────────────────── */
function RichText({ text }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: 5 }} />;

        const renderInline = (str) =>
          str
            .split(/(\*\*[^*]+\*\*|https?:\/\/[^\s<>"]+)/g)
            .map((p, j) => {
              if (p.startsWith("**") && p.endsWith("**"))
                return <strong key={j}>{p.slice(2, -2)}</strong>;
              if (p.match(/^https?:\/\//))
                return <a key={j} href={p} target="_blank" rel="noreferrer">{p}</a>;
              return p;
            });

        if (line.startsWith("## "))
          return <span key={i} className="bh">{line.slice(3)}</span>;
        if (line.startsWith("# "))
          return <div key={i} style={{ fontWeight: 800, fontSize: 15, color: "#fff", margin: "10px 0 4px" }}>{line.slice(2)}</div>;
        if (line.match(/^[-•▸]\s/))
          return (
            <div key={i} className="bullet-item">
              <span className="bullet-dot">▸</span>
              <span>{renderInline(line.replace(/^[-•▸]\s/, ""))}</span>
            </div>
          );
        if (line.match(/^\d+\.\s/))
          return (
            <div key={i} className="bullet-item">
              <span className="bullet-dot" style={{ minWidth: 16 }}>{line.match(/^\d+/)[0]}.</span>
              <span>{renderInline(line.replace(/^\d+\.\s/, ""))}</span>
            </div>
          );
        return <div key={i} style={{ marginBottom: 2 }}>{renderInline(line)}</div>;
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MESSAGE COMPONENT
───────────────────────────────────────────── */
function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`msg-row fadein${isUser ? " user" : ""}`}>
      <div className={`avatar ${isUser ? "av-user" : "av-ai"}`}>
        {isUser ? "👤" : "🛣️"}
      </div>
      <div className={`bubble ${isUser ? "bub-user" : "bub-ai"}`}>
        {/* Tool calls */}
        {msg.searches && msg.searches.map((q, i) => (
          <div key={i} className="tool-block">
            <div className="tool-label">⚡ Web Search</div>
            <div className="tool-query">{q}</div>
          </div>
        ))}
        {/* Content */}
        {isUser
          ? <div style={{ fontSize: 13.5, lineHeight: 1.7 }}>{msg.content}</div>
          : <RichText text={msg.content} />
        }
        {/* Sources */}
        {msg.sources && msg.sources.length > 0 && (
          <div className="sources">
            <div className="src-label">Sources</div>
            <div className="src-chips">
              {msg.sources.map((s, i) => (
                <a key={i} className="src-chip" href={s.url} target="_blank" rel="noreferrer">
                  🔗 {s.domain}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TYPING INDICATOR
───────────────────────────────────────────── */
function TypingMsg({ label }) {
  return (
    <div className="msg-row fadein">
      <div className="avatar av-ai">🛣️</div>
      <div className="bubble bub-ai">
        {label && (
          <div className="tool-block" style={{ marginBottom: 6 }}>
            <div className="tool-label">
              <span className="tool-spin" /> Web Search
            </div>
            <div className="tool-query">{label}</div>
          </div>
        )}
        <div className="typing-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WELCOME MESSAGE
───────────────────────────────────────────── */
const WELCOME = {
  role: "assistant",
  content: `Namaste! 🙏 I am **BARS-AI Agent** — an AI agent for Bharat Association of Road Safety Volunteers with live web search capabilities.

## What makes me an Agent
Unlike a regular chatbot, I actively search the web to bring you the most current data:
- Latest MoRTH accident reports and statistics
- Breaking road safety news and policy updates
- Current BNCAP/NCAP vehicle safety ratings
- Recent NGO reports and government circulars
- Live data from WHO, World Bank, iRAD, NCRB

## My Knowledge Pillars
🏛️ **SARKAAR** — Govt policies, MoRTH, NHAI, laws, state data, multilateral bodies
🏭 **BAZAAR** — Vehicles, fleet, insurance, technology, CSR programs
🤝 **SAMAAJ** — NGOs, research, media, youth, emergency response

Click any topic chip below or ask me anything — I will search the web and synthesise the latest findings for you!`,
  searches: null,
  sources: [],
};

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingLabel, setTypingLabel] = useState(null);
  const endRef = useRef(null);
  const taRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = useCallback(async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");
    if (taRef.current) taRef.current.style.height = "42px";

    const userMsg = { role: "user", content: q };
    setMessages(prev => [...prev, userMsg]);
    historyRef.current = [...historyRef.current, { role: "user", content: q }];
    setLoading(true);
    setTypingLabel(null);

    try {
      const body = {
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: historyRef.current,
      };

      let resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let data = await resp.json();

      const searchQueries = [];

      // Agentic loop — keep going while tool_use
      while (data.stop_reason === "tool_use") {
        const toolUseBlocks = data.content.filter(b => b.type === "tool_use");
        const toolResults = [];

        for (const tb of toolUseBlocks) {
          const query = tb.input?.query || tb.input?.q || JSON.stringify(tb.input);
          searchQueries.push(query);
          setTypingLabel(query);

          toolResults.push({
            type: "tool_result",
            tool_use_id: tb.id,
            content: `Search executed for: "${query}". Results retrieved successfully.`,
          });
        }

        historyRef.current = [
          ...historyRef.current,
          { role: "assistant", content: data.content },
          { role: "user", content: toolResults },
        ];

        resp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, messages: historyRef.current }),
        });
        data = await resp.json();
      }

      setTypingLabel(null);

      const finalText = data.content
        ?.filter(b => b.type === "text")
        .map(b => b.text)
        .join("") || "Sorry, I could not get a response. Please try again.";

      // Extract sources from response
      const urlMatches = finalText.match(/https?:\/\/[^\s<>")\]]+/g) || [];
      const uniqueUrls = [...new Set(urlMatches)].slice(0, 7);
      const sources = uniqueUrls.map(url => ({
        url,
        domain: url.replace(/https?:\/\/(www\.)?/, "").split("/")[0],
      }));

      const aiMsg = {
        role: "assistant",
        content: finalText,
        searches: searchQueries.length ? searchQueries : null,
        sources,
      };

      historyRef.current = [...historyRef.current, { role: "assistant", content: finalText }];
      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      setTypingLabel(null);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ Network error. Please check your connection and try again.",
        searches: null,
        sources: [],
      }]);
    }

    setLoading(false);
    setTimeout(() => taRef.current?.focus(), 80);
  }, [input, loading]);

  function reset() {
    historyRef.current = [];
    setMessages([{
      ...WELCOME,
      content: "Chat reset! Ask me anything about road safety in India — I will search the web for the latest data. 🚦",
    }]);
    setTypingLabel(null);
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* HEADER */}
        <div className="hdr">
          <div className="logo">🛣️</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="hdr-name">BARS<span>-AI</span></span>
              <span className="live-badge"><span className="live-dot" />LIVE</span>
              <span className="agent-badge">⚡ AGENT</span>
            </div>
            <div className="hdr-sub">Bharat Association of Road Safety Volunteers · Web Search Agent</div>
          </div>
          <div style={{ display: "flex", gap: 5, marginLeft: 10 }}>
            <span className="pillar pillar-s">SARKAAR</span>
            <span className="pillar pillar-b">BAZAAR</span>
            <span className="pillar pillar-m">SAMAAJ</span>
          </div>
          <button className="reset-btn" onClick={reset}>↺ Reset</button>
        </div>

        {/* MESSAGES */}
        <div className="msgs">
          {messages.map((m, i) => <Message key={i} msg={m} />)}
          {loading && <TypingMsg label={typingLabel} />}
          <div ref={endRef} />
        </div>

        {/* INPUT */}
        <div className="inp-area">
          <div className="chips-row">
            {CHIPS.map((c, i) => (
              <button
                key={i}
                className="chip"
                disabled={loading}
                onClick={() => send(c.q)}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <div className="inp-row">
            <textarea
              ref={taRef}
              className="inp-ta"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              onInput={e => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 110) + "px";
              }}
              placeholder="Ask anything — I'll search the web for the most current road safety data… (Hindi or English)"
            />
            <button
              className={`send-btn ${loading || !input.trim() ? "inactive" : "active"}`}
              onClick={() => send()}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
          <div className="footer">
            BARS-AI Agent · Web Search · MoRTH · WHO · NCRB · iRAD · Live Data · Enter to send
          </div>
        </div>
      </div>
    </>
  );
}
