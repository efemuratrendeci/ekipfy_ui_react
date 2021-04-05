import React from 'react'

const Body = () => {
    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-sm-2 mb-3">
                    <h5>Özet</h5>
                    <div className="card shadow">
                        <div className="d-flex">
                            <i className="fa fa-try card-tl" aria-hidden="true"></i>
                            <div className="text-center w-100">
                                <h5 className="mt-3">2. Dönem </h5>
                                <h2><strong>19,000</strong></h2>
                                <h5 className="mt-3">2021 </h5>
                                <h2><strong>697,000</strong></h2>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 card shadow">
                        <div className="d-flex">
                            <i className="fa fa-ban card-tl bg-danger" aria-hidden="true"></i>
                            <div className="text-center w-100">
                                <h5 className="mt-3">2. Dönem </h5>
                                <h2><strong>0</strong></h2>
                                <h5 className="mt-3">2021 </h5>
                                <h2><strong>1</strong></h2>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 card shadow">
                        <div className="d-flex">
                            <i className="fa fa-check card-tl bg-primary" aria-hidden="true"></i>
                            <div className="text-center w-100">
                                <h5 className="mt-3">2. Dönem </h5>
                                <h2><strong>10</strong></h2>
                                <h5 className="mt-3">2021 </h5>
                                <h2><strong>52</strong></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
                <div className="col-sm-2">
                    <h5> Ekip </h5>
                    <div className="card shadow">
                        <div className="d-flex">
                            <div className="text-center w-100">
                                <h4 className="mt-4"> Efe </h4>
                            </div>
                            <i className="card-ap" aria-hidden="true">25</i>
                        </div>
                    </div>
                    <div className="card shadow mt-3">
                        <div className="d-flex">
                            <div className="text-center w-100">
                                <h4 className="mt-4"> Salih </h4>
                            </div>
                            <i className="card-ap" aria-hidden="true">32</i>
                        </div>
                    </div>
                    <div className="card shadow mt-3">
                        <div className="d-flex">
                            <div className="text-center w-100">
                                <h4 className="mt-4"> Gürkan </h4>
                            </div>
                            <i className="card-ap" aria-hidden="true">18</i>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Body
