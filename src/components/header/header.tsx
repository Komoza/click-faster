import { useState, useEffect } from 'react';

export const Header = () => {
    const [timer, setTimer] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);

    const restartGame = () => {
        setTimer(0);
        setCounter(0);
    };

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        const updateTimer = () => {
            setTimer((prevTimer) => prevTimer + 1);
        };

        intervalId = setInterval(updateTimer, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    return (
        <header className="header">
            <h1 className="header__logo">CLICK FASTER</h1>
            <div className="header__info">
                <div className="header__timer">{formatTime(timer)}</div>
                <p className="header__delimiter">|</p>
                <div className="header__counter">{counter} times</div>
            </div>
            <div className="header__buttons-wrap">
                <button className="header__restart" onClick={restartGame}>
                    Restart
                </button>
                <button className="header__new-game">New game</button>
            </div>
        </header>
    );
};
