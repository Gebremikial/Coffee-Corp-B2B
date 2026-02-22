import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoice = async (order: any) => {
  const element = document.getElementById(`invoice-${order.id}`);
  if (!element) return;

  // Temporarily show the element for the snapshot
  element.style.display = 'block';

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false, // Prevents console from crashing on CSS parsing
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // IMPORTANT: Remove all global stylesheets from the clone
        // This stops html2canvas from trying to parse Tailwind's modern colors
        const styles = clonedDoc.getElementsByTagName('style');
        for (let i = styles.length - 1; i >= 0; i--) {
          styles[i].remove();
        }
        const links = clonedDoc.getElementsByTagName('link');
        for (let i = links.length - 1; i >= 0; i--) {
          if (links[i].rel === 'stylesheet') links[i].remove();
        }

        // Ensure our specific invoice element is visible in the clone
        const el = clonedDoc.getElementById(`invoice-${order.id}`);
        if (el) el.style.display = 'block';
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`Invoice_${order.id}_${order.clientName.replace(/\s+/g, '_')}.pdf`);
  } catch (error) {
    console.error('PDF Generation Failed:', error);
  } finally {
    element.style.display = 'none';
  }
};