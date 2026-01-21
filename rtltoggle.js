document.addEventListener('DOMContentLoaded', function () {
  initRTLToggle();
});

function initRTLToggle() {
  const savedDirection = localStorage.getItem('direction') || 'ltr';
  applyDirection(savedDirection);
  updateRTLIcon(savedDirection);

  const rtlToggle = document.querySelector('.rtl-toggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', function () {
      const currentDirection = document.documentElement.getAttribute('dir') || 'ltr';
      const newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';

      applyDirection(newDirection);
      localStorage.setItem('direction', newDirection);
      updateRTLIcon(newDirection);
    });
  }
}

function applyDirection(direction) {
  // Apply to both html and body elements
  document.documentElement.setAttribute('dir', direction);
  document.body.setAttribute('dir', direction);

  // Also set the lang attribute hint for RTL languages
  if (direction === 'rtl') {
    document.documentElement.setAttribute('lang', 'ar'); // Arabic as example
  } else {
    document.documentElement.setAttribute('lang', 'en');
  }
}

function updateRTLIcon(direction) {
  const rtlToggle = document.querySelector('.rtl-toggle');
  if (rtlToggle) {
    // Use globe emoji for RTL/LTR toggle
    rtlToggle.innerHTML = '🌐';
    rtlToggle.style.fontSize = '1.2rem';
    if (direction === 'ltr') {
      rtlToggle.setAttribute('title', 'Switch to RTL (Right-to-Left)');
    } else {
      rtlToggle.setAttribute('title', 'Switch to LTR (Left-to-Right)');
    }
  }
}
