/* =========================
   MATRIX BACKGROUND
========================= */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const glyphs = "01SOCDFIRMITRELOGSIRHUNTEDR";
let fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }, () => Math.random() * canvas.height);

function drawMatrix(){
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;
  ctx.fillStyle = "rgba(0,255,170,0.85)";

  for (let i = 0; i < drops.length; i++){
    const text = glyphs[Math.floor(Math.random() * glyphs.length)];
    ctx.fillText(text, i * fontSize, drops[i]);
    if (drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += fontSize;
  }
}
setInterval(drawMatrix, 33);

/* =========================
   THEME TOGGLE
========================= */
const btnTheme = document.getElementById("btnTheme");
btnTheme.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  document.documentElement.setAttribute("data-theme", isLight ? "dark" : "light");
});

/* =========================
   KPIs + FEED SIM
========================= */
const elAlerts = document.getElementById("kpiAlerts");
const elInc = document.getElementById("kpiIncidents");
const elMTTD = document.getElementById("kpiMTTD");
const elContain = document.getElementById("kpiContain");
const feedEl = document.getElementById("feed");

const kpi = {
  alerts: 128,
  incidents: 6,
  mttd: 14,
  contain: 92
};

function animateNumber(el, from, to, duration=650){
  const start = performance.now();
  function tick(now){
    const t = Math.min(1, (now - start)/duration);
    const v = Math.round(from + (to - from) * t);
    el.textContent = v;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderKPIs(){
  animateNumber(elAlerts, Number(elAlerts.textContent||0), kpi.alerts);
  animateNumber(elInc, Number(elInc.textContent||0), kpi.incidents);
  animateNumber(elMTTD, Number(elMTTD.textContent||0), kpi.mttd);
  animateNumber(elContain, Number(elContain.textContent||0), kpi.contain);
}
renderKPIs();

const feedTemplates = [
  { sev:"LOW",  msg:"Suspicious PowerShell command line observed (encoded)" },
  { sev:"MED",  msg:"Multiple failed logins followed by success (possible brute force)" },
  { sev:"HIGH", msg:"New persistence mechanism detected (Run key modification)" },
  { sev:"MED",  msg:"Unusual outbound DNS volume (possible tunneling)" },
  { sev:"HIGH", msg:"Malicious attachment executed (macro behavior chain)" },
  { sev:"LOW",  msg:"New device joined domain (verify legitimacy)" },
  { sev:"MED",  msg:"SIEM correlation: lateral movement indicators (SMB/PSExec)" },
  { sev:"HIGH", msg:"EDR: suspicious LSASS access attempt blocked" }
];

function nowStamp(){
  const d = new Date();
  return d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", second:"2-digit"});
}

function pushFeed(sev, message){
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="meta">[${nowStamp()}] • SEV:${sev}</div>
    <div class="msg">${message}</div>
  `;
  feedEl.prepend(li);

  // keep short
  while (feedEl.children.length > 8) feedEl.removeChild(feedEl.lastChild);
}

function simTick(){
  // tiny KPI movement
  kpi.alerts += Math.random() > 0.6 ? 1 : 0;
  if (Math.random() > 0.85) kpi.incidents += 1;
  kpi.mttd = Math.max(6, Math.min(25, kpi.mttd + (Math.random() > 0.5 ? 1 : -1)));
  kpi.contain = Math.max(70, Math.min(99, kpi.contain + (Math.random() > 0.6 ? 1 : -1)));

  renderKPIs();

  const ev = feedTemplates[Math.floor(Math.random()*feedTemplates.length)];
  pushFeed(ev.sev, ev.msg);
}
for (let i=0;i<3;i++) pushFeed("INFO", "SOC feed initialized — monitoring telemetry…");
setInterval(simTick, 3200);

/* =========================
   TERMINAL ENGINE
========================= */
const out = document.getElementById("termOut");
const input = document.getElementById("termInput");
const ac = document.getElementById("autocomplete");
const btnCopy = document.getElementById("btnCopy");

const COMMANDS = [
  "help","about","skills","projects","dashboard","feed","contact","links","clear","theme","banner"
];

const LINKS = {
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/yourprofile",
  resume: "#"
};

btnCopy.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText("contact");
    toast("Copied: contact");
  }catch{
    toast("Copy blocked by browser");
  }
});

function toast(text){
  writeLine(`[*] ${text}`, "muted");
}

function writeLine(text, cls=""){
  const p = document.createElement("div");
  p.className = `termLine ${cls}`.trim();
  p.innerHTML = text;
  out.appendChild(p);
  out.scrollTop = out.scrollHeight;
}

function promptLine(cmd){
  writeLine(`<span class="label">mooka@soc</span><span class="sep">:</span><span class="path">~</span><span class="sep">$</span> ${escapeHtml(cmd)}`);
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

/* Boot typing */
const bootLines = [
  "Initializing Cyber Defense System...",
  "Loading modules: SIEM, EDR, DFIR, ThreatIntel...",
  "Establishing secure channel... OK",
  "Welcome, operator."
];

async function typeBoot(){
  for (const line of bootLines){
    await typeLine(line, 18);
  }
  writeLine(`Type <span class="kbd">help</span> to view commands.`, "muted");
  writeLine(`Tip: Try <span class="kbd">banner</span>`, "muted");
}
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

async function typeLine(text, speed=14){
  const holder = document.createElement("div");
  holder.className = "termLine";
  out.appendChild(holder);
  for (let i=0;i<=text.length;i++){
    holder.textContent = text.slice(0,i);
    out.scrollTop = out.scrollHeight;
    await sleep(speed);
  }
}

function banner(){
  writeLine(
`<span class="label">┌─[</span><span class="path">Mohamed Mooka</span><span class="label">]──────────────────────────────┐</span>`, "muted"
  );
  writeLine(`<span class="label">│</span> Role: <span class="path">Cybersecurity Analyst</span> • SOC • DFIR         <span class="label">│</span>`);
  writeLine(`<span class="label">│</span> Focus: Detection • IR • Threat Hunting • Forensics       <span class="label">│</span>`);
  writeLine(`<span class="label">└──────────────────────────────────────────────────────────┘</span>`, "muted"
  );
}

const handlers = {
  help(){
    writeLine(`<span class="label">Available commands:</span>`);
    writeLine(`- <span class="kbd">about</span>  <span class="kbd">skills</span>  <span class="kbd">projects</span>`);
    writeLine(`- <span class="kbd">dashboard</span>  <span class="kbd">feed</span>`);
    writeLine(`- <span class="kbd">contact</span>  <span class="kbd">links</span>`);
    writeLine(`- <span class="kbd">theme</span>  <span class="kbd">banner</span>  <span class="kbd">clear</span>`, "muted");
  },
  about(){
    writeLine(`Identity: <span class="path">Mohamed Mooka</span>`);
    writeLine(`Role: <span class="path">Cybersecurity Analyst</span> (SOC / DFIR)`);
    writeLine(`Summary: Blue Team analyst focused on detections, triage, incident response, and forensic workflows.`);
  },
  skills(){
    writeLine(`<span class="label">Core:</span> SIEM • Log Analysis • Threat Hunting • Incident Response • DFIR`);
    writeLine(`<span class="label">Tools/Concepts:</span> EDR • MITRE ATT&CK • Windows Events • Linux • Networking • IOC Enrichment`, "muted");
  },
  projects(){
    writeLine(`<span class="label">Projects:</span>`);
    writeLine(`• SOC Monitoring & Detection Lab (correlation rules + alert triage)`);
    writeLine(`• DFIR Investigation (timeline + artifacts + reporting)`);
    writeLine(`• Detection Engineering (high-signal rules, reduced noise)`, "muted");
  },
  dashboard(){
    writeLine(`Open: SOC Ops Snapshot → right panel KPIs are live-simulated.`, "muted");
  },
  feed(){
    writeLine(`Live feed is running in the right panel (stream).`, "muted");
  },
  contact(){
    writeLine(`<span class="label">Contact:</span>`);
    writeLine(`GitHub: <span class="path">${LINKS.github}</span>`);
    writeLine(`LinkedIn: <span class="path">${LINKS.linkedin}</span>`);
    writeLine(`Resume: <span class="path">${LINKS.resume}</span>`, "muted");
  },
  links(){
    writeLine(`<span class="label">Links:</span>`);
    writeLine(`- ${LINKS.github}`);
    writeLine(`- ${LINKS.linkedin}`);
    writeLine(`- ${LINKS.resume}`, "muted");
  },
  theme(){
    btnTheme.click();
    writeLine(`Theme toggled.`, "muted");
  },
  banner(){
    banner();
  },
  clear(){
    out.innerHTML = "";
  }
};

let history = [];
let histIdx = -1;

function runCommand(raw){
  const cmd = raw.trim();
  if (!cmd) return;

  history.push(cmd);
  histIdx = history.length;

  promptLine(cmd);

  const [name, ...args] = cmd.split(/\s+/);
  const key = name.toLowerCase();

  if (handlers[key]) handlers[key](args);
  else writeLine(`Unknown command: <span class="error">${escapeHtml(name)}</span> — try <span class="kbd">help</span>`, "error");
}

/* Autocomplete */
function updateAutocomplete(value){
  const v = value.trim().toLowerCase();
  if (!v){
    ac.textContent = "";
    ac.setAttribute("aria-hidden","true");
    return;
  }
  const matches = COMMANDS.filter(c => c.startsWith(v)).slice(0, 6);
  if (!matches.length){
    ac.textContent = "";
    ac.setAttribute("aria-hidden","true");
    return;
  }
  ac.innerHTML = `Suggestions: ${matches.map(m => `<span class="kbd">${m}</span>`).join(" ")}`;
  ac.setAttribute("aria-hidden","false");
}

input.addEventListener("input", (e) => updateAutocomplete(e.target.value));

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter"){
    const v = input.value;
    input.value = "";
    updateAutocomplete("");
    runCommand(v);
  }
  if (e.key === "ArrowUp"){
    e.preventDefault();
    if (!history.length) return;
    histIdx = Math.max(0, histIdx - 1);
    input.value = history[histIdx] ?? "";
    updateAutocomplete(input.value);
  }
  if (e.key === "ArrowDown"){
    e.preventDefault();
    if (!history.length) return;
    histIdx = Math.min(history.length, histIdx + 1);
    input.value = history[histIdx] ?? "";
    updateAutocomplete(input.value);
  }
  if (e.key === "Tab"){
    e.preventDefault();
    const v = input.value.trim().toLowerCase();
    if (!v) return;
    const match = COMMANDS.find(c => c.startsWith(v));
    if (match){
      input.value = match + " ";
      updateAutocomplete(input.value);
    }
  }
});

document.addEventListener("click", () => input.focus());

/* Start */
(async function init(){
  // default theme attribute
  document.documentElement.setAttribute("data-theme","dark");

  await typeBoot();
  banner();
  writeLine(`System ready.`, "muted");
  input.focus();
})();
