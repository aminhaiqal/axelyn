# 🇲🇾 AXON
### WhatsApp Automation That Learns — Built for Malaysian Businesses

---

## 🧠 What is Axon?

Axon is an **AI automation platform for Malaysian SMEs** that gets smarter with every conversation.

It connects to your **WhatsApp Business or Telegram**, handles customer messages automatically, and **learns your tone and style** from feedback — so your virtual assistant improves week by week.

Under the hood, Axon is powered by a **learning agent builder** — a node-based engine that generates workflows from natural language and continuously evolves based on feedback.

---

## 🧩 The Problem We’re Solving

If you run a Malaysian business, you’re answering the same WhatsApp questions daily:

> “Buka jam berapa ya?”  
> “Masih ada stok tak?”  
> “Macam mana nak order?”  
> “Can I pay via FPX?”

And while tools like ChatGPT, Zapier, or Make exist, they don’t fit how Malaysians actually work.

| The Issue | Why It Fails |
|------------|--------------|
| 🇬🇧 English-only | No BM or Manglish support |
| 🧠 Too complex | Needs tech skill, confusing setup |
| 💬 Static | Same replies every time |
| 📵 No WhatsApp | Not where customers actually are |
| 💳 No local payments | Stripe-only, USD-only |

We’re fixing that.

---

## ⚙️ How Axon Works

### 1. Connect WhatsApp (or Telegram)
Use the **WhatsApp Business API** (via Twilio or MessageBird).  
Axon instantly starts monitoring your business chat.

---

### 2. Pick a Template
No setup headaches — just pick your automation:

- 🍽 **Cafe Auto-Responder** → Handles menu, hours, reservations  
- 📦 **E-commerce Order Bot** → Tracks orders via Google Sheets  
- 🏠 **Real Estate Assistant** → Manages property inquiries  
- 📚 **Tuition Center Admin** → Schedules, fees, class info  

Setup takes **under 5 minutes**.

---

### 3. Let Axon Handle Messages
When a customer messages you:

> **Customer:** “Bro, what time you close ah?”  
> **Axon:** “Hi! We close at 10pm today 😊”

Behind the scenes:
1. Message → Intent detection  
2. Search knowledge base (FAQ, Notion, Google Sheets, Docs)  
3. Respond in **BM, English, or both**

---

### 4. Teach It from WhatsApp
After each response, you get a WhatsApp message:

Was this reply good?
👍 Perfect
👎 Needs improvement
✏️ I would say: [your version]


Each node tracks:
- **Intent** (what customer asked)  
- **Action** (what to do)  
- **Confidence** (how sure Axon is)  
- **Feedback Score** (how users rated it)

Over time, Axon automatically adjusts connections between nodes — learning which responses perform best.  
That’s how **your automations evolve automatically**.

---

## 💬 Feedback = Learning

Every thumbs-up, thumbs-down, or correction updates the model:
- 👍 Increases confidence on that path  
- 👎 Decreases it or suggests retraining  
- ✏️ Creates a new branch in the workflow  

Axon’s internal agent graph continuously rewires itself — that’s how it “learns your business.”

---

[Incoming Message] - [Intent: Delivery Inquiry] - [Action: Reply("We use GrabFood")]

---

## 💡 The Wow Factor

You’re not just building static chatbots.  
You’re training a **living workflow** — one that grows smarter with every chat.

> “Axon doesn’t just automate — it adapts.”

That’s your **moat** over tools like Zapier, Make, or n8n.

---

## ⚖️ Why Axon is Different

| Traditional Tools | Axon |
|-------------------|------|
| Complicated setup | 5-minute templates |
| Static replies | Learns from feedback |
| English-only | English + BM + Manglish |
| No WhatsApp | Native WhatsApp & Telegram |
| USD-only | RM pricing with FPX & DuitNow |
| No voice support | Understands voice notes 🎤 |

---

## 💬 Core Features

### WhatsApp & Telegram Automation
- Native API integration  
- Handles FAQs, orders, and service inquiries  
- Escalates complex cases to humans  

