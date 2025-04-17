const translations = {
  en: {
    title: "How many weeks have you lived?",
    desc: "Enter your date of birth to visualize your life in weeks or months (based on a 90-year life expectancy).",
    calculate: "Calculate",
    restart: "Restart",
    export: "Export as Image",
    legendWeeks: "1 row = 52 weeks = 1 year",
    legendMonths: "1 row = 36 months = 3 years",
    reflection: [
      "What’s a moment you’d love to relive, just as it was?",
      "Who’s someone that changed your life in a beautiful way?",
      "What memory instantly makes you smile?",
      "What moment made you feel truly alive?",
      "What would you tell your younger self right now?",
      "What dream did you once have that deserves a second chance?",
      "What’s a lesson life taught you that you’ll never forget?",
      "What would you love to create before your next birthday?",
      "What’s one small habit you could start today to shape your future?",
      "Who do you want to spend more time with?",
      "What’s something you’ve been putting off that really matters to you?",
      "What’s one story you hope to tell when you’re 90?"
    ],
    subtitle: (val, unit, pct) => `You have lived ${pct}% of your life`,
    subnote: (val, unit) => unit === 'weeks'
      ? `You still have ${4680 - val} weeks* to live.`
      : `You still have ${1080 - val} months* to live.`,
    lifespanNote: "* assuming 90 years of life expectancy"
  },
  es: {
    title: "¿Cuántas semanas has vivido?",
    desc: "Ingresa tu fecha de nacimiento para visualizar tu vida en semanas o meses (basado en una expectativa de vida de 90 años).",
    calculate: "Calcular",
    restart: "Reiniciar",
    export: "Exportar como imagen",
    legendWeeks: "1 fila = 52 semanas = 1 año",
    legendMonths: "1 fila = 36 meses = 3 años",
    reflection: [
      "¿Qué instante te gustaría revivir tal como fue?",
      "¿Quién ha cambiado tu vida de forma hermosa?",
      "¿Qué recuerdo te hace sonreír al instante?",
      "¿En qué momento te sentiste verdaderamente vivo?",
      "¿Qué le dirías hoy a tu yo más joven?",
      "¿Qué sueño de antes merece una segunda oportunidad?",
      "¿Qué lección de vida nunca vas a olvidar?",
      "¿Qué te gustaría crear antes de tu próximo cumpleaños?",
      "¿Qué pequeño hábito podrías comenzar hoy para cambiar tu futuro?",
      "¿Con quién te gustaría pasar más tiempo?",
      "¿Qué has estado postergando que realmente importa para ti?",
      "¿Qué historia te gustaría poder contar cuando tengas 90 años?"
    ],
    
    subtitle: (val, unit, pct) => `Has vivido el ${pct}% de tu vida`,
    subnote: (val, unit) => unit === 'semanas' 
      ? `Aún te quedan ${4680 - val} semanas* de vida.` 
      : `Aún te quedan ${1080 - val} meses* de vida.`,
    lifespanNote: "* basado en una expectativa de vida de 90 años"
  },
  fr: {
    title: "Combien de semaines avez-vous vécues ?",
    desc: "Entrez votre date de naissance pour visualiser votre vie en semaines ou en mois (sur une espérance de vie de 90 ans).",
    calculate: "Calculer",
    restart: "Recommencer",
    export: "Exporter en image",
    legendWeeks: "1 ligne = 52 semaines = 1 an",
    legendMonths: "1 ligne = 36 mois = 3 ans",
    reflection: [
      "Quel moment aimerais-tu revivre tel quel ?",
      "Qui a transformé ta vie de manière magnifique ?",
      "Quel souvenir te fait sourire instantanément ?",
      "Quand t’es-tu senti pleinement vivant ?",
      "Que dirais-tu à ton toi plus jeune en ce moment ?",
      "Quel rêve oublié mérite une seconde chance ?",
      "Quelle leçon de vie n’oublieras-tu jamais ?",
      "Qu’aimerais-tu créer avant ton prochain anniversaire ?",
      "Quelle petite habitude pourrais-tu commencer aujourd’hui pour changer ton avenir ?",
      "Avec qui aimerais-tu passer plus de temps ?",
      "Qu’est-ce que tu repousses depuis longtemps mais qui compte vraiment ?",
      "Quelle histoire veux-tu pouvoir raconter à 90 ans ?"
    ],
    
    subtitle: (val, unit, pct) => `Tu as vécu ${pct}% de ta vie`,
    subnote: (val, unit) => unit === 'semaines' 
      ? `Il te reste ${4680 - val} semaines* à vivre.` 
      : `Il te reste ${1080 - val} mois* à vivre.`,
    lifespanNote: "* basé sur une espérance de vie de 90 ans"
  }
};

