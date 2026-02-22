import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoice = async (order: any) => {
  const element = document.getElementById(`invoice-${order.id}`);
  if (!element) return;

  // Make the hidden invoice visible for the snapshot
  element.style.display = 'block';

  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better PDF quality
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(`Invoice_${order.id}_${order.clientName}.pdf`);

  // Hide it again
  element.style.display = 'none';
};