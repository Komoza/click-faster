interface Point {
    x: number | null;
    y: number | null;
}

interface HeaderProps {
    timer: number;
    counter: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
    stopTimer: () => void;
    setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setPoint: React.Dispatch<React.SetStateAction<Point>>;
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export const Header: React.FC<HeaderProps> = ({
    timer,
    counter,
    setTimer,
    setCounter,
    stopTimer,
    setIsStarted,
    setPoint,
}) => {
    const restartGame = () => {
        setTimer(0);
        setCounter(0);
        stopTimer();
        setIsStarted(false);
        setPoint({ x: null, y: null });
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
