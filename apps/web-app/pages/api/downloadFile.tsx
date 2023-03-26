// pages/api/downloadFile.js

export default async function handler(req:any, res:any) {
    const { url } = req.query;
  
    const headers = {
      Accept: "application/pdf",
      Authorization: `Token ${process.env.NEXT_PUBLIC_PRETIX_API}`,
      "Content-Type": "application/pdf",
    };
  
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error("Error fetching file");
      }
  
      const buffer = await response.arrayBuffer();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).json({ message: "Error downloading file" });
    }
  }
  