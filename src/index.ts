// index.ts

import { Logo } from "./logo";
import { fadeIn, fadeOut, bounce, dip} from "./effects";
import { CalmLogo, CalmMovingLogo, BigIntro, CalmLogoZoom } from "./examples";

CalmLogo();
CalmMovingLogo();
BigIntro();
CalmLogoZoom();

/*
const [logo, rings] = Logo();
(document as any).rings = rings;
document.getElementById("app-root")?.appendChild(logo);
fadeIn(rings[0],'3s');
fadeOut(rings[0],'3s');
bounce(rings[1]);
dip(rings[2]);
rings[0].start();
rings[1].start();
rings[2].start();
*/

