export const YOGA_POSES = [
  {
    id: 'balasana',
    sanskritName: 'Balasana',
    englishName: "Child's Pose",
    emoji: '🌸',
    duration: '3 - 5 minutes',
    benefits: 'Releases lower back tension, decompresses the spine, and calms uterine contractions.',
    steps: [
      'Kneel on the floor, bring your big toes together and widen your knees mat-width apart.',
      'Fold your torso forward between your thighs, resting your belly comfortably in between.',
      'Extend your arms out long ahead with palms flat, or drape them alongside your legs.',
      'Rest your forehead gently on the mat or a soft bolster/pillow.'
    ],
    breathingTip: 'Send your breath deep into your lower belly and back of the pelvis with slow, sighing exhales.',
    whyItHelpsCramps: 'Gently stretches pelvic floor muscles and relieves intense sacral aching without adding abdominal pressure.'
  },
  {
    id: 'supta-baddha-konasana',
    sanskritName: 'Supta Baddha Konasana',
    englishName: 'Reclining Goddess / Bound Angle',
    emoji: '👑',
    duration: '5 - 10 minutes',
    benefits: 'Stimulates ovaries, relieves menstrual cramping, and eases nervous system anxiety.',
    steps: [
      'Lie flat on your back (place a cushion or rolled blanket under your spine for gentle heart-opening).',
      'Bend your knees and bring the soles of your feet together, letting your knees open outwards like butterfly wings.',
      'Place folded blankets or pillows under each thigh if your groin feels too tight.',
      'Rest one palm on your heart and one palm gently on your lower abdomen.'
    ],
    breathingTip: 'Inhale softness into the pelvic bowl; exhale all gripping and tension from your hips.',
    whyItHelpsCramps: 'Opens the groin and pelvis, dramatically improving blood circulation to reproductive organs.'
  },
  {
    id: 'cat-cow',
    sanskritName: 'Marjaryasana-Bitilasana',
    englishName: 'Cat-Cow Flow',
    emoji: '🐈',
    duration: '2 - 3 minutes (8-10 rounds)',
    benefits: 'Gentle spinal wave that warms reproductive organs and improves blood flow to the uterus.',
    steps: [
      'Start on all fours with hands beneath shoulders and knees beneath hips.',
      'Inhale (Cow): Soften the belly down towards the floor, lift your chest and gaze upwards gently.',
      'Exhale (Cat): Round your spine up like an arching cat, tucking tailbone and releasing head down.',
      'Move fluidly between the two postures at the rhythm of your own breath.'
    ],
    breathingTip: 'Match each spinal movement to the full length of your breath without rushing.',
    whyItHelpsCramps: 'Mobilizes the pelvic girdle and lumbar vertebrae, breaking up stagnation and cramp spasms.'
  },
  {
    id: 'legs-up-wall',
    sanskritName: 'Viparita Karani',
    englishName: 'Legs-Up-The-Wall',
    emoji: '✨',
    duration: '8 - 15 minutes',
    benefits: 'Ultimate nervous system reset, reduces leg swelling, drains lymphatic fluid, and soothes headaches.',
    steps: [
      'Sit sideways next to an empty wall with one hip touching the wall.',
      'Gently pivot your torso down to the floor while swinging your legs up against the wall.',
      'Rest your arms open in a cactus shape or out to the sides with palms facing up.',
      'Close your eyes, relax your jaw, and let gravity do all the work.'
    ],
    breathingTip: 'Deep, slow diaphragmatic breathing to switch on the parasympathetic rest-and-digest mode.',
    whyItHelpsCramps: 'Reverses blood flow stagnation, reduces pelvic congestion, and triggers deep physical relaxation.'
  }
];

