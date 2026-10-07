import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import type { JourneyPalette } from "@/lib/zaad-journey";

type WorldProps = { progress: RefObject<number>; mobile: boolean; palette: JourneyPalette; onFailure: () => void };
type PanelKind = "search" | "messages" | "calendar" | "recovery" | "review" | "database" | "dashboard";

function screenTexture(kind: PanelKind, p: JourneyPalette, abstract = false) {
  const canvas = document.createElement("canvas");
  canvas.width=768; canvas.height=1024;
  const c=canvas.getContext("2d");
  if (!c) return new THREE.Texture();
  c.fillStyle=p.surface; c.fillRect(0,0,768,1024);
  const text=(s:string,x:number,y:number,size=64,color=p.light)=>{c.fillStyle=color;c.font=`400 ${size}px Arial`;c.fillText(s,x,y);};
  const box=(x:number,y:number,w:number,h:number,color=p.edge)=>{c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,24);c.fill();};
  if(abstract) {
    // Small-screen objects carry geometry only; readable labels live in the HTML chapters.
    box(80,90,608,18);
    if(kind==="calendar"||kind==="dashboard") {
      for(let i=0;i<12;i++) box(65+(i%3)*225,220+Math.floor(i/3)*165,180,125,i===7?p.booked:p.edge);
    } else if(kind==="review") {
      for(let i=0;i<5;i++) {
        c.beginPath();for(let n=0;n<10;n++){const angle=n*Math.PI/5-Math.PI/2,r=n%2?24:55,x=104+i*140+Math.cos(angle)*r,y=500+Math.sin(angle)*r;n===0?c.moveTo(x,y):c.lineTo(x,y);}c.closePath();c.fillStyle=p.accent;c.fill();
      }
      box(190,700,388,24);
    } else {
      box(65,230,530,185);box(170,470,530,185,p.accent);box(65,710,530,140,p.edge);
      [280,520,760].forEach((y,i)=>{box(i===1?215:110,y,330,15,p.light);box(i===1?215:110,y+45,230,15,p.muted);});
    }
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
  }
  text("ZAAD",55,95,64); c.strokeStyle=p.edge;c.lineWidth=2;c.beginPath();c.moveTo(45,130);c.lineTo(720,130);c.stroke();
  if(kind==="search") {
    box(45,190,678,110);text("Search clinic",75,263,65);
    text("Sponsored",55,410,64,p.muted);text("Patient discovers",55,525,64);text("the clinic.",55,610,64);
    box(45,710,678,138,p.accent);text("NEW ENQUIRY",72,800,66);
  } else if(kind==="calendar") {
    text("APPOINTMENT",50,245,66);text("Tomorrow",50,340,65,p.muted);
    for(let i=0;i<12;i++){const x=55+(i%4)*168,y=410+Math.floor(i/4)*140;box(x,y,135,110,i===6?p.booked:p.edge);}
    text("3:30 PM",55,930,74,p.booked);
  } else if(kind==="review") {
    text("Google Review",50,250,65,p.muted);text("5.0",180,560,210);text("★★★★★",60,730,106,p.accent);
  } else if(kind==="database") {
    text("PATIENTS",50,250,74);
    ["Alex Stone","Maya Jones","Ryan Khan"].forEach((s,i)=>{box(45,330+i*170,678,135);text(s,75,418+i*170,67);});
    text("REBOOKED",50,955,72,p.booked);
  } else if(kind==="dashboard") {
    text("PATIENT FLOW",50,250,66);
    ["128","64","42","4.9"].forEach((s,i)=>{const x=45+(i%2)*346,y=330+Math.floor(i/2)*228;box(x,y,324,200);text(s,x+30,y+138,100,i===1?p.booked:p.light);});
    text("UniBox",50,910,82,p.accent);
  } else {
    text(kind==="recovery"?"MISSED CALL":"ZAAD AGENT",50,240,68,kind==="recovery"?p.muted:p.light);
    box(45,315,595,170);text("How can we",70,388,64);text("help?",70,460,64);
    box(145,535,578,172,p.accent);text("I'd like to book",168,612,64);text("an appointment.",168,680,64);
    box(45,770,678,150);text("BOOKED",75,867,74,p.booked);
  }
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  return texture;
}

