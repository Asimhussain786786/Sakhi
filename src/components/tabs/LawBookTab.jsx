import React, { useState } from 'react';
import { LAWS_DATA } from '../../data/lawsData.js';
import {
  Scale,
  Search,
  ShieldCheck,
  Phone,
  HelpCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

const CATEGORIES = [
  'All Laws',
  'Safety & Violence',
  'Workplace',
  'Healthcare & Family',
  'Cyber & Privacy',
];

export const LawBookTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Laws');
  const [expandedLawId, setExpandedLawId] = useState('zero-fir');

  const filteredLaws = LAWS_DATA.filter((law) => {
    const matchesCategory =
      selectedCategory === 'All Laws' || law.category === selectedCategory;
    const matchesSearch =
      law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.actName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.guaranteedRights.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedLawId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-600/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <Scale className="w-3.5 h-3.5 text-yellow-300" />
              <span>Know Your Sovereign Legal Rights in India</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold tracking-tight">
              Your Law Book ⚖️
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Demystified, plain-language summaries of constitutional and statutory protections guaranteed to every Indian woman. Learn exactly how to file complaints and protect yourself.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs text-purple-100 flex-shrink-0">
            <div className="font-bold text-white flex items-center gap-1 mb-1">
              <Phone className="w-3.5 h-3.5 text-yellow-300" /> NALSA National Free Legal Aid:
            </div>
            <div className="text-lg font-mono font-extrabold text-yellow-300">Dial 15100 (Toll-Free)</div>
            <div className="text-[10px] text-purple-200">Guaranteed free advocate for all women</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-pink-200/90 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by law, right, keyword (e.g. Zero FIR, Night arrest, POSH, Abortion)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Laws List */}
      <div className="space-y-4">
        {filteredLaws.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-pink-200 p-8">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No laws matched your search</h4>
            <p className="text-xs text-slate-400 mt-1">Try another keyword like "FIR", "POSH", "Arrest", or "Maternity".</p>
          </div>
        ) : (
          filteredLaws.map((law) => {
            const isExpanded = expandedLawId === law.id;

            return (
              <div
                key={law.id}
                className="bg-white rounded-3xl border-2 border-pink-100 hover:border-purple-200 shadow-sm transition-all overflow-hidden"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(law.id)}
                  className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-purple-50/20 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg flex-shrink-0 mt-0.5 sm:mt-0 font-bold">
                      ⚖️
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                          {law.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {law.actName}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-serif-heading font-bold text-slate-900">
                        {law.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-purple-600 hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'View Rights & Process'}
                    </span>
                    <div className="p-2 rounded-full bg-slate-50 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Summary bar */}
                <div className="px-5 sm:px-6 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {law.summary}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-purple-100 bg-purple-50/30 p-5 sm:p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                    {/* Guaranteed Rights */}
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-1.5 mb-3">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span>Your Guaranteed Legal Rights</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {law.guaranteedRights.map((r, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-2xl bg-white border border-purple-100 text-xs text-slate-700 flex items-start gap-2 shadow-xs"
                          >
                            <span className="text-purple-600 font-bold">✓</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Complaint Instructions */}
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-3">
                        <FileText className="w-4 h-4 text-pink-600" />
                        <span>Step-by-Step Complaint & Reporting Instructions</span>
                      </div>
                      <div className="space-y-2">
                        {law.complaintProcedure.map((proc, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{proc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Helpline Action */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-purple-200">
                      <div>
                        <div className="text-xs text-slate-500 font-semibold">Immediate Assistance Helpline:</div>
                        <div className="text-sm font-extrabold text-purple-900">{law.helpline}</div>
                      </div>
                      <a
                        href={law.helpline.includes('15100') ? 'tel:15100' : 'tel:112'}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Helpline
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
