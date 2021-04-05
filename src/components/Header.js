import { useState } from "react";

const Header = ({ user }) => {
  return (
    <header className="shadow">
      <div>
        <nav className="navbar">
          <a className="ml-5 navbar-brand">
            <img src="./ekipfy.png" className="ekipfy-brand" alt=""></img>
          </a>
        </nav>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="ml-5 mr-5">
            <h5 className="nav-item"><i className="fa fa-pie-chart" aria-hidden="true"></i> Raporlar </h5>
          </div>
          <div className="ml-5 mr-5">
            <h5 className="nav-item"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Müşteri </h5>
          </div>
          <div className="ml-5 mr-5">
            <h5 className="nav-item"><i className="fa fa-code-fork" aria-hidden="true"></i> Kategori </h5>
          </div>
          <div className="ml-5 mr-5">
            <h5 className="nav-item"><i className="fa fa-users" aria-hidden="true"></i> Ekip </h5>
          </div>
          <div className="ml-5 mr-5">
            <h5 className="nav-item"><i className="fa fa-file-o" aria-hidden="true"></i> Proje </h5>
          </div>
        </div>
        <div className="d-flex">
          <div className="ml-5 mr-5">
            <h5 className="nav-item"><i className="fa fa-sign-out" aria-hidden="true"></i> Çıkış </h5>
          </div>
        </div>
      </div>

    </header>);
};

Header.defaultProps = {
  isLogin: false
}

export default Header;
