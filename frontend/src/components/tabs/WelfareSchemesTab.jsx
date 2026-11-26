import React, { useState } from 'react';
import { WELFARE_SCHEMES } from '../../data/welfareData.js';
import {
  Gift,
  ExternalLink,
  Search,
  CheckCircle2,
  Building,
  Coins,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

const CATEGORIES = [
  'All Schemes',
  'Students & Girls',
  'Mothers & Healthcare',
  'Entrepreneurs & Careers',
  'Protection & Shelters',
];

export const WelfareSchemesTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Schemes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = WELFARE_SCHEMES.filter((scheme) => {
    const matchesCategory =
      selectedCategory === 'All Schemes' || scheme.category === selectedCategory;
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scheme.hindiName && scheme.hindiName.includes(searchQuery)) ||
      scheme.financialBenefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <Gift className="w-3.5 h-3.5 text-yellow-300" />
              <span>Verified Indian Government Schemes & Subsidies</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold tracking-tight">
              Women’s Welfare & Financial Empowerment 🏛️
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Discover official sovereign schemes offering up to ₹1 Crore business capital, 8.2% high-interest savings, maternity cash grants, and free residential shelters with verified government portals.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs text-emerald-100 flex-shrink-0">
            <div className="font-bold text-white flex items-center gap-1 mb-0.5">
              <Coins className="w-4 h-4 text-yellow-300" /> Top Sovereign Interest:
            </div>
            <div className="text-xl font-mono font-extrabold text-yellow-300">8.2% p.a. (SSY)</div>
            <div className="text-[10px] text-emerald-200">100% Tax-Free under 80C</div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-pink-200/90 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes by name, ministry, or financial grant (e.g. Sukanya, PMMVY, Stand-Up, Loan)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.length === 0 ? (
          <div className="md:col-span-2 text-center py-12 bg-white rounded-3xl border border-pink-200 p-8">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No schemes matched your search</h4>
            <p className="text-xs text-slate-400 mt-1">Try another search keyword or switch category filters.</p>
          </div>
        ) : (
          filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100/90 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Badge & Ministry */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {scheme.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {scheme.ministry}
                  </span>
                </div>

                {/* Scheme Title */}
                <h3 className="text-xl font-serif-heading font-extrabold text-slate-900 mt-1">
                  {scheme.name}
                </h3>
                {scheme.hindiName && (
                  <p className="text-xs text-pink-600 font-semibold mb-3">{scheme.hindiName}</p>
                )}

                {/* Financial Benefit Highlight */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 font-bold text-xs mb-4 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{scheme.financialBenefit}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {scheme.description}
                </p>

                {/* Eligibility */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Eligibility Criteria:
                  </div>
                  <ul className="space-y-1">
                    {scheme.eligibility.map((el, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Perks */}
                <div className="mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Key Highlights & Perks:
                  </div>
                  <ul className="space-y-1">
                    {scheme.keyPerks.map((kp, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Portal CTA */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={scheme.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <span>Apply on {scheme.portalLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
