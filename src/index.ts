// index.ts

import { Logo } from "./logo";

const [logo, rings] = Logo();

(document as any).rings = rings;

rings[0].motions.push({val:'M 0,0 .05,.1 0,.1 -.05,0 0,0', keySplines:'1 1 0 1'});
rings[0].colors.push({val:'hsl(30,100%,50%,1)'});
rings[0].colors.push({val:'hsl(130,100%,50%,.3)', dur:'2s'});
rings[0].rotations.push({val:'100'})
rings[0].rotations.push({val:'0', keySplines:'1 .1 .8 1'})
rings[0].rotations.push({val:'-50', dur:'3s'})
rings[0].modes.colors = 'repeat';
rings[0].modes.motions = 'repeat';

document.getElementById("app-root")?.appendChild(logo);
rings[0].start();
