import { writeFileSync } from "fs";

const desktop = 1440;
const tablet = 768;
const mobile = 375;

const fluidity = ({ des, tes, mes }) => {
  const desToTab = 100 * Math.sqrt((des * tes) / (desktop * tablet));
  const tabToMob = 100 * Math.sqrt((tes * mes) / (tablet * mobile));
  const timestamp = Date.now();

  let template;

  if (mes === tes)
    // prettier-ignore
    template = `style={{ fontSize: "clamp(${Math.min(des, tes)}px, ${desToTab.toFixed(2)}vw, ${Math.max(des, tes)}px)" }}`;
  else if (mes < tes)
    // prettier-ignore
    template = `/* For screens from ${tablet}px to ${desktop}px */
@media (min-width: ${tablet}px) and (max-width: ${desktop}px) {
  ._${timestamp} {
    font-size: clamp(${Math.min(des, tes)}px, ${desToTab.toFixed(2)}vw, ${Math.max(des, tes)}px);
  }
}

/* For screens from ${mobile}px to ${tablet}px */
@media (min-width: ${mobile}px) and (max-width: ${tablet}px) {
  ._${timestamp} {
    font-size: clamp(${Math.min(tes, mes)}px, ${tabToMob.toFixed(2)}vw, ${Math.max(tes, mes)}px);
  }
}`
  else 
  // prettier-ignore
  template = `/* For screens from ${tablet}px to ${desktop}px */
@media (min-width: ${tablet}px) and (max-width: ${desktop}px) {
  ._${timestamp} {
    font-size: clamp(${Math.min(des, tes)}px, ${desToTab.toFixed(2)}vw, ${Math.max(des, tes)}px);
  }
}

/* For screens from ${mobile}px to ${tablet}px */
@media (min-width: ${mobile}px) and (max-width: ${tablet}px) {
  ._${timestamp} {
    font-size: calc(${tes + mes}px - clamp(${Math.min(tes, mes)}px, ${tabToMob.toFixed(2)}vw, ${Math.max(tes, mes)}px));
  }
}`

  // WRITE THE template variable content TO THE LOCALE FILE template.css
  writeFileSync("template.css", template);
};

fluidity({ des: 80, tes: 1, mes: 16 });
