import { useState, useRef } from 'react';

interface Point {
    x: number | null;
    y: number | null;
}

interface GameFieldProps {
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
    startTimer: () => void;
    isStarted: boolean;
    setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
    point: Point;
    setPoint: React.Dispatch<React.SetStateAction<Point>>;
}


interface Click {
    x: number | null;
    y: number | null;
}
export const GameField: React.FC<GameFieldProps> = ({
    startTimer,
    counter,
    setCounter,
    isStarted,
    setIsStarted,
    point,
    setPoint,
}) => {
    const sizePoint: number = 50;

    const [isMiss, setIsMiss] = useState<boolean>(false);
    // const [point, setPoint] = useState<Point>({ x: null, y: null });

    const [isClick, setIsClick] = useState<boolean>(false);
    const [clickAnimation, setClickAnimation] = useState<Click>({
        x: null,
        y: null,
    });

    const pointRef = useRef<HTMLDivElement>(null);
    const gameFieldRef = useRef<HTMLDivElement>(null);

    const animateClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const { offsetX, offsetY } = event.nativeEvent;
        setIsClick(true);
        setClickAnimation({ x: offsetX, y: offsetY });

        setTimeout(() => {
            setIsClick(false);
        }, 200);
    };

    const animatePoint = () => {
        if (pointRef.current)
            pointRef.current.classList.add('game-field__point--animation');

        setTimeout(() => {
            if (pointRef.current)
                pointRef.current.classList.remove(
                    'game-field__point--animation'
                );
        }, 200);
    };

    const setRandomPoint = () => {
        if (gameFieldRef.current) {
            const gameFieldWidth =
                gameFieldRef.current.offsetWidth - sizePoint - 2;
            const gameFieldHeight =
                gameFieldRef.current.offsetHeight - sizePoint - 2;

            console.log(gameFieldWidth, gameFieldHeight);
            const randomX = Math.floor(Math.random() * (gameFieldWidth + 1));
            const randomY = Math.floor(Math.random() * (gameFieldHeight + 1));

            setPoint({ x: randomX, y: randomY });
        }
        animatePoint();
    };

    const handleClickPoint = () => {
        setRandomPoint();
        setCounter(counter + 1);
    };

    const start = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setRandomPoint();
        setIsStarted(true);
        if (pointRef.current)
            pointRef.current.classList.add('game-field__point--animation');
        startTimer();
    };

    const mistake = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        animateClick(event);
        if (
            pointRef.current &&
            pointRef.current.contains(event.target as Node)
        ) {
            return;
        }
        setCounter(counter ? counter - 1 : 0);
        setRandomPoint();
        setIsMiss(true);
        setTimeout(() => {
            setIsMiss(false);
        }, 300);
    };

    return (
        <div
            ref={gameFieldRef}
            className="game-field"
            onClick={(event) => mistake(event)}
        >
            {isClick && (
                <div
                    style={{
                        top: `${clickAnimation.y}px`,
                        left: `${clickAnimation.x}px`,
                    }}
                    className="game-field--click"
                ></div>
            )}
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
            <div
                ref={pointRef}
                className="game-field__point"
                onClick={handleClickPoint}
                style={{
                    width: `${!point.x || !point.y ? 0 : sizePoint}px`,
                    height: `${sizePoint}px`,
                    top: `${point.y}px`,
                    left: `${point.x}px`,
                }}
            ></div>
        </div>
    );
};
