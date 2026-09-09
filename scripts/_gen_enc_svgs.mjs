import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "uploads");

function ent(s) {
  return [...s].map((ch) => {
    const code = ch.codePointAt(0);
    return code > 127 ? `&#x${code.toString(16).toUpperCase()};` : ch;
  }).join("");
}

const FONT =
  'font-family="ui-sans-serif, system-ui, Microsoft JhengHei, PingFang TC, sans-serif"';

const DEFS = `
  <defs>
    <marker id="arr" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M0 0 L12 6 L0 12 z" fill="#2a2a2a"/>
    </marker>
  </defs>
`;

const panel = (x) =>
  `<rect x="${x}" y="48" width="440" height="400" rx="10" fill="#fafafa" stroke="#e4e4e4"/>`;

function titleText(x, y, text) {
  return `<text ${FONT} x="${x}" y="${y}" text-anchor="middle" font-size="20" font-weight="700" fill="#c13b3b">${ent(text)}</text>`;
}

function lineText(x, y, text, size = 17, fill = "#2a2a2a") {
  return `<text ${FONT} x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}">${ent(text)}</text>`;
}

function arrow(x1, x2, y = 230) {
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#2a2a2a" stroke-width="4" marker-end="url(#arr)"/>`;
}

function lockClosed(cx, cy, fill = "#c13b3b") {
  const x = cx - 16;
  return [
    `<path d="M${x + 6} ${cy} v-14 a10 10 0 0 1 20 0 v14" fill="none" stroke="#2a2a2a" stroke-width="3"/>`,
    `<rect x="${x}" y="${cy}" width="32" height="24" rx="4" fill="${fill}"/>`,
  ].join("");
}

function lockOpen(cx, cy, fill = "#6b6b6b") {
  const x = cx - 16;
  return [
    `<path d="M${x + 26} ${cy} v-10 a10 10 0 0 0 -20 -2" fill="none" stroke="#2a2a2a" stroke-width="3"/>`,
    `<rect x="${x}" y="${cy}" width="32" height="24" rx="4" fill="${fill}"/>`,
  ].join("");
}

function phone(cx, cy) {
  return [
    `<rect x="${cx - 30}" y="${cy - 54}" width="60" height="108" rx="10" fill="none" stroke="#2a2a2a" stroke-width="3"/>`,
    `<rect x="${cx - 22}" y="${cy - 44}" width="44" height="76" fill="#2a2a2a"/>`,
    `<circle cx="${cx}" cy="${cy + 42}" r="4" fill="#2a2a2a"/>`,
  ].join("");
}

const httpsSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 500" role="img">
  <rect width="1600" height="500" fill="#f4f4f4"/>
${DEFS}
  ${panel(60)}
  ${panel(580)}
  ${panel(1100)}
  ${titleText(280, 92, "你")}
  ${titleText(800, 92, "路上")}
  ${titleText(1320, 92, "對方伺服器")}
  ${phone(280, 168)}
  <rect x="228" y="286" width="104" height="58" rx="6" fill="#c13b3b"/>
  ${lockClosed(280, 272)}
  ${lineText(280, 384, "把資料封進包裹")}
  ${lineText(280, 412, "瀏覽器上的小鎖", 15, "#6b6b6b")}
  ${arrow(512, 568)}
  <line x1="650" y1="230" x2="950" y2="230" stroke="#2a2a2a" stroke-width="4"/>
  <circle cx="680" cy="230" r="11" fill="#2a2a2a"/>
  <circle cx="920" cy="230" r="11" fill="#2a2a2a"/>
  <rect x="738" y="206" width="124" height="52" rx="6" fill="#c13b3b"/>
  ${lockClosed(800, 192)}
  ${lineText(800, 384, "運將拆不開")}
  ${lineText(800, 412, "咖啡廳 Wi-Fi、假基地台", 15, "#6b6b6b")}
  ${arrow(1032, 1088)}
  <path d="M1230 176 l90 -44 90 44" fill="none" stroke="#2a2a2a" stroke-width="3"/>
  <rect x="1230" y="176" width="180" height="128" fill="none" stroke="#2a2a2a" stroke-width="3"/>
  <rect x="1270" y="228" width="100" height="48" rx="4" fill="#6b6b6b"/>
  ${lockOpen(1320, 214)}
  ${lineText(1320, 384, "倉庫一定會拆")}
  ${lineText(1320, 412, "不然怎麼登入、下單", 15, "#6b6b6b")}
