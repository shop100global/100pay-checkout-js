let charge;
class payWith100Pay {
  constructor(config) {}
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
        #shop100pay {
        top: 0;
        position: fixed;
        background-color: #000000c2;
        width: 100vw;
        height: 100vh;
        z-index: 1050;
        display: none;
        }
        .shop100pay {
        transition: 0.3s;
        height: 100vh;
        width: 100%;
        max-width: 400px;
        left: 50%;
        transform: translateX(-50%);
        position: fixed;
        z-index: 1050;
        top: 100%;
        padding-top: 10px;
        border-radius: 16px;
        overflow: hidden;
        }
        .shop100pay .shop100pay_modal {
        height: 100vh;
        width: 100%;
        border: none;
        border-radius: 16px;
        padding-bottom: 10%;
        }
        .shop100pay.show {
        top: 4%;
        }
    `);
    let wrapper = document.createElement("div");
    let iframe = document.createElement("iframe");
    let closeButtonWrapper = document.createElement("p");
    let closeButton = document.createElement("button");
    const textnode = document.createTextNode("Close X");
    closeButton.appendChild(textnode);
    closeButtonWrapper.style =
      "text-align: center; color: white; padding: 4px;";
    closeButtonWrapper.id = "close_100pay_btn";
    closeButton.className = "btn text-white";
    closeButton.id = "close_100pay_modal";
    closeButtonWrapper.appendChild(closeButton);
    iframe.className = "shop100pay_modal";
    iframe.id = "shop100payModal";
    wrapper.className = "shop100pay";
    wrapper.id = "shop100payWrapper";
    wrapper.appendChild(iframe);
    document.body.style = "overflow: hidden !important;";
    document.getElementById("shop100pay").style = "display: block;";
    document.getElementById("shop100pay").appendChild(closeButtonWrapper);
    document.getElementById("shop100pay").appendChild(wrapper);
    let newCloseBtn = document.getElementById("close_100pay_modal");
    newCloseBtn.addEventListener("click", () => {
      this.closeModal(charge);
    });
    let newIframe = document.getElementById("shop100payModal");
    newIframe.addEventListener("load", () => {
      document.getElementById("shop100payWrapper").classList.add("show");
    });
    newIframe.src = data.hosted_url;
  }
  closeModal(charge) {
    document.getElementById("shop100payWrapper").classList.remove("show");
    let wrapper = document.getElementById("shop100payWrapper");
    let close_btn = document.getElementById("close_100pay_btn");
    wrapper.remove();
    close_btn.remove();
    document.getElementById("shop100pay").style = "display: none;";
    document.body.style = "overflow: scroll !important;";
    let style = document.getElementById("100pay_style");
    style.remove();
    charge.onClose();
  }
}
const shop100Pay = new payWith100Pay();
window.shop100Pay = shop100Pay;
module.exports.shop100Pay = shop100Pay;
