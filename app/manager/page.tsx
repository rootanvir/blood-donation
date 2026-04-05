// page.tsx
"use client";
import { useState } from "react";
import ManagerNav from "./components/ManagerNav";
import BloodDonorForm from "./components/BloodInput";


export default function Page() {
  const [active, setActive] = useState("add");

  return (
    <div  className="h-auto">
      <ManagerNav active={active} setActive={setActive} />
      {active === "add" && <BloodDonorForm />}
      {active === "list" && <div>list</div>}
    </div>
  );
}