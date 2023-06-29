import { useState } from 'react';
import { Header } from './components/header/header';
import { GameField } from './components/game-field/GameField';

function App() {
    const [timer, setTimer] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);

    const startTimer = (): (() => void) => {
        let intervalId: ReturnType<typeof setInterval>;
        const updateTimer = () => {
            setTimer((prevTimer) => prevTimer + 1);
        };

        intervalId = setInterval(updateTimer, 1000);

        return () => {
            clearInterval(intervalId);
        };
    };
    return (
        <>
            <Header
                timer={timer}
                counter={counter}
                setTimer={setTimer}
                setCounter={setCounter}
            />
            <GameField
                startTimer={startTimer}
                counter={counter}
                setCounter={setCounter}
            />
        </>
    );
}

export default App;
