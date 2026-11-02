const stars = [
  [102, 92, 3], [246, 164, 2], [382, 78, 2], [525, 155, 3],
  [746, 87, 2], [866, 188, 3], [1035, 104, 2], [1178, 186, 3],
  [1350, 102, 2], [680, 264, 2], [1280, 272, 2],
];

const flowers = [
  [32, 756, 1.1], [108, 706, .8], [186, 820, 1.25], [275, 742, .9],
  [340, 864, 1.05], [418, 771, .75], [506, 844, .9], [792, 849, .8],
  [948, 787, 1.05], [1078, 858, .85], [1194, 742, 1.2], [1280, 840, .9],
  [1390, 730, 1.05], [1350, 578, .75], [88, 554, .7],
];

function Flower({ x, y, scale }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="scene-flower">
      <ellipse cx="0" cy="-13" rx="8" ry="14" />
      <ellipse cx="12" cy="-4" rx="8" ry="14" transform="rotate(72 12 -4)" />
      <ellipse cx="8" cy="11" rx="8" ry="14" transform="rotate(144 8 11)" />
      <ellipse cx="-8" cy="11" rx="8" ry="14" transform="rotate(216 -8 11)" />
      <ellipse cx="-12" cy="-4" rx="8" ry="14" transform="rotate(288 -12 -4)" />
      <circle r="7" className="scene-flower-center" />
    </g>
  );
}

export default function GardenScene() {
  return (
    <svg className="garden-scene" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="garden-sky" x2="0" y2="1">
          <stop offset="0" className="sky-top" />
          <stop offset="1" className="sky-bottom" />
        </linearGradient>
        <linearGradient id="garden-water" x2="0" y2="1">
          <stop offset="0" className="water-top" />
          <stop offset="1" className="water-bottom" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#garden-sky)" />
      <g className="scene-stars">
        {stars.map(([x, y, r]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />)}
        <path d="M970 72v18m-9-9h18M119 236v14m-7-7h14M1318 219v18m-9-9h18" />
      </g>
      <circle cx="1100" cy="168" r="74" className="scene-orb-glow" />
      <circle cx="1100" cy="168" r="43" className="scene-orb" />

      <g className="scene-cloud cloud-one">
        <ellipse cx="260" cy="190" rx="88" ry="21" />
        <ellipse cx="229" cy="177" rx="42" ry="29" />
        <ellipse cx="285" cy="173" rx="54" ry="34" />
      </g>
      <g className="scene-cloud cloud-two">
        <ellipse cx="795" cy="260" rx="93" ry="18" />
        <ellipse cx="761" cy="246" rx="46" ry="26" />
        <ellipse cx="823" cy="244" rx="52" ry="30" />
      </g>

      <path className="scene-far-hill" d="M0 490Q150 352 326 445T685 426Q822 333 975 438T1440 405V900H0Z" />
      <path className="scene-mid-hill" d="M0 560Q205 450 388 530T769 488Q982 415 1162 518T1440 495V900H0Z" />
      <path className="scene-back-grass" d="M0 628Q226 535 410 608T769 574Q1011 498 1191 592T1440 563V900H0Z" />

      <g className="scene-cottage">
        <path className="cottage-wall" d="M1047 458h174v129h-174z" />
        <path className="cottage-roof" d="M1023 461l111-91 112 91z" />
        <path className="cottage-trim" d="M1038 468h193M1134 370v-25" />
        <rect className="cottage-door" x="1110" y="506" width="50" height="81" rx="24" />
        <rect className="cottage-window" x="1065" y="493" width="32" height="42" rx="15" />
        <rect className="cottage-window" x="1174" y="493" width="32" height="42" rx="15" />
        <path className="cottage-trim" d="M1081 493v42m-16-21h32m125 0h-48m16-21v42" />
      </g>

      <path className="scene-path" d="M1162 587Q1090 655 836 703T524 900h500Q1045 778 1254 651Z" />
      <path className="scene-front-grass" d="M0 654Q201 595 404 666T764 654Q1039 586 1226 643T1440 642V900H0Z" />
      <path className="scene-water" d="M534 900Q615 770 755 717T1062 699Q1196 689 1440 747V900Z" fill="url(#garden-water)" />
      <path className="scene-water-shine" d="M710 794q58-18 104-9m194-39q49-13 92-8m164 58q54-8 104 5" />

      <g className="scene-tree-left">
        <path className="scene-trunk" d="M0 607Q96 542 120 422Q130 358 107 302M76 504q63-95 139-124M96 454Q55 407 0 390" />
        <ellipse cx="56" cy="288" rx="132" ry="102" className="scene-blossom" />
        <ellipse cx="157" cy="321" rx="91" ry="72" className="scene-blossom" />
        <ellipse cx="22" cy="393" rx="110" ry="71" className="scene-blossom" />
        <ellipse cx="214" cy="400" rx="67" ry="53" className="scene-blossom-soft" />
      </g>
      <g className="scene-tree-right">
        <path className="scene-trunk" d="M1440 649q-112-92-123-202Q1303 361 1338 302m-28 161q-56-81-121-102m142 55q59-40 109-51" />
        <ellipse cx="1376" cy="292" rx="131" ry="104" className="scene-blossom" />
        <ellipse cx="1263" cy="367" rx="99" ry="71" className="scene-blossom-soft" />
        <ellipse cx="1431" cy="426" rx="105" ry="70" className="scene-blossom" />
      </g>

      <path className="scene-foreground" d="M0 792Q130 718 310 785T642 808Q819 756 956 818T1249 779Q1364 743 1440 793V900H0Z" />
      <g className="scene-flowers">{flowers.map(([x, y, scale]) => <Flower key={`${x}-${y}`} x={x} y={y} scale={scale} />)}</g>
    </svg>
  );
}
