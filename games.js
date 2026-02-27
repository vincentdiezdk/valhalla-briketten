/* ===================================================
   VALHALLA-BRIKETTEN — Games
   Game 1: Briket-Builderen (click-to-add proportions)
   Game 2: CO₂-Regneren (calculator)
   Game 3: Quiz (8 questions)
   =================================================== */

/* ============================================
   GAME 1: BRIKET-BUILDER
   ============================================ */

const BUILDER_TARGETS = {
  coffee: 40,
  sawdust: 30,
  paper: 20,
  water: 10
};

const BUILDER_TOLERANCE = 8; // ±8% is acceptable

// Helper to get SVG icons — falls back gracefully if app.js not loaded yet
function gIcon(name, size) {
  if (window.ICONS && window.ICONS[name]) {
    const s = window.ICONS[name];
    if (size) return s.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
    return s;
  }
  return '';
}

const INGREDIENT_INFO = {
  coffee: { iconKey: 'coffee', name: 'Kaffegrums', color: '#4A3728', target: 40, fact: 'Kaffegrums er det primære brændstof – det er den energirige del!' },
  sawdust: { iconKey: 'log', name: 'Savsmuld', color: '#D4B896', target: 30, fact: 'Savsmuld giver struktur og binder briketten sammen under tørring.' },
  paper: { iconKey: 'newspaper', name: 'Genbrugspapir', color: '#8fb8a5', target: 20, fact: 'Papir opsuger overskydende vand og hjælper med binding.' },
  water: { iconKey: 'droplet', name: 'Regnvand', color: '#4a90d9', target: 10, fact: 'Vand aktiverer papirbindemidlet og gør massen formbar.' }
};

let builderCounts = { coffee: 0, sawdust: 0, paper: 0, water: 0 };
let builderInitialized = false;

function initBuilderGame() {
  const container = document.getElementById('builderGame');
  if (!container) return;
  if (builderInitialized && container.innerHTML !== '') return;
  builderInitialized = true;
  builderCounts = { coffee: 0, sawdust: 0, paper: 0, water: 0 };

  container.innerHTML = `
    <div class="builder-container">
      <div class="builder-ingredients">
        <p style="font-size:0.78rem;color:var(--text-muted);font-weight:700;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.06em;">Klik for at tilsætte ingredienser</p>
        <div class="click-add-btns" id="builderBtns">
          ${Object.entries(INGREDIENT_INFO).map(([key, info]) => `
            <button class="add-btn" data-key="${key}" title="${info.fact}">
              <span>${gIcon(info.iconKey)} ${info.name}</span>
              <span>Mål: ~${info.target}%</span>
              <span class="add-count" id="bc-${key}">0</span>
            </button>
          `).join('')}
        </div>
        <div style="margin-top:14px;font-size:0.78rem;color:var(--text-muted);font-weight:500;line-height:1.5" id="builderTip">
          Tip: Tilsæt flere enheder af én ingrediens for at øge dens andel.
        </div>
      </div>
      <div class="builder-press">
        <div style="font-size:0.78rem;color:var(--text-muted);font-weight:700;margin-bottom:8px;text-align:center;text-transform:uppercase;letter-spacing:0.06em">Din blanding</div>
        <div class="press-container" id="pressContainer">
          <div class="press-label" id="pressLabel">Klik på ingredienserne<br>og tilsæt til briketten</div>
          <div class="press-levels" id="pressLevels">
            <div class="level-bar bar-coffee" id="bar-coffee"></div>
            <div class="level-bar bar-sawdust" id="bar-sawdust"></div>
            <div class="level-bar bar-paper" id="bar-paper"></div>
            <div class="level-bar bar-water" id="bar-water"></div>
          </div>
        </div>
        <div id="builderMixInfo" style="font-size:0.78rem;text-align:center;color:var(--text-muted);font-weight:600;margin-top:8px"></div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <button class="mix-btn" id="mixBtn" onclick="checkBuilderMix()">Press briket!</button>
          <button class="mix-btn" id="resetBuilderBtn" style="background:rgba(0,0,0,0.04);color:var(--text-muted);flex:0 0 auto;padding:10px 18px" onclick="resetBuilder()">Nulstil</button>
        </div>
      </div>
    </div>
    <div class="builder-result" id="builderResult"></div>
  `;

  // Add click handlers
  container.querySelectorAll('.add-btn[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      builderCounts[key] += 1;
      updateBuilderDisplay();

      // Show tip
      const tip = document.getElementById('builderTip');
      if (tip) tip.textContent = INGREDIENT_INFO[key].fact;
    });
  });
}

