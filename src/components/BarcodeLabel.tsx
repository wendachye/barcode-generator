'use client';

import BarcodeBlock from './BarcodeBlock';

export default function BarcodeLabel({ item }: { item: Barcode.Item }) {
  return (
    <div className="label-page w-auto h-auto box-border border border-black text-xs text-black mb-3">
      <table className="table-fixed border-collapse w-full">
        <colgroup>
          <col style={{ width: '128px' }} />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th
              colSpan={4}
              className="label-title border border-black text-center text-base font-bold p-2"
            >
              O S ELECTRONICS (S) PTE LTD
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="label-title border border-black font-semibold p-2">Customer Part No.</td>
            <td colSpan={3} className="border border-black p-2">
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.customerPartNo} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="label-title border border-black font-semibold p-2">OSP Part No.</td>
            <td colSpan={3} className="border border-black p-2">
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.ospPartNo} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="label-title border border-black font-semibold p-2">Quantity</td>
            <td className="border border-black p-2">
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.qty} />
              </div>
            </td>
            <td className="label-title border border-black font-semibold p-2">Date Code</td>
            <td className="border border-black p-2">
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.dateCode} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="label-title border border-black font-semibold p-2">Customer PO No.</td>
            <td className="border border-black p-2">{item.customerPO}</td>
            <td className="label-title border border-black font-semibold p-2">Brand</td>
            <td className="border border-black p-2">{item.brand}</td>
          </tr>
          <tr>
            <td className="label-title border border-black font-semibold p-2">OSP Invoice No.</td>
            <td colSpan={3} className="border border-black p-2">
              {item.ospInvoiceNo}
            </td>
          </tr>
          <tr>
            <td className="label-title border border-black font-semibold p-2">Carton No.</td>
            <td colSpan={3} className="border border-black p-2">
              {item.cartonNo}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
