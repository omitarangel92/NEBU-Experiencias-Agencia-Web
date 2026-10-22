import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outputDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/assets/img');
const scenes = [
  {
    file: 'hero-ai-devices.png',
    label: 'NEBU / ASISTENTE IA',
    accent: '#38e4d1',
    secondary: '#8b75ff',
    main: '<circle cx="73" cy="86" r="24" fill="#2455a8"/><path d="M61 87h24M73 75v24" stroke="#c9fdf5" stroke-width="5" stroke-linecap="round"/><rect x="28" y="130" width="185" height="18" rx="9" fill="#19375a"/><rect x="28" y="164" width="300" height="72" rx="17" fill="#102b4c"/><rect x="49" y="185" width="174" height="10" rx="5" fill="#91b7d3"/><rect x="49" y="205" width="245" height="8" rx="4" fill="#446885"/><rect x="176" y="248" width="278" height="58" rx="16" fill="#154959"/><rect x="198" y="268" width="211" height="10" rx="5" fill="#a3f6e6"/><rect x="198" y="287" width="166" height="8" rx="4" fill="#5ba9ad"/><circle cx="398" cy="104" r="34" fill="#3b3699"/><path d="M386 104h24m-12-12v24" stroke="#fff" stroke-width="5" stroke-linecap="round"/>',
    laptop: '<circle cx="52" cy="63" r="12" fill="#52e3d0"/><rect x="75" y="56" width="128" height="12" rx="6" fill="#daf8ff"/><rect x="32" y="91" width="292" height="70" rx="14" fill="#143b54"/><rect x="50" y="111" width="158" height="9" rx="4" fill="#a6d5df"/><rect x="50" y="131" width="235" height="8" rx="4" fill="#54869a"/><rect x="115" y="172" width="201" height="34" rx="12" fill="#303f91"/><rect x="136" y="184" width="145" height="8" rx="4" fill="#e7ecff"/>',
    phone: '<circle cx="60" cy="77" r="15" fill="url(#accent)"/><rect x="84" y="70" width="61" height="9" rx="4" fill="#eff7ff"/><rect x="22" y="110" width="127" height="58" rx="14" fill="#153a55"/><rect x="40" y="129" width="86" height="9" rx="4" fill="#b8fff1"/><rect x="50" y="180" width="112" height="70" rx="15" fill="#294fa0"/><rect x="67" y="199" width="72" height="9" rx="4" fill="#e9e9ff"/>'
  },
  {
    file: 'hero-web-devices.png',
    label: 'NEBU / DISEÑO WEB',
    accent: '#55e1d5',
    secondary: '#f18ac7',
    main: '<rect x="28" y="32" width="424" height="28" rx="10" fill="#111f48"/><circle cx="49" cy="46" r="5" fill="#55e1d5"/><rect x="65" y="42" width="98" height="8" rx="4" fill="#dce9ff"/><rect x="320" y="40" width="42" height="11" rx="5" fill="#29386d"/><rect x="370" y="40" width="55" height="11" rx="5" fill="#394991"/><rect x="28" y="78" width="220" height="142" rx="16" fill="#172c61"/><circle cx="99" cy="141" r="43" fill="#20b8ba"/><path d="m56 172 52-62 41 41 31-40 57 71H56Z" fill="#7767db"/><rect x="271" y="87" width="171" height="18" rx="9" fill="#cce7ff"/><rect x="271" y="121" width="148" height="10" rx="5" fill="#839bc4"/><rect x="271" y="143" width="164" height="10" rx="5" fill="#536e9b"/><rect x="271" y="174" width="104" height="30" rx="15" fill="url(#accent)"/><rect x="28" y="239" width="414" height="60" rx="14" fill="#13264c"/><rect x="48" y="258" width="89" height="13" rx="6" fill="#55e1d5"/><rect x="158" y="253" width="78" height="25" rx="8" fill="#344a83"/><rect x="248" y="253" width="78" height="25" rx="8" fill="#344a83"/><rect x="338" y="253" width="78" height="25" rx="8" fill="#344a83"/>',
    laptop: '<rect x="27" y="32" width="284" height="15" rx="7" fill="#5be0d6"/><rect x="27" y="68" width="288" height="91" rx="13" fill="#192e61"/><rect x="45" y="84" width="73" height="57" rx="8" fill="#314b98"/><rect x="129" y="84" width="73" height="57" rx="8" fill="#246887"/><rect x="213" y="84" width="81" height="57" rx="8" fill="#5648a7"/><rect x="27" y="178" width="185" height="9" rx="4" fill="#cfedff"/><rect x="27" y="198" width="252" height="8" rx="4" fill="#597498"/>',
    phone: '<rect x="23" y="36" width="111" height="84" rx="12" fill="#182c5c"/><circle cx="53" cy="68" r="18" fill="#35bfbd"/><path d="m35 91 21-23 19 18 14-16 27 31H35Z" fill="#7770db"/><rect x="23" y="132" width="94" height="9" rx="4" fill="#e5eeff"/><rect x="23" y="151" width="114" height="8" rx="4" fill="#7e95ba"/><rect x="31" y="174" width="99" height="29" rx="14" fill="url(#accent)"/>'
  },
  {
    file: 'hero-analytics-devices.png',
    label: 'NEBU / ANALÍTICA WEB',
    accent: '#58e0cd',
    secondary: '#f08ac8',
    main: '<rect x="28" y="32" width="424" height="32" rx="11" fill="#111f48"/><circle cx="49" cy="48" r="5" fill="#58e0cd"/><rect x="65" y="43" width="112" height="10" rx="5" fill="#dce8ff"/><rect x="28" y="82" width="125" height="79" rx="14" fill="#153451"/><text x="44" y="108" fill="#a8c5e9" font-size="11" font-family="Arial">VELOCIDAD</text><text x="44" y="143" fill="#58e0cd" font-size="27" font-weight="700" font-family="Arial">+38%</text><rect x="164" y="82" width="125" height="79" rx="14" fill="#153451"/><text x="180" y="108" fill="#a8c5e9" font-size="11" font-family="Arial">CONVERSIÓN</text><text x="180" y="143" fill="#f08ac8" font-size="27" font-weight="700" font-family="Arial">+24%</text><rect x="300" y="82" width="142" height="79" rx="14" fill="#153451"/><text x="317" y="108" fill="#a8c5e9" font-size="11" font-family="Arial">VISITAS</text><text x="317" y="143" fill="#58e0cd" font-size="27" font-weight="700" font-family="Arial">+52%</text><rect x="28" y="180" width="414" height="119" rx="14" fill="#102744"/><path d="M48 269c42-48 58-11 100-38s56 7 96-19 54 8 96-24 54 8 82-20" fill="none" stroke="#58e0cd" stroke-width="6" stroke-linecap="round"/><path d="M49 280h368" stroke="#486487" stroke-width="2"/><circle cx="338" cy="207" r="5" fill="#f08ac8"/>',
    laptop: '<rect x="28" y="35" width="263" height="15" rx="7" fill="#b7caff"/><path d="M35 146l48-35 52 21 54-54 48 24 53-43" fill="none" stroke="#58e0cd" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 164h259" stroke="#496386" stroke-width="2"/><circle cx="189" cy="78" r="7" fill="#f08ac8"/>',
    phone: '<circle cx="81" cy="82" r="36" fill="none" stroke="#345481" stroke-width="12"/><path d="M81 46a36 36 0 0 1 33 21" fill="none" stroke="#58e0cd" stroke-width="12" stroke-linecap="round"/><text x="64" y="88" fill="#fff" font-size="17" font-family="Arial">92</text><rect x="33" y="137" width="96" height="9" rx="4" fill="#8da9ca"/><rect x="33" y="158" width="73" height="8" rx="4" fill="#526f94"/>'
  }
];

