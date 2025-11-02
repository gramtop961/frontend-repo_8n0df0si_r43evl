import React from 'react';

// Category neon colors for dark theme
export const CATEGORY_COLORS = {
  'alkali metal': 'border-pink-500/60 hover:border-pink-400/80 shadow-[0_0_12px_rgba(236,72,153,0.35)]',
  'alkaline earth metal': 'border-fuchsia-500/60 hover:border-fuchsia-400/80 shadow-[0_0_12px_rgba(217,70,239,0.35)]',
  'transition metal': 'border-cyan-500/60 hover:border-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.35)]',
  'post-transition metal': 'border-sky-500/60 hover:border-sky-400/80 shadow-[0_0_12px_rgba(56,189,248,0.35)]',
  metalloid: 'border-amber-500/60 hover:border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.35)]',
  'diatomic nonmetal': 'border-emerald-500/60 hover:border-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.35)]',
  'polyatomic nonmetal': 'border-emerald-500/60 hover:border-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.35)]',
  halogen: 'border-lime-500/60 hover:border-lime-400/80 shadow-[0_0_12px_rgba(132,204,22,0.35)]',
  'noble gas': 'border-violet-500/60 hover:border-violet-400/80 shadow-[0_0_12px_rgba(139,92,246,0.35)]',
  lanthanide: 'border-indigo-500/60 hover:border-indigo-400/80 shadow-[0_0_12px_rgba(99,102,241,0.35)]',
  actinide: 'border-rose-500/60 hover:border-rose-400/80 shadow-[0_0_12px_rgba(244,63,94,0.35)]',
  unknown: 'border-slate-600 hover:border-slate-500',
};

