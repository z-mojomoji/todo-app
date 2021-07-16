import React, { useState } from "react";
import QRCode from "qrcode.react";

import "./RedeemModal.scss";

function RedeemModal(props) {
  const { data } = props;
  const [offset, setOffset] = useState(0);
  const itemsPerPage = 1;

  const changePage = (offset) => {
    setOffset(offset);
  };

  let listItems = [];
  for (
    let i = offset * itemsPerPage;
    i < offset * itemsPerPage + itemsPerPage;
    i++
  ) {
    if (i >= data.code_list.length) {
      break;
    }
    listItems.push(data.code_list[i]);
  }

  listItems = listItems.map((qr, index) => {
    return (
      <li key={index} className="QrCode__item">
        <QRCode
          id={qr.value}
          value={qr.value}
          size={130}
          level={"H"}
          includeMargin={true}
          className="QrCode__code"
        />
        <p className="QrCode__text">{qr.value}</p>
      </li>
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.code_list.length / itemsPerPage); i++) {
    var active = offset === i - 1 ? "Pagination--active" : "";
    const elem = (
      <li
        className={`Pagination__item ` + active}
        onClick={() => changePage(i - 1)}
        key={i}
      >
        <span>{i}</span>
      </li>
    );
    pageNumbers.push(elem);
  }

  return (
    <div className="RedeemModal">
      <div className="RedeemModal__container">
        <img src={data.logo_url} className="RedeemModal__logo" alt="logo" />
        <h4 className="RedeemModal__title">{data.coupon_title}</h4>
        <p className="RedeemModal__detail">{data.coupon_detail}</p>
        <ul className="QrCode">{listItems}</ul>
        <ul className="Pagination">{pageNumbers}</ul>
      </div>
      <p className="RedeemModal__condition">
        สำหรับใช้สแกนรับสิทธิ์ที่หน้าร้าน
        <br />
        โปรดแสดงคูปองนี้ก่อนใช้งาน
      </p>
    </div>
  );
}

export { RedeemModal };
