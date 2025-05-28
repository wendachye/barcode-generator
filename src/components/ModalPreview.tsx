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

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Barcode Label</title>
        <style>
          @media print {
            @page {
              margin: 0;
            }

            body {
              margin: 0;
              font-size: 12px;
              color: black;
            }

            .label-page {
              width: 145mm;
              height: 90mm;
              page-break-after: always;
              box-sizing: border-box;
              margin-top: 8mm;
              margin-left: 10mm;
            }

            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
            }

            .label-title {
              font-weight: bold;
            }

            th, td {
              padding-left: 6px;
            }
          }
        </style>
      </head>
      <body>${printContents}</body>
    </html>
  `;

    iframe.srcdoc = html;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 200);
    };
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col max-w-[90vw] sm:max-w-3xl w-full h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-bold">
            Barcode Preview
          </DialogTitle>
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
