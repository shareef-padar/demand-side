/**
 * Warehouse Booking App
 * Handles space selection, warehouse listing, date/duration picking, and booking flow.
 */
(function () {
  'use strict';

  /* ============================================
     STATE
     ============================================ */
  let selectedSqm = 50;
  let selectedWarehouseId = 1;
  let selectedDate = null;
  let selectedDuration = null;

  const DISCOUNTS = { 1: 0, 2: 0, 3: 5, 4: 8, 5: 10, 6: 12 };

  const WAREHOUSES = {
    1: {
      name: 'Al Quoz Industrial Block',
      loc: 'Al Quoz, Dubai',
      avail: '320 sqm',
      min: '10 sqm',
      height: '6m',
      price: 18
    },
    2: {
      name: 'SAIF Zone Logistics Park',
      loc: 'SAIF Zone, Sharjah',
      avail: '180 sqm',
      min: '20 sqm',
      height: '8m',
      price: 15
    },
    3: {
      name: 'Mussafah Industrial Zone',
      loc: 'Mussafah, Abu Dhabi',
      avail: '500 sqm',
      min: '50 sqm',
      height: '7m',
      price: 12
    }
  };

  /* ============================================
     DOM REFERENCES
     ============================================ */
  const $ = (id) => document.getElementById(id);
  const $all = (sel) => document.querySelectorAll(sel);

  /* ============================================
     UTILITIES
     ============================================ */
  function calcTotal(pricePerSqm, sqm, months) {
    const base = pricePerSqm * sqm * months;
    const disc = DISCOUNTS[months] ?? 0;
    const saving = Math.round(base * disc / 100);
    return { base, disc, saving, total: base - saving };
  }

  function updateListSubtitle() {
    const el = $('listSubtitle');
    if (el && selectedSqm) el.textContent = `for ${selectedSqm} sqm`;
  }

  /* ============================================
     NAVIGATION
     ============================================ */
  function goTo(screenNum) {
    $all('.screen').forEach((s) => s.classList.remove('active'));
    $('screen' + screenNum)?.classList.add('active');
    if (screenNum === 3) buildCalendar();
    const hint = $('demoHint');
    if (hint) setTimeout(() => (hint.style.opacity = '0'), 3000);
  }

  function goToDuration() {
    selectedDuration = null;
    $all('.duration-card').forEach((c) => c.classList.remove('selected'));
    const preview = $('pricePreview');
    if (preview) preview.classList.remove('visible');
    const confirmBtn = $('confirmDurationBtn');
    if (confirmBtn) confirmBtn.disabled = true;
    $all('.screen').forEach((s) => s.classList.remove('active'));
    $('screen4')?.classList.add('active');
  }

  /* ============================================
     SCREEN ACTIONS
     ============================================ */
  function setPreset(value) {
    $all('.preset').forEach((p) => p.classList.remove('selected'));
    const preset = document.querySelector(`[data-preset="${value}"]`);
    if (preset) preset.classList.add('selected');
    const sqmInput = $('sqmInput');
    if (sqmInput) {
      sqmInput.value = value;
      selectedSqm = value;
      updateListSubtitle();
    }
  }

  function selectWarehouse(id) {
    selectedWarehouseId = id;
    const wh = WAREHOUSES[id];
    if (!wh) return;

    const detailSqm = $('detailSqm');
    const detailTotal = $('detailTotal');
    if (detailSqm) detailSqm.textContent = selectedSqm + ' sqm';
    if (detailTotal) detailTotal.innerHTML = `AED ${(wh.price * selectedSqm).toLocaleString()} <span>/ mo</span>`;

    $('detailName') && ($('detailName').textContent = wh.name);
    $('detailLoc') && ($('detailLoc').textContent = wh.loc);
    $('detailAvail') && ($('detailAvail').textContent = wh.avail);
    $('detailMin') && ($('detailMin').textContent = wh.min);
    $('detailHeight') && ($('detailHeight').textContent = wh.height);
    $('detailPrice') && ($('detailPrice').textContent = 'AED ' + wh.price);

    goTo(2);
  }

  function selectDuration(months) {
    selectedDuration = months;
    $all('.duration-card').forEach((c) => c.classList.remove('selected'));
    const card = document.querySelector(`[data-duration="${months}"]`);
    if (card) card.classList.add('selected');

    const wh = WAREHOUSES[selectedWarehouseId];
    const { disc, saving, total } = calcTotal(wh.price, selectedSqm, months);

    $('ppSpace') && ($('ppSpace').textContent = selectedSqm + ' sqm');
    $('ppRate') && ($('ppRate').textContent = 'AED ' + wh.price + ' / sqm / mo');
    $('ppDuration') && ($('ppDuration').textContent = months + (months === 1 ? ' month' : ' months'));
    $('ppTotal') && ($('ppTotal').textContent = 'AED ' + total.toLocaleString());

    const discountRow = $('ppDiscountRow');
    const savingsEl = $('ppSavings');
    const ppDiscount = $('ppDiscount');
    const ppSavingsText = $('ppSavingsText');

    if (disc > 0) {
      if (discountRow) discountRow.style.display = 'flex';
      if (ppDiscount) ppDiscount.textContent = '-' + disc + '% (AED ' + saving.toLocaleString() + ')';
      if (savingsEl) savingsEl.style.display = 'flex';
      if (ppSavingsText) ppSavingsText.textContent = 'You save AED ' + saving.toLocaleString();
    } else {
      if (discountRow) discountRow.style.display = 'none';
      if (savingsEl) savingsEl.style.display = 'none';
    }

    const pricePreview = $('pricePreview');
    const confirmBtn = $('confirmDurationBtn');
    if (pricePreview) pricePreview.classList.add('visible');
    if (confirmBtn) confirmBtn.disabled = false;
  }

  function goToDurationSummary() {
    const wh = WAREHOUSES[selectedWarehouseId];
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' })
      : '—';
    const { disc, saving, total } = calcTotal(wh.price, selectedSqm, selectedDuration);
    const durLabel = selectedDuration + (selectedDuration === 1 ? ' Month' : ' Months');

    $('summaryWHName') && ($('summaryWHName').textContent = wh.name);
    $('summaryWHLoc') && ($('summaryWHLoc').textContent = '📍 ' + wh.loc);
    $('summarySpace') && ($('summarySpace').textContent = selectedSqm + ' sqm');
    $('summaryDate') && ($('summaryDate').textContent = dateStr);
    $('summaryDuration') && ($('summaryDuration').textContent = durLabel);
    $('summaryRate') && ($('summaryRate').textContent = 'AED ' + wh.price + '/sqm/mo');
    $('summaryTotal') && ($('summaryTotal').textContent = 'AED ' + total.toLocaleString());

    const discountRow = $('summaryDiscountRow');
    const summaryDiscount = $('summaryDiscount');
    if (disc > 0) {
      if (discountRow) discountRow.style.display = 'flex';
      if (summaryDiscount) summaryDiscount.textContent = '-' + disc + '% (save AED ' + saving.toLocaleString() + ')';
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }

    $all('.screen').forEach((s) => s.classList.remove('active'));
    $('screen5')?.classList.add('active');
  }

  function confirmBooking() {
    const wh = WAREHOUSES[selectedWarehouseId];
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' })
      : '—';
    const { disc, total } = calcTotal(wh.price, selectedSqm, selectedDuration);
    const durLabel = selectedDuration + (selectedDuration === 1 ? ' Month' : ' Months');
    const invNum = '#PI-2026-0' + Math.floor(Math.random() * 9000 + 1000);

    $('invNum') && ($('invNum').textContent = invNum);
    $('invWH') && ($('invWH').textContent = wh.name);
    $('invSpace') && ($('invSpace').textContent = selectedSqm + ' sqm');
    $('invDate') && ($('invDate').textContent = dateStr);
    $('invDuration') && ($('invDuration').textContent = durLabel + (disc > 0 ? ' (−' + disc + '%)' : ''));
    $('invRate') && ($('invRate').textContent = 'AED ' + wh.price + '/sqm/mo');
    $('invTotal') && ($('invTotal').textContent = 'AED ' + total.toLocaleString());

    goTo(6);
  }

  /* ============================================
     CALENDAR
     ============================================ */
  function buildCalendar() {
    const today = new Date(2026, 2, 2);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 15);

    const monthLabel = $('calMonthLabel');
    if (monthLabel) monthLabel.textContent = today.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const container = $('calDays');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day empty';
      container.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(today.getFullYear(), today.getMonth(), d);
      const dayEl = document.createElement('div');
      dayEl.textContent = d;
      dayEl.className = 'cal-day';

      if (thisDate < today) {
        dayEl.classList.add('past');
      } else if (thisDate <= maxDate) {
        dayEl.classList.add('available');
        if (d === today.getDate()) dayEl.classList.add('today');
        dayEl.addEventListener('click', () => {
          $all('.cal-day.selected').forEach((el) => el.classList.remove('selected'));
          dayEl.classList.add('selected');
          selectedDate = thisDate;
          const formatted = thisDate.toLocaleDateString('en-AE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          const display = $('selectedDateDisplay');
          const card = $('selectedDateCard');
          const btn = $('confirmDateBtn');
          const warning = $('dateWarning');
          if (display) display.textContent = formatted;
          if (card) card.style.display = 'block';
          if (btn) btn.disabled = false;
          if (warning) warning.style.display = 'none';
        });
      } else {
        dayEl.classList.add('beyond');
      }

      container.appendChild(dayEl);
    }
  }

  /* ============================================
     EVENT DELEGATION
     ============================================ */
  function init() {
    const sqmInput = $('sqmInput');
    if (sqmInput) {
      sqmInput.addEventListener('input', function () {
        const val = parseInt(this.value, 10);
        if (val && val >= 1) selectedSqm = val;
        $all('.preset').forEach((p) => p.classList.remove('selected'));
        updateListSubtitle();
      });
    }

    document.addEventListener('click', (e) => {
      const preset = e.target.closest('[data-preset]');
      if (preset) {
        setPreset(parseInt(preset.dataset.preset, 10));
        return;
      }

      const whCard = e.target.closest('[data-warehouse-id]');
      if (whCard) {
        selectWarehouse(parseInt(whCard.dataset.warehouseId, 10));
        return;
      }

      const durCard = e.target.closest('[data-duration]');
      if (durCard) {
        selectDuration(parseInt(durCard.dataset.duration, 10));
        return;
      }

      const backBtn = e.target.closest('[data-go-back]');
      if (backBtn) {
        goTo(parseInt(backBtn.dataset.goBack, 10));
        return;
      }

      const navBtn = e.target.closest('[data-go-to]');
      if (navBtn) {
        goTo(parseInt(navBtn.dataset.goTo, 10));
        return;
      }

      const durationBack = e.target.closest('[data-go-duration]');
      if (durationBack) {
        goToDuration();
        return;
      }

      const durationSummary = e.target.closest('[data-go-duration-summary]');
      if (durationSummary) {
        goToDurationSummary();
        return;
      }

      const confirmBtn = e.target.closest('[data-confirm-booking]');
      if (confirmBtn) {
        confirmBooking();
        return;
      }

      const demoDownload = e.target.closest('[data-demo-download]');
      if (demoDownload) {
        alert('Invoice download feature — connects to backend in production');
        return;
      }

      const demoShare = e.target.closest('[data-demo-share]');
      if (demoShare) {
        alert('Share via WhatsApp — triggers WhatsApp API in production');
        return;
      }
    });

    updateListSubtitle();

    const demoHint = $('demoHint');
    if (demoHint) setTimeout(() => (demoHint.style.opacity = '0'), 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
