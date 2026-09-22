(function () {
  'use strict';

  var DRAFT_KEY = 'pnhd_custom_zone_draft_v1';
  var MIN_SUBMIT_SECONDS = 2;

  /* ── Analytics helper ──────────────────────────────────────────────── */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    var payload = Object.assign({ event: event }, params || {});
    window.dataLayer.push(payload);
    if (typeof window.ym === 'function' && window.YM_COUNTER_ID) {
      window.ym(window.YM_COUNTER_ID, 'reachGoal', event, params || {});
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    track('page_view');
  });

  document.querySelectorAll('[data-event="click_phone"]').forEach(function (el) {
    el.addEventListener('click', function () { track('click_phone'); });
  });
  document.querySelectorAll('[data-event="click_messenger"]').forEach(function (el) {
    el.addEventListener('click', function () { track('click_messenger'); });
  });
  document.querySelectorAll('[data-event="click_catalog"]').forEach(function (el) {
    el.addEventListener('click', function () { track('click_catalog'); });
  });
  document.querySelectorAll('[data-event="click_calc"]').forEach(function (el) {
    el.addEventListener('click', function () { track('click_calc'); });
  });

  /* ── Burger / mobile nav ───────────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('site-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Hidden analytics/UTM fields ───────────────────────────────────── */
  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || '';
  }
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  }
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/';
  }

  function fillHiddenFields() {
    var form = document.getElementById('lead-form');
    if (!form) return;

    form.querySelector('#page_url').value = window.location.href;
    form.querySelector('#referrer').value = document.referrer || '';
    form.querySelector('#started_at').value = String(Date.now());

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
      var fromQuery = getQueryParam(key);
      if (fromQuery) {
        setCookie(key, fromQuery, 90);
        form.querySelector('#' + key).value = fromQuery;
      } else {
        form.querySelector('#' + key).value = getCookie(key);
      }
    });

    var roistatVisit = getCookie('roistat_visit') || (window.roistat_visit || '');
    form.querySelector('#roistat_visit').value = roistatVisit;

    if (typeof window.ym === 'function' && window.YM_COUNTER_ID) {
      window.ym(window.YM_COUNTER_ID, 'getClientID', function (clientID) {
        form.querySelector('#ym_client_id').value = clientID || '';
      });
    }
  }
  fillHiddenFields();

  /* ── Draft persistence (sessionStorage) ────────────────────────────── */
  function readableFields(form) {
    return Array.from(form.querySelectorAll('input[name], textarea[name]')).filter(function (el) {
      return !['company_website'].includes(el.name) && el.type !== 'hidden' && el.type !== 'file' && el.type !== 'checkbox';
    });
  }

  function saveDraft(form) {
    try {
      var data = {};
      readableFields(form).forEach(function (el) { data[el.name] = el.value; });
      data.format = form.querySelector('#format_hidden').value;
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (e) { /* storage unavailable — ignore */ }
  }

  function restoreDraft(form) {
    try {
      var raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      readableFields(form).forEach(function (el) {
        if (data[el.name]) el.value = data[el.name];
      });
      if (data.format) selectFormat(data.format);
    } catch (e) { /* ignore malformed draft */ }
  }

  function clearDraft() {
    try { sessionStorage.removeItem(DRAFT_KEY); } catch (e) { /* ignore */ }
  }

  /* ── Format chips ──────────────────────────────────────────────────── */
  var chipButtons = document.querySelectorAll('#format-chips .chip');
  var formatHidden = document.getElementById('format_hidden');

  function selectFormat(value) {
    chipButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.format === value));
    });
    if (formatHidden) formatHidden.value = value;
  }

  chipButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectFormat(btn.dataset.format);
      track('select_format', { value: btn.dataset.format });
      saveDraft(document.getElementById('lead-form'));
    });
  });

  /* ── Phone mask ────────────────────────────────────────────────────── */
  function maskPhone(input) {
    input.addEventListener('input', function () {
      var digits = input.value.replace(/\D/g, '');
      if (digits.startsWith('8')) digits = '7' + digits.slice(1);
      if (!digits.startsWith('7')) digits = '7' + digits;
      digits = digits.slice(0, 11);

      var out = '+7';
      if (digits.length > 1) out += ' (' + digits.slice(1, 4);
      if (digits.length >= 4) out += ') ' + digits.slice(4, 7);
      if (digits.length >= 7) out += '-' + digits.slice(7, 9);
      if (digits.length >= 9) out += '-' + digits.slice(9, 11);
      input.value = out;
    });
  }

  var leadForm = document.getElementById('lead-form');
  if (leadForm) {
    var phoneInput = leadForm.querySelector('input[name="phone"]');
    if (phoneInput) maskPhone(phoneInput);
    restoreDraft(leadForm);
  }

  /* ── File attach ───────────────────────────────────────────────────── */
  var fileTrigger = document.getElementById('file-trigger');
  var fileInput = document.getElementById('file-input');
  var fileNameLabel = document.getElementById('file-name');
  var MAX_FILE_MB = 20;

  if (fileTrigger && fileInput) {
    fileTrigger.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (!file) { fileNameLabel.textContent = ''; return; }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        fileNameLabel.textContent = 'Файл больше ' + MAX_FILE_MB + ' МБ — выберите другой';
        fileInput.value = '';
        return;
      }
      fileNameLabel.textContent = file.name;
    });
  }

  /* ── Validation ────────────────────────────────────────────────────── */
  function digitsOnly(value) { return (value || '').replace(/\D/g, ''); }

  function isValidContact(value) {
    if (!value) return true;
    var v = value.trim();
    if (v.startsWith('@')) return v.length > 1;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function setFieldError(form, name, hasError) {
    var wrapper = form.querySelector('[data-field="' + name + '"]');
    if (!wrapper) return;
    wrapper.classList.toggle('field--error', hasError);
  }

  function validateForm(form, opts) {
    opts = opts || {};
    var errors = {};

    var name = form.querySelector('input[name="name"]').value.trim();
    if (!name) errors.name = true;

    var phone = form.querySelector('input[name="phone"]').value;
    if (digitsOnly(phone).length !== 11) errors.phone = true;

    var contact = form.querySelector('input[name="contact"]').value;
    if (!isValidContact(contact)) errors.contact = true;

    var consent = form.querySelector('input[name="consent"]');
    var consentOk = consent ? consent.checked : true;

    Object.keys({ name: 1, phone: 1, contact: 1 }).forEach(function (key) {
      setFieldError(form, key, !!errors[key] && (opts.showAll || opts.touched && opts.touched[key]));
    });

    return { valid: Object.keys(errors).length === 0 && consentOk, errors: errors, consentOk: consentOk };
  }

  if (leadForm) {
    var touched = {};
    var startedInteraction = false;

    ['name', 'phone', 'contact'].forEach(function (key) {
      var input = leadForm.querySelector('[name="' + key + '"]');
      if (!input) return;
      input.addEventListener('blur', function () {
        touched[key] = true;
        validateForm(leadForm, { touched: touched });
      });
      input.addEventListener('input', function () {
        if (!startedInteraction) {
          startedInteraction = true;
          track('form_start');
        }
        saveDraft(leadForm);
        if (touched[key]) validateForm(leadForm, { touched: touched });
      });
    });

    var submitBtn = document.getElementById('submit-btn');
    var statusEl = document.getElementById('form-status');
    var formCard = document.getElementById('form-card');

    function renderSuccess() {
      formCard.innerHTML =
        '<div class="form-success">' +
        '<span class="form-success__tag">Успешная отправка</span>' +
        '<p class="form-success__title h2--md">Заявка отправлена</p>' +
        '<p>Менеджер свяжется в рабочее время — ежедневно с 11:00 до 20:00. Обычно отвечаем в течение часа.</p>' +
        '<a class="btn btn--outline-black" href="https://telegram.me/pnhd_studio">Написать в Telegram</a>' +
        '</div>';
    }

    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (leadForm.querySelector('#company_website').value) {
        return; // honeypot triggered — silently drop
      }

      var startedAt = Number(leadForm.querySelector('#started_at').value || 0);
      if (startedAt && Date.now() - startedAt < MIN_SUBMIT_SECONDS * 1000) {
        return; // submitted too fast — likely a bot
      }

      var result = validateForm(leadForm, { showAll: true });
      if (!result.valid) {
        touched = { name: true, phone: true, contact: true };
        statusEl.textContent = !result.consentOk
          ? 'Подтвердите согласие на обработку персональных данных.'
          : 'Проверьте, пожалуйста, поля формы.';
        return;
      }

      var formData = new FormData(leadForm);
      var payload = {};
      formData.forEach(function (value, key) {
        if (key === 'attachment') return;
        payload[key] = value;
      });

      statusEl.textContent = '';
      submitBtn.disabled = true;
      submitBtn.classList.add('btn--disabled');
      submitBtn.textContent = 'Отправляем…';
      Array.from(leadForm.elements).forEach(function (el) { el.disabled = true; });

      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('bad_response');
          return res.json();
        })
        .then(function () {
          track('form_submit_success');
          clearDraft();
          renderSuccess();
        })
        .catch(function () {
          Array.from(leadForm.elements).forEach(function (el) { el.disabled = false; });
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn--disabled');
          submitBtn.textContent = 'Получить расчёт';
          statusEl.textContent = 'Не удалось отправить, попробуйте ещё раз или напишите в Telegram.';
        });
    });
  }

  /* ── Footer mini-form (same endpoint, minimal payload) ────────────── */
  var footerForm = document.getElementById('footer-form');
  if (footerForm) {
    footerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = footerForm.querySelector('input[name="name"]').value.trim();
      var phone = footerForm.querySelector('input[name="phone"]').value;
      var consent = footerForm.querySelector('input[type="checkbox"]');

      if (!name || digitsOnly(phone).length !== 11 || !consent.checked) {
        return;
      }

      var submitBtn = footerForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправляем…';

      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          phone: phone,
          service: 'Выездная кастом-зона',
          source: 'footer',
          page_url: window.location.href
        })
      })
        .then(function (res) { if (!res.ok) throw new Error('bad_response'); return res.json(); })
        .then(function () {
          track('form_submit_success', { source: 'footer' });
          footerForm.innerHTML = '<p style="color:#B4FB53;font-size:16px">Спасибо! Мы свяжемся с вами в ближайшее время.</p>';
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'проконсультироваться';
        });
    });
  }
})();
