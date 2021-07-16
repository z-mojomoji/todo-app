import React from "react";

import { privilegeService, authenticationService } from "@/_services";
import { Modal } from "@/_components";
import { RedeemModal } from "@/RedeemModal";

import "./PrivilegePage.scss";

class PrivilegePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authenticationService.currentUserValue,
      privilege: null,
      privilegeInfo: null,
      showModal: 0,
    };
  }

  componentDidMount() {
    privilegeService
      .getPrivilege()
      .then((privilege) => this.setState({ privilege }));
  }

  onDealClick(id) {
    this.getModal(id);
    privilegeService
      .redeemPrivilege(id)
      .then((privilegeInfo) => this.setState({ privilegeInfo }));
  }

  getModal(value) {
    this.setState({ showModal: value });
  }

  hideModal(value) {
    this.setState({ showModal: 0 });
  }

  render() {
    const { privilege, privilegeInfo } = this.state;
    const expDate = privilege ? new Date(privilege.privilege_exp) : null;
    const conditionDetails = privilege
      ? privilege.privilege_detail.split("- ")
      : [];

    return (
      <div className="Privilege">
        {privilege && (
          <>
            <div className="Privilege__container">
              <div className="Privilege__couponImg">
                <img src={privilege.privilege_url} alt="coupon" />
                <div>
                  <p className="point">{privilege.privilege_redeempoint}</p>
                  <p className="text">pts.</p>
                </div>
              </div>
              <h3 className="Privilege__title">{privilege.privilege_title}</h3>
              <h4 className="Privilege__expire">
                รับสิทธิ์ภายใน:{" "}
                <span>
                  {expDate.getDate() +
                    "/" +
                    parseInt(expDate.getMonth() + 1) +
                    "/" +
                    expDate.getFullYear()}
                </span>
              </h4>
              <hr className="Privilege__seperator" />
              <h4 className="Privilege__condition">เงื่อนไขการรับสิทธิ์</h4>

              <ul className="Privilege__conditionList">
                {conditionDetails.map((data, i) => (
                  <li key={i} className="Privilege__conditionListItem">
                    {data}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => this.onDealClick(privilege.privilege_id)}
              className="Privilege__button"
            >
              แลกรางวัล
            </button>
            {privilegeInfo && (
              <Modal
                show={this.state.showModal === privilege.privilege_id}
                onHide={() => this.hideModal(privilege.privilege_id)}
              >
                <RedeemModal data={privilegeInfo} />
              </Modal>
            )}
          </>
        )}
      </div>
    );
  }
}

export { PrivilegePage };
