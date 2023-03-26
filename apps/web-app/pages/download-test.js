// pages/displayPDF.js
import { useEffect, useState } from "react";

// const callDownloadPDFEndpoint = () => {
//   const apiURL = "/api/download-ticket";
//   return apiURL;
// };

const DisplayPDF = () => {

//   useEffect(() => {
//     const fetchPDF = async () => {
//       const apiURL = callDownloadPDFEndpoint();
//       setPdfURL(apiURL);
//     };

//     fetchPDF();
//   }, []);

const openPDFPopup = async (apiURL) => {
    const response = await fetch(`/api/download-ticket?apiURL=${encodeURIComponent(apiURL)}`);
    const pdfBlob = await response.blob();
    const pdfURL = URL.createObjectURL(pdfBlob);
    window.open(pdfURL, "_blank", "resizable=yes,scrollbars=yes,width=800,height=600");
  };

  return (
    <div>
      <h1>PDF Viewer</h1>
      <button onClick={() => openPDFPopup("https://beta.ticketh.xyz/api/v1/organizers/zuzalu/events/ZK/orders/GLZED/download/pdf/")}>Open PDF</button>
    </div>
  );
};

export default DisplayPDF;
