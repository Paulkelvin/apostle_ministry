const fs = require('fs');
let content = fs.readFileSync('src/app/(site)/events/page.tsx', 'utf8');

const startIdx = content.indexOf('<div className="absolute inset-0');
if (startIdx !== -1) {
  const insertIdx = content.indexOf('/>', startIdx) + 2;
  const part1 = content.slice(0, insertIdx);
  const part2 = content.slice(insertIdx);
  const micro = `

          {/* Decorative MicroGraphics */}
          <FloatingRing className="top-10 left-[8%] opacity-30 mix-blend-multiply" size={70} delay={0.8} color="#D4AF37" />
          <WaveLine className="bottom-[15%] right-[10%] opacity-20 mix-blend-multiply rotate-[-5deg]" delay={1.4} color="#D4AF37" />`;
  
  if (!content.includes('Decorative MicroGraphics')) {
    content = part1 + micro + part2;
    fs.writeFileSync('src/app/(site)/events/page.tsx', content);
    console.log("Found and inserting.");
  } else {
    console.log("Already includes micrographics.");
  }
}
