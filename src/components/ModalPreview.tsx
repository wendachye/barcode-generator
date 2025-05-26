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
    if (!printContents) return;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';

    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Barcode Label</title>
        <style>
          @media print {
            .label-page {
              width: 140mm;
              height: 95mm;
              page-break-after: always;
              margin: 0;
              padding: 0;
            }

            body {
              margin: 0;
              font-size: 12px;
              color: black;
            }

            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
            }
          }
        </style>
      </head>
      <body>${printContents}</body>
    </html>
  `);
    doc.close();

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // Remove iframe after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 200);
    };
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
