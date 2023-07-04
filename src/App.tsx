import { useState } from 'react';
import { Header } from './components/header/header';
import { GameField } from './components/game-field/GameField';
import { MainWindow } from './components/main-window/MainWindow';
import { Setting } from './components/setting-component/setting';
import { preference } from './components/setting-component/setting';

interface Point {
    x: number | null;
    y: number | null;
}

export const setTheme = (theme: string) => {
    const root = document.getElementById('root');
    if (root) {
        root.classList.remove('dark-theme');
        root.classList.remove('light-theme');

        root.classList.add(`${theme}-theme`);
    }
};

function App() {
    setTheme(preference.theme);
    const [display, setDisplay] = useState<string>('main');

    // timer
    const [timer, setTimer] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const startTimer = (): (() => void) => {
        const updateTimer = () => {
            setTimer((prevTimer) => prevTimer + 1);
        };

        const id = setInterval(updateTimer, 1000);
        setIntervalId(id);

        return () => {
            clearInterval(id);
        };
    };

    const stopTimer = () => {
        if (intervalId) clearInterval(intervalId);
        setIntervalId(null);
        setTimer(0);
        setCounter(0);
    };

    // gameField
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [point, setPoint] = useState<Point>({ x: null, y: null });

    return (
        <>
            {display === 'main' && <MainWindow setDisplay={setDisplay} />}
            {display === 'setting' && <Setting setDisplay={setDisplay} />}
            {display === 'game' && (
                <>
                    <Header
                        timer={timer}
                        counter={counter}
                        setTimer={setTimer}
                        setCounter={setCounter}
                        stopTimer={stopTimer}
                        setIsStarted={setIsStarted}
                        setPoint={setPoint}
                        setDisplay={setDisplay}
                    />

                    <GameField
                        startTimer={startTimer}
                        counter={counter}
                        setCounter={setCounter}
                        isStarted={isStarted}
                        setIsStarted={setIsStarted}
                        point={point}
                        setPoint={setPoint}
                    />
                </>
            )}
        </>
    );
}

export default App;
