export default async function handler(req : any, res : any) {
  const { apiURL } = req.query;

  const headers = {
    Authorization: `Token ${process.env.NEXT_PUBLIC_PRETIX_API}`,
    Accept: "application/json, text/javascript",
  };

  try {
    const response = await fetch(apiURL, { headers });
    if (!response.ok) {
      throw new Error(`Error fetching PDF: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.send(Buffer.from(buffer));
  } catch (error: any) {
    console.error("Error downloading PDF:", error);
    res.status(500).json({ message: `Error downloading PDF: ${error.message}` });
  }
}
