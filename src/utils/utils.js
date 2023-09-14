import PropTypes from 'prop-types';

/**
 * Détermine le nombre de diapositives visibles en fonction de la largeur donnée.
 *
 * @param {number} width - La largeur actuelle de l'écran.
 * @returns {number} Le nombre de diapositives visibles en fonction de la largeur.
 */
const handleSlidesVisible = (width) => {
  switch (true) {
    case width < 768:
      return 2;
    case width >= 768 && width < 1024:
      return 3;
    case width >= 1024 && width < 1440:
      return 4;
    case width >= 1440:
      return 5;
    default:
      return 1;
  }
};

handleSlidesVisible.propTypes = {
  width: PropTypes.number.isRequired,
};

/**
 * Gère l'opacité des éléments <li> en fonction de leur débordement de la zone visible de la liste <ul>.
 */
const handleSlideOverflow = () => {
  const ul = document.querySelector('.slider');
  if (ul) {
    const lis = ul.querySelectorAll('li');
    const ulLeft = ul.getBoundingClientRect().left;
    const ulRight = ulLeft + ul.clientWidth;

    if (lis.length > 0) {
      lis.forEach((li) => {
        const liLeft = li.getBoundingClientRect().left;
        const liRight = liLeft + li.clientWidth - 15;

        if (liLeft > ulLeft && liRight < ulRight) {
          // L'élément li est entièrement visible dans la zone ul
          li.style.opacity = 1;
        } else {
          // L'élément li est partiellement ou entièrement en dehors de la zone ul
          li.style.opacity = 0.5;
        }
      });
    }
  }
};

/**
 * Convertit un nombre de minutes en une chaîne de caractères au format "hh h mm min".
 *
 * @param {number} minutes - Le nombre de minutes à convertir en heures et minutes.
 * @returns {string} Une chaîne de caractères au format "hh h mm min" ou "Invalid Input" si l'entrée est invalide.
 */
const handleFormatTime = (minutes) => {
  /**
   * Convertit un nombre de minutes en une chaîne de caractères au format "hh h mm min".
   *
   * @param {number} minutes - Le nombre de minutes à convertir en heures et minutes.
   * @returns {string} Une chaîne de caractères au format "hh h mm min" ou "Invalid Input" si l'entrée est invalide.
   */
    if (isNaN(minutes) || minutes < 0) {
      return 'Invalid Input';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours > 0 ? `${hours} h` : '';
    const formattedMinutes =
      remainingMinutes > 0 ? `${remainingMinutes} min` : '';

    if (formattedHours && formattedMinutes) {
      return `${formattedHours} ${formattedMinutes}`;
    } else if (formattedHours) {
      return formattedHours;
    } else if (formattedMinutes) {
      return formattedMinutes;
    } else {
      return '0 min'; // Si l'entrée est 0 minute
    }
};

export { handleFormatTime, handleSlidesVisible, handleSlideOverflow };
