import {useEffect,useRef} from 'react';import * as THREE from 'three';
const THEMES=[['GAMER',0xe33b45],['SLEEP',0xff9638],['SCIENCE',0xf0d52e],['MINECRAFT',0x3caf61],['FUTURE',0x31d8e9],['CHILL',0x9360e9],['ART',0xf17bd0],['PAST',0x9a6742],['STORY',0xe8edf2],['MYSTERY',0x262b3b],['MATH',0x8794a5],['SPACE',0x3f73cf],['SECRET',0xc4cbd5],['PRESENT',0xb47b4c],['FOOD',0x69c58a]];
const M=(c,r=.55,m=.35)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const LEVELS=[{name:'VILLAGE',x:-125,z:-139,y:2,color:0x72b95d},{name:'CITY',x:-70,z:-137,y:2,color:0x43a9d6},{name:'TREEHOUSE',x:-34,z:-139,y:12,color:0x4d9b58},{name:'UNDERGROUND BASE',x:0,z:-131,y:-16,color:0x65758a},{name:'KINGDOM',x:0,z:-125,y:2,color:0xd5ad55}];
const kingdomZ=-145;
function makeWorld(scene){const platforms=[],islands=[],robots=[],shots=[],glow=c=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.3,metalness:.3}),box=(p,x,y,z,w,h,d,m,solid=false)=>{let o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);if(solid){let wp=p.localToWorld(new THREE.Vector3(x,y,z));platforms.push({x:wp.x,y:wp.y+h/2,z:wp.z,w,h,d});}return o},cyl=(p,x,y,z,a,b,h,m,n=12)=>{let o=new THREE.Mesh(new THREE.CylinderGeometry(a,b,h,n),m);o.position.set(x,y,z);o.castShadow=true;p.add(o);return o};
function island(name,color,x,z,size,y=0){let g=new THREE.Group();g.position.set(x,y,z);scene.add(g);let rock=new THREE.Mesh(new THREE.CylinderGeometry(size*.88,size,2,12),M(color,.85,.2));rock.position.y=-1;rock.castShadow=rock.receiveShadow=true;g.add(rock);cyl(g,0,-2.3,0,size*.5,size*.8,1,M(0x29394c),9);let rim=new THREE.Mesh(new THREE.TorusGeometry(size*.84,.1,8,64),glow(color));rim.rotation.x=Math.PI/2;g.add(rim);islands.push({name,x,z,y,size});return g}
let hub=island('CENTRAL HUB',0x29445f,0,0,13);cyl(hub,0,2,0,2.6,3.3,4,M(0x182b43,.3,.8));for(let i=0;i<8;i++){let a=i*Math.PI/4;box(hub,Math.cos(a)*2.4,2.3,Math.sin(a)*2.4,.14,3,.14,glow(0x58e8ff));}for(let i=0;i<4;i++){let q=new THREE.Mesh(new THREE.TorusGeometry(4+i*.8,.035,6,80),glow(0x2d8ba9));q.rotation.x=Math.PI/2;q.position.y=.08;hub.add(q)}
THEMES.forEach(([name,color],i)=>{let a=i*Math.PI*2/THEMES.length,r=29+i%3*2,x=Math.cos(a)*r,z=Math.sin(a)*r,g=island(name,color,x,z,7.2),h=new THREE.Group();g.add(h);let wall=M(color),trim=M(0x17283d,.3,.8),win=glow(color);
box(h,0,1.55,-2.15,4.5,3.1,.28,wall,true);box(h,-2.1,1.55,0,.28,3.1,4.5,wall,true);box(h,2.1,1.55,0,.28,3.1,4.5,wall,true);box(h,-1.55,1.55,2.15,1.3,3.1,.28,wall,true);box(h,1.55,1.55,2.15,1.3,3.1,.28,wall,true);box(h,0,3.18,0,4.7,.25,4.8,trim);let roof=new THREE.Mesh(new THREE.ConeGeometry(3.5,1.5,4),trim);roof.position.y=4;roof.rotation.y=Math.PI/4;roof.castShadow=true;h.add(roof);for(let s of [-1,1]){box(h,s*2.26,1.9,-.6,.08,1.15,1.05,win);let l=new THREE.PointLight(color,1.7,10);l.position.set(s*2.8,2.2,2.8);g.add(l)}box(h,0,2.65,2.29,1.4,.12,.08,win);box(h,-.95,1.05,2.34,.12,2.1,.12,trim);box(h,.95,1.05,2.34,.12,2.1,.12,trim);box(h,0,2.12,2.34,2.02,.12,.12,trim);box(h,0,.12,2.36,1.9,.16,.22,glow(color));
/* Fully furnished, walk-in Chat House interiors. */
box(h,0,.08,0,4.05,.16,4.05,M(0x26384b),false);
box(h,0,.19,.15,2.8,.08,2.8,M(0x34475b),false);
box(h,-1.15,.55,-1.05,1.55,.5,1.05,M(0x293b50),false);box(h,-1.15,.84,-1.05,1.42,.12,.92,M(0x9bb6c8),false);
box(h,-1.15,1.02,-1.05,1.5,.12,.12,glow(color),false);
box(h,1.15,.55,-1.2,1.25,.5,.72,trim,false);box(h,1.15,.92,-1.2,1.05,.48,.12,glow(color),false);
box(h,1.15,1.3,-1.2,.92,.58,.12,M(0x101e31),false);box(h,1.15,1.3,-1.12,.72,.38,.035,glow(color),false);
box(h,-1.55,1.05,-1.95,.55,1.45,.35,trim,false);for(let shelf=0;shelf<3;shelf++)box(h,-1.55,.62+shelf*.42,-1.73,.62,.06,.45,M(0xb0c0c9),false);
cyl(h,.15,.48,.25,.32,.32,.72,trim,10);box(h,.15,.86,.25,.9,.08,.72,glow(color),false);
for(let side of [-1,1]){cyl(h,side*1.72,.65,.75,.07,.07,1.1,glow(0xffd477),8);let shade=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),glow(0xffd477));shade.position.set(side*1.72,1.25,.75);h.add(shade)}
if(i===0){box(h,-.2,.45,-.25,.55,.5,.55,glow(0xe33b45),false);box(h,-.2,.75,-.25,.35,.08,.35,glow(0x65eaff),false)}
else if(i===1){let moon=new THREE.Mesh(new THREE.TorusGeometry(.35,.1,8,20),glow(0xffbd62));moon.position.set(0,1.1,-1.6);h.add(moon)}
else if(i===2){for(let q=0;q<3;q++)cyl(h,-.7+q*.7,.6,.45,.12,.12,.8,glow(0x55eaff),8)}
else if(i===3){for(let q=0;q<3;q++)box(h,-.65+q*.65,.55,.45,.5,.5,.5,M([0x54b66c,0x8b6545,0x5a8bc9][q]),false)}
else if(i===5){for(let q=0;q<3;q++){let crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.25),glow(0x9beaff));crystal.position.set(-.65+q*.65,.65,.45);h.add(crystal)}}
else if(i===6){for(let q=0;q<3;q++){let art=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),glow([0xff5b85,0xffd35b,0x54cfff][q]));art.position.set(-.65+q*.65,.72,.45);h.add(art)}}
else if(i===14){for(let q=0;q<3;q++){let snack=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),glow([0xff6a45,0x70d66f,0xffd34e][q]));snack.position.set(-.65+q*.65,.72,.45);h.add(snack)}}
let welcome=new THREE.PointLight(color,.65,8);welcome.position.set(0,2.5,1.7);h.add(welcome);box(h,-1,.55,-.7,.8,.9,.65,trim);box(h,1,.45,-.8,1.1,.7,.6,trim);box(h,0,3.35,-2.34,2.8,.28,.12,trim);box(h,0,3.38,-2.42,2.35,.12,.08,win);for(let q=-1;q<=1;q++){box(h,q*1.35,.18,0,.08,.12,3.7,glow(color));box(h,q*1.35,3.08,0,.08,.1,3.7,glow(color))}for(let q=-1;q<=1;q+=2){let lamp=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),glow(0xffdf83));lamp.position.set(q*2.55,2.95,2.1);h.add(lamp)}cyl(h,0,4.85,0,.07,.1,.8,win,8);
let emblem;
if(i===0){emblem=box(h,0,4.9,0,1.8,.5,.4,glow(0xff4059));for(let k=-1;k<=1;k++)box(h,k*.48,5.25,.08,.18,.2,.08,glow(0x6cf5ff))}
else if(i===1){emblem=new THREE.Mesh(new THREE.TorusGeometry(.8,.16,8,24),glow(0xffbd62));emblem.position.set(0,5,0);h.add(emblem)}
else if(i===2){emblem=cyl(h,0,5,0,.15,.7,1.4,glow(0x52eaff),8);for(let k=0;k<4;k++)box(h,0,5.6+k*.15,0,1.8,.07,.07,glow(0xffd65e))}
else if(i===3){for(let k=0;k<4;k++)box(h,(k-1.5)*.55,5,0,.5,.5,.5,M([0x54b66c,0x8b6545,0x5a8bc9,0xa7a7a7][k]))}
else if(i===4||i===11){emblem=new THREE.Mesh(new THREE.TorusGeometry(1.1,.1,8,32),glow(i===4?0x4beaff:0x779aff));emblem.position.y=5;emblem.rotation.x=.8;h.add(emblem)}
else if(i===5){for(let k=0;k<3;k++){let crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.55),glow(0x9beaff));crystal.position.set((k-1)*.8,5,0);h.add(crystal)}}
else if(i===6){for(let k=0;k<3;k++){let orb=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),glow([0xff5b85,0xffd35b,0x54cfff][k]));orb.position.set((k-1)*.8,5,0);h.add(orb)}}
else if(i===7){for(let k=0;k<3;k++)cyl(h,(k-1)*.7,5,0,.22,.22,1.2,M(0x9b744c),6)}
else if(i===8){let book=box(h,0,5,0,1.7,.25,1.2,M(0xe8edf2));box(h,0,5.16,0,.08,.08,1.1,glow(0xffd36a))}
else if(i===9){for(let k=0;k<2;k++){let eye= new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),glow(0x9b8bff));eye.position.set((k-.5)*.7,5,.2);h.add(eye)}}
else if(i===10||i===13){emblem=new THREE.Mesh(new THREE.TorusGeometry(.85,.08,8,32),glow(i===10?0x9daeff:0xffc76b));emblem.position.y=5;h.add(emblem);cyl(h,0,5,0,.06,.06,1.2,glow(0xffffff),8)}
else if(i===12){for(let k=0;k<4;k++){let shard=new THREE.Mesh(new THREE.OctahedronGeometry(.42),glow(0xc9d8ee));shard.position.set((k-1.5)*.55,5+Math.sin(k)*.3,0);h.add(shard)}}
else if(i===14){let fruit=new THREE.Mesh(new THREE.SphereGeometry(.65,12,10),glow(0x68d58b));fruit.scale.set(1,1.15,1);fruit.position.y=5;h.add(fruit);cyl(h,0,5.75,0,.08,.08,.35,M(0x765039),6)}

