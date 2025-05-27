'use client';

import ModalPreview from '@/components/ModalPreview';
import TableEditor from '@/components/TableEditor';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import UploadFile from '@/components/UploadFile';
import { CirclePlus, ScanBarcode, Trash2 } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { read, utils } from 'xlsx';

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Barcode.Item[]>([]);
  const [modalPreviewOpen, setModalPreviewOpen] = useState(false);

  const isValidData = useMemo(() => {
    if (items.length === 0) return false;
    return items.every(
      (item) =>
        item.customerPartNo &&
        item.ospPartNo &&
        item.qty &&
        item.dateCode &&
        item.customerPO &&
        item.ospInvoiceNo &&
        item.cartonNo &&
        item.brand
    );
  }, [items]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset the file input to allow re-uploading the same file
    e.target.value = '';

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;

      const workbook = read(event.target.result);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json<Record<string, string>>(worksheet);

      if (jsonData.length === 0) {
        toast.error('No data found in the uploaded file', { position: 'top-center' });
        return;
      }

      const parsedItems = jsonData.map((item) => {
        return {
          customerPartNo: item['Customer Part No.'] || '',
          ospPartNo: item['OSP Part No.'] || '',
          qty: item['Qty'] || '',
          dateCode: item['Date Code'] || '',
          customerPO: item['Customer PO'] || '',
          ospInvoiceNo: item['OSP Invoice No.'] || '',
          cartonNo: item['Carton No.'] || '',
          brand: item['Brand'] || '',
        };
      });

      const hasEmptyFields = parsedItems.some(
        (item) =>
          !item.customerPartNo ||
          !item.ospPartNo ||
          !item.qty ||
          !item.dateCode ||
          !item.customerPO ||
          !item.ospInvoiceNo ||
          !item.cartonNo ||
          !item.brand
      );

      if (hasEmptyFields) {
        toast.error('Please ensure all fields are filled in the uploaded file.', {
          position: 'top-center',
        });
        return;
      }

      setItems(parsedItems);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClearAll = () => {
    setItems([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddNewRow = () => {
    if (
      items.some((item) => Object.values(item).some((value) => String(value ?? '').trim() === ''))
    ) {
      toast.error('Please fill in all fields before adding a new row.', { position: 'top-center' });
      return;
    }

    setItems([
      {
        customerPartNo: '',
        ospPartNo: '',
        qty: '',
        dateCode: '',
        customerPO: '',
        ospInvoiceNo: '',
        cartonNo: '',
        brand: '',
      },
      ...items,
    ]);
  };

  const handleGenerateBarcode = () => {
    setModalPreviewOpen(true);
  };

  const handleRowChange = (index: number, field: keyof Barcode.Item, value: string) => {
    const updatedItems = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(updatedItems);
  };

  const handleRemoveRow = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Barcode Label Generator</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <div className="flex gap-2 sm:gap-4">
          <UploadFile ref={fileInputRef} accept=".xlsx,.xls" onChange={handleUpload} />

          <Button variant="secondary" onClick={handleClearAll}>
            <Trash2 />
            Clear All
          </Button>

          <Button variant="outline" onClick={handleAddNewRow}>
            <CirclePlus />
            Add New
          </Button>
        </div>

        <Button onClick={handleGenerateBarcode} disabled={!isValidData}>
          <ScanBarcode />
          Generate Barcode
        </Button>
      </div>

      <TableEditor items={items} onChangeRow={handleRowChange} onRemoveRow={handleRemoveRow} />

      <ModalPreview
        open={modalPreviewOpen}
        onClose={() => setModalPreviewOpen(false)}
        items={items}
      />

      <Toaster />
    </div>
  );
}
