import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "How does the AI resume optimization work?", a: "Our Gemini-powered AI analyzes your resume, identifies weak points, optimizes keywords, and boosts ATS compatibility." },
    { q: "Is my personal information secure?", a: "Yes. We use enterprise-grade encryption and never share your data." },
    { q: "Can I cancel my subscription anytime?", a: "Yes, cancel anytime without penalties. You keep access till billing ends." },
    { q: "How accurate is the job matching feature?", a: "94% relevancy rate, considering your skills, goals, salary, and location." },
    { q: "Do you offer support for career changers?", a: "Yes! Premium includes transition planning, skill gap analysis, and coaching." },
    { q: "How often are job opportunities updated?", a: "Every hour from thousands of company pages, job boards, and partners." },
    { q: "What makes your AI different?", a: "We use Google Gemini AI for deeper career context and personalized advice." },
    { q: "Is there a mobile app?", a: "Web app works everywhere; mobile app is coming soon." }
  ];

  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
      </h2>
      <p className="text-gray-600 mb-12">Get answers to common questions about our AI-powered career tools.</p>

      <div className="max-w-3xl mx-auto space-y-4 text-left">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white rounded-xl shadow border">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-4 flex justify-between items-center">
              <span className="font-semibold">{f.q}</span>
              {open === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {open === i && <p className="px-4 pb-4 text-gray-600">{f.a}</p>}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-gray-600 mb-2">Still have questions?</p>
        <button className="text-blue-600 hover:text-blue-700 font-medium underline">Contact our support team</button>
      </div>
    </section>
  );
}
