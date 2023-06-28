import { useState, useRef } from 'react';

export const GameField = () => {
    const sizePoint: number = 100;
    interface Point {
        x: number | null;
        y: number | null;
    }

    const [isStarted, setIsStarted] = useState<boolean>(false);

    const [point, setPoint] = useState<Point>({ x: null, y: null });
    const gameFieldRef = useRef<HTMLDivElement>(null);

    const getRandomPoint = (
        event?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event) {
            event.stopPropagation();
        }
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

    const start = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        getRandomPoint();
        setIsStarted(true);
    };
    const mistake = () => {
        getRandomPoint();
        console.log('ошибка'); // заменить на мерцание экрана красный цвет
    };

    return (
        <div ref={gameFieldRef} className="game-field" onClick={mistake}>
            {!isStarted && (
                <button className="game-field__start-button" onClick={start}>
                    Start
                </button>
            )}
            {point.x !== null && point.y !== null && (
                <div
                    className="game-field__point"
                    onClick={(event) => getRandomPoint(event)}
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
