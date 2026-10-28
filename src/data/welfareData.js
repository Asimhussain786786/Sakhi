export const WELFARE_SCHEMES = [
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    hindiName: 'सुकन्या समृद्धि योजना',
    category: 'Students & Girls',
    financialBenefit: '8.2% Compound Interest + Tax-Free Returns (Section 80C)',
    ministry: 'Ministry of Finance / Post Office',
    description: 'A government-backed high-yield savings scheme specifically for the girl child, designed to build a solid corpus for higher education and marriage without capital risk.',
    eligibility: [
      'Girl child must be an Indian citizen under 10 years of age at account opening.',
      'Only one account per girl child, and maximum two accounts per family.',
      'Can be opened at any Post Office or authorized commercial bank branch.'
    ],
    keyPerks: [
      'Highest sovereign interest rate (currently 8.2% compounded annually).',
      'Minimum deposit of just ₹250/year up to ₹1.5 Lakh/year.',
      'Triple tax exemption (EEE): Contribution, interest earned, and maturity amount are 100% tax-free.',
      '50% partial withdrawal allowed for higher education after girl turns 18 or passes Class 10.'
    ],
    portalUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx',
    portalLabel: 'India Post Official Portal'
  },
  {
    id: 'pmmvy',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    hindiName: 'प्रधानमंत्री मातृ वंदना योजना',
    category: 'Mothers & Healthcare',
    financialBenefit: 'Direct Cash Incentive of ₹5,000 to ₹6,000 into Bank Account',
    ministry: 'Ministry of Women and Child Development',
    description: 'Maternity benefit cash incentive program compensating wage loss and encouraging pregnant women and lactating mothers to receive institutional care and nutrition.',
    eligibility: [
      'Pregnant women and lactating mothers for the first living child (₹5,000).',
      'Additional incentive of ₹6,000 if the second child is a girl to discourage sex selection.',
      'Must not be in regular central/state government employment with statutory maternity benefits.'
    ],
    keyPerks: [
      'Direct Benefit Transfer (DBT) directly into the mother’s Aadhaar-linked bank/post office account.',
      'Disbursed across early registration, ANC checkups, and child immunization.',
      'Promotes institutional delivery and infant vaccination.'
    ],
    portalUrl: 'https://pmmvy.wcd.gov.in/',
    portalLabel: 'Official PMMVY Portal (WCD)'
  },
  {
    id: 'stand-up-india',
    name: 'Stand-Up India Scheme',
    hindiName: 'स्टैंड-अप इंडिया',
    category: 'Entrepreneurs & Careers',
    financialBenefit: 'Collateral-free Bank Loans from ₹10 Lakh up to ₹1 Crore',
    ministry: 'Ministry of Finance & SIDBI',
    description: 'Promotes entrepreneurship by facilitating bank loans between ₹10 lakh and ₹1 crore to at least one woman borrower per bank branch for setting up greenfield enterprises.',
    eligibility: [
      'Women entrepreneurs aged 18 years and above.',
      'Greenfield enterprise in manufacturing, services, agri-allied, or trading sector.',
      'In non-individual enterprises, 51% shareholding & controlling stake must be held by the woman.'
    ],
    keyPerks: [
      'Substantial loan size: ₹10,00,000 to ₹1,00,00,000.',
      'Repayable in up to 7 years with a moratorium period of up to 18 months.',
      'Handholding support through SIDBI Stand-Up Connect Centres.',
      'Access to Credit Guarantee Fund for Stand-Up India (CGFSI).'
    ],
    portalUrl: 'https://www.standupmitra.in/',
    portalLabel: 'Stand-Up Mitra Portal'
  },
  {
    id: 'mahila-samman',
    name: 'Mahila Samman Savings Certificate (MSSC)',
    hindiName: 'महिला सम्मान बचत प्रमाण पत्र',
    category: 'Entrepreneurs & Careers',
    financialBenefit: 'Fixed 7.5% p.a. Interest Rate with 2-Year Tenure',
    ministry: 'Department of Economic Affairs',
    description: 'A sovereign deposit instrument specially crafted to empower women and teenage girls with guaranteed capital security and attractive returns over a flexible 2-year tenor.',
    eligibility: [
      'Any woman or minor girl (through legal guardian).',
      'No age restriction; available to all Indian women.',
      'Can open multiple accounts with a 3-month gap up to maximum ₹2 Lakh aggregate limit.'
    ],
    keyPerks: [
      'Guaranteed return of 7.5% per annum compounded quarterly.',
      'Flexible deposit amounts starting from ₹1,000 up to ₹2,00,000.',
      'Allows partial withdrawal of up to 40% of the balance after 1 year.',
      'Short 2-year lock-in period for optimal financial liquidity.'
    ],
    portalUrl: 'https://www.indiapost.gov.in',
    portalLabel: 'India Post Savings Desk'
  },
  {
    id: 'one-stop-centre',
    name: 'One Stop Centre (OSC) - Sakhi Scheme',
    hindiName: 'वन स्टॉप सेंटर (सखी)',
    category: 'Protection & Shelters',
    financialBenefit: '100% Free Integrated Medical, Legal, Shelter & Psychological Care',
    ministry: 'Ministry of Women and Child Development (Nirbhaya Fund)',
    description: 'A flagship initiative establishing dedicated 24x7 crisis centres across every district in India to support women affected by violence, harassment, or abandonment under one single roof.',
    eligibility: [
      'Any woman or girl facing violence (domestic, sexual harassment, trafficking, cyber abuse).',
      'Open to girls of all age groups and socio-economic backgrounds without paperwork barriers.'
    ],
    keyPerks: [
      'Emergency rescue and first-response transport.',
      'Immediate medical aid, forensic examination, and hospitalization.',
      'On-site police facilitation desk and FIR filing assistance.',
      'Free legal aid and professional psychological counseling.',
      'Temporary safe shelter for up to 5 days with food and personal necessities.'
    ],
    portalUrl: 'https://wcd.nic.in/schemes/one-stop-centre-scheme-1',
    portalLabel: 'Ministry of WCD OSC Scheme'
  },
  {
    id: 'working-women-hostel',
    name: 'Working Women Hostels (Shakti Sadan)',
    hindiName: 'सखी निवास / कामकाजी महिला छात्रावास',
    category: 'Protection & Shelters',
    financialBenefit: 'Subsidized, Secure Metro & Urban Accommodation with Daycare',
    ministry: 'Ministry of Women and Child Development',
    description: 'Provides safe, reasonably priced, quality residential accommodation with daycare facilities for children of working women relocating to cities for employment or training.',
    eligibility: [
      'Working women (single, widowed, divorced, separated, or married with spouse outside city).',
      'Women undergoing professional job training (up to 1 year).',
      'Monthly income threshold limits determined regionally to ensure affordability.'
    ],
    keyPerks: [
      'Safe CCTV-monitored residential spaces in major industrial and IT hubs.',
      'Subsidized boarding fees and furnished rooms.',
      'In-house Crèche facility for children up to 18 years (girls) and 5 years (boys).',
      'Maximum stay duration of up to 3 years.'
    ],
    portalUrl: 'https://wcd.nic.in/schemes/sakhi-niwas-working-women-hostel',
    portalLabel: 'Sakhi Niwas Directory'
  },
  {
    id: 'step-scheme',
    name: 'Support to Training & Employment Programme (STEP)',
    hindiName: 'स्टेप योजना (महिला कौशल विकास)',
    category: 'Students & Girls',
    financialBenefit: 'Free Government Certified Skill Training + Stipend Placement',
    ministry: 'Ministry of Skill Development & WCD',
    description: 'Empowers marginalized and rural women with industry-recognized vocational skills in agriculture, horticulture, food processing, handlooms, IT, and healthcare.',
    eligibility: [
      'Women aged 16 years and above.',
      'Special preference given to poor, assetless, or single breadwinner women.'
    ],
    keyPerks: [
      'Government certified vocational qualifications recognized nationally.',
      'Direct linkage to credit cooperatives, microfinance institutions, and self-help groups (SHGs).',
      'Comprehensive module covering financial literacy, digital banking, and entrepreneurship.'
    ],
    portalUrl: 'https://wcd.nic.in/schemes/support-training-and-employment-programme-women-step',
    portalLabel: 'STEP Portal & Registration'
  },
  {
    id: 'beti-bachao',
    name: 'Beti Bachao Beti Padhao (BBBP)',
    hindiName: 'बेटी बचाओ बेटी पढ़ाओ',
    category: 'Students & Girls',
    financialBenefit: 'Comprehensive Educational Scholarships & School Grants',
    ministry: 'Joint: WCD, Education & Health Ministries',
    description: 'National multi-sectoral campaign addressing the declining Child Sex Ratio (CSR), eliminating gender bias, and ensuring girl education, retention, and nutritional dignity in schools.',
    eligibility: [
      'Female students across primary, secondary, and higher secondary institutions.',
      'Focus districts with adverse child sex ratios across all states and UTs.'
    ],
    keyPerks: [
      'Special girl-child scholarships, free textbooks, and uniforms in government schools.',
      'Dedicated clean sanitation facilities (pads, private toilets) in educational campuses.',
      'Career counseling and STEM encouragement fairs for adolescent girls.'
    ],
    portalUrl: 'https://bbbpindia.gov.in/',
    portalLabel: 'Official BBBP Portal'
  }
];
