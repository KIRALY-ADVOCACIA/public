(function () {
  'use strict';

  const LAUNCH_DATE = new Date('2026-07-01T12:00:00-03:00');
  const yayFormsId = 'Qek6d0K';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const distance = Math.max(0, LAUNCH_DATE.getTime() - now.getTime());

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    $('#days').textContent = days;
    $('#hours').textContent = pad(hours);
    $('#minutes').textContent = pad(minutes);
    $('#seconds').textContent = pad(seconds);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstLink = modal.querySelector('a, button');
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setupModals() {
    $$('[data-open-modal]').forEach((trigger) => {
      trigger.addEventListener('click', () => openModal(trigger.dataset.openModal));
    });

    $$('[data-close-modal]').forEach((trigger) => {
      trigger.addEventListener('click', () => closeModal(trigger.closest('.modal')));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        $$('.modal.is-open').forEach(closeModal);
      }
    });
  }

  function setupYayForms() {
    const button = $('#lawyerFormBtn');
    if (!button) return;

    button.addEventListener('click', () => {
      const existing = document.querySelector('[data-yf-sidetab]');
      if (!existing) {
        const mount = $('#yayformsMount') || document.body;
        const widget = document.createElement('div');
        widget.setAttribute('data-yf-sidetab', yayFormsId);
        widget.setAttribute('data-yf-button-text', 'PRECISO DE UM ADVOGADO');
        widget.setAttribute('data-yf-button-color', '#dea954');
        widget.style.all = 'unset';
        mount.appendChild(widget);
      }

      if (!document.querySelector('script[src*="embed.yayforms.link/next/embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://embed.yayforms.link/next/embed.js';
        script.async = true;
        document.body.appendChild(script);
      }

      setTimeout(() => {
        const candidate = document.querySelector('[data-yf-sidetab] button, [data-yf-sidetab] a, .yf-sidetab, [class*="sidetab"]');
        if (candidate && typeof candidate.click === 'function') {
          candidate.click();
        }
      }, 600);
    });
  }

  function setupPlaceholders() {
    $$('[data-placeholder="true"]').forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        const label = element.textContent.trim() || 'Link';
        alert(label + ': link em configuração.');
      });
    });
  }

  function setupReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    setupModals();
    setupYayForms();
    setupPlaceholders();
    setupReveal();
  });
})();
