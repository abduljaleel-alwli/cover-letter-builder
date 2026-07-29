import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPdf(elementId: string, filename: string = 'Abdulmajeed_Alwli_Cover_Letter.pdf'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  // Preserve original inline styling
  const originalTransform = element.style.transform;
  const originalBoxShadow = element.style.boxShadow;
  const originalBorder = element.style.border;

  // Temporarily reset display modifiers for high-res canvas capture
  element.style.transform = 'none';
  element.style.boxShadow = 'none';
  element.style.border = 'none';

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Create a strict 1-page A4 PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    // Fit image exactly onto single page 1
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    pdf.save(filename);
  } catch (err) {
    console.error('PDF export error:', err);
    window.print();
  } finally {
    element.style.transform = originalTransform;
    element.style.boxShadow = originalBoxShadow;
    element.style.border = originalBorder;
  }
}

