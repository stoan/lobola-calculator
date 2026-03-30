// Calculations

const RESULT_GROUPS = [
  '#eduGroup', '#virGroup', '#kidGroup', '#boyGroup',
  '#marriageGroup', '#employmentGroup', '#carGroup', '#houseGroup',
  '#cookGroup', '#bedroomGroup', '#socialGroup', '#royalGroup',
  '#housewiveGroup', '#incomeGroup', '#hairGroup', '#drinkGroup'
];

const RAW_SCORE_MIN = 12;
const RAW_SCORE_MAX = 69;
const RAND_MIN = 10000;
const RAND_MAX = 100000;
const RAND_ROUNDING_INCREMENT = 1000;
const COW_ICON_MIN = 1;
const COW_ICON_MAX = 11;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function roundToIncrement(value, increment) {
  return Math.round(value / increment) * increment;
}

function formatRand(value) {
  return 'R' + value.toLocaleString('en-US');
}

function dispatchResultEvent(name, detail) {
  document.dispatchEvent(new CustomEvent(name, { detail: detail }));
}

/**
 * Safely reads a radio-group value, returning 0 if nothing is selected.
 */
function getGroupValue(selector) {
  const el = $(selector + ' label.active input');
  const val = el.length ? el.val() : 0;
  return Number.parseInt(val, 10) || 0;
}

function calculateRawScore() {
  return RESULT_GROUPS.reduce(function (sum, groupSelector) {
    return sum + getGroupValue(groupSelector);
  }, 0);
}

/**
 * Remaps the raw questionnaire score into the visible Rand range.
 */
function mapScoreToRand(totalScore) {
  const boundedScore = clamp(totalScore, RAW_SCORE_MIN, RAW_SCORE_MAX);
  const normalizedScore = (boundedScore - RAW_SCORE_MIN) / (RAW_SCORE_MAX - RAW_SCORE_MIN);
  const rawRandValue = RAND_MIN + normalizedScore * (RAND_MAX - RAND_MIN);
  const roundedRandValue = roundToIncrement(rawRandValue, RAND_ROUNDING_INCREMENT);

  return clamp(roundedRandValue, RAND_MIN, RAND_MAX);
}

/**
 * Scales cow icons to the displayed Rand estimate instead of raw score tiers.
 */
function getCowCount(randValue) {
  const normalizedValue = (clamp(randValue, RAND_MIN, RAND_MAX) - RAND_MIN) / (RAND_MAX - RAND_MIN);
  const cowCount = Math.round(normalizedValue * (COW_ICON_MAX - COW_ICON_MIN)) + COW_ICON_MIN;

  return clamp(cowCount, COW_ICON_MIN, COW_ICON_MAX);
}

/**
 * Renders cow images into #cowImages and keeps the container accessible.
 */
function showCowImages(count, formattedRand) {
  let html = '';
  const cowImagesEl = document.getElementById('cowImages');

  for (let i = 0; i < count; i++) {
    html += '<img src="cow-icon-48.png" alt="" aria-hidden="true">';
  }

  cowImagesEl.innerHTML = html;
  cowImagesEl.setAttribute('role', 'img');
  cowImagesEl.setAttribute(
    'aria-label',
    count + (count === 1 ? ' cow' : ' cows') + ' shown for the ' + formattedRand + ' estimate.'
  );
}

/**
 * Main calculation — sums all group scores and maps to a Rand value.
 */
function calculateResults() {
  const totalScore = calculateRawScore();
  const randValue = mapScoreToRand(totalScore);
  const formattedRand = formatRand(randValue);
  const cowCount = getCowCount(randValue);
  const pointsEl = document.getElementById('points');
  const scoreSummaryEl = document.getElementById('scoreSummary');

  dispatchResultEvent('lobola:result-reveal-start', {
    totalScore: totalScore
  });

  showCowImages(cowCount, formattedRand);

  document.getElementById('qoute').innerHTML =
    'Please inform your boyfriend to start budgeting ' + formattedRand +
    ' if he wants to put a ring on that finger.';

  document.getElementById('messageInfoDialog').innerHTML =
    'Congratulations &#9786; your Lobola negotiations should start from ' + formattedRand + '.';

  if (pointsEl) {
    pointsEl.innerHTML = formattedRand;
  }

  if (scoreSummaryEl) {
    scoreSummaryEl.innerHTML =
      'Cow meter: ' + cowCount +
      (cowCount === 1 ? ' cow.' : ' cows.');
  }

  dispatchResultEvent('lobola:results-calculated', {
    totalScore: totalScore,
    randValue: randValue,
    formattedRand: formattedRand,
    cowCount: cowCount,
    rawScoreRange: {
      min: RAW_SCORE_MIN,
      max: RAW_SCORE_MAX
    }
  });
}
