/**************
 *	On ajoute un évènement "lorsque l'arborescence DOM est chargée".
 *   Ainsi, nous sommes certains de manipuler des élements
 *	chargés et existants dans notre DOM.
 **************/
window.addEventListener("DOMContentLoaded", (event) => {
  // ### Page d'introduction ###
  document.getElementById("introduction_content").hidden = false;

  //############ DÉCLARATION DE VARIABLES ############//
  // Variables globales
  let numberOfQuestions;
  let locations = []; //pour stocker les données des villes de l'API
  let locationA;
  let locationB;
  let currentLocations = []; //stock les deux villes de la question actuelle
  let currentQuestion = 1;
  let correctScore = 0;
  let pmA;
  let pmB;
  const MESSAGES = {
    ONE: [
      "L'air est pur, respirez à pleins poumons !",
      "Le souffle de l'air est impeccable, emplissez vos poumons sans retenue !",
      "Inhalons cette bouffée de pureté, c'est le moment d'un grand bol d'air frais !",
      "L'atmosphère est limpide, ouvrez grand votre cage thoracique et savourez !",
      "Profitez de cet air vivifiant, il est temps de prendre une bonne inspiration profonde !",
      "Ici, l'air est cristallin : offrez-vous une respiration généreuse et revigorante !",
    ],
    TWO: [
      "L'air est de bonne qualité. La majorité des gens peut en profiter sans aucune restriction.",
      "Nous jouissons d'une qualité d'air agréable, ce qui est une excellente nouvelle pour l'immense majorité de la population.",
      "L'indice de l'air est au vert. Une situation idéale pour la quasi-totalité d'entre nous.",
      "Respirer est un bonheur aujourd'hui grâce à l'air sain. Une aubaine pour le plus grand nombre.",
      "L'atmosphère est parfaitement saine. Un vrai soulagement et un bienfait pour la grande majorité des citoyens.",
    ],
    THREE: [
      "L'indice de l'air est jugé satisfaisant, cependant il est conseillé aux populations vulnérables de réduire toute activité physique soutenue en plein air.",
      "Bien que l'air soit respirable, les sujets fragiles doivent modérer leur activité physique intense à l'extérieur.",
      "On relève une qualité d'air moyenne; par mesure de précaution, les individus sensibles devraient éviter les exercices ardus à l'extérieur.",
      "L'air est d'une qualité correcte, mais pour les personnes à risque, il est préférable d'éviter les activités de forte intensité en extérieur.",
      "Le niveau de pollution atmosphérique reste tolérable, néanmoins, il est recommandé aux personnes sensibles d'alléger leurs efforts physiques extérieurs.",
    ],
    FOUR: [
      "Ici, tout le monde peut commencer à ressentir des effets. Les groupes sensibles devraient absolument éviter les activités extérieures.",
      "Le niveau de pollution est tel que l'ensemble de la population risque de ressentir des désagréments. Il est impératif que les personnes fragiles s'abstiennent de toute activité en plein air.",
      "Des symptômes peuvent apparaître chez chacun. Les populations les plus sensibles doivent, sans exception, renoncer à toute sortie et exercice à l'extérieur.",
      "L'air affecte désormais tout le monde. Les individus à risque sont formellement invités à rester à l'intérieur et à éviter tout effort physique extérieur.",
      "Attention, des effets se font sentir sur la santé de tous. Il est vivement recommandé aux groupes vulnérables d'interrompre immédiatement leurs activités en milieu extérieur.",
      "La qualité de l'air est mauvaise et potentiellement irritante pour la population entière. Les personnes les plus fragiles doivent impérativement et strictement rester confinées pour éviter les efforts intenses dehors.",
    ],
    FIVE: [
      "Une alerte sanitaire a certainement déjà été déclenchée. Évitez toute activité physique en extérieur. Restez à l'intérieur et fermez les fenêtres si possible.",
      "Le pic de pollution a probablement mené au déclenchement d'une alerte sanitaire. Cessez tout exercice physique dehors, maintenez-vous à l'intérieur et veillez à calfeutrer les ouvertures.",
      "L'état d'urgence sanitaire est vraisemblablement en vigueur. Abstenez-vous de tout effort en extérieur. Il est crucial de rester à l'abri et de garder vos fenêtres closes.",
      "Une procédure d'alerte sanitaire est active. Toute activité extérieure doit être proscrite. Il est fortement recommandé de se confiner à l'intérieur et de condamner les fenêtres.",
      "Compte tenu des taux, l'alerte maximale est sans doute lancée. La consigne est d'éviter toute activité physique dehors. Protégez-vous en restant à l'intérieur, les fenêtres devant être fermées si possible.",
      "L'air est extrêmement dangereux, l'alerte santé est confirmée. On demande à chacun de stopper les efforts physiques en extérieur. Cherchez refuge à l'intérieur et scellez vos fenêtres.",
    ],
    SIX: [
      "Urgence sanitaire ! L'air est très nocif. Il est impératif de prendre des mesures pour se protéger et de réduire au maximum le temps passé dehors.",
      "Alerte rouge sanitaire ! L'air ambiant présente un danger élevé pour la santé. Chacun doit mettre en place des mesures de protection immédiates et limiter drastiquement ses déplacements à l'extérieur.",
      "Danger immédiat pour la santé ! L'atmosphère est extrêmement toxique. Nous exigeons que des précautions soient prises et que le temps passé hors des bâtiments soit réduit au strict minimum.",
      "Situation critique : l'air est hautement pollué. Il est essentiel d'adopter des gestes barrières de protection et de minimiser le plus possible la durée des activités extérieures.",
      "Urgence absolue ! La nocivité de l'air est avérée. Il est désormais obligatoire d'appliquer des mesures de protection et de diminuer considérablement le temps d'exposition à l'extérieur.",
      "Point de vigilance maximal ! La qualité de l'air met gravement la santé en péril. Des dispositions de protection s'imposent : le temps passé à l'extérieur doit être réduit au maximum vital.",
    ],
  };
  const randomMessageOne =
    MESSAGES.ONE[Math.floor(Math.random() * MESSAGES.ONE.length)];
  const randomMessageTwo =
    MESSAGES.TWO[Math.floor(Math.random() * MESSAGES.TWO.length)];
  const randomMessageThree =
    MESSAGES.THREE[Math.floor(Math.random() * MESSAGES.THREE.length)];
  const randomMessageFour =
    MESSAGES.FOUR[Math.floor(Math.random() * MESSAGES.FOUR.length)];
  const randomMessageFive =
    MESSAGES.FIVE[Math.floor(Math.random() * MESSAGES.FIVE.length)];
  const randomMessageSix =
    MESSAGES.SIX[Math.floor(Math.random() * MESSAGES.SIX.length)];

  // Pointeurs HTML
  const bgMusic = document.getElementById("bg_music");
  const startButton = document.querySelector("#startButton");
  const locationName = document.querySelectorAll(".city_name");
  const countryFlag = document.querySelectorAll(".country_flag");
  const countryName = document.querySelectorAll(".country_name");
  const flagPicture = document.querySelectorAll(".flag_pic");
  const error = document.querySelector(".error");

  // Sélecteur du nombre de questions
  let selector = document.querySelector(".selector");
  let selectValue = document.querySelector(".select_value");
  let sliderInput = document.querySelector("#slider_input");
  let progressBar = document.querySelector(".progress_bar");

  selectValue.innerText = sliderInput.value;
  progressBar.style.width = `${sliderInput.value}%`;

  sliderInput.oninput = () => {
    let value = sliderInput.value;
    selector.style.left = `${value}%`;
    selectValue.innerText = value;
    progressBar.style.width = `${value}%`;
  };

  // Fin sélecteur du nombre de questions
  //############ FONCTIONS ############//
  // Récupérer les données nécessaires
  async function getLocations(numberOfQuestions) {
    // Demander plus de lieux pour avoir une marge
    const res = await fetch(
      `http://127.0.0.1:1000/?limit=${numberOfQuestions}`
    );
    const data = await res.json();

    // Filtrer les lieux qui ont des mesures récentes (moins de 7 jours)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    locations = data.results
      .filter((results) => {
        // Vérifier si le lieu a une date de dernière mise à jour récente
        if (results.lastUpdated) {
          const lastUpdate = new Date(results.lastUpdated);
          return lastUpdate > sevenDaysAgo;
        }
        return true; // Garder par défaut si pas d'info
      })
      .slice(0, numberOfQuestions); // Limiter au nombre demandé

    console.log("Liste des lieux filtrés :", locations);
  }

  // Choisir une ville avec des données exploitables aléatoire
  async function pickRandomLocation(excludeLocation = null) {
    let attempts = 0;
    const maxAttempts = 20;

    while (attempts < maxAttempts) {
      // Choisir un lieu aléatoire
      const randomIndex = Math.floor(Math.random() * locations.length);
      const location = locations[randomIndex];

      // Vérifier qu'on ne retombe pas sur le lieu à exclure
      if (excludeLocation && location.id === excludeLocation.id) {
        attempts++;
        continue;
      }

      // Récupérer les mesures PM
      const res = await fetch(
        `http://127.0.0.1:1000/measurements?location_id=${location.id}&parameter=pm25`
      );
      const data = await res.json();
      const pmValue = data.results?.[0]?.value ?? 0;

      console.log(
        `Tentative n°${attempts + 1} pour ${location.name}: PM = ${pmValue}`
      );

      // Si valide, retourner le lieu avec sa valeur PM
      if (pmValue > 0) {
        return { location, pm: pmValue };
      }

      attempts++;
    }

    return null; // Aucun lieu valide trouvé
  }

  // Création des emojis drapeaux
  function getFlagEmoji(countryCode) {
    let codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  // Générateur de textes selon les niveaux de pollution
  function getPollutionLevelText(pm25) {
    if (pm25 <= 5) return `</br>🌬️ ${randomMessageOne}`;
    if (pm25 <= 12) return `</br>😊 ${randomMessageTwo}`;
    if (pm25 <= 35) return `</br>⚠️ ${randomMessageThree}`;
    if (pm25 <= 55) return `</br>🚨 ${randomMessageFour}`;
    if (pm25 <= 150) return `</br>🛑 ${randomMessageFive}`;
    return `</br>☢️ ${randomMessageSix}`;
  }

  // Générateur du récap de réponses
  function getSummary(locationA, locationB, correctAnswer) {
    const intro = correctAnswer
      ? "🎊 Bonne réponse ! 🎊"
      : "Mauvaise réponse, dommage !";
    // Informations endroit n°1
    const flagA = locationA.country.code;
    const qualityA = getPollutionLevelText(pmA);
    // Informations endroit n°1
    const flagB = locationB.country.code;
    const qualityB = getPollutionLevelText(pmB);
    return `
    <h2>${intro}</h2>
    <div>
    <strong>${
      pmA > pmB ? locationA.name : locationB.name
    }</strong> est bel et bien le lieu le plus pollué.
    </div>
    <div> 
    <span class="location_name_summary">${
      locationA.name
    }</span> — <span class="location_country_summary">${
      locationA.country.name
    }</span><br/>PM2.5 : <strong>${pmA} µg/m³</strong>${qualityA}
    </div>
    <div><span class="location_name_summary">${
      locationB.name
    }</span> — <span class="location_country_summary">${
      locationB.country.name
    }</span><br/>PM2.5 : <strong>${pmB} µg/m³</strong>${qualityB}
    </div>
    
    <button type="submit" class="button" id="next_question">Question suivante</button>`;
  }
  // Fin des définitions de fonctions
  startButton.addEventListener("click", async () => {
    // Enregistrement du nombre de questions
    numberOfQuestions = sliderInput.value;
    await getLocations(numberOfQuestions * 10); // Récupérer plus de lieux

    // Trouver le premier lieu valide
    const resultA = await pickRandomLocation();
    if (!resultA) {
      document.getElementById("loading").style.display = "none";
      alert("Impossible de trouver un premier lieu avec des mesures.");
      return;
    }

    // Trouver le deuxième lieu valide (différent du premier)
    const resultB = await pickRandomLocation(resultA.location);
    if (!resultB) {
      document.getElementById("loading").style.display = "none";
      alert("Impossible de trouver un deuxième lieu avec des mesures.");
      return;
    }

    // Cacher le message de chargement
    document.getElementById("loading").style.display = "none";

    locationA = resultA.location;
    locationB = resultB.location;
    pmA = resultA.pm;
    pmB = resultB.pm;

    console.log("Lieu n°1", locationA, "PM:", pmA);
    console.log("Lieu n°2", locationB, "PM:", pmB);

    currentLocations = [locationA, locationB];
    currentLocations[0].pm25 = pmA;
    currentLocations[1].pm25 = pmB;
    // Remplacement de la page d'introduction
    document.getElementById("totalQuestions").innerHTML = numberOfQuestions;
    document.getElementById("introduction_content").classList.add("hidden");
    document.getElementById("quiz_container").classList.remove("hidden");
    bgMusic.play();
    bgMusic.volume = 0.2;

    // Affichage des villes sélectionnées
    // Stockage des codes de pays
    const codeLocationA = locationA.country.code;
    const codeLocationB = locationB.country.code;

    // Endroit n°1
    locationName[0].textContent = locationA.name;
    countryFlag[0].textContent = getFlagEmoji(locationA.country.code);
    countryName[0].textContent = locationA.country.name;
    flagPicture[0].innerHTML = `<img src="https://flagsapi.com/${codeLocationA}/flat/64.png">`;

    // Endroit n°2
    locationName[1].textContent = locationB.name;
    countryFlag[1].textContent = getFlagEmoji(locationB.country.code);
    countryName[1].textContent = locationB.country.name;
    flagPicture[1].innerHTML = `<img src="https://flagsapi.com/${codeLocationB}/flat/64.png">`;
  });

  // Vérifications des réponses
  document
    .querySelector("#quizForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const choice = document.querySelector('input[name="location"]:checked');
      if (!choice) {
        document.getElementById("no_answer_sound").play();
        error.textContent = "Merci de choisir une réponse.";
        return;
      }

      let pickedLocation = 0;
      if (choice.value === "locationB") {
        pickedLocation = 1;
      }

      let correctAnswer = 0;
      if (currentLocations[1].pm25 > currentLocations[0].pm25) {
        correctAnswer = 1;
      }

      if (pickedLocation === correctAnswer) {
        document.getElementById("answer_sound").play();
        document.getElementById("confirmation").style.display = "none";
        const summaryText = getSummary(
          currentLocations[0],
          currentLocations[1],
          pickedLocation === correctAnswer
        );

        document.getElementById("summary").innerHTML = summaryText;
        correctScore = correctScore + 1;
        document.getElementById("scoreValue").textContent = correctScore;
      }

      // affichage de la mauvaise réponse
      else {
        document.getElementById("answer_sound").play();
        document.getElementById("confirmation").style.display = "none";
        const summaryText = getSummary(
          currentLocations[0],
          currentLocations[1],
          false
        );
        document.getElementById("summary").innerHTML = summaryText;
      }

      // Passage à la prochaine question
      setTimeout(() => {
        document
          .getElementById("next_question")
          .addEventListener("click", async () => {
            currentQuestion++;

            // Affichage du nombre de question restantes, nb de questions total - le num de question actuel + 1 pour arriver à la fin
            document.getElementById("totalQuestions").textContent =
              numberOfQuestions - currentQuestion + 1;

            // Cacher le quiz
            // Ré-afficher l'écran d'outro quand le score final a atteint le nombre de questions max

            if (currentQuestion > numberOfQuestions) {
              document.getElementById("quiz_container").classList.add("hidden");
              // Calcul pourcentage de réponses correctes
              const finalScore = Math.floor(
                (correctScore / numberOfQuestions) * 100
              );
              document
                .getElementById("outro_content")
                .classList.remove("hidden");
              document.getElementById("scoreFinal").textContent =
                finalScore.toString();
              return;
            }

            // reset de l'interface avant de changer de question
            document.getElementById("summary").innerHTML = "";
            document.querySelector(
              'input[name="location"]:checked'
            ).checked = false;
            error.textContent = "";
            document.getElementById("confirmation").style.display = "block";

            // Afficher le message de chargement
            document.getElementById("loading").style.display = "flex";
            document.getElementById("container_cities").style.display = "none";
            document.getElementById("confirmation").style.display = "none";

            // Trouver deux nouveaux lieux valides
            const resultA = await pickRandomLocation();
            if (!resultA) {
              document.getElementById("loading").style.display = "none";
              alert("Impossible de trouver un premier lieu avec des mesures.");
              return;
            }

            const resultB = await pickRandomLocation(resultA.location);
            if (!resultB) {
              document.getElementById("loading").style.display = "none";
              alert("Impossible de trouver un deuxième lieu avec des mesures.");
              return;
            }

            // Cacher le message de chargement
            document.getElementById("loading").style.display = "none";
            document.getElementById("container_cities").style.display = "flex";
            document.getElementById("confirmation").style.display = "block";

            console.log("Lieu n°1", locationA);
            console.log("Lieu n°2 :", locationB);

            locationA = resultA.location;
            locationB = resultB.location;
            pmA = resultA.pm;
            pmB = resultB.pm;

            currentLocations = [locationA, locationB];
            currentLocations[0].pm25 = pmA;
            currentLocations[1].pm25 = pmB;

            const codeLocationA = locationA.country.code;
            const codeLocationB = locationB.country.code;

            // Endroit n°1
            locationName[0].textContent = locationA.name;
            countryFlag[0].textContent = getFlagEmoji(locationA.country.code);
            countryName[0].textContent = locationA.country.name;
            flagPicture[0].innerHTML = `<img src="https://flagsapi.com/${codeLocationA}/flat/64.png">`;

            // Endroit n°2
            locationName[1].textContent = locationB.name;
            countryFlag[1].textContent = getFlagEmoji(locationB.country.code);
            countryName[1].textContent = locationB.country.name;
            flagPicture[1].innerHTML = `<img src="https://flagsapi.com/${codeLocationB}/flat/64.png">`;
          });

        // 0.1s
      }, 100);
    });

  // refresh de la page pour rejouer
  document.getElementById("restartButton").addEventListener("click", () => {
    location.reload();
  });
});
