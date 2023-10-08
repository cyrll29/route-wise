import React from 'react'

const header = () => {
    return (
        <header>
            <div className="mainContainer">
                <div className="title">
                    <p>RouteWise</p>
                </div>
                <div className="searchForm">
                    <div className="inputForm">
                        <input class="form-control form-control-lg" type="text" placeholder="search for a place" aria-label=".form-control-lg example"></input>
                    </div> {/* div inputForm closing */}
                    <div className="inputButton">
                        <button type="button" class="btn btn-outline-light">Light</button>
                    </div> {/* div inputButton closing */}
                </div> {/* div searchForm closing */}
            </div> {/* div mainContainer closing */}
        </header>
    )
}

export default header