function getBuilderTotal() {
  return Object.values(builderCounts).reduce((a, b) => a + b, 0);
}

function getBuilderPct(key) {
  const total = getBuilderTotal();
  if (total === 0) return 0;
  return Math.round((builderCounts[key] / total) * 100);
}

function updateBuilderDisplay() {
  const total = getBuilderTotal();
  const pressLabel = document.getElementById('pressLabel');
  const mixInfo = document.getElementById('builderMixInfo');

  Object.keys(builderCounts).forEach(key => {
    const countEl = document.getElementById(`bc-${key}`);
    if (countEl) countEl.textContent = builderCounts[key];

    const pct = getBuilderPct(key);
    const bar = document.getElementById(`bar-${key}`);
    if (bar) bar.style.height = `${pct * 1.5}px`;
  });

  if (total > 0 && pressLabel) {
    const lines = Object.entries(builderCounts)
      .filter(([, v]) => v > 0)
      .map(([k]) => `${gIcon(INGREDIENT_INFO[k].iconKey)} ${getBuilderPct(k)}%`)
      .join(' · ');
    pressLabel.innerHTML = lines;
  }

  if (mixInfo && total > 0) {
    mixInfo.textContent = `${total} enheder tilsat`;
  }
}

function resetBuilder() {
  builderCounts = { coffee: 0, sawdust: 0, paper: 0, water: 0 };
  updateBuilderDisplay();

  const result = document.getElementById('builderResult');
  if (result) { result.className = 'builder-result'; result.innerHTML = ''; }

  const pressLabel = document.getElementById('pressLabel');
  if (pressLabel) pressLabel.innerHTML = 'Klik på ingredienserne<br>og tilsæt til briketten';

  const mixInfo = document.getElementById('builderMixInfo');
  if (mixInfo) mixInfo.textContent = '';
}

function checkBuilderMix() {
  const total = getBuilderTotal();
  if (total === 0) {
    alert('Tilsæt ingredienser først!');
    return;
  }

  const result = document.getElementById('builderResult');
  if (!result) return;

  let allGood = true;
  const feedback = [];

  Object.entries(BUILDER_TARGETS).forEach(([key, target]) => {
    const actual = getBuilderPct(key);
    const diff = actual - target;
    const ok = Math.abs(diff) <= BUILDER_TOLERANCE;
    if (!ok) allGood = false;
    feedback.push({
      key,
      target,
      actual,
      diff,
      ok
    });
  });

  if (allGood) {
    result.className = 'builder-result success';
    result.innerHTML = `
      <div class="result-emoji" style="color:#0094F0">${gIcon('flame', 48)}</div>
      <div class="result-title">Perfekt briket!</div>
      <p class="result-text">Dine proportioner er rigtige! Din briket vil brænde godt og varmt. Godt klaret, spejder!</p>
      <div style="margin-top:16px;font-size:0.85rem;color:var(--text-muted);font-weight:600;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        ${feedback.map(f => `<span style="display:inline-flex;align-items:center;gap:4px">${gIcon(INGREDIENT_INFO[f.key].iconKey)} ${f.actual}% ${f.ok ? '<span style="color:#003366">&#10003;</span>' : '<span style="color:#EA636F">&#10007;</span>'}</span>`).join('')}
      </div>
    `;
    if (window.api) {
      window.api('game_log', 'POST', { game_type: 'builder', score: 1, metadata: builderCounts });
    }
  } else {
    const worst = feedback.filter(f => !f.ok).map(f => {
      const dir = f.diff > 0 ? 'for meget' : 'for lidt';
      return `${gIcon(INGREDIENT_INFO[f.key].iconKey)} ${INGREDIENT_INFO[f.key].name} (${f.actual}% – ${dir}, mål: ${f.target}%)`;
    });

    result.className = 'builder-result failure';
    result.innerHTML = `
      <div class="result-emoji" style="color:var(--text-muted)">${gIcon('windLg', 48)}</div>
      <div class="result-title">Briketten smuldrer...</div>
      <p class="result-text">Blandingen er ikke helt rigtig. Prøv at justere:</p>
      <ul style="text-align:left;margin-top:12px;font-size:0.88rem;color:var(--accent-coral);font-weight:600;line-height:2;list-style:none;padding:0">
        ${worst.map(w => `<li>• ${w}</li>`).join('')}
      </ul>
      <button class="mix-btn" style="margin-top:16px;width:auto;padding:10px 28px" onclick="resetBuilder()">Prøv igen</button>
    `;
    if (window.api) {
      window.api('game_log', 'POST', { game_type: 'builder', score: 0, metadata: builderCounts });
    }
  }
}

