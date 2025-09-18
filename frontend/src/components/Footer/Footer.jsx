import "./Footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__youtube">
                    <img className="youtube__icon" src="../../../public/icon.png" alt=" "/> YouTube
                </div>
                <p className="footer__developer">&copy; 2025 Rostyslav Cheremys</p>
            </div>
        </footer>
    );
}