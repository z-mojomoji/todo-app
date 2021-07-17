import React from "react";

import "./Modal.scss";
import closeButton from "../../_assets/images/close_light.svg";

function Modal(props) {
  const { show, onHide, children } = props;

  return (
    <>
      {show && (
        <>
          <div className="Modal">
            <div className="Modal__container">
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