for(let p=0;p<6;p++){let t=.16+p*.14,px=x*t,pz=z*t,py=.28+Math.sin(p*1.4)*.35;let pl=box(scene,px,py,pz,2.5,.42,2.5,M(0x354c62,.45,.65),true);pl.rotation.y=Math.atan2(x,z);let edge=new THREE.Mesh(new THREE.BoxGeometry(2.56,.08,2.56),glow(0x2b7892));edge.position.set(px,py+.23,pz);scene.add(edge)}for(let k=0;k<8;k++){let q=k*Math.PI/4;cyl(g,Math.cos(q)*5.8,.25,Math.sin(q)*5.8,.12,.16,.5,glow(color),8)}cyl(g,0,.55,-4.3,.16,.22,1.3,glow(color),8)});
// Five connected level zones orbit the central Kingdom.
const kingdomX=0,kingdomZ=-145;
const kingdom=island('KINGDOM',0xd5ad55,kingdomX,kingdomZ,27);
let castleStone=M(0x8b929b),gold=M(0xb58a39),kingGlow=glow(0xffd36a);
box(kingdom,0,4,-5,22,8,18,castleStone,true);box(kingdom,0,8.2,-5,24,.5,20,gold);
for(let side of [-1,1]){box(kingdom,side*8,9,-5,3,9,3,gold,true);let spire=new THREE.Mesh(new THREE.ConeGeometry(2.4,5,4),gold);spire.position.set(side*8,16,-5);spire.rotation.y=Math.PI/4;kingdom.add(spire)}
box(kingdom,0,2,5,5,4,.5,gold,true);box(kingdom,0,5,5,2,.2,.12,kingGlow);
for(let side of [-1,1])box(kingdom,side*13,2,-5,2,4,2,gold,true);
for(let i=0;i<12;i++){
 const a=i*Math.PI/6, x=Math.cos(a)*70, z=kingdomZ+Math.sin(a)*70;
 const city=island('CITY DISTRICT '+(i+1),0x43a9d6,x,z,12);
 let h=9+(i%4)*4,building=M(0x536b82,.35,.7),glass=glow(0x39d8f4);
 box(city,0,h/2,0,7,h,7,building,true);box(city,0,h+.25,0,7.5,.5,7.5,M(0x1d344b));
 for(let y=2;y<h;y+=2.8)for(let side of [-1,1])box(city,side*2,y,3.56,1.2,1.05,.1,glass);
 box(city,0,.25,5,2,.5,4,M(0x303e50));
}
for(let i=0;i<12;i++){
 const a=i*Math.PI/6, x=Math.cos(a)*125, z=kingdomZ+Math.sin(a)*125;
 const village=island('VILLAGE HAMLET '+(i+1),0x72b95d,x,z,9);
 const timber=M(0x765039),thatch=M(0x344d43),window=glow(0xffd477);
 /* Walk-in cottage shell with an open front doorway. */
box(village,0,2,-2.42,6,4,.16,timber,true);box(village,-2.92,2,0,.16,4,5,timber,true);box(village,2.92,2,0,.16,4,5,timber,true);
box(village,-2,2,2.42,2,4,.16,timber,true);box(village,2,2,2.42,2,4,.16,timber,true);box(village,0,3.92,2.42,2, .16,.16,timber,true);
box(village,0,.12,0,5.6,.18,4.6,M(0x6b503b),false);
box(village,-1.45,.58,-.8,1.55,.65,1.1,M(0x49372e),false);box(village,-1.45,.96,-.8,1.4,.12,.95,M(0xd8c2a0),false);
box(village,1.1,.58,-.9,1.25,.55,.8,M(0x765039),false);cyl(village,1.1,.95,-.9,.24,.24,.15,M(0xb58b54),10);
box(village,0,.55,.65,1.1,.6,.8,M(0x765039),false);cyl(village,0,.9,.65,.06,.06,.6,M(0x9b754b),8);
for(let side of [-1,1]){let lantern=new THREE.Mesh(new THREE.SphereGeometry(.18,8,8),window);lantern.position.set(side*2.3,2.7,1.8);village.add(lantern)}
 let roof=new THREE.Mesh(new THREE.ConeGeometry(5,3,4),thatch);roof.position.y=5;roof.rotation.y=Math.PI/4;village.add(roof);
 box(village,0,.24,2.75,1.5,.08,.45,glow(0xffd477),false);
 for(let side of [-1,1])box(village,side*2,2.6,2.6,1.1,1.1,.12,window);
 for(let side of [-1,1]){cyl(village,side*5,.8,-2,.22,.28,1.6,thatch,8);let lamp=new THREE.Mesh(new THREE.SphereGeometry(.18,8,8),window);lamp.position.set(side*5,1.8,-2);village.add(lamp)}
}
// Stepping-stone bridges let the player travel between districts and level rings.
for(let ring of [{r:125,count:12,y:.25,size:5.3},{r:70,count:12,y:.28,size:5.1}]){
 for(let i=0;i<ring.count;i++){
  const a=i*Math.PI*2/ring.count,b=(i+1)*Math.PI*2/ring.count;
  for(let j=1;j<=5;j++){
   const t=j/6,ang=a+(b-a)*t,rr=ring.r;
   box(scene,Math.cos(ang)*rr,ring.y,kingdomZ+Math.sin(ang)*rr,ring.size,.42,ring.size,M(0x3a5366,.5,.65),true);
  }
 }
}
// A continuous approach runs from the Village ring, through the City, and up to the Treehouse halo.
for(let j=1;j<11;j++){let r=125-j*5.1;box(scene,-r,.28,-145,4.8,.42,4.8,M(0x486174,.48,.65),true)}
for(let j=1;j<8;j++){let r=70-j*5.0,y=.3+j*1.35;box(scene,-r,y,-145,4.8,.42,4.8,M(0x486174,.48,.65),true)}
for(let j=1;j<6;j++){let r=34-j*5.0,y=10-j*1.65;box(scene,-r,y,-145,4.8,.42,4.8,M(0x765039,.55,.35),true)}
for(let i=0;i<8;i++){
 const a=i*Math.PI/4, x=Math.cos(a)*34, z=kingdomZ+Math.sin(a)*34;
 const tree=island('TREEHOUSE HALO '+(i+1),0x4d9b58,x,z,8,10);
 const bark=M(0x765039),leaf=glow(0x287b43),wood=M(0x8a623c);
 cyl(tree,0,5,0,.8,1.15,10,bark,9);
 let house=new THREE.Group();house.position.set(0,10,0);tree.add(house);
 box(house,0,2,-1.92,5,2.5,.16,wood,true);box(house,-2.42,2,0,.16,2.5,4,wood,true);box(house,2.42,2,0,.16,2.5,4,wood,true);box(house,-1.65,2,1.92,1.5,2.5,.16,wood,true);box(house,1.65,2,1.92,1.5,2.5,.16,wood,true);
box(house,0,.12,0,4.6,.16,3.6,M(0x765039),false);box(house,-1,.55,-.55,1.3,.55,.8,M(0x4d3b2c),false);box(house,-1,.9,-.55,1.2,.12,.7,M(0xb9d1a0),false);box(house,1,.55,-.6,1.1,.55,.7,wood,false);box(house,1,.95,-.6,.85,.55,.1,glow(0x78e9b2),false);cyl(house,0,.45,.75,.3,.3,.55,wood,8)
 let roofTree=new THREE.Mesh(new THREE.ConeGeometry(4,2.5,4),M(0x355c3e));roofTree.position.y=3;roofTree.rotation.y=Math.PI/4;house.add(roofTree);
 box(house,0,1.92,2.05,1.6,.12,.1,glow(0x78e9b2));
 let crown=new THREE.Mesh(new THREE.IcosahedronGeometry(4,1),leaf);crown.position.set(0,8,0);tree.add(crown);
}
// Living branches connect the elevated treehouse halo into one walkable ring.
for(let i=0;i<8;i++){
 const a=i*Math.PI/4, mid=a+Math.PI/8, r=34*Math.cos(Math.PI/8), x=Math.cos(mid)*r, z=kingdomZ+Math.sin(mid)*r;
 let branch=box(scene,x,10.35,z,26,.7,2.8,M(0x765039),true);branch.rotation.y=-mid;
 let twig=box(scene,x,10.78,z,24,.12,2.95,glow(0x4d9b58));twig.rotation.y=-mid;
}
// Trapdoor on the Kingdom's southern courtyard leads straight below the castle.
box(kingdom,0,.22,12,4,.35,4,M(0x3c3028),true);
box(kingdom,0,.43,12,3.5,.18,3.5,glow(0xffbd4a));
for(let side of [-1,1])box(kingdom,side*2.1,.35,12,.22,.65,4,gold);
const underground=island('UNDERGROUND BASE',0x65758a,0,kingdomZ,24,-18);
let bunker=M(0x34475c),panel=glow(0x3bdcff),darkBunker=M(0x182b3d);
box(underground,0,3,-3,20,6,16,bunker,true);box(underground,0,6.2,-3,21,.4,17,darkBunker);
box(underground,0,2,5,8,4,.3,panel,true);box(underground,0,4.3,-10,12,.3,.3,panel);
for(let side of [-1,1]){box(underground,side*8,2,-3,.5,4,12,darkBunker);for(let j=0;j<4;j++)box(underground,side*7,1.2+j*.9,-8+j*2,.15,.45,.15,panel)}
for(let i=0;i<5;i++)box(underground,-8+i*4,.3,-12,2,.6,2,M(0x273b4e));
function robot(x,z,i){let g=new THREE.Group();scene.add(g);let alloy=M(i%3?0x536a7d:0x879aa8,.3,.82),dark=M(0x172536,.28,.8),red=glow(i%3===1?0xffb13b:0xff4059),eye=glow(0x62edff),torso=new THREE.Group();g.add(torso);box(torso,0,1.12,0,.86,1.05,.56,alloy);box(torso,0,1.18,.3,.52,.38,.08,dark);box(torso,0,1.2,.35,.25,.09,.04,red);box(torso,0,1.72,0,.68,.52,.62,alloy);box(torso,-.18,1.78,.33,.12,.09,.06,eye);box(torso,.18,1.78,.33,.12,.09,.06,eye);cyl(torso,0,2.08,0,.09,.13,.22,dark,8);let limbs=[];for(let s of [-1,1]){let arm=new THREE.Group();arm.position.set(s*.56,1.55,0);torso.add(arm);cyl(arm,0,-.28,0,.12,.15,.52,dark,8);box(arm,0,-.57,0,.24,.2,.25,alloy);limbs.push({pivot:arm,phase:s*Math.PI});let leg=new THREE.Group();leg.position.set(s*.23,.62,0);g.add(leg);cyl(leg,0,-.25,0,.14,.17,.5,dark,8);box(leg,0,-.53,.1,.3,.15,.46,alloy);limbs.push({pivot:leg,phase:s*Math.PI+Math.PI});let shoulder=new THREE.Mesh(new THREE.SphereGeometry(.19,10,8),alloy);shoulder.position.set(s*.56,1.55,0);torso.add(shoulder)}box(torso,0,1.22,-.38,.48,.65,.22,dark);for(let k=0;k<3;k++)box(torso,0,1.05+k*.16,-.51,.3,.045,.04,glow(0x38bfff));g.position.set(x,0,z);robots.push({g,torso,limbs,x,z,phase:Math.random()*6,attack:0,fire:1.2+Math.random()*2,windup:0,stun:0})}
THEMES.forEach((t,i)=>{let a=i*Math.PI*2/THEMES.length,r=29+i%3*2;for(let j=0;j<2;j++)robot(Math.cos(a)*r+(Math.random()-.5)*5,Math.sin(a)*r+(Math.random()-.5)*5,i)});for(let i=0;i<5;i++)robot((Math.random()-.5)*10,(Math.random()-.5)*10,i);LEVELS.forEach((lv,i)=>robot(lv.x+10,lv.z+10,i));
for(let i=0;i<36;i++){let a=Math.random()*Math.PI*2,r=48+Math.random()*60,o=new THREE.Mesh(new THREE.DodecahedronGeometry(.25+Math.random()*.8),M(0x34465c,.9,.2));o.position.set(Math.cos(a)*r,-8+Math.random()*24,Math.sin(a)*r);scene.add(o)}
/* World-detail pass: landmarks, paths, lights and readable silhouettes. */
const detailMat=M(0x243b50,.42,.72),warmGlow=glow(0xffc96b),cyanGlow=glow(0x55eaff);
for(let i=0;i<12;i++){
 const a=i*Math.PI/6,x=Math.cos(a)*70,z=kingdomZ+Math.sin(a)*70;
 const district=scene.children.find(o=>o.position&&Math.abs(o.position.x-x)<.1&&Math.abs(o.position.z-z)<.1);
 if(district){
  for(let s of [-1,1]){
   box(district,s*5,.55,5.8,1.1,1.1,.25,detailMat);
   for(let y=2;y<13;y+=2.7)box(district,s*2,y,3.62,.7,.75,.12,glow(0x4ddcf3));
  }
  let beacon=new THREE.Mesh(new THREE.CylinderGeometry(.12,.35,3,8),cyanGlow);beacon.position.set(0,15,0);district.add(beacon);
 }
}
for(let i=0;i<12;i++){
 const a=i*Math.PI/6,x=Math.cos(a)*125,z=kingdomZ+Math.sin(a)*125;
 const village=scene.children.find(o=>o.position&&Math.abs(o.position.x-x)<.1&&Math.abs(o.position.z-z)<.1);
 if(village){
  for(let s of [-1,1]){
   box(village,s*4,.35,-3,2.2,.7,.25,detailMat);
   box(village,s*4,.8,-3,.12,.25,.12,warmGlow);
  }
  let wind=new THREE.Group();wind.position.set(0,4.7,-4);village.add(wind);
  cyl(wind,0,0,0,.12,.12,.35,detailMat,8);
  for(let k=0;k<4;k++){let blade=box(wind,0,1.1,0,.22,2.2,.12,M(0xb8c6c8));blade.rotation.z=k*Math.PI/2}
 }
}
for(let i=0;i<8;i++){
 const a=i*Math.PI/4,x=Math.cos(a)*34,z=kingdomZ+Math.sin(a)*34;
 const tree=scene.children.find(o=>o.position&&Math.abs(o.position.x-x)<.1&&Math.abs(o.position.z-z)<.1);
 if(tree){
  for(let s of [-1,1]){let branch=cyl(tree,s*1.5,8,0,.18,.28,4,M(0x765039),8);branch.rotation.z=s*.65}
  for(let k=0;k<5;k++){let leaf=new THREE.Mesh(new THREE.SphereGeometry(1.25,8,7),glow(0x347f4a));leaf.position.set(Math.cos(k*1.256)*3,8+Math.sin(k*1.256),Math.sin(k*1.256)*3);tree.add(leaf)}
 }
}
for(let i=0;i<8;i++){let a=i*Math.PI/4;let lamp=new THREE.PointLight(i%2?0x54dfff:0xffc96b,1.1,18);lamp.position.set(Math.cos(a)*19,5,kingdomZ+Math.sin(a)*19);kingdom.add(lamp)}
for(let i=0;i<10;i++){let pipe=box(underground,-9+i*2,1.1,-11,.12,.18,8,glow(i%2?0x36cfff:0x8d9eae));pipe.rotation.y=.08}
for(let i=0;i<6;i++){let console=box(underground,-8+i*3,1.8,6,1.5,2,.5,detailMat);box(underground,-8+i*3,2.35,6.27,1.15,.65,.08,glow([0x39dfff,0x7cff9d,0xffbd4a][i%3]))}


