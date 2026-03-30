// Calculations

/**
 * Score-to-value mapping for the 30–49 range.
 * Scores outside this range use fixed tiers.
 */
const SCORE_VALUE_MAP = {
  30: 15000, 31: 20000, 32: 23000, 33: 25000, 34: 27000,
  35: 28000, 36: 30000, 37: 33000, 38: 35000, 39: 40000,
  40: 42000, 41: 45000, 42: 48000, 43: 50000, 44: 55000,
  45: 57000, 46: 60000, 47: 62000, 48: 64000, 49: 67000
};

/**
 * Returns the number of cow images for a given score.
 */
function getCowCount(totalScore) {
  if (totalScore > 60) return 20;
  if (totalScore >= 35) return 11;  // 35–60
  if (totalScore >= 20) return 8;   // 20–34
  return 5;                         // < 20
}

/**
 * Safely reads a radio-group value, returning 0 if nothing is selected.
 */
function getGroupValue(selector) {
  const el = $(selector + ' label.active input');
  const val = el.length ? el.val() : 0;
  return Number.parseInt(val, 10) || 0;
}

/**
 * Main calculation — sums all group scores and maps to a Rand value.
 */
function calculateResults() {
  const groups = [
    '#eduGroup', '#virGroup', '#kidGroup', '#boyGroup',
    '#marriageGroup', '#employmentGroup', '#carGroup', '#houseGroup',
    '#cookGroup', '#bedroomGroup', '#socialGroup', '#royalGroup',
    '#housewiveGroup', '#incomeGroup', '#hairGroup', '#drinkGroup'
  ];

  const totalScore = groups.reduce(function (sum, g) {
    return sum + getGroupValue(g);
  }, 0);

  let randValue;

  if (totalScore > 60) {
    randValue = 100000;
  } else if (totalScore >= 50) {
    randValue = 80000;
  } else if (totalScore >= 30 && SCORE_VALUE_MAP[totalScore]) {
    randValue = SCORE_VALUE_MAP[totalScore];
  } else if (totalScore >= 20) {
    randValue = 10000;
  } else {
    randValue = 5000;
  }

  const cowCount = getCowCount(totalScore);
  showCowImages(cowCount);

  document.getElementById('qoute').innerHTML =
    'Please inform your boyfriend to start budgeting R ' + randValue.toLocaleString() +
    ' if he wants to put a ring on that finger.';

  document.getElementById('messageInfoDialog').innerHTML =
    'Congratulations &#9786; your Lobola negotiations should start from R ' + randValue.toLocaleString();

  document.getElementById('points').innerHTML =
    'You scored ' + totalScore + ' points.';
}

/**
 * Renders cow images into #cowImages (builds HTML in one go instead of per-iteration).
 */
function showCowImages(count) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += '<img src="cow-icon-48.png" alt="cow"> ';
  }
  document.getElementById('cowImages').innerHTML = html;
}
