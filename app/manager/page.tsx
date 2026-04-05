// page.tsx
"use client";
import { useState } from "react";
import ManagerNav from "./components/ManagerNav";
import BloodDonorForm from "./components/BloodInput";


export default function Page() {
  const [active, setActive] = useState("add");

  return (
    <div style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 60%), #0f0505` }} className="min-h-screen">
      <ManagerNav active={active} setActive={setActive} />
      {active === "add" && <BloodDonorForm />}
      {active === "list" && <div>list</div>}
    </div>
  );
}