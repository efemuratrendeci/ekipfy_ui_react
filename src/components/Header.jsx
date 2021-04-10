const Header = ({ user }) => {
    return (
        <div className="navbar">
            {user.is_manager ? (
                <img src="./ekipfy-manager.png" className="ekipfy-brand" alt=""></img>
            ) : (
                <img src="./ekipfy.png" className="ekipfy-brand" alt=""></img>
            )}

        </div>
    )
}

export default Header
