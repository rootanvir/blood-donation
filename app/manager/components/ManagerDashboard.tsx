"use client";

import { useState } from "react";
import ManagerNav from "./ManagerNav";
import BloodDonorForm from "./BloodInput";
import DonorList from "./DonorList";

export default function ManagerDashboard() {
  const [active, setActive] = useState("add");

  const renderContent = () => {
    switch (active) {
      case "add":
        return <BloodDonorForm />;

      case "list":
        return <DonorList />;

      case "requests":
        return (
          <div className="text-white p-6">
            🔔 রক্তের অনুরোধ ফিচার আসছে...
          </div>
        );

      case "camps":
        return (
          <div className="text-white p-6">
            📍 ক্যাম্পেইন ফিচার আসছে...
          </div>
        );

      case "settings":
        return (
          <div className="text-white p-6">
            ⚙️ সেটিংস আসছে...
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* NAVIGATION */}
      <ManagerNav active={active} setActive={setActive} />

      {/* CONTENT AREA */}
      <div className="p-4 md:p-8">
        {renderContent()}
      </div>
    </div>
  );
}