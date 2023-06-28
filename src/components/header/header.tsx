export const Header = () => {
    return (
        <header className="header">
            <h1 className="header__logo">CLICK FASTER</h1>
            <div className="header__info">
                <div className="header__timer">00:00,00</div>
                <p className="header__delimiter">|</p>
                <div className="header__counter">0 times</div>
            </div>
            <div className="header__buttons-wrap">
                <button className="header__restart">Restart</button>
                <button className="header__new-game">New game</button>
            </div>
        </header>
    );
};
