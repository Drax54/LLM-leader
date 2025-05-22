
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarLogo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
      <span className="h-8 w-8 rounded-full bg-primary/10">
        <span className="flex h-full w-full items-center justify-center text-primary font-display font-semibold text-lg">L</span>
      </span>
      <span className="text-lg font-display font-medium tracking-tight">LLM Audits</span>
    </div>
  );
};

export default NavbarLogo;