// Compact dataset for all 118 elements. Atomic masses are approximate; categories follow standard groups.
// Each item: [Z, Symbol, Name, AtomicMass, Category, Period, Group]
const RAW = [
  [1,'H','Hydrogen',1.008,'diatomic nonmetal',1,1],
  [2,'He','Helium',4.0026,'noble gas',1,18],
  [3,'Li','Lithium',6.94,'alkali metal',2,1],
  [4,'Be','Beryllium',9.0122,'alkaline earth metal',2,2],
  [5,'B','Boron',10.81,'metalloid',2,13],
  [6,'C','Carbon',12.011,'polyatomic nonmetal',2,14],
  [7,'N','Nitrogen',14.007,'diatomic nonmetal',2,15],
  [8,'O','Oxygen',15.999,'diatomic nonmetal',2,16],
  [9,'F','Fluorine',18.998,'halogen',2,17],
  [10,'Ne','Neon',20.180,'noble gas',2,18],
  [11,'Na','Sodium',22.990,'alkali metal',3,1],
  [12,'Mg','Magnesium',24.305,'alkaline earth metal',3,2],
  [13,'Al','Aluminium',26.982,'post-transition metal',3,13],
  [14,'Si','Silicon',28.085,'metalloid',3,14],
  [15,'P','Phosphorus',30.974,'polyatomic nonmetal',3,15],
  [16,'S','Sulfur',32.06,'polyatomic nonmetal',3,16],
  [17,'Cl','Chlorine',35.45,'halogen',3,17],
  [18,'Ar','Argon',39.948,'noble gas',3,18],
  [19,'K','Potassium',39.098,'alkali metal',4,1],
  [20,'Ca','Calcium',40.078,'alkaline earth metal',4,2],
  [21,'Sc','Scandium',44.956,'transition metal',4,3],
  [22,'Ti','Titanium',47.867,'transition metal',4,4],
  [23,'V','Vanadium',50.942,'transition metal',4,5],
  [24,'Cr','Chromium',51.996,'transition metal',4,6],
  [25,'Mn','Manganese',54.938,'transition metal',4,7],
  [26,'Fe','Iron',55.845,'transition metal',4,8],
  [27,'Co','Cobalt',58.933,'transition metal',4,9],
  [28,'Ni','Nickel',58.693,'transition metal',4,10],
  [29,'Cu','Copper',63.546,'transition metal',4,11],
  [30,'Zn','Zinc',65.38,'transition metal',4,12],
  [31,'Ga','Gallium',69.723,'post-transition metal',4,13],
  [32,'Ge','Germanium',72.630,'metalloid',4,14],
  [33,'As','Arsenic',74.922,'metalloid',4,15],
  [34,'Se','Selenium',78.971,'polyatomic nonmetal',4,16],
  [35,'Br','Bromine',79.904,'halogen',4,17],
  [36,'Kr','Krypton',83.798,'noble gas',4,18],
  [37,'Rb','Rubidium',85.468,'alkali metal',5,1],
  [38,'Sr','Strontium',87.62,'alkaline earth metal',5,2],
  [39,'Y','Yttrium',88.906,'transition metal',5,3],
  [40,'Zr','Zirconium',91.224,'transition metal',5,4],
  [41,'Nb','Niobium',92.906,'transition metal',5,5],
  [42,'Mo','Molybdenum',95.95,'transition metal',5,6],
  [43,'Tc','Technetium',98,'transition metal',5,7],
  [44,'Ru','Ruthenium',101.07,'transition metal',5,8],
  [45,'Rh','Rhodium',102.91,'transition metal',5,9],
  [46,'Pd','Palladium',106.42,'transition metal',5,10],
  [47,'Ag','Silver',107.87,'transition metal',5,11],
  [48,'Cd','Cadmium',112.41,'transition metal',5,12],
  [49,'In','Indium',114.82,'post-transition metal',5,13],
  [50,'Sn','Tin',118.71,'post-transition metal',5,14],
  [51,'Sb','Antimony',121.76,'metalloid',5,15],
  [52,'Te','Tellurium',127.60,'metalloid',5,16],
  [53,'I','Iodine',126.90,'halogen',5,17],
  [54,'Xe','Xenon',131.29,'noble gas',5,18],
  [55,'Cs','Cesium',132.91,'alkali metal',6,1],
  [56,'Ba','Barium',137.33,'alkaline earth metal',6,2],
  [57,'La','Lanthanum',138.91,'lanthanide',6,3],
  [58,'Ce','Cerium',140.12,'lanthanide',6,3],
  [59,'Pr','Praseodymium',140.91,'lanthanide',6,3],
  [60,'Nd','Neodymium',144.24,'lanthanide',6,3],
  [61,'Pm','Promethium',145,'lanthanide',6,3],
  [62,'Sm','Samarium',150.36,'lanthanide',6,3],
  [63,'Eu','Europium',151.96,'lanthanide',6,3],
  [64,'Gd','Gadolinium',157.25,'lanthanide',6,3],
  [65,'Tb','Terbium',158.93,'lanthanide',6,3],
  [66,'Dy','Dysprosium',162.50,'lanthanide',6,3],
  [67,'Ho','Holmium',164.93,'lanthanide',6,3],
  [68,'Er','Erbium',167.26,'lanthanide',6,3],
  [69,'Tm','Thulium',168.93,'lanthanide',6,3],
  [70,'Yb','Ytterbium',173.05,'lanthanide',6,3],
  [71,'Lu','Lutetium',174.97,'lanthanide',6,3],
  [72,'Hf','Hafnium',178.49,'transition metal',6,4],
  [73,'Ta','Tantalum',180.95,'transition metal',6,5],
  [74,'W','Tungsten',183.84,'transition metal',6,6],
  [75,'Re','Rhenium',186.21,'transition metal',6,7],
  [76,'Os','Osmium',190.23,'transition metal',6,8],
  [77,'Ir','Iridium',192.22,'transition metal',6,9],
  [78,'Pt','Platinum',195.08,'transition metal',6,10],
  [79,'Au','Gold',196.97,'transition metal',6,11],
  [80,'Hg','Mercury',200.59,'transition metal',6,12],
  [81,'Tl','Thallium',204.38,'post-transition metal',6,13],
  [82,'Pb','Lead',207.2,'post-transition metal',6,14],
  [83,'Bi','Bismuth',208.98,'post-transition metal',6,15],
  [84,'Po','Polonium',209,'metalloid',6,16],
  [85,'At','Astatine',210,'halogen',6,17],
  [86,'Rn','Radon',222,'noble gas',6,18],
  [87,'Fr','Francium',223,'alkali metal',7,1],
  [88,'Ra','Radium',226,'alkaline earth metal',7,2],
  [89,'Ac','Actinium',227,'actinide',7,3],
  [90,'Th','Thorium',232.04,'actinide',7,3],
  [91,'Pa','Protactinium',231.04,'actinide',7,3],
  [92,'U','Uranium',238.03,'actinide',7,3],
  [93,'Np','Neptunium',237,'actinide',7,3],
  [94,'Pu','Plutonium',244,'actinide',7,3],
  [95,'Am','Americium',243,'actinide',7,3],
  [96,'Cm','Curium',247,'actinide',7,3],
  [97,'Bk','Berkelium',247,'actinide',7,3],
  [98,'Cf','Californium',251,'actinide',7,3],
  [99,'Es','Einsteinium',252,'actinide',7,3],
  [100,'Fm','Fermium',257,'actinide',7,3],
  [101,'Md','Mendelevium',258,'actinide',7,3],
  [102,'No','Nobelium',259,'actinide',7,3],
  [103,'Lr','Lawrencium',266,'actinide',7,3],
  [104,'Rf','Rutherfordium',267,'transition metal',7,4],
  [105,'Db','Dubnium',268,'transition metal',7,5],
  [106,'Sg','Seaborgium',269,'transition metal',7,6],
  [107,'Bh','Bohrium',270,'transition metal',7,7],
  [108,'Hs','Hassium',269,'transition metal',7,8],
  [109,'Mt','Meitnerium',278,'unknown',7,9],
  [110,'Ds','Darmstadtium',281,'unknown',7,10],
  [111,'Rg','Roentgenium',282,'unknown',7,11],
  [112,'Cn','Copernicium',285,'post-transition metal',7,12],
  [113,'Nh','Nihonium',286,'post-transition metal',7,13],
  [114,'Fl','Flerovium',289,'post-transition metal',7,14],
  [115,'Mc','Moscovium',290,'post-transition metal',7,15],
  [116,'Lv','Livermorium',293,'post-transition metal',7,16],
  [117,'Ts','Tennessine',294,'halogen',7,17],
  [118,'Og','Oganesson',294,'noble gas',7,18],
];