export const CYCLE_SYNCED_WORKOUTS = [
  {
    phase: 'Menstrual Phase (Days 1–5)',
    hormones: 'Low estrogen & progesterone',
    theme: 'Rest & Restore',
    bestWorkouts: ['Yin Yoga & Restorative Stretches', 'Gentle 20-min Nature Stroll', 'Pelvic Floor Relaxation'],
    workoutsToAvoid: ['Heavy HIIT', 'Max-effort sprint intervals', 'Hot yoga with intense sweating'],
    energyNote: 'Your body is shedding its lining; honor low energy like your personal sacred winter.'
  },
  {
    phase: 'Follicular Phase (Days 6–12)',
    hormones: 'Estrogen rising, high insulin sensitivity',
    theme: 'Build & Ignite',
    bestWorkouts: ['Mat & Reformer Pilates', 'Light to Moderate Resistance Training', 'Vibrant Dance Cardio', 'Jogging'],
    workoutsToAvoid: ['Overtraining without adequate nourishment'],
    energyNote: 'Fresh burst of vitality! Your brain is primed for learning new choreographies and skills.'
  },
  {
    phase: 'Ovulatory Phase (Days 13–16)',
    hormones: 'Estrogen peaks, surge of LH & testosterone',
    theme: 'Peak Power & Radiance',
    bestWorkouts: ['High-Intensity Interval Training (HIIT)', 'Heavy Strength Conditioning', 'Spin Class / Bootcamp', 'Group Sports'],
    workoutsToAvoid: ['Skipping warm-ups (ligament laxity increases slightly during ovulation)'],
    energyNote: 'Highest endurance, stamina, and verbal confidence of your entire cycle! Power through your workouts.'
  },
  {
    phase: 'Luteal Phase (Days 17–28)',
    hormones: 'Progesterone peaks, then drops if no pregnancy',
    theme: 'Cozy Sculpt & Grounding',
    bestWorkouts: ['Low-Impact Strength Training', 'Steady-State Incline Walking', 'Hatha Yoga', 'Barre'],
    workoutsToAvoid: ['Exhausting two-a-day cardio sessions that spike cortisol'],
    energyNote: 'Metabolic rate increases slightly (you need ~150-250 extra nourishing calories daily). Listen to fatigue cues.'
  }
];

export const SEED_CYCLING_GUIDE = {
  phase1: {
    title: 'Phase 1: Follicular to Ovulation (Days 1 to 14)',
    seeds: '1 tbsp Fresh Ground Flaxseeds + 1 tbsp Raw Pumpkin Seeds daily',
    howItWorks: 'Flaxseeds contain lignans that bind to excess estrogen and support balanced production. Pumpkin seeds are rich in zinc which supports progesterone release for the upcoming phase.',
    tips: 'Grind fresh in a coffee/spice grinder and sprinkle over morning oatmeal, smoothies, or yogurt bowls!'
  },
  phase2: {
    title: 'Phase 2: Luteal to Menstruation (Days 15 to 28)',
    seeds: '1 tbsp Raw Sesame Seeds + 1 tbsp Raw Sunflower Seeds daily',
    howItWorks: 'Sesame seeds contain lignans that block excess estrogen during luteal peak. Sunflower seeds are packed with Vitamin E and selenium which boost progesterone and reduce breast tenderness.',
    tips: 'Mix into chia pudding, sprinkle over warm dal-rice, or blend into homemade seed butter.'
  }
};

export const SITUATIONAL_GUIDANCE = [
  {
    situation: '🩸 Painful Period Cramps (Dysmenorrhea)',
    avoid: [
      'Cold icy beverages & dairy heavy milkshakes (causes uterine vascular constriction)',
      'Excess sodium & salty processed chips (worsens water retention and bloating)',
      'Refined white sugar and pastries (spikes prostaglandin inflammatory markers)',
      'High caffeine (constricts pelvic blood vessels and exacerbates cramping)'
    ],
    consume: [
      'Warm brewed fresh ginger root and cinnamon tea (natural anti-inflammatory)',
      'Magnesium-rich dark chocolate (70%+ cacao) and roasted pumpkin seeds',
      'Warm turmeric-infused golden milk with a pinch of black pepper',
      'Hydrating coconut water and warm cumin (jeera) / fennel (saunf) infused water',
      'Topical hot water bottle or castor oil pack on the lower abdomen'
    ]
  },
  {
    situation: '🌸 PCOS / PCOD Balance',
    avoid: [
      'Sugary breakfast cereals & sweet bubble teas (spikes insulin resistance)',
      'Trans-fat deep fried street snacks & refined seed oils (promotes systemic inflammation)',
      'Skipping breakfast (triggers cortisol spikes and androgen surges)',
      'Extreme crash dieting or starvation regimens'
    ],
    consume: [
      'High-protein breakfasts (paneer, eggs, sprouts, tofu, Greek yogurt) within 1 hour of waking',
      'Spearmint tea (proven to lower elevated free testosterone and facial hirsutism)',
      'Inositol-rich foods like whole oranges, cantaloupes, and beans',
      'Daily 20-30 min brisk walking after meals for enhanced glucose uptake',
      'Cinnamon bark powder sprinkled on meals to enhance insulin receptor sensitivity'
    ]
  },
  {
    situation: '🤰 Pregnancy Care Protocol',
    avoid: [
      'Unpasteurized dairy, raw sprouts, or undercooked foods (risk of listeria/salmonella)',
      'Excessive caffeine (>200mg/day) and unwashed raw street salads',
      'Raw papaya, excessive pineapple (contains high papain/bromelain in high concentrations)',
      'Heavy contact sports or deep unsupported backbends'
    ],
    consume: [
      'Folate-rich green leafy veggies (spinach, methi), lentils, and fortified grains',
      'Omega-3 DHA (walnuts, flaxseed oil, or algal oil) for fetal neurological development',
      'Adequate clean hydration (2.5 - 3 Litres daily) to support amniotic fluid',
      'Iron & Vitamin C pairing (amla or lemon juice squeezed on dal) to prevent anemia'
    ]
  },
  {
    situation: '⚡ High Stress / Exam / Burnout Weeks',
    avoid: [
      'Surviving on 4 cups of energy drinks or black coffee on an empty stomach',
      'Pulling all-nighters that disrupt your LH/FSH pituitary pulsatility',
      'Skipping hydration because you are glued to your laptop screen',
      'Negative doomscrolling during study breaks'
    ],
    consume: [
      'Ashwagandha, chamomile, or holy basil (tulsi) tea to downregulate adrenal cortisol',
      'Complex carbohydrates like warm rolled oats, brown rice, or sweet potato to boost serotonin',
      'Magnesium glycinate before bedtime for restorative stage-4 delta sleep',
      'Five-minute box breathing or 4-7-8 breathwork before opening exam papers'
    ]
  }
];

