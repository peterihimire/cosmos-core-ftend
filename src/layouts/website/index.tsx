import React from "react";
import { Outlet } from "react-router-dom";

const WebsiteLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen relative overflow-x-hidden">
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};
export default WebsiteLayout;
