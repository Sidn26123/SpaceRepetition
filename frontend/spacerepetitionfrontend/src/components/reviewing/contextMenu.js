import React from 'react';
import '../../styles/contextMenu.css';

const ContextMenu = ({ x, y, isToggle, buttons, rightClickItem, contextMenuRef }) => {
    return (
        <menu
            style={{ top: `${y + 2}px`, left: `${x + 2}px` }}
            className={`context-menu ${isToggle ? 'active' : ''}`}
            ref = {contextMenuRef}
        >
            {buttons.map((button, index) => {
                function handleClick(e){
                    e.stopPropagation();
                    button.onClick(rightClickItem);
                }
                if (button.isSpacer) return <hr key={index} />;
                return (
                    <button key={index} onClick={handleClick} className="">
                        <span>{button.text}</span>
                        <span className = "icon">{button.icon}</span>
                    </button>
                );
            })}
        </menu>
    );
};

export default ContextMenu;