const targets=[];
function addTarget(kind,id,x,y,z,color,level){
 const group=new THREE.Group();group.position.set(x,y,z);scene.add(group);
 const mat=glow(color);
 if(kind==='TEST TUBE'){const glass=new THREE.MeshStandardMaterial({color:0xc9f5ff,metalness:.15,roughness:.12,transparent:true,opacity:.32});const tube=new THREE.Mesh(new THREE.CylinderGeometry(.42,.3,2.4,16,1,true),glass);tube.position.y=1.2;group.add(tube);const fluid=new THREE.Mesh(new THREE.CylinderGeometry(.29,.28,1.05,12),mat);fluid.position.y=.72;group.add(fluid);const cap=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.22,16),M(0x9eb8c9,.25,.8));cap.position.y=2.42;group.add(cap);const ring=new THREE.Mesh(new THREE.TorusGeometry(.72,.09,8,24),mat);ring.rotation.x=Math.PI/2;ring.position.y=.18;group.add(ring)}else{const stem=new THREE.Mesh(new THREE.CylinderGeometry(.12,.2,2.4,8),mat);stem.position.y=1.2;group.add(stem);const ring=new THREE.Mesh(new THREE.TorusGeometry(.85,.12,8,24),mat);ring.rotation.x=Math.PI/2;ring.position.y=.25;group.add(ring);const orb=new THREE.Mesh(new THREE.OctahedronGeometry(.55),mat);orb.position.y=2.65;group.add(orb)}
 targets.push({kind,id,group,done:false,level});
}
THEMES.forEach(([name,color],i)=>{const a=i*Math.PI*2/THEMES.length,r=29+i%3*2;addTarget('HOUSE',name,Math.cos(a)*r,0,Math.sin(a)*r,color,1)});
for(let i=0;i<12;i++){const a=i*Math.PI/6;addTarget('CITY ISLAND','DISTRICT '+(i+1),Math.cos(a)*70+5,0,kingdomZ+Math.sin(a)*70+5,0x48dfff,2)}
for(let i=0;i<8;i++){const a=i*Math.PI/4;addTarget('BRANCH','BRANCH '+(i+1),Math.cos(a)*34+5.2,10,kingdomZ+Math.sin(a)*34,0x72e58b,3)}
for(let i=0;i<6;i++)addTarget('TEST TUBE','SPECIMEN '+(i+1),-8+i*3,-18,-4,0x55eaff,4);