function Device({ kind, palette:p, scale=1, abstract=false }: { kind:PanelKind;palette:JourneyPalette;scale?:number;abstract?:boolean }) {
  const texture=useMemo(()=>screenTexture(kind,p,abstract),[kind,p,abstract]);
  useEffect(()=>()=>texture.dispose(),[texture]);
  return <group scale={scale}>
    <RoundedBox args={[2.5,3.55,.18]} radius={.14} smoothness={2}><meshStandardMaterial color={p.edge} metalness={.75} roughness={.25}/></RoundedBox>
    <mesh position={[0,0,.102]}><planeGeometry args={[2.27,3.05]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <mesh position={[0,1.62,.12]}><boxGeometry args={[.55,.035,.025]}/><meshBasicMaterial color={p.muted}/></mesh>
  </group>;
}

function Doorway({ palette:p, small=false }: { palette:JourneyPalette;small?:boolean }) {
  return <group>
    {[-1.65,1.65].map(x=><mesh key={x} position={[x,1.65,0]}><boxGeometry args={[.12,3.3,.26]}/><meshStandardMaterial color={p.edge} metalness={.7} roughness={.25}/></mesh>)}
    <mesh position={[0,3.25,0]}><boxGeometry args={[3.4,.12,.26]}/><meshStandardMaterial color={p.edge} metalness={.7} roughness={.25}/></mesh>
    {[-1.57,1.57].map(x=><mesh key={x} position={[x,1.6,.15]}><boxGeometry args={[.025,3.15,.02]}/><meshBasicMaterial color={p.accent}/></mesh>)}
    <mesh position={[0,3.2,.15]}><boxGeometry args={[3.15,.025,.02]}/><meshBasicMaterial color={p.accent}/></mesh>
    <mesh position={[0,1.6,-.9]}><planeGeometry args={[3.1,3.15]}/><meshStandardMaterial color={p.surface} metalness={.35} roughness={.4}/></mesh>
    <group position={[0,3.8,0]}><mesh><boxGeometry args={[.5,.13,.08]}/><meshBasicMaterial color={p.accent}/></mesh><mesh><boxGeometry args={[.13,.5,.08]}/><meshBasicMaterial color={p.accent}/></mesh></group>
    {!small && [-2.35,2.35].map(x=><group key={x} position={[x,.3,-.5]}><mesh><boxGeometry args={[1,.17,.8]}/><meshStandardMaterial color={p.edge} metalness={.2} roughness={.7}/></mesh><mesh position={[0,.42,-.32]}><boxGeometry args={[1,.7,.12]}/><meshStandardMaterial color={p.surface}/></mesh>{[-.35,.35].map(a=><mesh key={a} position={[a,-.2,0]}><boxGeometry args={[.06,.4,.6]}/><meshStandardMaterial color={p.muted} metalness={.8} roughness={.25}/></mesh>)}</group>)}
  </group>;
}

function Station({ index, progress, mobile, palette:p }: { index:number;progress:RefObject<number>;mobile:boolean;palette:JourneyPalette }) {
  const { size }=useThree();
  const compact=!mobile && size.width<1000;
  const root=useRef<THREE.Group>(null);
  const item=useRef<THREE.Group>(null);
  useFrame(({clock})=>{
    if(!root.current) return;
    const distance=Math.abs(progress.current-index);
    root.current.visible=distance<1.6;
    if(item.current){item.current.position.y=Math.sin(clock.elapsedTime*.45+index)*.07+(index===4?Math.max(0,progress.current-3.8)*.24:0);item.current.rotation.y=Math.sin(clock.elapsedTime*.2+index)*.035;}
  });
  const kinds:PanelKind[]=["search","search","calendar","recovery","review","database","dashboard","review"];
  return <group ref={root} position={[mobile?0:compact?1.7:2.3,mobile?-.9:.1,-index*12]} scale={mobile?.4:compact?.65:1}>
    <group ref={item}>
      {index===0 || index===7 ? <><group position={[0,-.9,-1.4]}><Doorway palette={p} small={mobile}/></group><group position={[index===0?.25:0,1.1,1]} rotation={[.06,index===0?-.18:.12,-.06]}><Device kind={index===0?"search":"review"} palette={p} abstract={mobile} scale={index===0?.78:.65}/></group></> : index===4 ? <><group position={[0,-1,-1]}><Doorway palette={p} small={mobile}/></group><group position={[0,1.7,.8]} rotation={[0,-.12,.025]}><Device kind="review" palette={p} abstract={mobile} scale={.78}/></group></> : <><group position={[0,.95,0]} rotation={[.04,-.18,.045]}><Device kind={kinds[index]??"search"} palette={p} abstract={mobile}/></group>{index===2&&!mobile&&<group position={[-1.9,.4,1]} rotation={[0,.22,-.07]}><Device kind="messages" palette={p} scale={.53}/></group>}{index===6&&!mobile&&<group position={[2,-.15,1]} rotation={[0,-.28,.06]}><Device kind="messages" palette={p} scale={.55}/></group>}</>}
    </group>
    {!mobile&&<pointLight position={[1,4,3]} intensity={14} distance={9} color={p.accent}/>}
  </group>;
}

function CameraTravel({ progress,mobile,onFailure }: Pick<WorldProps,"progress"|"mobile"|"onFailure">) {
  const {gl}=useThree();
  const target=useMemo(()=>new THREE.Vector3(),[]);
  const look=useMemo(()=>new THREE.Vector3(),[]);
  useEffect(()=>{
    const lost=(e:Event)=>{e.preventDefault();onFailure();};
    gl.domElement.addEventListener("webglcontextlost",lost);
    return()=>gl.domElement.removeEventListener("webglcontextlost",lost);
  },[gl,onFailure]);
  useFrame(({camera,gl},delta)=>{
    const t=progress.current;
    target.set(mobile?0:Math.sin(t*.7)*.35,mobile?1.45:1.7,8.3-t*12);
    camera.position.lerp(target,1-Math.exp(-7*Math.min(delta,.05)));
    look.set(mobile?0:.15,mobile?1.1:1.35,camera.position.z-9);
    camera.lookAt(look);
    gl.domElement.dataset["cameraZ"]=camera.position.z.toFixed(2);
    gl.domElement.dataset["drawCalls"]=String(gl.info.render.calls);
  });
  return null;
}

function Scene(props:WorldProps) {
  const p=props.palette;
  const floor=useMemo(()=>{
    const c=document.createElement("canvas");c.width=c.height=128;
    const ctx=c.getContext("2d");
    if(ctx){ctx.fillStyle=p.background;ctx.fillRect(0,0,128,128);ctx.strokeStyle=p.edge;ctx.lineWidth=1;ctx.strokeRect(0,0,128,128);}
    const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(6,45);t.colorSpace=THREE.SRGBColorSpace;return t;
  },[p]);
  useEffect(()=>()=>floor.dispose(),[floor]);
  return <>
    <color attach="background" args={[p.background]}/><fog attach="fog" args={[p.background,10,28]}/>
    <ambientLight intensity={.65}/><directionalLight position={[0,6,5]} intensity={2} color={p.light}/>
    <Environment resolution={32} frames={1}><Lightformer intensity={3} position={[0,7,0]} scale={[12,12,1]}/><Lightformer intensity={2} color={p.accent} position={[-5,2,0]} rotation-y={Math.PI/2} scale={[20,3,1]}/></Environment>
    <CameraTravel {...props}/>
    <mesh rotation-x={-Math.PI/2} position={[0,-2.1,-42]}><planeGeometry args={[35,120]}/><meshStandardMaterial map={floor} roughness={.45} metalness={.45}/></mesh>
    {[-3.8,3.8].map(x=><mesh key={x} position={[x,-2.07,-42]}><boxGeometry args={[.025,.025,120]}/><meshBasicMaterial color={p.accent}/></mesh>)}
    {Array.from({length:props.mobile?5:11},(_,i)=><group key={i} position={[0,0,4-i*11]}>{[-6,6].map(x=><mesh key={x} position={[x,1,0]}><boxGeometry args={[.055,8,.055]}/><meshBasicMaterial color={p.edge}/></mesh>)}</group>)}
    {Array.from({length:8},(_,index)=><Station key={index} index={index} {...props}/>)}
  </>;
}

export default function JourneyWorld(props:WorldProps) {
  return <Canvas camera={{position:[0,1.7,8.3],fov:props.mobile?50:43}} dpr={props.mobile?1:[1,1.5]} gl={{antialias:!props.mobile,powerPreference:"high-performance",alpha:false}} fallback={null}><Scene {...props}/></Canvas>;
}