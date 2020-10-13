import Color from "color";
import { Logo } from "./logo";
import { bounce, fadeOut } from "./effects";

export const CalmLogo = () => {
  const color = Color("hsl(260,60%,65%,.9)");
  const [logo, rings] = Logo();
  document.getElementById("logo-calm")?.appendChild(logo);
  rings.forEach((ring) =>
    ring.colors.push({ val: color.toString(), dur: "3s" })
  );
  rings.forEach((ring) =>
    ring.colors.push({
      val: color.fade(0.2).rotate(30).toString(),
      dur: "6s",
      keySplines: "1 .6 .3 .9",
    })
  );
  rings.forEach((ring) =>
    ring.colors.push({
      val: color.fade(0.1).rotate(65).toString(),
      dur: "4s",
      keySplines: "1 .7 .3 .9",
    })
  );
  rings.forEach((ring) => (ring.modes.rotations = "repeat"));
  rings.forEach((ring) => (ring.modes.colors = "repeat"));
  rings[0].rotations.push({ val: "0; 360", dur: "12s" });
  rings[1].rotations.push({ val: "0;-360", dur: "9.5s" });
  rings[2].rotations.push({ val: "0; 360", dur: "11s" });
  rings[3].rotations.push({ val: "0;-360", dur: "9s" });
  rings[0].colors.push;
  console.log(rings);
  rings.forEach((ring) => ring.start());
};

export const CalmMovingLogo = () => {
  const color = Color("hsl(200,80%,55%,.8)");
  const [logo, rings] = Logo();
  document.getElementById("logo-calm-moving")?.appendChild(logo);
  rings.forEach((ring) =>
    ring.colors.push({ val: color.toString(), dur: "3s" })
  );
  rings.forEach((ring) =>
    ring.colors.push({
      val: color.fade(0.3).lighten(0.1).rotate(100).toString(),
      dur: "6s",
      keySplines: "1 .6 .3 .9",
    })
  );
  rings.forEach((ring) =>
    ring.colors.push({
      val: color.darken(0.3).rotate(50).toString(),
      dur: "4s",
      keySplines: "1 .7 .3 .9",
    })
  );
  rings.forEach((ring) => (ring.modes.rotations = "repeat"));
  rings.forEach((ring) => (ring.modes.colors = "repeat"));
  rings.forEach((ring) => (ring.modes.motions = "repeat"));

  rings[0].rotations.push({ val: "0; 360", dur: "12s" });
  rings[1].rotations.push({ val: "0; 360", dur: "7s" });
  rings[2].rotations.push({ val: "0; 360", dur: "6.7s" });
  rings[3].rotations.push({ val: "0;-360", dur: "10s" });

  rings[0].motions.push({ val: "M 0,0 .05,0 0,0", dur: "5s" });
  rings[1].motions.push({ val: "M 0,0 -.02,-0.05 0,0", dur: "7s" });
  rings[2].motions.push({ val: "M 0,0 .05,0 0,0", dur: "4.9s" });
  //rings[3].motions.push({ val: "M 0,.15 A .15 .15 0 0 0 -.15 0 M 0,0", dur: "2s" });
  rings[3].motions.push({
    val: "M 0,0 A .05 .05 0 1 0 0 .001 M 0,0",
    dur: "5s",
  });

  rings[0].colors.push;
  console.log(rings);
  rings.forEach((ring) => ring.start());
};

