interface MainProps {
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

export const MainWindow: React.FC<MainProps> = ({ setDisplay }) => {
    const startNewGame = () => {
        setDisplay('game');
    };

    return (
        <div className="main">
            <h1 className="main__logo">CLICK FASTER</h1>
            <div className="main__button-wrap">
                <button onClick={startNewGame} className="main__new-game">
                    New game
                </button>
                <button className="main__setting">Setting</button>
            </div>
        </div>
    );
};
