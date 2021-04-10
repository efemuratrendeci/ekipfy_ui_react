import React from 'react'

const Sidenav = ({ isManager }) => {
    return (
        <>
            <card className="card side-menu-item mb-2">
                <div className="card-body text-center">
                    <h6>Notlar</h6>
                </div>
            </card>
            <card className="card side-menu-item mb-2">
                <div className="card-body text-center">
                    <h6>Projeler</h6>
                </div>
            </card>
            <card className="card side-menu-item mb-2">
                <div className="card-body text-center">
                    <h6>Proje Adayları</h6>
                </div>
            </card>
        </>

    )
}

export default Sidenav