function cube(x, y, size, top, left, right) {
  const half = size / 2;
  const rise = size * 0.28;
  const depth = size * 0.85;
  return `<g filter="url(#soft-shadow)"><path d="M${x} ${y}l${half} -${rise} ${half} ${rise} -${half} ${rise}Z" fill="${top}"/><path d="M${x} ${y}l${half} ${rise}v${depth}l-${half} -${rise}Z" fill="${left}"/><path d="M${x + size} ${y}l-${half} ${rise}v${depth}l${half} -${rise}Z" fill="${right}"/></g>`;
}

function createScene(scene) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
  <defs>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#172d61"/><stop offset="1" stop-color="#09152f"/></linearGradient>
    <linearGradient id="device" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e9f5ff"/><stop offset=".32" stop-color="#9dafc3"/><stop offset="1" stop-color="#5c7089"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${scene.accent}"/><stop offset="1" stop-color="${scene.secondary}"/></linearGradient>
    <filter id="soft-shadow" x="-35%" y="-35%" width="180%" height="190%"><feDropShadow dx="0" dy="16" stdDeviation="13" flood-color="#07142b" flood-opacity=".38"/></filter>
    <pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0V18" fill="none" stroke="#86b9ff" stroke-opacity=".075" stroke-width="1"/></pattern>
  </defs>
  <ellipse cx="595" cy="728" rx="455" ry="42" fill="#17274a" opacity=".12"/>
  ${cube(886, 230, 86, scene.accent, '#1f8f9e', '#5355bb')}
  ${cube(167, 307, 54, scene.secondary, '#3a55ab', '#1f718f')}
  <path d="M221 279l8-17 8 17 17 8-17 8-8 17-8-17-17-8Z" fill="${scene.secondary}"/>
  <circle cx="229" cy="329" r="8" fill="${scene.accent}"/>

  <g transform="matrix(1 .18 -.25 .86 350 68)" filter="url(#soft-shadow)">
    <rect x="-13" y="-13" width="506" height="326" rx="20" fill="#0a1429" stroke="#d9f4ff" stroke-opacity=".82" stroke-width="4"/>
    <rect x="0" y="0" width="480" height="300" rx="14" fill="url(#screen)"/>
    <rect x="0" y="0" width="480" height="300" rx="14" fill="url(#grid)"/>
    <circle cx="27" cy="29" r="6" fill="${scene.accent}"/>
    <text x="44" y="34" fill="#ecf4ff" font-size="13" font-family="Arial" font-weight="700">${scene.label}</text>
    <rect x="354" y="18" width="102" height="22" rx="11" fill="#183d5e"/><circle cx="370" cy="29" r="4" fill="${scene.accent}"/><text x="380" y="33" fill="#c5e6f4" font-size="9" font-family="Arial">EN LÍNEA</text>
    ${scene.main}
  </g>
  <path d="M522 371l108 20-49 128-99-19Z" fill="url(#device)" filter="url(#soft-shadow)"/>
  <path d="M430 512l303 57 53 31-309-59Z" fill="url(#device)" filter="url(#soft-shadow)"/>

  <g transform="matrix(1 .16 -.29 .78 98 423)" filter="url(#soft-shadow)">
    <rect x="-10" y="-10" width="340" height="202" rx="15" fill="#111b2c" stroke="#d9f4ff" stroke-opacity=".8" stroke-width="4"/>
    <rect width="320" height="182" rx="9" fill="url(#screen)"/>
    <rect width="320" height="182" rx="9" fill="url(#grid)"/>
    <circle cx="20" cy="19" r="4" fill="${scene.accent}"/><rect x="34" y="15" width="88" height="8" rx="4" fill="#dceaff"/>
    ${scene.laptop}
  </g>
  <path d="M70 565l320 51 43 28-323-51Z" fill="url(#device)" stroke="#ecf8ff" stroke-opacity=".72" stroke-width="2" filter="url(#soft-shadow)"/>
  <path d="M196 587l84 13 18 10-85-13Z" fill="#60768d"/>

  <g transform="matrix(.53 .1 -.04 .78 884 440)" filter="url(#soft-shadow)">
    <rect x="-10" y="-11" width="150" height="330" rx="27" fill="#10192b" stroke="#e5f8ff" stroke-opacity=".85" stroke-width="4"/>
    <rect width="130" height="310" rx="18" fill="url(#screen)"/>
    <rect width="130" height="310" rx="18" fill="url(#grid)"/>
    <rect x="43" y="10" width="44" height="5" rx="3" fill="#96aabe"/>
    ${scene.phone}
  </g>
</svg>`;
}

await mkdir(outputDirectory, { recursive: true });
for (const scene of scenes) {
  await sharp(Buffer.from(createScene(scene)))
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outputDirectory, scene.file));
  console.log(`Rendered isometric transparent PNG: ${scene.file}`);
}
