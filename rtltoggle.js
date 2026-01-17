document.addEventListener('DOMContentLoaded', function () {
  initRTLToggle();
});

function initRTLToggle() {
  const savedDirection = localStorage.getItem('direction') || 'ltr';
  document.body.setAttribute('dir', savedDirection);
  document.documentElement.setAttribute('dir', savedDirection);

  updateRTLIcon(savedDirection);

  const rtlToggle = document.querySelector('.rtl-toggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', function () {
      const currentDirection = document.body.getAttribute('dir');
      const newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';

      document.body.setAttribute('dir', newDirection);
      document.documentElement.setAttribute('dir', newDirection);
      localStorage.setItem('direction', newDirection);
      updateRTLIcon(newDirection);
    });
  }
}

function updateRTLIcon(direction) {
  const rtlToggle = document.querySelector('.rtl-toggle');
  if (rtlToggle) {
    // Use FontAwesome icon
    rtlToggle.innerHTML = '<i class="fas fa-globe"></i>';
    rtlToggle.setAttribute('title', direction === 'ltr' ? 'Switch to RTL' : 'Switch to LTR');
  }
}
