import { useState, useRef } from 'react';

interface GameFieldProps {
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
    startTimer: () => void;
}
export const GameField: React.FC<GameFieldProps> = ({
    startTimer,
    counter,
    setCounter,
}) => {
    const sizePoint: number = 100;
    interface Point {
        x: number | null;
        y: number | null;
    }

    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isMiss, setIsMiss] = useState<boolean>(false);

    const [point, setPoint] = useState<Point>({ x: null, y: null });
    const gameFieldRef = useRef<HTMLDivElement>(null);

    const getRandomPoint = () => {
        if (gameFieldRef.current) {
            const gameFieldWidth =
                gameFieldRef.current.offsetWidth - sizePoint - 10;
            const gameFieldHeight =
                gameFieldRef.current.offsetHeight - sizePoint - 10;

            const randomX =
                Math.floor(Math.random() * (gameFieldWidth - sizePoint - 10)) +
                sizePoint +
                10;
            const randomY =
                Math.floor(Math.random() * (gameFieldHeight - sizePoint - 10)) +
                sizePoint +
                10;

            setPoint({ x: randomX, y: randomY });
        }
    };
    const handleClickPoint = (
        event?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event) {
            event.stopPropagation();
        }

        getRandomPoint();
        setCounter(counter + 1);
    };

    const start = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        getRandomPoint();
        setIsStarted(true);
        startTimer();
    };
    const mistake = () => {
        setCounter(counter ? counter - 1: 0);
        getRandomPoint();
        setIsMiss(true);
        setTimeout(() => {
            setIsMiss(false);
        }, 300);
    };

    return (
        <div ref={gameFieldRef} className="game-field" onClick={mistake}>
            {isMiss && <div className="game-field__miss-screen"></div>}
            {!isStarted && (
                <div
                    onClick={(event) => event.stopPropagation()}
                    className="game-field__block-screen"
                >
                    <button
                        className="game-field__start-button"
                        onClick={start}
                    >
                        Start
                    </button>
                </div>
            )}
            {point.x !== null && point.y !== null && (
                <div
                    className="game-field__point"
                    onClick={(event) => handleClickPoint(event)}
                    style={{
                        width: `${sizePoint}px`,
                        height: `${sizePoint}px`,
                        top: `${point.y}px`,
                        left: `${point.x}px`,
                    }}
                ></div>
            )}
        </div>
    );
};
