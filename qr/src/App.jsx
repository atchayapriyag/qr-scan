import { useState } from "react";

export const Qrcode = () => {
  const [img, setImg] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [qrData, setqrData] = useState(
    " https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=atchaya"
  );
  const [qrSize, setQrSize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${setQrSize}150x150&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }
  function dowloadQR() {
    fetch(img)
      .then((Response) => Response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading QR code", error);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait.....</p>}
      {img && <img src={img} className="" />}
      <div>
        <label htmlFor="dataInput" className="input-laber">
          DATA FOR QR CODE:
        </label>
        <input
          type="text"
          value={qrData}
          id="dataInput"
          placeholder="Enter QR code"
          onChange={(e) => setqrData(e.target.value)}
        />
        <label htmlFor="sizeInput" className="input-label">
          IMAGE SIZE( e.g,150)
        </label>
        <input
          type="text"
          value={qrSize}
          onChange={(e) => setQrSize(e.target.value)}
          id="sizeInput"
          placeholder="Enter image size"
        />

        <button
          className="generate-button"
          disabled={loading}
          onClick={generateQR}
        >
          {" "}
          Generate QR code
        </button>
        <button className="download-button" onClick={dowloadQR}>
          Download QR code
        </button>
      </div>
      <p className="footer">
        Designed By <a>ATCHAYA</a>
      </p>
    </div>
  );
};
export default Qrcode;
