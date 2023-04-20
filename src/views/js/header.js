const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdown.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});
