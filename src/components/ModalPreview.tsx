import { Printer, X } from 'lucide-react';
import { useRef } from 'react';
import BarcodeLabel from './BarcodeLabel';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ModalPreviewProps {
  open: boolean;
  onClose: () => void;
  items: Barcode.Item[];
}

const ModalPreview = ({ open, onClose, items }: ModalPreviewProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    const printWindow = window.open('', '', 'height=800,width=1000');

    if (printWindow && printContents) {
      console.log('here!!!');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Barcodes</title>
            <style>
              @media print {
                body {
                  margin: 0;
                }
              }
              body {
                font-family: Arial, sans-serif;
                padding: 0;
              }
            </style>
          </head>
          <body>${printContents}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-4xl flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">Barcode Preview</DialogTitle>
        </DialogHeader>

        <DialogClose className="absolute right-6 top-6 text-gray-600">
          <X className="h-6 w-6" />
        </DialogClose>

        <div className="flex-1 overflow-auto" ref={printRef}>
          {items.map((item, idx) => (
            <BarcodeLabel key={idx} item={item} />
          ))}
        </div>

        <div className="flex justify-end bg-white">
          <Button onClick={handlePrint}>
            <Printer />
            Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPreview;
