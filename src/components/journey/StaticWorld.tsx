import { CalendarCheck, Check, MessageSquare, PhoneCall, Search, Star, Users, ArrowRight, HeartPulse } from "lucide-react";

export function StaticWorld({ index }: { index: number }) {
  const Icon = [HeartPulse, Search, CalendarCheck, PhoneCall, Star, Users, MessageSquare, ArrowRight][index] ?? HeartPulse;
  return <div className={`static-world static-world-${index}`} aria-hidden="true">
    <div className="static-door"><div className="static-cross"/><div className="static-inner"/></div>
    <div className="static-device">
      <div className="static-notch"/><Icon size={36}/>
      {index === 2 ? <><div className="static-calendar">{Array.from({length:14},(_,i)=><i className={i===9?"chosen":""} key={i}/>)}</div><span className="static-booked"><Check size={16}/> BOOKED</span></> : index === 4 ? <><strong>5.0</strong><div className="static-stars">{Array.from({length:5},(_,i)=><Star key={i} size={22}/>)}</div></> : <><div className="static-lines"><i/><i/><i/></div><div className="static-message"><i/><i/></div></>}
    </div>
    <div className="static-floor"/>
  </div>;
}