export const NUTRITION_AND_HYGIENE = {
  nutrition: [
    {
      title: 'Iron & Vitamin C Power Pairing',
      icon: '🍓',
      desc: 'Plant-based (non-heme) iron in spinach, methi, chickpeas, and pomegranate requires Vitamin C (lemon, amla, oranges) for maximum absorption. Always squeeze lemon on your dal!'
    },
    {
      title: 'Healthy Fats for Hormone Synthesis',
      icon: '🥑',
      desc: 'Sex hormones (estrogen, progesterone, testosterone) are biochemically built from healthy fats and cholesterol. Include ghee, almonds, walnuts, chia seeds, and avocados daily.'
    },
    {
      title: 'Gut Microbiome & Estrobolome',
      icon: '🥣',
      desc: 'A specialized cluster of gut bacteria called the "Estrobolome" regulates how estrogen is metabolized. Eat fermented foods like home curd/dahi, kimchi, and fiber-rich fruits.'
    }
  ],
  hygiene: [
    {
      title: 'Change Menstrual Products Regularly',
      icon: '🧼',
      desc: 'Pads: Change every 4 to 6 hours even on light flow days to prevent bacterial breeding. Tampons: Max 4 to 8 hours (never exceed 8 hrs due to Toxic Shock Syndrome risk). Menstrual cups: Sterilize in boiling water before and after every cycle.'
    },
    {
      title: 'Wash Front to Back Only',
      icon: '🚿',
      desc: 'Always wipe or wash from the vulva towards the rectum (front to back), never back to front, to prevent introducing E. coli and rectal bacteria into the urethra or vagina.'
    },
    {
      title: 'Avoid Harsh Scented Soaps & Douches',
      icon: '🌸',
      desc: 'The vagina is a self-cleaning organ with an acidic pH (3.8–4.5) maintained by Lactobacillus. Use warm plain water or ultra-mild, fragrance-free cleanser for the external vulva only. Never douche!'
    },
    {
      title: 'Breathable 100% Cotton Underwear',
      icon: '🩲',
      desc: 'Synthetic lace and polyester trap moisture and heat, creating a breeding ground for Candida yeast infections. Wear breathable cotton, especially to sleep.'
    }
  ],
  myths: [
    {
      myth: 'Myth: You should not wash your hair or bathe during your period.',
      reality: 'Reality: Taking warm showers during your period actually relieves painful pelvic cramps, relaxes contracted uterine muscles, and maintains essential hygiene.'
    },
    {
      myth: 'Myth: Period blood is impure or toxic "dirty" blood.',
      reality: 'Reality: Period blood is regular blood mixed with natural mucosal tissue from the uterine lining (endometrium). It is not toxic and not "dirty".'
    },
    {
      myth: 'Myth: You cannot exercise or stretch while bleeding.',
      reality: 'Reality: Gentle movement, walking, and yoga stimulate endorphin release (your body’s natural painkillers) and actively diminish cramping.'
    },
    {
      myth: 'Myth: Every woman must have a 28-day cycle exactly.',
      reality: 'Reality: A healthy menstrual cycle can vary anywhere between 21 and 35 days. Mild fluctuations from stress, travel, or sleep changes are completely normal.'
    }
  ],
  redFlags: [
    'Bleeding soaking through 1 or more pads/tampons every hour for 2 consecutive hours',
    'Severe cramps that do not respond to medication or interfere with daily life / school / work (possible Endometriosis or Adenomyosis)',
    'Periods suddenly stopping for 90+ days without pregnancy',
    'Bleeding or spotting between cycles or after sexual intercourse',
    'Foul-smelling, cottage cheese-like, or greenish discharge accompanied by burning or itching'
  ]
};
