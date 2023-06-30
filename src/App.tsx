import { useState } from 'react';
import { Header } from './components/header/header';
import { GameField } from './components/game-field/GameField';

interface Point {
    x: number | null;
    y: number | null;
}

function App() {
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
            <Header
                timer={timer}
                counter={counter}
                setTimer={setTimer}
                setCounter={setCounter}
                stopTimer={stopTimer}
                setIsStarted={setIsStarted}
                setPoint={setPoint}
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
    );
}

export default App;