</svg>
`;

const e2eeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 500" role="img">
  <rect width="1600" height="500" fill="#f4f4f4"/>
${DEFS}
  ${panel(60)}
  ${panel(580)}
  ${panel(1100)}
  ${titleText(280, 92, "你")}
  ${titleText(800, 92, "快遞／平台")}
  ${titleText(1320, 92, "朋友")}
  ${phone(280, 176)}
  <rect x="234" y="270" width="92" height="58" rx="5" fill="#c13b3b"/>
  <rect x="234" y="270" width="92" height="14" fill="#2a2a2a"/>
  ${lockClosed(280, 256)}
  ${lineText(280, 384, "鐵盒上鎖再送出")}
  ${lineText(280, 412, "金鑰留在你的裝置", 15, "#6b6b6b")}
  ${arrow(512, 568)}
  <rect x="670" y="150" width="260" height="150" rx="8" fill="none" stroke="#2a2a2a" stroke-width="3"/>
  <rect x="698" y="188" width="64" height="42" rx="4" fill="#c13b3b"/>
  <rect x="778" y="188" width="64" height="42" rx="4" fill="#c13b3b"/>
  <rect x="858" y="188" width="48" height="42" rx="4" fill="#c13b3b"/>
  ${lineText(800, 348, "總部也沒有鑰匙", 15, "#6b6b6b")}
  ${lineText(800, 384, "只能搬密封箱")}
  ${lineText(800, 412, "伺服器被抄也讀不到內容", 15, "#6b6b6b")}
  ${arrow(1032, 1088)}
  ${phone(1320, 176)}
  <rect x="1274" y="270" width="92" height="58" rx="5" fill="#6b6b6b"/>
  <circle cx="1296" cy="300" r="8" fill="none" stroke="#fafafa" stroke-width="3"/>
  <line x1="1304" y1="300" x2="1344" y2="300" stroke="#fafafa" stroke-width="3"/>
  <line x1="1334" y1="300" x2="1334" y2="312" stroke="#fafafa" stroke-width="3"/>
  <line x1="1344" y1="300" x2="1344" y2="312" stroke="#fafafa" stroke-width="3"/>
  ${lineText(1320, 384, "只有對方能打開")}
  ${lineText(1320, 412, "金鑰在接收裝置", 15, "#6b6b6b")}
</svg>
`;

const p2peSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 500" role="img">
  <rect width="1600" height="500" fill="#f4f4f4"/>
${DEFS}
  ${panel(60)}
  ${panel(580)}
  ${panel(1100)}
  ${titleText(280, 92, "刷卡機")}
  ${titleText(800, 92, "店家")}
  ${titleText(1320, 92, "支付處理器")}
  <rect x="198" y="136" width="164" height="196" rx="12" fill="none" stroke="#2a2a2a" stroke-width="3"/>
  <rect x="216" y="154" width="128" height="86" fill="#2a2a2a"/>
  ${lockClosed(280, 176, "#c13b3b")}
  <rect x="232" y="258" width="96" height="18" rx="3" fill="#2a2a2a"/>
  <rect x="248" y="284" width="64" height="28" rx="4" fill="#e4e4e4" stroke="#2a2a2a" stroke-width="2"/>
  ${lineText(280, 384, "卡號進機具就上鎖")}
  ${lineText(280, 412, "不是進店家電腦才加密", 15, "#6b6b6b")}
  ${arrow(512, 568)}
  <rect x="690" y="140" width="220" height="176" rx="8" fill="none" stroke="#2a2a2a" stroke-width="3"/>
  <rect x="708" y="158" width="184" height="96" fill="#2a2a2a"/>
  <text ${FONT} x="800" y="216" text-anchor="middle" font-size="22" fill="#fafafa">**** 1234</text>
  ${lineText(800, 384, "店員電腦沒有鑰匙")}
  ${lineText(800, 412, "店內 Wi-Fi、後台都是密文", 15, "#6b6b6b")}
  ${arrow(1032, 1088)}
  <path d="M1230 168 l90 -44 90 44" fill="none" stroke="#2a2a2a" stroke-width="3"/>
  <rect x="1230" y="168" width="180" height="140" fill="none" stroke="#2a2a2a" stroke-width="3"/>
  <rect x="1262" y="196" width="22" height="48" fill="#2a2a2a"/>
  <rect x="1294" y="196" width="22" height="48" fill="#2a2a2a"/>
  <rect x="1326" y="196" width="22" height="48" fill="#2a2a2a"/>
  ${lockOpen(1320, 262)}
  ${lineText(1320, 384, "銀行這邊才解開")}
  ${lineText(1320, 412, "否則無法授權這筆刷卡", 15, "#6b6b6b")}
