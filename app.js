/* NURT CRM — pulpit demonstracyjny. Wszystkie dane są generowane, nic nie jest wysyłane. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- liczby ---------- */
  var nf = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 });
  var pln = function (n) { return nf.format(Math.round(n)) + ' zł'; };
  var kpln = function (n) { return n >= 1e6 ? (n / 1e6).toFixed(2).replace('.', ',') + ' mln zł' : nf.format(Math.round(n / 1000)) + ' tys. zł'; };
  var pct = function (n, d) { return (n * 100).toFixed(d == null ? 1 : d).replace('.', ',') + '%'; };

  /* deterministyczny generator, żeby demo wyglądało tak samo przy każdym wejściu */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var R = rng(20261011);

  var today = new Date(); today.setHours(0, 0, 0, 0);
  var DAYS = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  var MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  var MONTHS_G = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
  var dshort = function (d) { return d.getDate() + ' ' + MONTHS_G[d.getMonth()]; };
  $('[data-today]').textContent = DAYS[today.getDay()] + ', ' + today.getDate() + ' ' + MONTHS_G[today.getMonth()] + ' ' + today.getFullYear() + ' · dane demonstracyjne';
  $('[data-month]').textContent = MONTHS[today.getMonth()];

  /* dzienny przychód z 180 dni: trend + tydzień roboczy + szum */
  var SERIES = [];
  for (var i = 179; i >= 0; i--) {
    var d = new Date(today); d.setDate(d.getDate() - i);
    var wd = d.getDay(), weekend = wd === 0 || wd === 6;
    var trend = 13800 + (179 - i) * 38;
    var v = weekend ? trend * (0.12 + R() * 0.12) : trend * (0.75 + R() * 0.6);
    if (!weekend && R() > 0.93) v *= 1.9;
    SERIES.push({ d: d, v: v, leads: Math.round((weekend ? 6 : 15) + R() * (weekend ? 6 : 14)) });
  }

  /* ---------- tablica „Dziś do zrobienia” ---------- */
  var OWNERS = ['Anna Kowalczyk', 'Michał Wrona', 'Ewa Lis', 'Piotr Sadowski', 'Karolina Mazur'];
  var initials = function (n) { return n.split(' ').map(function (p) { return p[0]; }).join(''); };
  var TODO = [
    { t: '08:30', co: 'Bałtycka Logistyka', act: 'Telefon: decyzja zarządu', val: 186000, o: 1, s: 'late', note: 'opóźnione 2 dni' },
    { t: '09:15', co: 'Hydrotech Opole', act: 'Wysłać ofertę po audycie', val: 74000, o: 0, s: 'late', note: 'opóźnione 1 dzień' },
    { t: '10:00', co: 'Mleczarnia Zagórze', act: 'Demo dla działu zakupów', val: 52000, o: 2, s: 'now', note: 'teraz' },
    { t: '11:30', co: 'Przędza Studio', act: 'Negocjacja rabatu', val: 31500, o: 3, s: 'ok', note: 'na czas' },
    { t: '13:00', co: 'Kancelaria Fiszer', act: 'Podpis umowy', val: 48000, o: 0, s: 'ok', note: 'na czas' },
    { t: '14:45', co: 'Zielony Dach sp. z o.o.', act: 'Follow-up po webinarze', val: 12800, o: 4, s: 'ok', note: 'na czas' },
    { t: '16:00', co: 'Termoplast Gniezno', act: 'Przegląd odnowienia', val: 96000, o: 1, s: 'ok', note: 'na czas' }
  ];
  var board = $('[data-board]');
  function renderBoard() {
    board.innerHTML = TODO.map(function (r, i) {
      return '<div class="board__row is-' + (r.done ? 'done' : r.s) + '" role="row">' +
        '<span role="cell" class="board__t">' + r.t + '</span>' +
        '<span role="cell" class="board__what"><b class="board__co">' + r.co + '</b><span class="board__act">' + r.act + '</span></span>' +
        '<span role="cell" class="num board__val">' + pln(r.val) + '</span>' +
        '<span role="cell" class="board__own"><i class="who" title="' + OWNERS[r.o] + '">' + initials(OWNERS[r.o]) + '</i><span>' + OWNERS[r.o].split(' ')[0] + '</span></span>' +
        '<span role="cell" class="board__st"><i class="lamp" aria-hidden="true"></i>' + (r.done ? 'wykonano' : r.note) + '</span>' +
        '<span role="cell"><button type="button" class="tick" data-tick="' + i + '" aria-pressed="' + !!r.done + '" aria-label="' + (r.done ? 'Przywróć: ' : 'Oznacz jako wykonane: ') + r.act + ', ' + r.co + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></button></span>' +
        '</div>';
    }).join('');
    var left = TODO.filter(function (r) { return !r.done; }).length;
    $('[data-todo-left]').textContent = left;
    $('[data-todo-all]').textContent = TODO.length;
  }
  board.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tick]'); if (!b) return;
    var i = +b.getAttribute('data-tick');
    TODO[i].done = !TODO[i].done;
    renderBoard();
    var nb = $('[data-tick="' + i + '"]'); if (nb) nb.focus();
    if (TODO[i].done) toast('Wykonano: ' + TODO[i].act + ' · ' + TODO[i].co);
  });
  renderBoard();

  /* ---------- plan miesiąca ---------- */
  function workdays(from, to) { var n = 0, d = new Date(from); while (d <= to) { var w = d.getDay(); if (w && w < 6) n++; d.setDate(d.getDate() + 1); } return n; }
  (function pace() {
    var first = new Date(today.getFullYear(), today.getMonth(), 1);
    var last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var done = SERIES.filter(function (p) { return p.d >= first; }).reduce(function (s, p) { return s + p.v; }, 0);
    var goal = Math.round(workdays(first, last) * 24500 / 10000) * 10000;
    var wdAll = workdays(first, last), wdPast = workdays(first, today);
    var expected = goal * wdPast / wdAll;
    var tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    var wdLeft = Math.max(workdays(tomorrow, last), 1);
    $('[data-pace-done]').textContent = pln(done);
    $('[data-pace-goal]').textContent = pln(goal);
    $('[data-pace-fill]').style.setProperty('--w', Math.min(done / goal, 1));
    $('[data-pace-mark]').style.setProperty('--x', Math.min(expected / goal, 1));
    var diff = done / expected - 1;
    var v = $('[data-pace-verdict]');
    v.className = 'pace__verdict ' + (diff >= 0 ? 'is-up' : 'is-down');
    v.innerHTML = diff >= 0 ? '<b>' + pct(diff, 0) + ' przed tempem.</b> Utrzymaj dzienny przychód, a cel będzie przed końcem miesiąca.' : '<b>' + pct(-diff, 0) + ' za tempem.</b> Zamknij choć jedną z zaległych szans z tablicy.';
    $('[data-pace-left]').textContent = pln(Math.max(goal - done, 0));
    $('[data-pace-days]').textContent = wdLeft;
    $('[data-pace-need]').textContent = pln(Math.max(goal - done, 0) / wdLeft);
  })();

  /* ---------- wskaźniki okresu ---------- */
  var period = 30;
  function slice(n, offset) { return SERIES.slice(SERIES.length - n - offset, SERIES.length - offset); }
  function stats(n, offset) {
    var s = slice(n, offset);
    var rev = s.reduce(function (a, p) { return a + p.v; }, 0);
    var leads = s.reduce(function (a, p) { return a + p.leads; }, 0);
    var r2 = rng(n * 31 + offset * 7 + 3);
    var won = Math.round(leads * (0.044 + r2() * 0.012));
    return { rev: rev, leads: leads, won: won, conv: won / leads, avg: rev / Math.max(won, 1), cycle: 24 + Math.round(r2() * 9), mrr: rev / n * 30 * 0.31 };
  }
  var KPI_DEF = [
    { k: 'rev', label: 'Przychód', fmt: kpln },
    { k: 'mrr', label: 'Nowy MRR', fmt: kpln },
    { k: 'leads', label: 'Nowe leady', fmt: function (n) { return nf.format(n); } },
    { k: 'conv', label: 'Konwersja lead → klient', fmt: function (n) { return pct(n); } },
    { k: 'cycle', label: 'Śr. cykl sprzedaży', fmt: function (n) { return n + ' dni'; }, lowerBetter: true }
  ];
  var kpiBox = $('[data-kpis]');
  kpiBox.innerHTML = KPI_DEF.map(function (k) {
    return '<div class="kpi"><p class="kpi__label">' + k.label + '</p><p class="kpi__val" data-kv="' + k.k + '">—</p><p class="kpi__delta" data-kd="' + k.k + '">—</p></div>';
  }).join('');

  /* klapki: cyfry przewijają się jak na tablicy odlotów, potem stają na wartości */
  function flap(el, text) {
    if (reduce || !el.textContent || el.textContent === '—') { el.textContent = text; return; }
    var start = performance.now(), dur = 420, digits = '0123456789';
    el.classList.add('is-flap');
    (function step(now) {
      var k = Math.min((now - start) / dur, 1);
      var settled = Math.floor(text.length * k);
      var out = '';
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        out += (i >= settled && /\d/.test(ch)) ? digits[(Math.random() * 10) | 0] : ch;
      }
      el.textContent = out;
      if (k < 1) requestAnimationFrame(step); else { el.textContent = text; el.classList.remove('is-flap'); }
    })(start);
  }

  function renderKpis() {
    var a = stats(period, 0), b = stats(period, period);
    KPI_DEF.forEach(function (k) {
      flap($('[data-kv="' + k.k + '"]'), k.fmt(a[k.k]));
      var ch = (a[k.k] - b[k.k]) / b[k.k];
      var good = k.lowerBetter ? ch <= 0 : ch >= 0;
      var el = $('[data-kd="' + k.k + '"]');
      el.className = 'kpi__delta ' + (good ? 'is-up' : 'is-down');
      var arrow = ch >= 0 ? '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 10V2M2.5 5.5 6 2l3.5 3.5"/></svg>' : '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2v8M2.5 6.5 6 10l3.5-3.5"/></svg>';
      el.innerHTML = arrow + '<span>' + (ch >= 0 ? '+' : '−') + pct(Math.abs(ch)) + '</span><span class="kpi__vs">vs poprzednie ' + period + ' dni</span>';
    });
  }

  /* ---------- wykres przychodu (SVG) ---------- */
  var chartBox = $('[data-chart]');
  function bucket(arr, size) {
    var out = [];
    for (var i = 0; i < arr.length; i += size) {
      var part = arr.slice(i, i + size);
      out.push({ d: part[0].d, end: part[part.length - 1].d, v: part.reduce(function (s, p) { return s + p.v; }, 0) });
    }
    return out;
  }
  function renderChart() {
    var size = period === 90 ? 7 : 1;
    var now = bucket(slice(period, 0), size), prev = bucket(slice(period, period), size);
    var W = Math.max(chartBox.clientWidth, 280), H = Math.max(Math.min(W * 0.42, 320), 220);
    var P = { l: 52, r: 12, t: 14, b: 30 };
    var max = Math.max.apply(null, now.concat(prev).map(function (p) { return p.v; })) * 1.08;
    var step = Math.pow(10, Math.floor(Math.log10(max / 4)));
    var tick = Math.ceil(max / 4 / step) * step;
    max = tick * 4;
    var x = function (i) { return P.l + (W - P.l - P.r) * (now.length === 1 ? 0.5 : i / (now.length - 1)); };
    var y = function (v) { return P.t + (H - P.t - P.b) * (1 - v / max); };
    var line = function (arr) { return arr.map(function (p, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.v).toFixed(1); }).join(''); };
    var grid = '';
    for (var g = 0; g <= 4; g++) {
      var gy = y(tick * g);
      grid += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + gy + '" y2="' + gy + '" class="c-grid"/>' +
        '<text x="' + (P.l - 8) + '" y="' + (gy + 4) + '" class="c-ax" text-anchor="end">' + (tick * g >= 1000 ? nf.format(tick * g / 1000) + ' tys.' : 0) + '</text>';
    }
    var labels = '', every = Math.ceil(now.length / (W < 520 ? 4 : 7));
    now.forEach(function (p, i) { if (i % every === 0 || i === now.length - 1 && now.length < 10) labels += '<text x="' + x(i) + '" y="' + (H - 8) + '" class="c-ax" text-anchor="middle">' + dshort(p.d) + '</text>'; });
    var area = line(now) + 'L' + x(now.length - 1) + ' ' + y(0) + 'L' + x(0) + ' ' + y(0) + 'Z';
    chartBox.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Przychód ' + (size === 7 ? 'tygodniowy' : 'dzienny') + ' w ostatnich ' + period + ' dniach na tle poprzedniego okresu">' +
      '<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="c-ga1"/><stop offset="1" class="c-ga2"/></linearGradient></defs>' +
      grid + labels +
      '<path d="' + area + '" fill="url(#ga)"/>' +
      '<path d="' + line(prev) + '" class="c-prev"/>' +
      '<path d="' + line(now) + '" class="c-now" pathLength="1"/>' +
      '<line class="c-cross" y1="' + P.t + '" y2="' + (H - P.b) + '" x1="0" x2="0"/>' +
      '<circle class="c-dot" r="5" cx="0" cy="0"/>' +
      '</svg><div class="tip" data-tip></div>';
    var svg = $('svg', chartBox), cross = $('.c-cross', chartBox), dot = $('.c-dot', chartBox), tip = $('[data-tip]', chartBox);
    function show(clientX) {
      var r = svg.getBoundingClientRect();
      var px = (clientX - r.left) * (W / r.width);
      var i = Math.round((px - P.l) / (W - P.l - P.r) * (now.length - 1));
      i = Math.max(0, Math.min(now.length - 1, i));
      var cx = x(i);
      cross.setAttribute('x1', cx); cross.setAttribute('x2', cx);
      dot.setAttribute('cx', cx); dot.setAttribute('cy', y(now[i].v));
      chartBox.classList.add('is-hover');
      var p = now[i], q = prev[i];
      tip.innerHTML = '<b>' + (size === 7 ? dshort(p.d) + '–' + dshort(p.end) : DAYS[p.d.getDay()].slice(0, 3) + ', ' + dshort(p.d)) + '</b><span><i class="sw sw--now"></i>' + pln(p.v) + '</span>' + (q ? '<span><i class="sw sw--prev"></i>' + pln(q.v) + '</span>' : '');
      var left = cx / W * r.width;
      tip.style.left = Math.min(Math.max(left, 80), r.width - 80) + 'px';
    }
    svg.addEventListener('pointermove', function (e) { show(e.clientX); });
    svg.addEventListener('pointerdown', function (e) { show(e.clientX); });
    svg.addEventListener('pointerleave', function () { chartBox.classList.remove('is-hover'); });
  }

  /* ---------- lejek ---------- */
  function renderFunnel() {
    var s = stats(period, 0);
    var leads = s.leads;
    var steps = [
      { n: 'Nowe leady', v: leads },
      { n: 'Zakwalifikowane', v: Math.round(leads * 0.39) },
      { n: 'Oferta wysłana', v: Math.round(leads * 0.17) },
      { n: 'Negocjacje', v: Math.round(leads * 0.083) },
      { n: 'Wygrane', v: s.won }
    ];
    $('[data-funnel]').innerHTML = steps.map(function (st, i) {
      var conv = i ? st.v / steps[i - 1].v : null;
      var weak = conv !== null && conv < 0.45;
      return '<li class="fn' + (weak ? ' is-weak' : '') + '">' +
        '<div class="fn__top"><span class="fn__name">' + st.n + '</span><b class="fn__v">' + nf.format(st.v) + '</b></div>' +
        '<div class="fn__bar"><span style="--w:' + (st.v / leads) + '"></span></div>' +
        (conv !== null ? '<p class="fn__conv">' + pct(conv, 0) + ' z poprzedniego etapu' + (weak ? ' · najsłabsze przejście' : '') + '</p>' : '') +
        '</li>';
    }).join('');
    // tylko najsłabsze przejście zostaje oznaczone
    var items = $$('.fn.is-weak');
    if (items.length > 1) {
      var worst = null, wv = 2;
      items.forEach(function (li) { var v = parseFloat(li.querySelector('.fn__conv').textContent.replace(',', '.')); if (v < wv) { wv = v; worst = li; } });
      items.forEach(function (li) { if (li !== worst) { li.classList.remove('is-weak'); var c = li.querySelector('.fn__conv'); c.textContent = c.textContent.replace(' · najsłabsze przejście', ''); } });
    }
    $('[data-period-tag]').textContent = period + ' dni';
  }

  /* ---------- źródła ---------- */
  var SRC = [
    { n: 'Polecenia', share: 0.24, conv: 0.112 },
    { n: 'Google Ads', share: 0.31, conv: 0.038 },
    { n: 'LinkedIn', share: 0.17, conv: 0.052 },
    { n: 'Strona www', share: 0.2, conv: 0.041 },
    { n: 'Targi i wydarzenia', share: 0.08, conv: 0.067 }
  ];
  function renderSources() {
    var leads = stats(period, 0).leads;
    var maxShare = Math.max.apply(null, SRC.map(function (s) { return s.share; }));
    var best = SRC.slice().sort(function (a, b) { return b.conv - a.conv; })[0];
    $('[data-sources]').innerHTML = '<ul class="src">' + SRC.map(function (s) {
      return '<li class="src__row"><span class="src__n">' + s.n + '</span>' +
        '<span class="src__bar"><span style="--w:' + (s.share / maxShare) + '"></span></span>' +
        '<b class="num">' + nf.format(Math.round(leads * s.share)) + '</b>' +
        '<span class="num src__c' + (s === best ? ' is-best' : '') + '">' + pct(s.conv) + '</span></li>';
    }).join('') + '</ul><p class="note">Polecenia dają najmniej leadów na koszt, ale konwertują prawie <b>3× lepiej</b> niż reklamy.</p>';
  }

  /* ---------- zespół ---------- */
  var TEAM = [
    { o: 0, won: 9, rev: 168400, plan: 150000 },
    { o: 1, won: 7, rev: 142900, plan: 150000 },
    { o: 2, won: 11, rev: 121300, plan: 120000 },
    { o: 3, won: 5, rev: 86200, plan: 120000 },
    { o: 4, won: 6, rev: 64800, plan: 90000 }
  ];
  function renderTeam() {
    var k = period / 30;
    $('[data-team]').innerHTML = '<ul class="team__list">' + TEAM.map(function (t) {
      var rev = t.rev * k, plan = t.plan * k, r = rev / plan;
      return '<li class="tm' + (r < 0.8 ? ' is-low' : '') + '"><i class="who">' + initials(OWNERS[t.o]) + '</i>' +
        '<div class="tm__main"><div class="tm__top"><b>' + OWNERS[t.o] + '</b><span class="num">' + pct(r, 0) + '</span></div>' +
        '<div class="tm__bar"><span style="--w:' + Math.min(r, 1.2) / 1.2 + '"></span><i style="--x:' + (1 / 1.2) + '"></i></div>' +
        '<p class="tm__sub"><span class="num">' + kpln(rev) + '</span> · ' + Math.round(t.won * k) + ' wygranych</p></div></li>';
    }).join('') + '</ul>';
  }

  /* ---------- szanse ---------- */
  var STAGES = ['Kwalifikacja', 'Oferta', 'Negocjacje', 'Wygrana', 'Przegrana'];
  var COS = ['Bałtycka Logistyka', 'Hydrotech Opole', 'Mleczarnia Zagórze', 'Przędza Studio', 'Kancelaria Fiszer', 'Zielony Dach sp. z o.o.', 'Termoplast Gniezno', 'Akademia Ruchu', 'Browar Kormoran Pole', 'Dental Line Kielce', 'Ekoserwis Pomorze', 'Fabryka Mebli Orzeł', 'Galeria Wnętrz Sopot', 'Instal-Bud Rzeszów', 'Klinika Weterynaryjna Ogon', 'Lakiernia Nova', 'Medsoft Lublin', 'Nordic Fit Gdańsk', 'Optima Księgowość', 'Piekarnia Jasna', 'Pralnia Biel', 'Szkoła Językowa Lingwa', 'Tartak Sosnowy', 'Transbud Kalisz', 'Uniterm Ciepło', 'Velo Serwis', 'Winnica Pod Lipą', 'Zakład Poligraficzny Druk-Art', 'Agencja Pixel Most', 'Studio Architektury Linia', 'Centrum Rehabilitacji Krok', 'Hurtownia Elektro-Max', 'Kwiaciarnia Bukiet', 'Logos Tłumaczenia', 'Meblarnia Dąb', 'Ośrodek Szkoleń BHP Tarcza'];
  var NEXT = ['Zadzwonić z odpowiedzią na pytania o wdrożenie.', 'Wysłać zaktualizowaną ofertę z rabatem rocznym.', 'Umówić demo dla drugiego decydenta.', 'Przesłać umowę do podpisu przez e-podpis.', 'Przypomnieć o terminie ważności oferty.', 'Zebrać wymagania integracji z systemem księgowym.'];
  var DEALS = COS.map(function (c, i) {
    var r = rng(i * 97 + 11);
    var stage = i < 7 ? [2, 1, 0, 2, 2, 0, 1][i] : Math.floor(r() * 5);
    var prob = [0.2, 0.4, 0.65, 1, 0][stage] + (stage < 3 ? (r() - 0.5) * 0.12 : 0);
    var last = new Date(today); last.setDate(last.getDate() - Math.floor(r() * (stage > 2 ? 40 : 18)));
    return {
      company: c, stage: stage, value: i < 7 ? TODO[i].val : Math.round((8 + r() * 180) * 1000 / 100) * 100,
      prob: Math.max(0, Math.min(1, prob)), last: last, owner: i < 7 ? TODO[i].o : Math.floor(r() * 5),
      next: NEXT[Math.floor(r() * NEXT.length)], src: SRC[Math.floor(r() * SRC.length)].n, seats: 5 + Math.floor(r() * 60)
    };
  });
  var sortKey = 'value', sortDir = -1, stageFilter = -1, query = '', shown = 10;
  var chipBox = $('[data-stage-filter]');
  chipBox.innerHTML = '<button type="button" class="chip is-on" data-stage="-1" aria-pressed="true">Wszystkie</button>' + STAGES.map(function (s, i) { return '<button type="button" class="chip" data-stage="' + i + '" aria-pressed="false">' + s + '</button>'; }).join('');
  chipBox.addEventListener('click', function (e) {
    var b = e.target.closest('[data-stage]'); if (!b) return;
    stageFilter = +b.getAttribute('data-stage'); shown = 10;
    $$('.chip', chipBox).forEach(function (c) { var on = c === b; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on); });
    renderDeals();
  });
  function daysAgo(d) { var n = Math.round((today - d) / 864e5); return n === 0 ? 'dziś' : n === 1 ? 'wczoraj' : n + ' dni temu'; }
  function filtered() {
    var q = query.trim().toLowerCase();
    return DEALS.filter(function (d) {
      return (stageFilter < 0 || d.stage === stageFilter) && (!q || d.company.toLowerCase().indexOf(q) > -1 || OWNERS[d.owner].toLowerCase().indexOf(q) > -1);
    }).sort(function (a, b) {
      var x = a[sortKey], y = b[sortKey];
      if (sortKey === 'owner') { x = OWNERS[x]; y = OWNERS[y]; }
      if (typeof x === 'string') return x.localeCompare(y, 'pl') * sortDir;
      return (x - y) * sortDir;
    });
  }
  function renderDeals() {
    var list = filtered();
    $('[data-rows]').innerHTML = list.slice(0, shown).map(function (d) {
      var stale = d.stage < 3 && (today - d.last) / 864e5 > 10;
      return '<tr data-deal="' + DEALS.indexOf(d) + '" tabindex="0">' +
        '<th scope="row"><span class="co">' + d.company + '</span></th>' +
        '<td><span class="stage stage--' + d.stage + '">' + STAGES[d.stage] + '</span></td>' +
        '<td class="num">' + pln(d.value) + '</td>' +
        '<td class="num"><span class="prob"><span style="--w:' + d.prob + '"></span></span>' + Math.round(d.prob * 100) + '%</td>' +
        '<td class="' + (stale ? 'is-stale' : '') + '">' + daysAgo(d.last) + (stale ? '<span class="sr"> (brak kontaktu ponad 10 dni)</span>' : '') + '</td>' +
        '<td><span class="own"><i class="who">' + initials(OWNERS[d.owner]) + '</i>' + OWNERS[d.owner] + '</span></td></tr>';
    }).join('');
    $('[data-empty]').hidden = list.length > 0;
    var vis = Math.min(shown, list.length);
    $('[data-row-count]').textContent = list.length ? 'Pokazano ' + vis + ' z ' + list.length + ' · w lejku ' + pln(list.filter(function (d) { return d.stage < 3; }).reduce(function (s, d) { return s + d.value * d.prob; }, 0)) + ' ważone szansą' : '';
    $('[data-more]').hidden = list.length <= shown;
  }
  $$('[data-sort]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-sort');
      if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = (k === 'company' || k === 'owner' || k === 'stage') ? 1 : -1; }
      $$('th[aria-sort]').forEach(function (th) { th.setAttribute('aria-sort', 'none'); });
      b.parentNode.setAttribute('aria-sort', sortDir > 0 ? 'ascending' : 'descending');
      renderDeals();
    });
  });
  $('[data-more]').addEventListener('click', function () { shown += 10; renderDeals(); });
  $('[data-clear]').addEventListener('click', function () { query = ''; $('[data-search]').value = ''; stageFilter = -1; $$('.chip', chipBox).forEach(function (c, i) { c.classList.toggle('is-on', !i); c.setAttribute('aria-pressed', !i); }); renderDeals(); });
  var searchT;
  $('[data-search]').addEventListener('input', function (e) {
    query = e.target.value; shown = 10; renderDeals();
    clearTimeout(searchT);
    searchT = setTimeout(function () { if (query.trim()) $('#szanse').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }, 450);
  });

  /* ---------- karta szansy ---------- */
  var sheet = $('#deal'), lastFocus;
  function openDeal(i) {
    var d = DEALS[i];
    $('[data-d-name]').textContent = d.company;
    $('[data-d-stage]').innerHTML = '<span class="stage stage--' + d.stage + '">' + STAGES[d.stage] + '</span>';
    $('[data-d-facts]').innerHTML = [
      ['Wartość', pln(d.value)], ['Szansa', Math.round(d.prob * 100) + '%'], ['Opiekun', OWNERS[d.owner]],
      ['Źródło', d.src], ['Licencje', d.seats + ' stanowisk'], ['Ostatni kontakt', daysAgo(d.last)]
    ].map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('');
    $('[data-d-next]').textContent = d.stage === 3 ? 'Przekazać klienta do wdrożenia i zaplanować spotkanie startowe.' : d.stage === 4 ? 'Zapisać powód przegranej i wrócić z ofertą za 6 miesięcy.' : d.next;
    var steps = [['Lead z kanału: ' + d.src, 28], ['Rozmowa kwalifikująca', 21]];
    if (d.stage >= 1) steps.push(['Oferta wysłana', 12]);
    if (d.stage >= 2) steps.push(['Negocjacje warunków', 6]);
    if (d.stage === 3) steps.push(['Umowa podpisana', 1]);
    if (d.stage === 4) steps.push(['Klient wybrał inną ofertę', 2]);
    $('[data-d-timeline]').innerHTML = steps.reverse().map(function (s) {
      var dt = new Date(d.last); dt.setDate(dt.getDate() - s[1] + 1);
      return '<li><time>' + dshort(dt) + '</time><span>' + s[0] + '</span></li>';
    }).join('');
    lastFocus = document.activeElement;
    sheet.classList.add('is-open'); sheet.setAttribute('aria-hidden', 'false');
    setTimeout(function () { $('.sheet__panel').focus(); }, 20);
  }
  function closeDeal() { if (!sheet.classList.contains('is-open')) return; sheet.classList.remove('is-open'); sheet.setAttribute('aria-hidden', 'true'); if (lastFocus) lastFocus.focus(); }
  $('[data-rows]').addEventListener('click', function (e) { var tr = e.target.closest('[data-deal]'); if (tr) openDeal(+tr.getAttribute('data-deal')); });
  $('[data-rows]').addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-deal]')) { e.preventDefault(); openDeal(+e.target.getAttribute('data-deal')); } });
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeDeal); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDeal();
    if (e.key === 'Tab' && sheet.classList.contains('is-open')) {
      var f = $$('button', $('.sheet__panel'));
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- okres ---------- */
  function setPeriod(p) {
    period = p;
    $$('[data-period]').forEach(function (b) { var on = +b.getAttribute('data-period') === p; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); });
    renderKpis(); renderChart(); renderFunnel(); renderSources(); renderTeam();
  }
  $$('[data-period]').forEach(function (b) { b.addEventListener('click', function () { setPeriod(+b.getAttribute('data-period')); }); });

  /* ---------- motyw ---------- */
  $('[data-theme-toggle]').addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('nurt-theme', next); } catch (e) {}
  });

  /* ---------- nawigacja: aktywna sekcja ---------- */
  var navTargets = ['lejek', 'zrodla', 'szanse'];
  var navT;
  function syncNav() {
    var cur = 'top';
    navTargets.forEach(function (id) { var el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * 0.45) cur = id; });
    $$('[data-nav]').forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', function () { if (navT) return; navT = requestAnimationFrame(function () { navT = 0; syncNav(); }); }, { passive: true });

  /* toast */
  var toastEl = $('[data-toast]'), tt;
  function toast(m) { toastEl.textContent = m; toastEl.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2800); }

  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderChart, 120); });
  setPeriod(30);
  renderDeals();
})();