// Expose builder functions
window.initBuilderGame = initBuilderGame;
window.checkBuilderMix = checkBuilderMix;
window.resetBuilder = resetBuilder;

/* ============================================
   GAME 2: CO₂-REGNEREN
   ============================================ */

let calcInitialized = false;

function initCalcGame() {
  const container = document.getElementById('calcGame');
  if (!container) return;
  if (calcInitialized && container.innerHTML !== '') return;
  calcInitialized = true;

  container.innerHTML = `
    <div class="calc-container">
      <p style="font-size:0.92rem;color:var(--text-muted);font-weight:500;margin-bottom:24px;line-height:1.6">
        Beregn din personlige bidrag til Valhalla-Briketten – og hvor meget CO₂ du kan hjælpe med at undgå.
      </p>
      <div class="calc-input-group">
        <label class="calc-label" for="cupsInput">Kopper kaffe pr. dag</label>
        <input type="number" id="cupsInput" class="calc-input" value="3" min="1" max="50" step="1" placeholder="F.eks. 3">
      </div>
      <button class="calc-btn" onclick="calculateCO2()">Beregn mit bidrag</button>
      <div class="calc-results" id="calcResults">
        <div class="calc-result-item">
          <span class="calc-result-icon">${gIcon('coffee')}</span>
          <div>
            <div class="calc-result-val" id="r-grums">0</div>
            <div class="calc-result-label">Kg kaffegrums pr. år</div>
          </div>
        </div>
        <div class="calc-result-item">
          <span class="calc-result-icon">${gIcon('brick')}</span>
          <div>
            <div class="calc-result-val" id="r-briketter">0</div>
            <div class="calc-result-label">Potentielle briketter</div>
          </div>
        </div>
        <div class="calc-result-item" style="border-color:rgba(0,51,102,0.15);background:rgba(0,51,102,0.04)">
          <span class="calc-result-icon">${gIcon('droplet')}</span>
          <div>
            <div class="calc-result-val" id="r-co2" style="color:#003366">0</div>
            <div class="calc-result-label">Kg CO₂e undgået pr. år</div>
          </div>
        </div>
        <div class="calc-result-item" style="background:rgba(0,148,240,0.04);border-color:rgba(0,148,240,0.15)">
          <span class="calc-result-icon">${gIcon('tent')}</span>
          <div>
            <div class="calc-result-val" id="r-pct" style="color:var(--brand-amber)">0%</div>
            <div class="calc-result-label">Af Valhallas mål på 1000 briketter</div>
          </div>
        </div>
        <button class="share-btn" onclick="shareCalcResult()">Kopier og del mit resultat</button>
      </div>
    </div>
  `;

  // Trigger calculation on enter
  const input = document.getElementById('cupsInput');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') calculateCO2();
    });
  }
}

let lastCalcResult = null;

