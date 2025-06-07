import { showErrorToast } from "../utils/toast";

const usePdfDownload = () => {
  const handleDownload = async (pdfUrl: string, fileName: string) => {
    try {
      const fileResponse = await fetch(pdfUrl);
      if (!fileResponse.ok) {
        throw new Error("Failed to fetch the file");
      }
      const blob = await fileResponse.blob();
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = fileName;
      downloadLink.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      showErrorToast(
        "There was an issue downloading the PDF. Please try again."
      );
    }
  };

  return {
    handleDownload,
  };
};

export default usePdfDownload;