export const ELEMENTS = RAW.map(([atomic_number, symbol, name, atomic_mass, category, period, group]) => ({
  atomic_number,
  symbol,
  name,
  atomic_mass,
  category,
  period,
  group,
}));

function Tile({ el, selected, onClick }) {
  const color = CATEGORY_COLORS[el.category] || CATEGORY_COLORS.unknown;
  return (
    <button
      onClick={() => onClick(el)}
      className={`relative rounded-lg border px-2 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${color} ${
        selected ? 'ring-2 ring-cyan-400/70 shadow-[0_0_18px_rgba(34,211,238,0.45)]' : ''
      } bg-slate-900/60 backdrop-blur hover:bg-slate-900/80`}
      title={`${el.name} (${el.symbol})`}
    >
      <div className="text-[10px] text-slate-400">{el.atomic_number}</div>
      <div className="text-lg font-semibold text-slate-50 drop-shadow-sm">{el.symbol}</div>
      <div className="text-[10px] text-slate-400">{el.name}</div>
      <div className="text-[10px] text-slate-500">{el.atomic_mass}</div>
      {selected && (
        <div className="absolute inset-0 rounded-lg pointer-events-none shadow-[0_0_24px_rgba(34,211,238,0.35)_inset]"></div>
      )}
    </button>
  );
}

// Grid positions according to IUPAC layout
export default function PeriodicTable({ selectedZ, onSelect }) {
  const selected = selectedZ;

  // Build grid 18x7 for main table, plus two separate rows
  const mainCells = [];
  for (let p = 1; p <= 7; p++) {
    for (let g = 1; g <= 18; g++) {
      mainCells.push({ key: `${p}-${g}`, period: p, group: g });
    }
  }

  const byPos = new Map();
  ELEMENTS.forEach((el) => {
    if (el.category === 'lanthanide' || el.category === 'actinide') return;
    byPos.set(`${el.period}-${el.group}`, el);
  });

  const lanth = ELEMENTS.filter((e) => e.category === 'lanthanide');
  const actin = ELEMENTS.filter((e) => e.category === 'actinide');

  return (
    <div className="space-y-4">
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
        {mainCells.map((cell) => {
          const el = byPos.get(`${cell.period}-${cell.group}`);
          return (
            <div key={cell.key}>
              {el ? (
                <Tile el={el} selected={selected === el.atomic_number} onClick={onSelect} />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* Lanthanides */}
      <div>
        <div className="text-xs text-slate-400 mb-1">Lanthanides</div>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}>
          {lanth.map((el) => (
            <Tile key={el.atomic_number} el={el} selected={selected === el.atomic_number} onClick={onSelect} />
          ))}
        </div>
      </div>

      {/* Actinides */}
      <div>
        <div className="text-xs text-slate-400 mb-1">Actinides</div>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' }}>
          {actin.map((el) => (
            <Tile key={el.atomic_number} el={el} selected={selected === el.atomic_number} onClick={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}
