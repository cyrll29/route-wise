import "../assets/styles/home.css"

const HomeBtns = ({ title, onClickFunction }) => {
    return (
        <>
            <div>
                <button onClick={onClickFunction} className="home-btn">{title}</button>
            </div>
            
        </>
    )
}

export default HomeBtns
