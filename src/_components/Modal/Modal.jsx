import React from "react";

import "./Modal.scss";
import closeButton from "../../_assets/images/close_light.svg";
import logoLight from "../../_assets/images/logo_light.svg";

function Modal(props) {
  const { show, onHide, children } = props;

  return (
    <>
      {show && (
        <>
          <div className="Modal">
            <div className="Modal__container">
              <img src={logoLight} className="Modal__logo" alt="Feyverly" />
              <button onClick={onHide} className="Modal__close">
                <img src={closeButton} alt="Close" />
              </button>
              {children}
            </div>
            <div className="Modal__backdrop" />
          </div>
        </>
      )}
    </>
  );
}

export { Modal };
