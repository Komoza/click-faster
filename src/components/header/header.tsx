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
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
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
    setDisplay,
}) => {
    const restartGame = () => {
        setTimer(0);
        setCounter(0);
        stopTimer();
        setIsStarted(false);
        setPoint({ x: null, y: null });
    };

    const goToMain = () => {
        setTimer(0);
        setCounter(0);
        stopTimer();
        setIsStarted(false);
        setPoint({ x: null, y: null });
        setDisplay('main');
    };
    return (
        <header className="header">
            <h1 onClick={goToMain} className="header__logo">
                CLICK FASTER
            </h1>
            <div className="header__info">
                <div className="header__timer">{formatTime(timer)}</div>
                <p className="header__delimiter">|</p>
                <div className="header__counter">{counter} times</div>
            </div>
            <div className="header__buttons-wrap">
                <button className="header__restart" onClick={restartGame}>
                    Restart
                </button>
                <button onClick={goToMain} className="header__main-menu">
                    Main menu
                </button>
            </div>
        </header>
    );
};
