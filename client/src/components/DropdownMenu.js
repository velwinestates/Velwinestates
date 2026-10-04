import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ trigger, children, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    panelRef.current?.style.setProperty('display', 'block', 'important');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    backdropRef.current?.style.setProperty('display', isMobile ? 'block' : 'none', 'important');
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="velwin-dropdown-container" ref={menuRef}>
      <button
        className="velwin-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Explore site navigation"
      >
        {trigger}
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile - closes menu when clicked */}
          <div 
            className="velwin-dropdown-backdrop"
            ref={backdropRef}
            onClick={() => setIsOpen(false)}
          />
          
          <div ref={panelRef} className={`velwin-dropdown-panel ${align}`}>
            <div className="velwin-dropdown-content">
              {React.Children.map(children, (child) =>
                child.type === DropdownMenuItem
                  ? React.cloneElement(child, {
                      onClick: () => {
                        if (child.props.onClick) {
                          child.props.onClick();
                        }
                        setIsOpen(false);
                      },
                    })
                  : child
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick, disabled = false }) => {
  return (
    <button
      className={`velwin-dropdown-item ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const DropdownMenuSeparator = () => {
  return <div className="velwin-dropdown-separator" />;
};

const DropdownMenuHeader = ({ children }) => {
  return <div className="velwin-dropdown-header">{children}</div>;
};

export { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuHeader };
