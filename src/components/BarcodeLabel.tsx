'use client';

import BarcodeBlock from './BarcodeBlock';

interface Item {
  customerPartNo: string;
  ospPart: string;
  qty: string;
  dateCode: string;
  poNo: string;
  invoiceNo: string;
  cartonNo: string;
  brand: string;
}

export default function BarcodeLabel({ item }: { item: Item }) {
  return (
    <div className="w-full max-w-[640px] border border-black text-xs text-black mx-auto mb-6 overflow-x-auto">
      <table className="table-fixed border-collapse w-full min-w-[576px]">
        <colgroup>
          <col style={{ width: '125px' }} />
          <col style={{ width: '125px' }} />
          <col style={{ width: '125px' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={4} className="border border-black text-center text-base font-bold p-2">
              Customer ELECTRONICS PTE LTD
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black font-semibold p-2">Customer Part No.</td>
            <td colSpan={3} className="border border-black p-2">
              {/* <div>{item.customerPartNo}</div> */}
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.customerPartNo} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black font-semibold p-2">OSP Part No.</td>
            <td colSpan={3} className="border border-black p-2">
              {/* <div>{item.ospPart}</div> */}
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.ospPart} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black font-semibold p-2">Quantity</td>
            <td className="border border-black p-2">
              {/* <div>{isNaN(Number(item.qty)) ? item.qty : Number(item.qty).toLocaleString()}</div> */}
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.qty} />
              </div>
            </td>
            <td className="border border-black font-semibold p-2">Date Code</td>
            <td className="border border-black p-2">
              {/* <div>{item.dateCode}</div> */}
              <div className="max-w-full overflow-hidden">
                <BarcodeBlock value={item.dateCode} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="border border-black font-semibold p-2">Customer PO No.</td>
            <td className="border border-black p-2">{item.poNo}</td>
            <td className="border border-black font-semibold p-2">Brand</td>
            <td className="border border-black p-2">{item.brand}</td>
          </tr>
          <tr>
            <td className="border border-black font-semibold p-2">OSP Invoice No.</td>
            <td colSpan={3} className="border border-black p-2">
              {item.invoiceNo}
            </td>
          </tr>
          <tr>
            <td className="border border-black font-semibold p-2">Carton No.</td>
            <td colSpan={3} className="border border-black p-2">
              {item.cartonNo}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