### Learning Feedback Loop
- Collects feedback via WhatsApp  
- Adjusts automatically  
- Learns your tone and phrasing  

### Voice Note Understanding
- Transcribes WhatsApp/Telegram voice notes (via Whisper)  
- Replies intelligently with text (or voice)  

### Knowledge Base Integration
- Upload FAQ, Notion, or Google Sheet  
- Axon learns answers automatically  
- Improves response accuracy weekly  

### Smart Escalation (Coming Soon)
- High confidence → auto-reply  
- Medium → reply + notify  
- Low → “Let me check” + human notification  

### Bilingual & Manglish Support
- BM + English hybrid understanding  
- Learns cultural slang and local phrasing  

---

## 💵 Pricing (in RM)

### 🆓 Free Tier
- 50 messages/month  
- 1 automation  
- Basic BM/EN support  
- **For:** Testing or personal use  

### 💼 Pro — RM49/month
- Unlimited messages  
- 5 automations  
- Voice note support  
- Learning dashboard  
- FPX/DuitNow billing  
- **For:** Small businesses  

### 🏢 Business — RM149/month *(coming soon)*
- Team access  
- Smart escalation  
- Custom integrations (POS, CRM)  
- **For:** Growing teams  

---

## 🧭 Development Status (Malaysia MVP)

### ✅ Completed
- WhatsApp & Telegram integration  
- Natural language templates  
- Basic auto-responder  
- FPX payment setup (Billplz)  

### 🟡 In Progress
- Learning feedback via WhatsApp  
- Voice note transcription  
- Success metrics dashboard  

### ⚪ Coming Next
- Smart escalation  
- Bilingual templates  
- Mobile-first dashboard  

---

## 💭 Our Philosophy

### 🤖 Automation That Feels Human
Axon shouldn’t sound robotic.  
It should sound like you — friendly, local, and helpful.

### 🇲🇾 Local First, Then Global
We’re building for Malaysian businesses first —  
where WhatsApp rules and **Manglish flows**.

### 🧠 Learning Over Features
We focus on intelligence, not endless integrations.  
Every message handled better than the last.

---

## 🧰 Technology

**Built with:**
- **AI Engine:** Claude 4 + GPT (multilingual reasoning)  
- **Voice:** Whisper API (transcription)  
- **Backend:** NestJS + Prisma + PostgreSQL  
- **Frontend:** React + Tailwind (mobile-first dashboard)  
- **Integrations:** Twilio / MessageBird, Telegram Bot API, Billplz  

**Internal Engine:**
- Learning Workflow Graph (nodes with intent/action/feedback)  
- Feedback-weighted edges that adapt over time  
- React Flow visualization (Pro plan)  

---

## 🚀 Roadmap (Malaysia Pivot)

### Phase 1 (Now)
- WhatsApp & Telegram integration  
- FPX payments  
- Template-first onboarding  
- Feedback loop via WhatsApp  
- Voice note support  

### Phase 2 (Q1 2026)
- Smart escalation  
- Success dashboard  
- Industry templates (café, e-commerce, tuition, real estate)  

### Phase 3 (Q2 2026)
- Collaborative learning between similar businesses  
- Marketplace for automation templates  
- Regional expansion (SG, ID, PH)  

---

## 📞 Contact

**Founder:** [Your Name]  
**Email:** hello@axon.my  
**Website:** [axon.my](https://axon.my)  
**Twitter/X:** [@AxonAI](https://twitter.com/AxonAI)

---

## 🧩 The Bottom Line

Stop replying to WhatsApp messages all day.  
Start letting **Axon** handle them — and get smarter every week.

> **Axon = WhatsApp automation that learns.**  
> Built for Malaysia 🇲🇾 — powered by a learning agent builder at its core.

---

<p align="center">
  <strong>Made with ❤️ in Malaysia by makers, for makers</strong>
</p>

<p align="center">
  <a href="#">Join Waitlist</a> •
  <a href="#">Follow on Twitter</a> •
  <a href="#">Documentation</a>
</p>


