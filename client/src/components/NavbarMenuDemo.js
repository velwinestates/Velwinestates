import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuHeader } from './DropdownMenu';
import { Globe, Home, Info, Building2, Wrench, Tractor, ShoppingCart, Banknote, Map, Hammer, Images, Users } from 'lucide-react';

const NavbarMenuDemo = ({ currentLanguage, changeLanguage }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu
      trigger={
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Menu
        </span>
      }
      align="right"
    >
      <DropdownMenuHeader>Navigation</DropdownMenuHeader>
      
      <DropdownMenuItem onClick={() => navigate('/')}>
        <><Home size={16} /> Home</>
      </DropdownMenuItem>

      <DropdownMenuItem 
        onClick={() => navigate('/developer-info')}
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: '600'
        }}
      >
        Developer Information
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/about')}>
        <><Info size={16} /> About</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/companies')}>
        <><Building2 size={16} /> Our Companies</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/our-services')}>
        <><Wrench size={16} /> Our Services</>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuHeader>Services</DropdownMenuHeader>
      
      <DropdownMenuItem onClick={() => navigate('/manage-farm')}>
        <><Tractor size={16} /> Manage Farm</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/buy-inputs')}>
        <><ShoppingCart size={16} /> Buy Inputs</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/sell-produce')}>
        <><Banknote size={16} /> Sell Produce</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/land')}>
        <><Map size={16} /> Land</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/construction')}>
        <><Hammer size={16} /> Construction</>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => navigate('/projects')}>
        <><Images size={16} /> Past Work</>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      
      <DropdownMenuItem onClick={() => navigate('/join')}>
        <><Users size={16} /> Join Us</>
      </DropdownMenuItem>

      <DropdownMenuSeparator />
      
      <DropdownMenuItem 
        onClick={() => changeLanguage(currentLanguage === 'en' ? 'ta' : 'en')}
        style={{
          background: 'linear-gradient(135deg, #C9A86A 0%, #B8935A 100%)',
          color: 'white',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        <><Globe size={16} /> {currentLanguage === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}</>
      </DropdownMenuItem>
    </DropdownMenu>
  );
};

export default NavbarMenuDemo;