</svg>
`;

const heroSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 720" role="img">
  <rect width="1600" height="720" fill="#f4f4f4"/>
  <rect x="120" y="40" width="28" height="10" rx="2" fill="#c13b3b"/>
  <text ${FONT} x="158" y="50" font-size="16" fill="#6b6b6b">${ent("密文")}</text>
  <rect x="230" y="40" width="28" height="10" rx="2" fill="#2a2a2a"/>
  <text ${FONT} x="268" y="50" font-size="16" fill="#6b6b6b">${ent("明文")}</text>

  <text ${FONT} x="120" y="96" font-size="18" font-weight="700" fill="#c13b3b">HTTPS / TLS</text>
  <line x1="120" y1="152" x2="1480" y2="152" stroke="#2a2a2a" stroke-width="4"/>
  <rect x="120" y="136" width="560" height="32" rx="6" fill="#c13b3b"/>
  <circle cx="120" cy="152" r="14" fill="#2a2a2a"/>
  <circle cx="680" cy="152" r="14" fill="#c13b3b"/>
  <circle cx="1080" cy="152" r="14" fill="#2a2a2a"/>
  <circle cx="1480" cy="152" r="14" fill="#2a2a2a"/>
  <text ${FONT} x="120" y="200" font-size="16" fill="#2a2a2a">${ent("你的裝置")}</text>
  <text ${FONT} x="620" y="200" font-size="16" fill="#2a2a2a">${ent("網站伺服器 · 在這裡解密")}</text>
  <text ${FONT} x="1010" y="200" font-size="16" fill="#6b6b6b">${ent("後台")}</text>
  <text ${FONT} x="1420" y="200" font-size="16" fill="#6b6b6b">${ent("資料庫")}</text>

  <text ${FONT} x="120" y="272" font-size="18" font-weight="700" fill="#c13b3b">E2EE</text>
  <line x1="120" y1="328" x2="1480" y2="328" stroke="#c13b3b" stroke-width="4"/>
  <rect x="120" y="312" width="1360" height="32" rx="6" fill="#c13b3b"/>
  <circle cx="120" cy="328" r="14" fill="#2a2a2a"/>
  <rect x="640" y="308" width="120" height="40" rx="6" fill="#2a2a2a"/>
  <circle cx="1480" cy="328" r="14" fill="#2a2a2a"/>
  <text ${FONT} x="120" y="376" font-size="16" fill="#2a2a2a">${ent("發送裝置")}</text>
  <text ${FONT} x="610" y="376" font-size="16" fill="#2a2a2a">${ent("中間伺服器 · 只能搬箱子")}</text>
  <text ${FONT} x="1368" y="376" font-size="16" fill="#2a2a2a">${ent("接收裝置")}</text>

  <text ${FONT} x="120" y="448" font-size="18" font-weight="700" fill="#c13b3b">P2PE</text>
  <line x1="120" y1="504" x2="1480" y2="504" stroke="#c13b3b" stroke-width="4"/>
  <rect x="120" y="488" width="1360" height="32" rx="6" fill="#c13b3b"/>
  <rect x="104" y="488" width="88" height="32" rx="6" fill="#2a2a2a"/>
  <rect x="680" y="490" width="88" height="28" rx="4" fill="#6b6b6b"/>
  <circle cx="1480" cy="504" r="14" fill="#2a2a2a"/>
  <text ${FONT} x="120" y="552" font-size="16" fill="#2a2a2a">${ent("刷卡機 · 當場上鎖")}</text>
  <text ${FONT} x="640" y="552" font-size="16" fill="#2a2a2a">${ent("店家系統 · 沒有鑰匙")}</text>
  <text ${FONT} x="1368" y="552" font-size="16" fill="#2a2a2a">${ent("支付處理器")}</text>

  <text ${FONT} x="120" y="644" font-size="18" fill="#6b6b6b">${ent("紅線是密文。灰點、黑點出現的地方，才有人讀得到內容。")}</text>
</svg>
`;

const files = {
  "tls-e2ee-p2pe-https.svg": httpsSvg,
  "tls-e2ee-p2pe-e2ee.svg": e2eeSvg,
  "tls-e2ee-p2pe-p2pe.svg": p2peSvg,
  "tls-e2ee-p2pe-hero.svg": heroSvg,
};

for (const [name, content] of Object.entries(files)) {
  const path = join(outDir, name);
  writeFileSync(path, content, "utf8");
  console.log(`wrote ${name}`);
}
