import Buzon from './buzon.js';

(function() {
  const persons = [
    { name: 'Gian', avatar: './img/pacman2.png' },
    { name: 'Jorge', avatar: './img/pacman2.png' },
    { name: 'Riesco', avatar: './img/pacman2.png' },
    { name: 'Juli', avatar: './img/pacman2.png' },
    { name: 'Ricardo', avatar: './img/pacman2.png' },
    { name: 'Jesús', avatar: './img/pacman2.png' },
  ];
  const $mainImage = document.querySelector('#main-image');
  const $mainTitle = document.querySelector('#main-title');
  const $mainDate = document.querySelector('#main-date');
  const $buzonList = document.querySelector('#buzon-list');
  const $buzonItemTemplate = document.querySelector('#buzon-item-template');

  const buzon = new Buzon({
    startDate: '2021-04-07',
    persons
  });

  const currentPerson = buzon.getPerson();
  const cycleStartDate = new Date(buzon.getCycleStartDate().getTime() + buzon.dayLength);

  $mainImage.src = currentPerson.avatar;
  $mainTitle.innerText = currentPerson.name;
  $mainDate.innerText = cycleStartDate.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });

  const currentPersonIndex = persons.indexOf(currentPerson);
  const buzonList = [
      ...persons.slice(currentPersonIndex),
      ...persons.slice(0, currentPersonIndex)
    ]
    .filter((person) => person !== currentPerson)
    .map((person, index) => ({
      ...person,
      startDate: new Date(cycleStartDate.getTime() + (buzon.weekLength * (index + 1)))
    }));
  $buzonList.innerHTML = buzonList.map(getItemTemplate).join('');

  function getItemTemplate(person) {
    return $buzonItemTemplate.innerHTML
      .split('{{name}}').join(person.name)
      .split('{{date}}').join(person.startDate.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' }))
      .split('{{image}}').join(person.avatar);
  }

})();