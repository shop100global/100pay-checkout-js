# 100Pay Checkout SDK

Accept crypto payments on your website in 3 mins

## Getting Started
Before you can start accepting crypto payments, you need to create a 100pay account and obtain your api keys from the [100Developers platform](https://100pay.co) 

## Features
* Accept cryptopayments on your website
* Withdraw to your crypto wallet or fiat balance
* create payment invoice
* create payment links
* create your own coin on any supported network
* launch an ICO/IDO to raise funds for your project
* analytics to monitor your business
* swap crypto
* buy/sell crypto

## Usage
First Import the Javascript Library to your app or add 100pay-js script tag to your website headers.

### 100pay-js
```Html 
<script src="https://js.100pay.co/"></script>
```

### npm Package
```Javascript

// using import
import { shop100Pay } from "@shop100/100pay-checkout";

// using require
const shop100Pay = require("@shop100/100pay-checkout)
```
Next initiate the charge and watch the magic happen
```Javascript
      shop100Pay.setup({
        ref_id: "" + Math.floor(Math.random() * 1000000000 + 1),
        api_key:
          "TEST;PK;XXXX", // paste api key here
        customer: {
          user_id: "1",
          name: this.user.name,
          phone: this.user.phone,
          email: this.user.email
        },
        billing: {
          amount: this.checkout_form.grand_total,
          currency: this.user.currency,
          description: "Payment for your Shop100 Order",
          country: this.user.country,
          vat: 10,
          pricing_type: "fixed_price"
        },
        metadata: {
          is_approved: "yes",
          order_id: order_id,
          charge_ref: order_id
        },
        call_back_url: "http://localhost:8000/verifyorder/",
        onClose: msg => {
          alert("User closed payment modal.");
        },
        callback: reference => {
        
          alert(`Transaction successful with id: ${reference}`);
        },
        onError: error => {
            console.log(error)
            alert("Sorry something went wrong pls try again.")
        }
      });
```

## Want More?
Read our documentation [100Developers platform](https://100pay.co) 