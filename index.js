let charge;
class payWith100Pay {
  constructor(config) { }
  appendStyle(content) {
    let style = document.createElement("STYLE");
    style.id = "100pay_style";
    style.type = "text/css";
    style.appendChild(document.createTextNode(content));
    document.head.appendChild(style);
  }
  setup(charge_data) {
    charge = charge_data;
    let api_key = charge.api_key;
    delete charge.callback;
    delete charge.api_key;
    let data = charge;
    fetch("https://api.shop100.co/api/v1/pay/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": api_key,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.createElements(data);
      })
      .catch((error) => {
        charge.onError(error);
      });
  }
  createElements(data) {
    this.appendStyle(`
        #show100Pay {
        top: 0;
        left: 0;
        position: fixed;
        background-color: #000000c2;
        width: 100vw;
        height: 100vh;
        z-index: 1050;
        display: none;
        }
        .show100Pay {
        transition: 0.3s;
        height: 100vh;
        width: 100%;
        max-width: 400px;
        left: 50%;
        transform: translateX(-50%);
        position: fixed;
        z-index: 1050;
        top: 100%;
        padding-top: 0;
        border-radius: 16px 16px 0 0;
        overflow: hidden;
      }
      .show100Pay .show100Pay_modal {
        height: calc(100% - 8%);
        width: 100%;
        border: none;
        border-radius: 16px 16px 0 0;
        padding-bottom: 0;
        }
        .show100Pay.show {
        top: 8%;
        }
        .close_100pay_btn {
          background: #fff;
          outline: none;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 700;
          color: #e94444;
          cursor: pointer;
        }
        .body-overflow-hidden {
        overflow: hidden;
        }
    `);
    let loaderTemplate = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="271px" height="271px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <path fill="none" stroke="#ffffff" stroke-width="8" stroke-dasharray="220.66647827148438 35.92244995117187" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.4);transform-origin:50px 50px">
      <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.4492753623188404s" keyTimes="0;1" values="0;256.58892822265625"></animate>
    </path>
    </svg>`
    let loaderWrapper = document.createElement("div");
    let wrapper = document.createElement("div");
    let iframe = document.createElement("iframe");
    let closeButtonWrapper = document.createElement("p");
    let closeButton = document.createElement("button");
    const textnode = document.createTextNode("Close X");
    loaderWrapper.insertAdjacentHTML("afterbegin", loaderTemplate);
    closeButton.appendChild(textnode);
    closeButtonWrapper.style =
      "text-align: center; color: white; padding: 4px;";
    loaderWrapper.id = "100pay_loader";
    closeButtonWrapper.id = "close_100pay_btn";
    closeButton.className = "btn text-white close_100pay_btn";
    closeButton.id = "close_100pay_modal";
    closeButtonWrapper.appendChild(closeButton);
    iframe.className = "show100Pay_modal";
    iframe.id = "show100PayModal";
    wrapper.className = "show100Pay";
    wrapper.id = "show100PayWrapper";
    wrapper.appendChild(iframe);
    document.body.classList.add("body-overflow-hidden");
    document.getElementById("show100Pay").style = "display: block;";
    document.getElementById("show100Pay").appendChild(closeButtonWrapper);
    document.getElementById("show100Pay").appendChild(loaderWrapper);
    document.getElementById("show100Pay").appendChild(wrapper);
    let newCloseBtn = document.getElementById("close_100pay_modal");
    newCloseBtn.addEventListener("click", () => {
      this.closeModal(charge);
    });
    let newIframe = document.getElementById("show100PayModal");
    newIframe.addEventListener("load", () => {
      document.getElementById("show100PayWrapper").classList.add("show");
    });
    newIframe.src = data.hosted_url;
  }
  closeModal(charge) {
    document.getElementById("show100PayWrapper").classList.remove("show");
    let wrapper = document.getElementById("show100PayWrapper");
    let close_btn = document.getElementById("close_100pay_btn");
    let loaderWrapper = document.getElementById("100pay_loader");
    loaderWrapper.remove();
    wrapper.remove();
    close_btn.remove();
    document.getElementById("show100Pay").style = "display: none;";
    document.body.classList.remove("body-overflow-hidden");
    let style = document.getElementById("100pay_style");
    style.remove();
    charge.onClose();
  }
}
const shop100Pay = new payWith100Pay();
window.shop100Pay = shop100Pay;
module.exports.shop100Pay = shop100Pay;