return{platforms,islands,robots,shots,targets,enemyShots:[]}}
export default function App(){const mount=useRef(null),hud=useRef(null),message=useRef(null);useEffect(()=>{let host=mount.current;if(!host)return;let scene=new THREE.Scene();scene.background=new THREE.Color(0x050817);scene.fog=new THREE.FogExp2(0x050817,.0035);let camera=new THREE.PerspectiveCamera(76,innerWidth/innerHeight,.1,600);camera.rotation.order='YXZ';let renderer=new THREE.WebGLRenderer({antialias:false,powerPreference:'high-performance',stencil:false,depth:true});const mobileGPU=/iPhone|iPad|Android/i.test(navigator.userAgent)||(navigator.deviceMemory&&navigator.deviceMemory<=4);renderer.setPixelRatio(Math.min(devicePixelRatio,mobileGPU?1.15:1.45));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=false;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;host.appendChild(renderer.domElement);scene.add(new THREE.HemisphereLight(0x9ddcff,0x151126,1.8));let sun=new THREE.DirectionalLight(0xffffff,2.4);sun.position.set(-35,65,25);sun.castShadow=false;scene.add(sun);let sg=new THREE.BufferGeometry(),pts=[];for(let i=0;i<850;i++)pts.push((Math.random()-.5)*340,Math.random()*170-10,(Math.random()-.5)*340);sg.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xb8eaff,size:.32})));let world=makeWorld(scene),keys={},health=100,score=0,yaw=0,pitch=0,vy=0,grounded=false,cool=0,msgTime=0,last=performance.now(),drag=false,lx=0,ly=0,player={x:-125,y:2,z:-139},currentLevel=1,cinematic=null,seenLevels=new Set([1]);let say=s=>{if(hud.current){message.current.textContent=s;message.current.style.opacity=1;msgTime=2}},jump=()=>{if(grounded){vy=8.2;grounded=false}},fire=()=>{if(cool>0)return;cool=.3;let dir=new THREE.Vector3(0,0,-1).applyEuler(camera.rotation),o=new THREE.Mesh(new THREE.SphereGeometry(.14,12,10),new THREE.MeshBasicMaterial({color:0x68efff}));o.position.copy(camera.position).addScaledVector(dir,.8);scene.add(o);world.shots.push({o,dir,life:1.4})};function groundAt(x,z){let y=-100;for(let a of world.islands)if(Math.hypot(x-a.x,z-a.z)<a.size*.86&&player.y>=a.y-.25)y=Math.max(y,a.y);for(let p of world.platforms)if(Math.abs(x-p.x)<p.w/2+.2&&Math.abs(z-p.z)<p.d/2+.2&&player.y>=p.y-.25)y=Math.max(y,p.y);return y}function blocked(x,z){return world.platforms.some(p=>p.h>1&&Math.abs(x-p.x)<p.w/2+.3&&Math.abs(z-p.z)<p.d/2+.3&&player.y<p.y+p.h/2+.3&&player.y>p.y-p.h/2-.5)}
function robotBlocked(x,z,r){return world.platforms.some(p=>p.h>1&&Math.abs(x-p.x)<p.w/2+r&&Math.abs(z-p.z)<p.d/2+r&&p.y-p.h/2<2.15&&p.y+p.h/2>.1)}
function robotAt(x,z){return world.robots.some(r=>Math.hypot(x-r.g.position.x,z-r.g.position.z)<.95)}
const down=e=>{if(e.code==='Escape'&&document.pointerLockElement)document.exitPointerLock();keys[e.code]=true;if(e.code==='Space'){e.preventDefault();jump()}if(e.code==='KeyF')fire()},up=e=>keys[e.code]=false,pm=e=>{if(document.pointerLockElement===renderer.domElement){yaw-=e.movementX*.0022;pitch=Math.max(-1.2,Math.min(1.2,pitch-e.movementY*.0022))}},pd=e=>{if(e.pointerType==='mouse')renderer.domElement.requestPointerLock?.();else{drag=true;lx=e.clientX;ly=e.clientY}},pu=()=>drag=false,tm=e=>{if(drag){yaw-=(e.clientX-lx)*.006;pitch=Math.max(-1.1,Math.min(1.1,pitch-(e.clientY-ly)*.004));lx=e.clientX;ly=e.clientY}},click=()=>{if(matchMedia('(pointer:fine)').matches)fire()},resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};let canvas=renderer.domElement;canvas.addEventListener('pointerdown',pd);canvas.addEventListener('pointermove',tm);canvas.addEventListener('click',click);window.addEventListener('pointerup',pu);window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('mousemove',pm);window.addEventListener('resize',resize);let buttons=host.parentElement.querySelectorAll('[data-key]');const setMoveButton=(b,on)=>{keys[b.dataset.key]=on;b.classList.toggle('pressed',on)};const clearMoveButtons=()=>buttons.forEach(b=>setMoveButton(b,false));buttons.forEach(b=>{let k=b.dataset.key;const press=e=>{e.preventDefault();e.stopPropagation();setMoveButton(b,true);try{if(e.pointerId!==undefined)b.setPointerCapture(e.pointerId)}catch(_){}};const release=e=>{if(e)e.preventDefault();setMoveButton(b,false)};b.addEventListener('pointerdown',press);b.addEventListener('pointerup',release);b.addEventListener('pointercancel',release);b.addEventListener('lostpointercapture',release);b.addEventListener('touchstart',press,{passive:false});b.addEventListener('touchend',release,{passive:false});b.addEventListener('touchcancel',release,{passive:false})});window.addEventListener('pointerup',clearMoveButtons);window.addEventListener('pointercancel',clearMoveButtons);window.addEventListener('touchend',clearMoveButtons,{passive:true});window.addEventListener('touchcancel',clearMoveButtons,{passive:true});let levelButtons=host.parentElement.querySelectorAll('[data-level]');const beginCutscene=n=>{if(seenLevels.has(n))return;seenLevels.add(n);cinematic={n,t:0,sx:player.x,sy:player.y,sz:player.z,syaw:yaw};const titles=['VILLAGE DISCOVERED • THE OUTER HAMLETS','CITY DISCOVERED • TWELVE DISTRICTS ONLINE','TREEHOUSE DISCOVERED • THE CANOPY HALO','SECRET ACCESS • DESCENDING TO THE UNDERGROUND BASE','KINGDOM DISCOVERED • THE ROYAL CITADEL'];say(titles[n-1])};const progress=()=>{let stage=1;for(let n=1;n<=4;n++){let list=world.targets.filter(t=>t.level===n);if(list.length&&list.every(t=>t.done))stage=n+1;else break}return stage};const refreshLocks=()=>{let max=progress();levelButtons.forEach(b=>{let n=Number(b.dataset.level);b.disabled=n>max;b.classList.toggle('locked',n>max);b.title=n>max?'Conquer the previous area first':''})};const chooseLevel=n=>{let lv=LEVELS[n-1];if(!lv)return;if(n>progress()){say('LEVEL LOCKED! CONQUER EVERY OBJECTIVE FIRST');return}currentLevel=n;player.x=lv.x;player.z=lv.z;player.y=lv.y;vy=0;pitch=0;yaw=0;health=100;levelButtons.forEach(b=>b.classList.toggle('active',Number(b.dataset.level)===n));beginCutscene(n)};levelButtons.forEach(b=>b.addEventListener('click',()=>chooseLevel(Number(b.dataset.level))));let jb=host.parentElement.querySelector('[data-action="jump"]'),fb=host.parentElement.querySelector('[data-action="fire"]'),hb=host.parentElement.querySelector('[data-action="howto"]'),hp=host.parentElement.querySelector('.howto-modal'),hcs=host.parentElement.querySelectorAll('[data-action="close-help"]'),jfn=e=>{e.preventDefault();jump()},ffn=e=>{e.preventDefault();fire()},hfn=e=>{e.preventDefault();if(hp)hp.classList.add('open')},hclose=e=>{e.preventDefault();if(hp)hp.classList.remove('open')};jb?.addEventListener('pointerdown',jfn);fb?.addEventListener('pointerdown',ffn);hb?.addEventListener('click',hfn);hcs.forEach(b=>b.addEventListener('click',hclose));hp?.addEventListener('click',e=>{if(e.target===hp)hp.classList.remove('open')});say('CONQUER THE CHAT HOUSE ISLANDS!');refreshLocks();
let frame,lastRender=0,frameInterval=1000/(mobileGPU?45:60);
const graphicsPanel=host.parentElement.querySelector('.graphics-panel'),graphicsToggleBtn=host.parentElement.querySelector('[data-action="graphics-toggle"]'),qualityButtons=host.parentElement.querySelectorAll('[data-quality]');
function applyGraphics(mode){
 const presets={LOW:{mobile:.82,desktop:1.05,fog:.0044,exposure:1.08,glow:.78},MEDIUM:{mobile:1.15,desktop:1.45,fog:.0035,exposure:1.18,glow:1},DETAILED:{mobile:1.32,desktop:1.65,fog:.0028,exposure:1.25,glow:1.28}};
 const p=presets[mode]||presets.MEDIUM;
 renderer.setPixelRatio(Math.min(devicePixelRatio,mobileGPU?p.mobile:p.desktop));
 renderer.setSize(innerWidth,innerHeight);
 scene.fog.density=p.fog;renderer.toneMappingExposure=p.exposure;
 scene.traverse(o=>{if(o.material&&o.material.emissive)o.material.emissiveIntensity=p.glow});
 qualityButtons.forEach(b=>{b.classList.toggle('selected',b.dataset.quality===mode);b.setAttribute('aria-pressed',b.dataset.quality===mode?'true':'false')});
}
const toggleGraphics=()=>graphicsPanel?.classList.toggle('open');
graphicsToggleBtn?.addEventListener('click',toggleGraphics);
const qualityClick=e=>{const mode=e.currentTarget.dataset.quality;applyGraphics(mode);graphicsPanel?.classList.remove('open');say('GRAPHICS: '+mode+' MODE')};qualityButtons.forEach(b=>b.addEventListener('click',qualityClick));
applyGraphics('MEDIUM');
function update(dt){if(cinematic){cinematic.t+=dt;const t=Math.min(cinematic.t/5.2,1),ease=t*t*(3-2*t);const targets=[[-125,0,-139],[-70,0,-137],[-34,10,-139],[0,-18,-145],[0,0,-145]];const target=targets[cinematic.n-1];if(cinematic.n===4){const run=Math.min(cinematic.t/1.8,1),r=run*run*(3-2*run);player.x=cinematic.sx+(0-cinematic.sx)*r;player.z=cinematic.sz+(-133-cinematic.sz)*r;if(cinematic.t>1.8){const drop=Math.min((cinematic.t-1.8)/2.1,1);player.y=2-18*drop;pitch=-.22*drop;camera.position.set(player.x+3,player.y+5,player.z+7);camera.lookAt(player.x,player.y,player.z)}if(t>=1){player.x=0;player.z=-131;player.y=-16;currentLevel=4;levelButtons.forEach(b=>b.classList.toggle('active',Number(b.dataset.level)===4))}}else{const angle=cinematic.t*0.72;const radius=15+Math.sin(t*Math.PI)*5;const height=target[1]+7+Math.sin(t*Math.PI)*5;camera.position.set(target[0]+Math.cos(angle)*radius,height,target[2]+Math.sin(angle)*radius);camera.lookAt(target[0],target[1]+2,target[2]);player.x=cinematic.sx+Math.sin(t*Math.PI)*.45;player.z=cinematic.sz-Math.sin(t*Math.PI)*1.1;if(cinematic.n===1&&cinematic.t>1.4)say('WARM LIGHTS • SAFE PATHS • A NEW HOME');if(cinematic.n===2&&cinematic.t>1.4)say('TWELVE DISTRICTS • ONE CONNECTED CITY');if(cinematic.n===3&&cinematic.t>1.4)say('FOLLOW THE BRANCHES ABOVE THE KINGDOM');if(cinematic.n===5&&cinematic.t>1.4)say('THE CASTLE IS THE HEART OF THE CHAT DIMENSION')}if(cinematic.t>=5.2){cinematic=null;pitch=0;vy=0;say('EXPLORATION UNLOCKED • LET’S GO!')}}else{let f=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0),s=(keys.KeyD?1:0)-(keys.KeyA?1:0);if(keys.ArrowLeft)yaw+=dt*1.8;if(keys.ArrowRight)yaw-=dt*1.8;let moveLen=Math.hypot(f,s)||1;f/=moveLen;s/=moveLen;let dx=(-Math.sin(yaw)*f+Math.cos(yaw)*s)*10*dt,dz=(-Math.cos(yaw)*f-Math.sin(yaw)*s)*10*dt;if(!blocked(player.x+dx,player.z)&&!robotAt(player.x+dx,player.z))player.x+=dx;if(!blocked(player.x,player.z+dz)&&!robotAt(player.x,player.z+dz))player.z+=dz;vy-=19*dt;player.y+=vy*dt;let gy=groundAt(player.x,player.z);if(player.y<=gy&&vy<0){player.y=gy;vy=0;grounded=true}else grounded=false;if(player.y<-40){health=Math.max(health-10,0);let lv=LEVELS[currentLevel-1];player.x=lv.x;player.z=lv.z;player.y=lv.y;vy=0;say('FALL RESET! BACK TO LEVEL '+currentLevel);if(!health)health=100}if(Math.hypot(player.x,player.z+133)<4&&player.y>-1&&progress()>=4&&!seenLevels.has(4)){beginCutscene(4)}}if(!cinematic){camera.position.set(player.x,player.y+1.25,player.z);camera.rotation.set(pitch,yaw,0,'YXZ')}world.robots.forEach(r=>{r.phase+=dt;r.attack=Math.max(0,r.attack-dt);r.fire=Math.max(0,r.fire-dt);r.stun=Math.max(0,r.stun-dt);r.windup=Math.max(0,r.windup-dt);let rx=r.g.position.x,rz=r.g.position.z,d=Math.hypot(player.x-rx,player.z-rz),chase=d<22&&r.stun<=0;let tx=rx,tz=rz;if(chase&&d>2.15){let pace=d>8?3.05:2.25;tx=rx+(player.x-rx)/Math.max(d,.001)*pace*dt;tz=rz+(player.z-rz)/Math.max(d,.001)*pace*dt;r.g.rotation.y=Math.atan2(player.x-rx,player.z-rz)}else if(!chase){tx=r.x+Math.sin(r.phase*.55)*1.25;tz=r.z+Math.cos(r.phase*.55)*1.25}if(!robotBlocked(tx,rz)&&!world.robots.some(o=>o!==r&&Math.hypot(tx-o.g.position.x,rz-o.g.position.z)<.85))r.g.position.x=tx;if(!robotBlocked(r.g.position.x,tz)&&!world.robots.some(o=>o!==r&&Math.hypot(r.g.position.x-o.g.position.x,tz-o.g.position.z)<.85))r.g.position.z=tz;r.g.position.y=0;let moving=Math.hypot(r.g.position.x-rx,r.g.position.z-rz)>.001,walk=moving?Math.sin(r.phase*9):0;r.limbs.forEach((l,i)=>{l.pivot.rotation.x=walk*.58*(i%2===0?1:-1)});r.torso.rotation.z=chase&&d<2.5?Math.sin(r.phase*8)*.1:0;r.torso.rotation.x=r.windup>0?-.18:0;
if(chase&&d>3.2&&d<18&&r.fire<=0&&r.windup<=0){r.windup=.58;r.fire=2.5;r.torso.rotation.x=-.18;say('RAIDER TARGETING YOU! DODGE!')}
if(r.windup>0&&r.windup<.16){let dir=new THREE.Vector3(player.x-rx,player.y+1.0-r.g.position.y,player.z-rz).normalize(),orb=new THREE.Mesh(new THREE.SphereGeometry(.27,12,10),new THREE.MeshStandardMaterial({color:0xff526b,emissive:0xff183f,emissiveIntensity:2}));orb.position.set(rx,1.45,rz);scene.add(orb);world.enemyShots.push({o:orb,dir,life:2.3,speed:12.5});r.fire=2.25;r.windup=0}
if(d<2.05&&player.y<3&&r.attack<=0&&r.stun<=0){health=Math.max(0,health-10);r.attack=1.25;r.limbs[0].pivot.rotation.x=-1.35;say('MELEE STRIKE! -10 HEALTH');if(health<=0){health=100;player.x=0;player.z=0;player.y=2;vy=0;say('SYSTEM REBOOT! RETURNED TO CENTRAL HUB')}}});
for(let i=world.enemyShots.length-1;i>=0;i--){let p=world.enemyShots[i];p.o.position.addScaledVector(p.dir,p.speed*dt);p.life-=dt;let wallHit=world.platforms.some(w=>w.h>1&&Math.abs(p.o.position.x-w.x)<w.w/2&&Math.abs(p.o.position.z-w.z)<w.d/2&&p.o.position.y>w.y-w.h/2&&p.o.position.y<w.y+w.h/2);let dist=p.o.position.distanceTo(new THREE.Vector3(player.x,player.y+1.1,player.z));if(dist<.85){health=Math.max(0,health-8);p.life=0;say('ENERGY BOLT HIT! -8 HEALTH');if(health<=0){health=100;player.x=0;player.z=0;player.y=2;vy=0;say('SYSTEM REBOOT! RETURNED TO CENTRAL HUB')}}if(p.life<=0||p.o.position.y< -20||wallHit){scene.remove(p.o);world.enemyShots.splice(i,1)}}
for(let i=world.shots.length-1;i>=0;i--){let p=world.shots[i];p.o.position.addScaledVector(p.dir,29*dt);p.life-=dt;let hit=false;for(let j=world.robots.length-1;j>=0;j--){let r=world.robots[j];if(p.o.position.distanceTo(r.g.position.clone().add(new THREE.Vector3(0,1.15,0)))<1.15){r.stun=2.5;scene.remove(r.g);world.robots.splice(j,1);score++;hit=true;say('ROBOT DISABLED!');break}}if(!hit){for(let k=0;k<world.targets.length;k++){let target=world.targets[k];if(!target.done&&p.o.position.distanceTo(target.group.position.clone().add(new THREE.Vector3(0,1.2,0)))<1.45){target.done=true;scene.remove(target.group);hit=true;say(target.kind+' CONQUERED! '+target.id);refreshLocks();break}}}if(p.life<=0||hit){scene.remove(p.o);world.shots.splice(i,1)}}cool=Math.max(0,cool-dt);msgTime-=dt;if(msgTime<=0&&message.current)message.current.style.opacity=0;if(hud.current){let counts=[1,2,3,4].map(n=>world.targets.filter(t=>t.level===n&&t.done).length);hud.current.querySelector('#objectives').textContent=counts.map((v,i)=>v+'/'+[15,12,8,6][i]).join(' · ');hud.current.querySelector('#health').textContent=Math.ceil(health);hud.current.querySelector('#score').textContent=score;let name='CENTRAL HUB',best=Math.hypot(player.x,player.z);for(let a of world.islands){let d=Math.hypot(player.x-a.x,player.z-a.z);if(d<best){best=d;name=a.name}}hud.current.querySelector('#island').textContent=name;hud.current.querySelector('#level-name').textContent='LEVEL '+currentLevel+' · '+LEVELS[currentLevel-1].name}}
function loop(t){frame=requestAnimationFrame(loop);if(t-lastRender<frameInterval)return;let dt=Math.min((t-last)/1000,.05);last=t;lastRender=t;update(dt);renderer.render(scene,camera)}frame=requestAnimationFrame(loop);return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('mousemove',pm);window.removeEventListener('pointerup',pu);window.removeEventListener('pointerup',clearMoveButtons);window.removeEventListener('pointercancel',clearMoveButtons);window.removeEventListener('touchend',clearMoveButtons);window.removeEventListener('touchcancel',clearMoveButtons);canvas.removeEventListener('pointerdown',pd);canvas.removeEventListener('pointermove',tm);canvas.removeEventListener('click',click);jb?.removeEventListener('pointerdown',jfn);fb?.removeEventListener('pointerdown',ffn);hb?.removeEventListener('click',hfn);graphicsToggleBtn?.removeEventListener('click',toggleGraphics);qualityButtons.forEach(b=>b.removeEventListener('click',qualityClick));hcs.forEach(b=>b.removeEventListener('click',hclose));buttons.forEach(b=>b.onpointerdown=null);renderer.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose()}});if(canvas.parentNode===host)host.removeChild(canvas)}},[]);return <div className="game-shell"><div ref={mount} className="game-view"/><div className="hud" ref={hud}><div className="level-bar">{LEVELS.map((lv,i)=><button key={i} data-level={i+1} className={i===0?'active':''}>LEVEL {i+1}<small>{lv.name}</small></button>)}</div><div className="panel title">CHAT DIMENSION <span>/ ROBOT RAIDERS</span><i className="version">v1.9.0</i></div><div className="panel stats">HEALTH <b id="health">100</b>%<br/>ROBOTS DISABLED <b id="score">0</b><br/>ISLAND <b id="island">VILLAGE</b><br/>CONQUEST <b id="objectives">0/15 · 0/12 · 0/8 · 0/6</b><br/><b id="level-name">LEVEL 1 · VILLAGE</b></div><button className="howto-button" data-action="howto">? HOW TO PLAY</button><button className="graphics-button" data-action="graphics-toggle">⚙ GRAPHICS</button><div className="graphics-panel"><b>GRAPHICS QUALITY</b><p>Choose your balance of detail and speed.</p><div className="graphics-options"><button data-quality="LOW">LOW</button><button data-quality="MEDIUM" className="selected">MEDIUM</button><button data-quality="DETAILED">DETAILED ✨</button></div></div><div className="panel help">WASD / arrows: move · mouse: look<br/>SPACE: jump · click / F: pulse<br/>Mobile: use buttons below<br/><small>Tap the game to look around</small></div><div className="howto-modal"><div className="howto-card"><button className="howto-close" data-action="close-help">✕</button><h2>HOW TO PLAY</h2><p className="howto-subtitle">Explore the islands. Disable the robot raiders. Reach the Kingdom!</p><div className="howto-section"><h3>🕹️ MOVE & LOOK</h3><p><b>Computer:</b> WASD or arrow keys to move. Move your mouse to look around. Click the game to capture the mouse, press ESC to release it.</p><p><b>iPhone / iPad:</b> Use the direction pad at the bottom-left to move. Drag across the game screen to look around.</p></div><div className="howto-section"><h3>🦘 JUMP & DEFEND</h3><p>Press <b>SPACE</b> or tap <b>JUMP</b> to jump. Press <b>F</b> or tap <b>PULSE</b> to disable robots. Raiders chase you, charge up glowing energy bolts, and strike if they get close. Keep moving to dodge!</p></div><div className="howto-section"><h3>🗺️ EXPLORE THE FIVE LEVELS</h3><p>Conquer all 15 Chat House islands to unlock the City. Claim all 12 City islands to unlock the Treehouse. Secure all 8 branches to unlock the Underground Base. Activate all 6 test tubes to unlock the Kingdom. Shoot each glowing objective with PULSE.</p><p>In the Kingdom, find the glowing trapdoor to enter the Underground Base.</p></div><div className="howto-section"><h3>❤️ YOUR MISSION</h3><p>Watch for the red targeting glow, dodge incoming energy bolts, and keep moving when raiders get close. Pulse them to disable them. If you fall, you return to your current level.</p></div><button className="howto-start" data-action="close-help">LET'S PLAY!</button></div></div><div className="crosshair"/><div className="message" ref={message}/><div className="controls"><div className="pad"><button className="empty"/><button data-key="KeyW">▲</button><button className="empty"/><button data-key="KeyA">◀</button><button data-key="KeyS">▼</button><button data-key="KeyD">▶</button></div><div className="actions"><button data-key="ArrowLeft">TURN ◀</button><button data-key="ArrowRight">TURN ▶</button><button data-action="jump">JUMP</button><button data-action="fire">PULSE</button></div></div></div></div>}