// Language translations
const translations = {
    en: {
      title: "How many months have you lived?",
      desc: "Enter your date of birth to visualize your life in months (based on a 90-year life expectancy).",
      calculate: "Calculate",
      restart: "Restart",
      export: "Export as Image",
      legend: "1 row = 36 months = 3 years",
      reflection: [
        "What’s one moment you’ve lived that you never want to forget?",
        "What’s a moment you’d love to relive, just as it was?",
        "Who’s someone that changed your life in a beautiful way?"
      ],
      subtitle: (p) => `You’ve lived ${p}% of your life`,
      subnote: "(assuming 90 years of life expectancy.)"
    },
    es: {
      title: "¿Cuántos meses has vivido?",
      desc: "Ingresa tu fecha de nacimiento para visualizar tu vida en meses (basado en una expectativa de vida de 90 años).",
      calculate: "Calcular",
      restart: "Reiniciar",
      export: "Exportar como imagen",
      legend: "1 fila = 36 meses = 3 años",
      reflection: [
        "¿Qué momento has vivido que nunca quieres olvidar?",
        "¿Qué instante te gustaría revivir tal como fue?",
        "¿Quién ha cambiado tu vida de forma hermosa?"
      ],
      subtitle: (p) => `Has vivido el ${p}% de tu vida`,
      subnote: "(asumiendo una expectativa de vida de 90 años)"
    },
    fr: {
      title: "Combien de mois avez-vous vécu ?",
      desc: "Entrez votre date de naissance pour visualiser votre vie en mois (sur une espérance de vie de 90 ans).",
      calculate: "Calculer",
      restart: "Recommencer",
      export: "Exporter en image",
      legend: "1 ligne = 36 mois = 3 ans",
      reflection: [
        "Quel moment as-tu vécu que tu ne veux jamais oublier ?",
        "Quel instant aimerais-tu revivre tel quel ?",
        "Qui a changé ta vie d'une belle manière ?"
      ],
      subtitle: (p) => `Tu as vécu ${p}% de ta vie`,
      subnote: "(en supposant une espérance de vie de 90 ans)"
    }
  };
  
  let currentLang = "en";
  
  function changeLanguage() {
    currentLang = document.getElementById("languageSelector").value;
    const t = translations[currentLang];
  
    document.getElementById("mainTitle").textContent = t.title;
    document.getElementById("mainDesc").textContent = t.desc;
    document.getElementById("calculateBtn").textContent = t.calculate;
    document.getElementById("restartBtn").textContent = t.restart;
    document.getElementById("exportBtn").textContent = t.export;
    document.getElementById("legendText").textContent = t.legend;
  }
  
  function calculate() {
    const birthDateInput = document.getElementById("birthDate").value;
    if (!birthDateInput) return;
  
    const birthDate = new Date(birthDateInput);
    const today = new Date();
    const monthsLived = (today.getFullYear() - birthDate.getFullYear()) * 12 +
                        (today.getMonth() - birthDate.getMonth());
  
    const totalMonths = 90 * 12;
    const percentage = Math.round((monthsLived / totalMonths) * 100);
  
    const t = translations[currentLang];
  
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("mainDesc").style.display = "none";
    document.getElementById("inputContainer").style.display = "none";
  
    document.getElementById("stats").innerHTML = `
      <strong>${t.subtitle(percentage)}</strong>
      <small>${t.subnote}</small>
      <em>${getRandomReflection()}</em>
    `;
  
    document.getElementById("legend").style.display = "block";
    document.getElementById("actionButtons").style.display = "block";
  
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
  
    for (let i = 0; i < totalMonths; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      if (i < monthsLived) {
        square.classList.add("filled");
      }
      grid.appendChild(square);
    }
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
  
    document.getElementById("stats").innerHTML = "";
    document.getElementById("legend").style.display = "none";
    document.getElementById("grid").innerHTML = "";
    document.getElementById("actionButtons").style.display = "none";
  }
  
  function exportImage() {
    html2canvas(document.body).then(canvas => {
      const link = document.createElement('a');
      link.download = 'time-lived.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  