let currentLang = "en";
let currentView = "months";

function changeLanguage() {
  currentLang = document.getElementById("languageSelector").value;
  const t = translations[currentLang];
  document.getElementById("mainTitle").textContent = t.title;
  document.getElementById("mainDesc").textContent = t.desc;
  document.getElementById("calculateBtn").textContent = t.calculate;
  document.getElementById("restartBtn").textContent = t.restart;
  document.getElementById("exportBtn").textContent = t.export;
  updateLegend();
}

function toggleView() {
  currentView = document.getElementById("viewMode").value;
  calculate();
}

function updateLegend() {
  const t = translations[currentLang];
  document.getElementById("legendText").textContent = currentView === "weeks"
    ? t.legendWeeks
    : "1 row = 36 months = 3 years";
}

function calculate() {
  const birthDateInput = document.getElementById("birthDate").value;
  if (!birthDateInput) return;

  const birthDate = new Date(birthDateInput);
  const today = new Date();

  const t = translations[currentLang];

  let totalUnits, unitName, unitsLived;
  if (currentView === "weeks") {
    totalUnits = 90 * 52;
    unitName = currentLang === "fr" ? "semaines" : currentLang === "es" ? "semanas" : "weeks";
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    unitsLived = Math.floor((today - birthDate) / oneWeek);
  } else {
    totalUnits = 90 * 12;
    unitName = currentLang === "fr" ? "mois" : currentLang === "es" ? "meses" : "months";
    unitsLived = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
  }

  const percentage = Math.round((unitsLived / totalUnits) * 100);

  document.getElementById("mainTitle").style.display = "none";
  document.getElementById("mainDesc").style.display = "none";
  document.getElementById("inputContainer").style.display = "none";
  document.getElementById("languageSelector").style.display = "none";
  document.getElementById("viewMode").style.display = "inline-block";
  document.getElementById("viewModeContainer").style.display = "inline-block";

  // Mostrar stats manualmente
  const statsContainer = document.getElementById("stats");
  statsContainer.innerHTML = "";

  const titleEl = document.createElement("strong");
  titleEl.textContent = t.subtitle(unitsLived, unitName, percentage);

  const noteEl = document.createElement("small");
  noteEl.textContent = t.subnote(unitsLived, unitName);

  const reflectionEl = document.createElement("em");
  reflectionEl.id = "reflectionText";
  reflectionEl.textContent = getRandomReflection();

  statsContainer.appendChild(titleEl);
  statsContainer.appendChild(noteEl);
  statsContainer.appendChild(reflectionEl);

  startReflectionRotation(t.reflection);

  // Mostrar leyenda y botones
  document.getElementById("legend").style.display = "block";
  document.getElementById("actionButtons").style.display = "block";
  updateLegend();

  // Pintar el grid
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  grid.className = "square-grid " + (currentView === "weeks" ? "weeks" : "months");

  for (let i = 0; i < totalUnits; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    if (i < unitsLived) {
      square.classList.add("filled");
    }
    grid.appendChild(square);
  }

  document.getElementById("lifespanContainer").innerHTML = `
    <div id="lifespan-note">${t.lifespanNote}</div>
  `;
}

function getRandomReflection() {
  const options = translations[currentLang].reflection;
  return options[Math.floor(Math.random() * options.length)];
}

function restart() {
  document.getElementById("mainTitle").style.display = "block";
  document.getElementById("mainDesc").style.display = "block";
  document.getElementById("inputContainer").style.display = "block";
  document.getElementById("birthDate").value = "";
  document.getElementById("languageSelector").style.display = "inline-block";
  document.getElementById("viewMode").style.display = "none";
  document.getElementById("viewModeContainer").style.display = "none";

  document.getElementById("stats").innerHTML = "";
  document.getElementById("legend").style.display = "none";
  document.getElementById("grid").innerHTML = "";
  document.getElementById("lifespanContainer").innerHTML = "";
  document.getElementById("actionButtons").style.display = "none";
}

function exportImage() {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.download = 'life-calendar.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
function startReflectionRotation(reflections) {
  let currentIndex = Math.floor(Math.random() * reflections.length);
  const container = document.getElementById("reflectionText");

  function showNext() {
    // Avanza al siguiente índice
    currentIndex = (currentIndex + 1) % reflections.length;

    // Fade-out
    container.style.opacity = 0;

    setTimeout(() => {
      container.textContent = reflections[currentIndex];
      // Fade-in
      container.style.opacity = 1;
    }, 500);
  }

  // Inicia rotación cada 6 segundos
  setInterval(showNext, 6000);
}