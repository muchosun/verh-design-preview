(() => {
  'use strict';
  const estimate = document.querySelector('[data-estimate-area]');
  const area = document.querySelector('[data-form-area]');
  const total = document.querySelector('[data-estimate-total]');
  const packages = document.querySelector('select[name="package"]');
  const money = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
  if (!estimate || !area || !total || !packages) return;
  const sync = (source) => {
    const target = source === estimate ? area : estimate;
    target.value = source.value;
    const value = Number(source.value);
    const valid = Number.isFinite(value) && value >= 30 && value <= 10000;
    total.textContent = valid ? `${money.format(value * 500)} ₽` : 'От 30 м²';
    estimate.setAttribute('aria-invalid', String(!valid));
    area.removeAttribute('aria-invalid');
  };
  estimate.addEventListener('input', () => sync(estimate));
  area.addEventListener('input', () => sync(area));
  const updateMinimum = () => {
    area.min = packages.value.startsWith('Полный') ? '50' : '30';
  };
  packages.addEventListener('change', updateMinimum);
  document.querySelectorAll('[data-package]').forEach(button => button.addEventListener('click', updateMinimum));
  updateMinimum();
  sync(estimate);
})();