// prettier-ignore
export const BigIntro = () => {
  const color = Color("hsl(300,100%,55%,.8)");
  const [logo, rings] = Logo();
  document.getElementById("logo-big-intro")?.appendChild(logo);

  const finish = () => {
    console.log('finish it!');
    rings.forEach((ring,i) => {
      console.log(i,ring);
      //fadeOut(ring, "4s");
      ring.colors = [{val:'hsl(0,100%,70%,0)', dur:"4s", keySplines: `${.4-.1*i} .3 .8 1`}];
      ring.rotations = [{val:`${360*10}`, dur:"4s", keySplines: `${.4-.1*i} .3 .8 1`}];
      ring.motions = [{val:"M 0 0 .5 .5", dur:"4s"}];
      ring.modes.colors = 'once';
      ring.modes.rotations = 'once';
      ring.modes.motions = 'once';
      ring.start();
    });
    //rings[3].colors.push({val: 'hsl(0,0%,0%,0)'});
  };

  // hide
  rings[1].colors.push({val: "hsl(0,0%,0%,0); hsl(0,0%,0%,0)", dur:"4s"});
  rings[2].colors.push({val: "hsl(0,0%,0%,0); hsl(0,0%,0%,0)", dur:"8s"});
  rings[3].colors.push({val: "hsl(0,0%,0%,0); hsl(0,0%,0%,0)", dur:"8s"});
  rings[2].motions.push({val: "M 0 0",dur:"8s"});
  rings[3].motions.push({val: "M 0 0",dur:"8s"});

  // 0 - high energy

  rings[0].colors.push({val:"hsl(0,90%,55%,.95);hsl(240,80%,40%,.8)", dur:"4s", keySplines:"1 .2 .7 1"});
  rings[0].rotations.push({val:`${10*360}`, dur:"4s", keySplines:".2 1 .3 1"});

  // 1 - bounce
  rings[1].colors.push({val: "hsl(0,95%,60%,.85);hsl(0,95%,60%,.85)", dur:"2s"});
  rings[1].colors.push({val: "hsl(270,95%,30%,1);hsl(330,95%,70%,.75)", dur:"1s"});
  rings[1].colors.push({val: "hsl(360,95%,60%,1);hsl(280,95%,40%,.85)", dur:"0.5s"});
  rings[1].motions.push({val: "M 0,0; M 0,0", dur:"4s" });
  bounce(rings[1], "4s", 15, .4);

  // 2/3 dancing
  rings[2].rotations.push({val: "0;360", dur:"1.5s", keySplines:"1 .6 0 .7"});
  rings[2].motions.push({val: "M 0,0 0,0.5", dur:"1s", keySplines:".2 1 .2 1"});
  rings[2].motions.push({val: "M 0 .5 A .5 .5 0 1 0 -0.5 0", dur:"1s", keySplines:".2 1 .2 1"});
  rings[2].motions.push({val: "M -0.5 0 A .4 .2 30 1 1 .5 .5", dur:"1s", keySplines:".2 .5 .2 1",
                         callback: () => {
                         rings[2].modes.rotations = 'once';
                         rings[2].rotations = [{val:"720", dur:".75s", keySplines:".5 .8 .5 .8"}];
                         }
                     });
  rings[2].motions.push({val: "M 1 1 0 0", dur:"1s", keySplines:".5 .5 .5 .5"});
  rings[2].colors.push({val: color.toString(), dur: "0.5s"});
  rings[2].colors.push({val: color.fade(.5).rotate(90).toString(), dur: "1s"});
  rings[2].colors.push({val: color.toString(), dur: "1s"});
  rings[2].colors.push({val: color.fade(.5).rotate(90).toString(), dur: "0.5s"});
  rings[2].colors.push({val: "hsl(360,95%,60%,1)", dur: "1s", keySplines:".2 .5 .2 1"});

  rings[3].rotations.push({val:'270', dur:"1s", keySplines:"1 .6 0 .7"});
  rings[3].rotations.push({val:'-270', dur:"1s", keySplines:"1 .6 0 .7"});
  rings[3].colors.push({val:"hsl(180,95%,40%,.8);hsl(300,85%,60%,.7)"});
  rings[3].motions.push({val:"M -2,0 2,0 -1,0 1,0 -.5,0 .5,0 -.25,0 .25,0 -.125,0 .125,0 0,0",
                         dur:"4s", keySplines:"1 .8 .8 .2",
                         callback: () => {
                          rings[3].rotations = [{val:"0;360", dur:"1.5s", keySplines: ".5 1 .5 1",
                                                 callback: finish}];
                          rings[3].modes.rotations = 'once';
                          //rings[3].colors = [{val:"hsl(180,95%,40%,.8)"}];
                          rings[3].start();
                         }});

  // spin-fast and fade out

  console.log(rings);
  rings.forEach((ring) => ring.start());
};


export const CalmLogoZoom = () => {
  const color = Color("hsl(220,100%,55%,1)");
  const [logo, rings] = Logo();
  const container = document.createElement("div");
  container.style.transform = "scale(2,2) translate(25%,10%)";
  logo.className = "";
  container.appendChild(logo);
  const outer = document.getElementById("logo-calm-zoom") as HTMLDivElement;
  outer.appendChild(container);
  outer.className = "logo-proto";
  outer.style.overflow = "hidden";
  rings.forEach((ring) =>
    ring.colors.push({ val: color.toString(), dur: "3s" })
  );
  rings.forEach((ring) =>
    ring.colors.push({
      val: color.fade(0.2).rotate(30).toString(),
      dur: "3s",
      keySplines: "1 .6 .3 .9",
    })
  );
  rings.forEach((ring) =>
    ring.colors.push({
      val: color.fade(0.1).rotate(65).toString(),
      dur: "2s",
      keySplines: "1 .7 .3 .9",
    })
  );
  rings.forEach((ring) => (ring.modes.rotations = "repeat"));
  rings.forEach((ring) => (ring.modes.colors = "repeat"));
  rings[0].rotations.push({ val: "0; 360", dur: "7s" });
  rings[1].rotations.push({ val: "0;-360", dur: "5.5s" });
  rings[2].rotations.push({ val: "0; 360", dur: "11s" });
  rings[3].rotations.push({ val: "0;-360", dur: "9s" });
  rings[0].colors.push;
  console.log(rings);
  rings.forEach((ring) => ring.start());
};