function calculateCO2() {
  const input = document.getElementById('cupsInput');
  const cups = parseFloat(input?.value || '3');
  if (isNaN(cups) || cups < 0) return;

  // Calculations
  const gramsPerCup = 11; // 11g per kop
  const grumsKgPerYear = (cups * gramsPerCup * 365) / 1000;
  const potentialBriquettes = Math.round(grumsKgPerYear * 8);
  const co2Saved = grumsKgPerYear * 0.65; // 0.65 kg CO2e per kg diverted
  const pct = Math.min(Math.round((potentialBriquettes / 1000) * 100), 100);

  lastCalcResult = { cups, grumsKgPerYear, potentialBriquettes, co2Saved, pct };

  // Show results
  const resultsEl = document.getElementById('calcResults');
  if (resultsEl) resultsEl.classList.add('show');

  // Animated values
  function animateNum(id, target, suffix = '', isFloat = false) {
    const el = document.getElementById(id);
    if (!el) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      el.textContent = isFloat
        ? v.toFixed(1) + suffix
        : Math.round(v) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  animateNum('r-grums', grumsKgPerYear, ' kg', true);
  animateNum('r-briketter', potentialBriquettes, ' stk.');
  animateNum('r-co2', co2Saved, ' kg', true);
  animateNum('r-pct', pct, '%');

  // Log
  if (window.api) {
    window.api('game_log', 'POST', { game_type: 'calculator', score: co2Saved, metadata: { cups } });
  }
}

function shareCalcResult() {
  if (!lastCalcResult) return;
  const { cups, grumsKgPerYear, potentialBriquettes, co2Saved } = lastCalcResult;
  const text = `Jeg drikker ${cups} kopper kaffe om dagen.
Jeg producerer ${grumsKgPerYear.toFixed(1)} kg kaffegrums om året.
Det svarer til ${potentialBriquettes} Valhalla-briketter!
Og jeg kan hjælpe med at undgå ${co2Saved.toFixed(1)} kg CO₂e fra lossepladsen.

Læs mere om Valhalla-Briketten – Fra grums til glød!`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.share-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Kopieret!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

window.initCalcGame = initCalcGame;
window.calculateCO2 = calculateCO2;
window.shareCalcResult = shareCalcResult;

/* ============================================
   GAME 3: QUIZ
   ============================================ */

const QUIZ_QUESTIONS = [
  {
    q: 'Hvor mange ton kaffegrums produceres globalt hvert år?',
    options: ['500.000 ton', '6-15 millioner ton', '100 millioner ton'],
    correct: 1,
    explanation: 'Globalt produceres 6–15 millioner ton brugt kaffegrums om året – en enorm ressource, der ofte ender som affald!'
  },
  {
    q: 'Hvor mange procent af kaffegrums ender som affald?',
    options: ['25%', '50%', '75%'],
    correct: 2,
    explanation: 'Ca. 75% af brugt kaffegrums ender på lossepladsen eller i forbrænding, selvom det har stor brændværdi.'
  },
  {
    q: 'Hvad hedder den drivhusgas kaffegrums frigiver på lossepladser?',
    options: ['Oxygen', 'Metan', 'Helium'],
    correct: 1,
    explanation: 'Kaffegrums nedbryder sig til metan på lossepladser – en drivhusgas der er 28 gange kraftigere end CO₂!'
  },
  {
    q: 'Hvor meget højere brændværdi har kaffebriketter sammenlignet med rene savsmuldsbriketter?',
    options: ['5-10% højere', '20-30% højere', '50-60% højere'],
    correct: 1,
    explanation: 'Kaffegrums har højere energiindhold end savsmuld alene – derfor brænder blandingen 20-30% bedre!'
  },
  {
    q: 'Hvad er temaet for Spejdernes Lejr 2026?',
    options: ['"Alle ind i fællesskabet"', '"Ud i naturen"', '"Mod nye horisonter"'],
    correct: 0,
    explanation: '"Alle ind i fællesskabet" er temaet for SL 2026 – og Valhalla-Briketten passer perfekt ind i det!'
  },
  {
    q: 'Hvilken gren bygger solovne til tørring af briketter?',
    options: ['Mikro', 'Mini', 'Klan'],
    correct: 1,
    explanation: 'Minispejderne bygger tørrestativer og solovne, designer produktionsflow og tester briketter på bål!'
  },
  {
    q: 'Hvad bruges som bindemiddel i Valhalla-briketterne?',
    options: ['Lim', 'Genbrugspapir', 'Plastik'],
    correct: 1,
    explanation: 'Genbrugspapir opblød i vand fungerer som et naturligt bindemiddel – 100% genanvendt og miljøvenligt!'
  },
  {
    q: 'Hvor skal Valhalla-briketten vises frem i juli 2026?',
    options: ['Roskilde Festival', 'Spejdernes Lejr 2026', 'Folkemødet'],
    correct: 1,
    explanation: 'Valhalla Gruppe driver stand på Spejdernes Lejr 2026 og præsenterer projektet for spejdere fra hele landet!'
  }
];

let quizState = {
  current: 0,
  score: 0,
  answered: false,
  initialized: false
};

function initQuizGame() {
  if (quizState.initialized) {
    resetQuiz();
    return;
  }
  quizState.initialized = true;
  renderQuizQuestion();
}

function resetQuiz() {
  quizState.current = 0;
  quizState.score = 0;
  quizState.answered = false;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quizGame');
  if (!container) return;

  const total = QUIZ_QUESTIONS.length;
  const i = quizState.current;

  if (i >= total) {
    renderQuizResult();
    return;
  }

  const q = QUIZ_QUESTIONS[i];
  const pct = Math.round((i / total) * 100);

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-progress">
        <span class="quiz-counter">Spørgsmål ${i + 1}</span>
        <div class="quiz-progress-bar-bg">
          <div class="quiz-progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="quiz-counter">af ${total}</span>
      </div>
      <div class="quiz-question">${escHtmlLocal(q.q)}</div>
      <div class="quiz-options" id="quizOptions">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option" data-idx="${idx}" onclick="answerQuiz(${idx})">
            ${String.fromCharCode(65 + idx)}. ${escHtmlLocal(opt)}
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <button class="quiz-next-btn" id="quizNextBtn" onclick="nextQuizQuestion()">
        ${i < total - 1 ? 'Næste spørgsmål →' : 'Se resultatet'}
      </button>
    </div>
  `;

  quizState.answered = false;
}

function answerQuiz(idx) {
  if (quizState.answered) return;
  quizState.answered = true;

  const q = QUIZ_QUESTIONS[quizState.current];
  const correct = idx === q.correct;

  if (correct) quizState.score++;

  // Style options
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === idx && !correct) btn.classList.add('wrong');
  });

  // Feedback
  const feedback = document.getElementById('quizFeedback');
  if (feedback) {
    feedback.textContent = correct
      ? `Rigtigt! ${q.explanation}`
      : `Forkert! Svaret er: ${q.options[q.correct]}. ${q.explanation}`;
    feedback.className = `quiz-feedback show ${correct ? 'correct-fb' : 'wrong-fb'}`;
  }

  // Show next button
  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) nextBtn.classList.add('show');
}

function nextQuizQuestion() {
  quizState.current++;
  renderQuizQuestion();
}

function renderQuizResult() {
  const container = document.getElementById('quizGame');
  if (!container) return;

  const score = quizState.score;
  const total = QUIZ_QUESTIONS.length;
  const pct = Math.round((score / total) * 100);

  let msg, resultIcon;
  if (pct === 100) {
    msg = 'Fremragende! Du er en sand Valhalla-briket ekspert! Du ved alt om kaffegrums, briketter og spejderliv.';
    resultIcon = gIcon('starLg', 48);
  } else if (pct >= 75) {
    msg = 'Flot klaret! Du ved rigtigt meget om Valhalla-projektet og bæredygtighed.';
    resultIcon = gIcon('flameLg', 48);
  } else if (pct >= 50) {
    msg = 'Godkendt! Du kender de grundlæggende fakta. Læs mere på hjemmesiden og bliv endnu klogere!';
    resultIcon = gIcon('thumbLg', 48);
  } else {
    msg = 'Du har stadig noget at lære! Scroll op og læs om projektet – og prøv igen. Du kan sagtens gøre det bedre!';
    resultIcon = gIcon('coffeeLg', 48);
  }

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-result show">
        <div style="margin-bottom:8px;color:#003366">${resultIcon}</div>
        <div class="quiz-result-score">${score}/${total}</div>
        <div class="quiz-result-text">${pct}% rigtige svar</div>
        <p class="quiz-result-msg">${msg}</p>
        <div style="display:flex;gap:12px;justify-content:center">
          <button class="quiz-restart-btn" onclick="resetQuiz()">Prøv igen</button>
        </div>
      </div>
    </div>
  `;

  // Log
  if (window.api) {
    window.api('game_log', 'POST', { game_type: 'quiz', score: pct, metadata: { correct: score, total } });
  }
}

// Local escape function
function escHtmlLocal(str) {
  if (window.escHtml) return window.escHtml(str);
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

window.initQuizGame = initQuizGame;
window.answerQuiz = answerQuiz;
window.nextQuizQuestion = nextQuizQuestion;
window.resetQuiz = resetQuiz;
