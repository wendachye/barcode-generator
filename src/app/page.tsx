'use client';

import BarcodeLabel from '@/components/BarcodeLabel';
import { useState } from 'react';

interface Item {
  item: string;
  name: string;
  qty: string;
  showBarcode: boolean;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([{ item: '', name: '', qty: '', showBarcode: false }]);

  const handleChange = (index: number, field: keyof Item, value: string) => {
    const updatedItems = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(updatedItems);

    if (index === items.length - 1 && field === 'item' && value.trim() !== '') {
      setItems([...updatedItems, { item: '', name: '', qty: '', showBarcode: false }]);
    }
  };

  const handleRemoveRow = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleGenerateAllBarcodes = () => {
    const updatedItems = items.map((item) => ({ ...item, showBarcode: true }));
    setItems(updatedItems);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ID Tag Generator</h1>

      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Item Code</th>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">
                <input
                  className="border p-1 w-full rounded"
                  value={item.item}
                  onChange={(e) => handleChange(idx, 'item', e.target.value)}
                />
              </td>
              <td className="border p-2">
                <input
                  className="border p-1 w-full rounded"
                  value={item.name}
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                />
              </td>
              <td className="border p-2">
                <input
                  className="border p-1 w-full rounded"
                  value={item.qty}
                  onChange={(e) => handleChange(idx, 'qty', e.target.value)}
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleRemoveRow(idx)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mb-6 justify-end">
        <button
          onClick={handleGenerateAllBarcodes}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate All Barcodes
        </button>
      </div>

      <div className="space-y-4">
        {items.map(
          (item, idx) =>
            item.showBarcode &&
            item.item.trim() !== '' && (
              <BarcodeLabel
                key={idx}
                item={{
                  customerPartNo: item.item,
                  ospPart: item.item,
                  qty: item.qty,
                  poNo: '4513185188',
                  invoiceNo: '1234567890',
                  cartonNo: '5',
                  brand: 'CUSTOMER ELECTRONICS',
                  dateCode: '2505',
                }}
              />
            )
        )}
      </div>
    </div>
  );
}
