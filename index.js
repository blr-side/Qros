const qrCodeSelect = document.getElementById("qrcode-select");
const inputFieldBox = document.getElementById("input-field-box");
const resetButton = document.getElementById("reset-button");
const generateButton = document.getElementById("generate-button");
const qrcodeCanvas = document.getElementById("qrcode-canvas");
const downloadButton = document.getElementById("download-button");
const outputWrapper = document.getElementById("output-wrapper");
const hideButton = document.getElementById("hide-button");

qrCodeSelect.addEventListener("change", function() {
  if (outputWrapper.classList.contains("show")) {
    outputWrapper.classList.remove("show");
  }
  
  if (this.value === "text") {
    inputFieldBox.innerHTML = `
      <input type="text" name="text" placeholder="Enter Text Here"/>
    `;
  } else if (this.value === "phone") {
    inputFieldBox.innerHTML = `
      <input type="tel" name="tel" placeholder="Enter Phone Number Here"/>
    `;
  } else if (this.value === "website") {
    inputFieldBox.innerHTML = `
      <input type="url" name="url" placeholder="Enter Url Here"/>
    `;
  } else if (this.value === "email") {
    inputFieldBox.innerHTML = `
      <input type="mail" name="mail" placeholder="Enter Email Here"/>
      <input type="text" name="sub" placeholder="Enter Subject Here"/>
      <input type="text" name="sms" placeholder="Enter Message Here"/>
    `;
  } else if (this.value === "sms") {
    inputFieldBox.innerHTML = `
      <input type="tel" name="tel" placeholder="Enter Phone Number Here"/>
      <input type="text" name="sms" placeholder="Enter Message Here"/>
    `;
  } else if (this.value === "whatsapp") {
    inputFieldBox.innerHTML = `
      <input type="tel" name="tel" placeholder="Enter WhatsApp Number Here"/>
      <input type="text" name="sms" placeholder="Enter Message Here"/>
    `;
  }
});

resetButton.addEventListener("click", function() {
  qrCodeSelect.querySelectorAll("option")[0].selected = true;
  
  inputFieldBox.innerHTML = `
    <input type="text" name="text" placeholder="Enter Text Here"/>
  `;
  
  if (outputWrapper.classList.contains("show")) {
    outputWrapper.classList.remove("show");
  }
});

generateButton.addEventListener("click", function() {
  if (qrCodeSelect.value === "text") {
    const textInput = inputFieldBox.querySelector(`input[name="text"]`);
    
    textInput.addEventListener("input", function() {
      if (this.value) {
        generateQrCode(textInput.value);
      } else {
        outputWrapper.classList.remove("show");
      }
    });
    
    if (textInput.value) {
      generateQrCode(textInput.value);
    }
  } else if (qrCodeSelect.value === "phone") {
    const telInput = inputFieldBox.querySelector(`input[name="tel"]`);
    
    telInput.addEventListener("input", function() {
      if (this.value) {
        generateQrCode(`tel:${telInput.value}`);
      } else {
        outputWrapper.classList.remove("show");
      }
    });
    
    if (telInput.value) {
      generateQrCode(`tel:${telInput.value}`);
    }
  } else if (qrCodeSelect.value === "website") {
    const urlInput = inputFieldBox.querySelector(`input[name="url"]`);
    
    urlInput.addEventListener("input", function() {
      if (this.value) {
        const havePrefix = /^https?:\/\//.test(this.value);
        generateQrCode(havePrefix ? urlInput.value : `https://${urlInput.value}`);
      } else {
        outputWrapper.classList.remove("show");
      }
    });
    
    if (urlInput.value) {
      const havePrefix = /^https?:\/\//.test(urlInput.value);
      generateQrCode(havePrefix ? urlInput.value : `https://${urlInput.value}`);
    }
  } else if (qrCodeSelect.value === "email") {
    const mailInput = inputFieldBox.querySelector(`input[name="mail"]`);
    const subInput = inputFieldBox.querySelector(`input[name="sub"]`);
    const smsInput = inputFieldBox.querySelector(`input[name="sms"]`);
    
    mailInput.addEventListener("input", function() {
      if (this.value) {
        generateQrCode(`mailto:${this.value}?subject=${subInput.value ?? "Hello"}&body=${smsInput.value ?? "I Want To Say Hello?"}`);
      } else {
        outputWrapper.classList.remove("show");
      }
    });
    
    subInput.addEventListener("input", function() {
      if (mailInput.value) {
        generateQrCode(`mailto:${mailInput.value}?subject=${this.value ?? "Hello"}&body=${smsInput.value ?? "I Want To Say Hello?"}`);
      } else {
         outputWrapper.classList.remove("show");
       }
    });
    
    smsInput.addEventListener("input", function() {
      if (mailInput.value) {
        generateQrCode(`mailto:${mailInput.value}?subject=${subInput.value ?? "Hello"}&body=${this.value ?? "I Want To Say Hello?"}`);
      } else {
         outputWrapper.classList.remove("show");
       }
    });
    
    if (mailInput.value) {
      generateQrCode(`mailto:${mailInput.value}?subject=${subInput.value ?? "Hello"}&body=${smsInput.value ?? "I Want To Say Hello?"}`);
    }
  } else if (qrCodeSelect.value === "sms") {
    const telInput = inputFieldBox.querySelector(`input[name="tel"]`);
    const smsInput = inputFieldBox.querySelector(`input[name="sms"]`);
    
    telInput.addEventListener("input", function() {
      if (this.value) {
        generateQrCode(`sms:${this.value}?body=${smsInput.value ?? "Hi There"}`);
      } else {
         outputWrapper.classList.remove("show");
       }
    });
    
    smsInput.addEventListener("input", function() {
      if (telInput.value) {
        generateQrCode(`sms:${telInput.value}?body=${this.value ?? "Hi There"}`);
      } else {
         outputWrapper.classList.remove("show");
       }
    });
    
    if (telInput.value) {
      generateQrCode(`sms:${telInput.value}?body=${smsInput.value ?? "Hi There"}`);
    }
  } else if (qrCodeSelect.value === "whatsapp") {
    const telInput = inputFieldBox.querySelector(`input[name="tel"]`);
    const smsInput = inputFieldBox.querySelector(`input[name="sms"]`);
    
    telInput.addEventListener("input", function() {
      if (this.value) {
        generateQrCode(`https://wa.me/${this.value}?text=${smsInput.value ?? "Hi There"}`);
      } else {
         outputWrapper.classList.remove("show");
       }
    });
    
    smsInput.addEventListener("input", function() {
      if (telInput.value) {
        generateQrCode(`https://wa.me/${telInput.value}?text=${this.value ?? "Hi There"}`);
      } else {
         outputWrapper.classList.remove("show");
       }
    });
    
    if (telInput.value) {
      generateQrCode(`https://wa.me/${telInput.value}?text=${smsInput.value ?? "Hi There"}`);
    }
  }
});



function generateQrCode(text) {
  outputWrapper.classList.add("show");
  
  const qr = new QRious({
    element: qrcodeCanvas,
    value: text,
    background: '#ffffff',
    //backgroundAlpha: 0.8,
    foreground: '#000000',
    //foregroundAlpha: 0.8,
    level: 'H',
    size: 500
  });
  
  downloadButton.addEventListener("click", function() {
    const qrImage = qr.toDataURL('image/jpeg');
    const downloadLink = document.createElement("a");
    downloadLink.href = qrImage;
    downloadLink.download = "QrCode.jpeg";
    downloadLink.click();
  });
}

hideButton.addEventListener("click", function() {
  outputWrapper.classList.remove("show");
});
