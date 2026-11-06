document.documentElement.classList.add('js');

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => {
  if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  reveals.forEach(el => io.observe(el));
} else reveals.forEach(el => el.classList.add('in'));

// Active nav link
const links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-40% 0px -55% 0px' });
links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

// Dashboard mock (placeholder data)
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const data = {
  carbon: { title: 'Monthly carbon (tCO₂e)', unit: 'tCO₂e', vals: [7.1,7.8,8.4,9.2,9.9,10.6,11.2,11.8,12.6,13.2,13.2,12.4], delta: '−6%' },
  water:  { title: 'Monthly water (m³)', unit: 'm³', vals: [48,52,57,63,68,73,77,81,87,91,92,86], delta: '−7%' },
  energy: { title: 'Monthly energy (MWh)', unit: 'MWh', vals: [24,26,28,31,33,35,37,39,42,44,44,41], delta: '−7%' }
};
const toolNames = ['Chat assistants','Code copilots','Image generation','Internal models'];
const splits = { carbon: [46,28,16,10], water: [38,30,20,12], energy: [44,26,18,12] };
let metric = 'carbon';
const chart = document.getElementById('chart');
const period = document.getElementById('period');

function render() {
  const d = data[metric], n = +period.value;
  const vals = d.vals.slice(-n), labs = months.slice(-n);
  const max = Math.max(...vals);
  chart.innerHTML = vals.map((v, i) =>
    `<div class="bar-col${i === vals.length - 1 ? ' last' : ''}"><i style="height:${(v / max * 160).toFixed(0)}px" title="${labs[i]}: ${v} ${d.unit}"></i>${labs[i]}</div>`).join('');
  chart.setAttribute('aria-label', `${d.title}, latest ${vals[vals.length - 1]} ${d.unit}`);
  document.getElementById('chart-title').textContent = d.title;
  document.getElementById('kpi-total').textContent = `${vals[vals.length - 1]} ${d.unit}`;
  document.getElementById('kpi-delta').textContent = d.delta;
  document.getElementById('tools').innerHTML = toolNames.map((t, i) =>
    `<li><div class="row"><span>${t}</span><b>${splits[metric][i]}%</b></div><div class="track"><i style="width:${splits[metric][i]}%"></i></div></li>`).join('');
}
document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
  metric = b.dataset.metric; render();
}));
period.addEventListener('change', render);
render();

// Placeholder signup form
const form = document.getElementById('signup');
form.addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  form.querySelectorAll('input').forEach(i => i.classList.add('touched'));
  if (!form.checkValidity()) { msg.textContent = 'Please fill in all fields with a valid email.'; return; }
  msg.textContent = 'Thanks! (Beta preview — nothing was sent yet.)';
  form.reset();
  form.querySelectorAll('input').forEach(i => i.classList.remove('touched'));
});
