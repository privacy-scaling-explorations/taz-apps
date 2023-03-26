// pages/displayPDF.js
import { useEffect, useState } from "react";

const callDownloadPDFEndpoint = () => {
  const apiURL = "/api/download-ticket";
  return apiURL;
};

const DisplayPDF = () => {
  const [pdfURL, setPdfURL] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      const apiURL = callDownloadPDFEndpoint();
      console.log(apiURL)
      setPdfURL(apiURL);
    };

    fetchPDF();
  }, []);

  return (
    <div>
      <h1>PDF Viewer</h1>
      {pdfURL && (
        <iframe
          src={pdfURL}
          style={{ width: "100%", height: "500px", border: "none" }}
          title="PDF Viewer"
        ></iframe>
      )}
    </div>
  );
};

export default DisplayPDF;
