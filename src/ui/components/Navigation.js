import React from 'react';

const Navigation = ({ navOptions, selectedOption, name, changeSelection, title }) => {
  const renderOptions = () => {
    return navOptions.map((option, i) => {
      const active = option.name === selectedOption ? 'active' : '';
      return (
        <div
          className="nav-option"
          key={`option_${i}`}
          title={title(option.name)}
          onClick={changeSelection.bind(this, option.name)}
        >
          <span className={`icon-char ${active}`}>{option.icon}</span>
        </div>
      );
    });
  };

  return (
    <div id="navigation" className={`nav-${name}`}>
      {renderOptions()}
    </div>
  );
};

export default Navigation;
