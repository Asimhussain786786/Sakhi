export function parseDateOnly(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  return new Date(dateStr);
}

export function formatDateISO(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateCycleStats(
  lastPeriodStr,
  cycleLength = 28,
  bleedDuration = 5,
  currentDate = new Date()
) {
  const lastPeriod = parseDateOnly(lastPeriodStr);
  
  // Normalize time to midnight
  const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const startOfLast = new Date(lastPeriod.getFullYear(), lastPeriod.getMonth(), lastPeriod.getDate());
  
  const diffTime = startOfToday.getTime() - startOfLast.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const safeCycleLength = Math.max(21, Math.min(45, cycleLength));
  const safeBleed = Math.max(2, Math.min(10, bleedDuration));

  // Current cycle day (1-indexed)
  let currentCycleDay = (diffDays % safeCycleLength) + 1;
  if (currentCycleDay <= 0) {
    currentCycleDay = safeCycleLength + currentCycleDay;
  }

  // Next period date
  const cyclesPassed = Math.floor(diffDays / safeCycleLength);
  const nextPeriodDate = new Date(startOfLast);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + (cyclesPassed + 1) * safeCycleLength);

  const countdownMs = nextPeriodDate.getTime() - startOfToday.getTime();
  const nextPeriodCountdownDays = Math.max(0, Math.ceil(countdownMs / (1000 * 60 * 60 * 24)));

  // Ovulation is approximately 14 days before next period
  const ovulationDay = safeCycleLength - 14;
  const ovulationDate = new Date(nextPeriodDate);
  ovulationDate.setDate(ovulationDate.getDate() - 14);

  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

  // Determine Menstrual Phase
  let phase = 'Follicular';
  let phaseTitle = 'Follicular Phase';
  let phaseDescription = 'Rising estrogen & fresh optimism! Your skin is glowing and creativity is peaking.';
  let energyLevel = 'High & Rising ⚡';
  let recommendedMovement = 'Pilates, cardio flow, upbeat dance workouts.';
  let nutritionTip = 'Fermented foods, sprouted seeds (flax/pumpkin), light vibrant salads.';

  if (currentCycleDay <= safeBleed) {
    phase = 'Menstrual';
    phaseTitle = 'Menstrual Phase (Inner Winter)';
    phaseDescription = 'Progesterone & estrogen drop. Time for soft blankets, hot water bottles, and guilt-free rest.';
    energyLevel = 'Restorative & Slow 🌙';
    recommendedMovement = 'Yin yoga, Balasana child pose, gentle slow strolls.';
    nutritionTip = 'Iron-rich greens, warm soups, dark chocolate, ginger cinnamon tea.';
  } else if (currentCycleDay >= ovulationDay - 1 && currentCycleDay <= ovulationDay + 1) {
    phase = 'Ovulatory';
    phaseTitle = 'Ovulatory Phase (Inner Summer)';
    phaseDescription = 'Peak fertility & maximum confidence! You are magnetic and articulate right now.';
    energyLevel = 'Peak Sparkle 👑';
    recommendedMovement = 'HIIT, strength conditioning, social group workouts.';
    nutritionTip = 'Antioxidant berries, leafy greens, wild salmon, avocado.';
  } else if (currentCycleDay > ovulationDay + 1) {
    phase = 'Luteal';
    phaseTitle = 'Luteal Phase (Inner Autumn)';
    phaseDescription = 'Progesterone peaks then dips. Sensitivity is high; honor your boundaries and pamper yourself.';
    energyLevel = 'Cozy & Reflective 🍂';
    recommendedMovement = 'Moderate pilates, strength sculpt, brisk evening walks.';
    nutritionTip = 'Complex carbs (sweet potatoes), magnesium (pumpkin seeds, bananas), herbal chamomile.';
  }

  return {
    currentCycleDay,
    nextPeriodDate,
    nextPeriodCountdownDays,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    phase,
    phaseTitle,
    phaseDescription,
    energyLevel,
    recommendedMovement,
    nutritionTip,
  };
}

export function formatSosMessage({
  userName,
  bloodGroup,
  latitude,
  longitude,
  address,
  parentPhone,
}) {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  let locationText = 'Location: Unavailable / Indoor';
  if (latitude !== undefined && longitude !== undefined) {
    locationText = `📍 LIVE LOCATION: https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
  }
  if (address) {
    locationText += `\nNear: ${address}`;
  }

  return `🚨 EMERGENCY ALERT FROM SAKHI APP 🚨
I need immediate help!
Name: ${userName || 'User'}
Blood Group: ${bloodGroup || 'Not provided'}
Time: ${timeStr}

${locationText}

Quick Helplines:
🚓 Police: 112 / 1091 (Women Helpline)
🚑 Medical / Ambulance: 108 / 102
${parentPhone ? `📞 Family Contact: ${parentPhone}` : ''}

Please reach out or dispatch assistance immediately!`;
}

export function calculateHydration(glasses, targetGlasses = 8) {
  const safeGlasses = Math.max(0, glasses);
  const percentage = Math.min(100, Math.round((safeGlasses / targetGlasses) * 100));
  const milliliters = safeGlasses * 250;
  return {
    glasses: safeGlasses,
    percentage,
    milliliters,
    isComplete: safeGlasses >= targetGlasses,
  };
}

export function estimateStepsCalories(steps) {
  const safeSteps = Math.max(0, steps);
  const caloriesBurned = Math.round(safeSteps * 0.04);
  const kilometers = parseFloat((safeSteps * 0.00078).toFixed(2));
  return { caloriesBurned, kilometers };
}
