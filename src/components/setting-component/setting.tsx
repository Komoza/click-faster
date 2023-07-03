import React from 'react';

interface SettingProps {
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export const Setting: React.FC<SettingProps> = ({ setDisplay }) => {
    const goToMain = () => {
        setDisplay('main');
    };

    return (
        <div className="setting">
            <div className="setting__sound">
                <div className="setting__sound-text">Sound</div>
                <div className="setting__value-wrap">
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value="50"
                        className="setting__sound-slider"
                    ></input>
                    <div className="setting__sound-number">50%</div>
                </div>
            </div>
            <div className="setting__theme">
                <div className="setting__theme-text">Theme</div>
                <div className="setting__value-wrap">
                    <div className="setting__theme-light">Light</div>
                    <label className="setting__theme-switch">
                        <input type="checkbox"></input>
                        <span className="setting__theme-slider setting__theme-round"></span>
                    </label>
                    <div className="setting__theme-dark">Dark</div>
                </div>
            </div>

            <div className="setting__buttons-wrap">
                <button className="setting__apply">apply</button>
                <button onClick={goToMain} className="setting__cancel">
                    cancel
                </button>
            </div>
        </div>
    );
};
