import { useState } from 'react';

interface SettingProps {
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

interface Preference {
    sound: number;
    theme: string;
}

const preference: Preference = {
    sound: 0,
    theme: 'dark',
};

export const Setting: React.FC<SettingProps> = ({ setDisplay }) => {
    const [soundValue, setSoundValue] = useState<number>(0);

    const goToMain = () => {
        setDisplay('main');
    };
    const handleSetSoundValue = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSoundValue(Number(event.target.value));
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
                        value={soundValue}
                        onChange={(event) => handleSetSoundValue(event)}
                        className="setting__sound-slider"
                    ></input>
                    <div className="setting__sound-number">{`${soundValue}%`}</div>
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
