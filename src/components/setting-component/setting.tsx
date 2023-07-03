import { useState } from 'react';

interface SettingProps {
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

interface Preference {
    sound: number;
    theme: string;
}

let preference: Preference = localStorage.getItem('preference')
    ? JSON.parse(String(localStorage.getItem('preference')))
    : {
          sound: 100,
          theme: 'dark',
      };

export const Setting: React.FC<SettingProps> = ({ setDisplay }) => {
    const [soundValue, setSoundValue] = useState<number>(preference.sound);
    const [isDark, setIsDark] = useState<boolean>(
        preference.theme === 'dark' ? true : false
    );

    const goToMain = () => {
        preference = JSON.parse(String(localStorage.getItem('preference')));
        setDisplay('main');
    };

    const applySettings = () => {
        localStorage.setItem('preference', JSON.stringify(preference));
        setDisplay('main');
    };

    const handleSetSoundValue = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSoundValue(Number(event.target.value));
        preference.sound = Number(event.target.value);
    };

    const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDark(event.target.checked);
        preference.theme = !isDark ? 'dark' : 'light';
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
                    <div
                        className={`setting__theme-light ${
                            !isDark ? '--active-theme' : ''
                        }`}
                    >
                        Light
                    </div>
                    <label className="setting__theme-switch">
                        <input
                            onChange={(event) => {
                                handleChangeTheme(event);
                            }}
                            checked={isDark}
                            type="checkbox"
                        ></input>
                        <span className="setting__theme-slider setting__theme-round"></span>
                    </label>
                    <div
                        className={`setting__theme-dark ${
                            isDark ? '--active-theme' : ''
                        }`}
                    >
                        Dark
                    </div>
                </div>
            </div>

            <div className="setting__buttons-wrap">
                <button onClick={applySettings} className="setting__apply">
                    apply
                </button>
                <button onClick={goToMain} className="setting__cancel">
                    cancel
                </button>
            </div>
        </div>
    );
};
