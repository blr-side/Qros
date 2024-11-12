const qrContainer = document.getElementById("qrContainer");
const qrInput = document.getElementById("qrInput");
const qrCanvas = document.getElementById("qrCanvas");

qrInput.addEventListener("input", function() {
  if (this.value) {
    qrContainer.classList.add("show");
    makeCode(qrCanvas, this.value);
  } else {
    qrContainer.classList.remove("show");
  }
});

function makeCode(elem, text) {
  new QRious({
    element: elem,
    value: text,
    size: 300,
    level: 'H',
    background: '#ffffff',
    foreground: '#333333',
  });
}

qrCanvas.addEventListener("click", function() {
  const qrImage = this.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = qrImage;
  downloadLink.download = "QRCode.png";
  downloadLink.click();
});