import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface TableEditorProps {
  items: Barcode.Item[];
  onChangeRow: (index: number, field: keyof Barcode.Item, value: string) => void;
  onRemoveRow: (index: number) => void;
}

const TableEditor = ({ items, onChangeRow, onRemoveRow }: TableEditorProps) => {
  return (
    <>
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Part No.</TableHead>
            <TableHead>OSP Part No.</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Date Code</TableHead>
            <TableHead>Customer PO</TableHead>
            <TableHead>OSP Invoice No.</TableHead>
            <TableHead>Carton No.</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="min-w-[200px]">
                <Input
                  value={item.customerPartNo}
                  onChange={(e) => onChangeRow(idx, 'customerPartNo', e.target.value)}
                />
              </TableCell>
              <TableCell className="min-w-[200px]">
                <Input
                  value={item.ospPartNo}
                  onChange={(e) => onChangeRow(idx, 'ospPartNo', e.target.value)}
                />
              </TableCell>
              <TableCell className="min-w-[90px]">
                <Input value={item.qty} onChange={(e) => onChangeRow(idx, 'qty', e.target.value)} />
              </TableCell>
              <TableCell className="min-w-[90px]">
                <Input
                  value={item.dateCode}
                  onChange={(e) => onChangeRow(idx, 'dateCode', e.target.value)}
                />
              </TableCell>
              <TableCell className="min-w-[150px]">
                <Input
                  value={item.customerPO}
                  onChange={(e) => onChangeRow(idx, 'customerPO', e.target.value)}
                />
              </TableCell>
              <TableCell className="min-w-[180px]">
                <Input
                  value={item.ospInvoiceNo}
                  onChange={(e) => onChangeRow(idx, 'ospInvoiceNo', e.target.value)}
                />
              </TableCell>
              <TableCell className="min-w-[90px]">
                <Input
                  value={item.cartonNo}
                  onChange={(e) => onChangeRow(idx, 'cartonNo', e.target.value)}
                />
              </TableCell>
              <TableCell className="min-w-[150px]">
                <Input
                  value={item.brand}
                  onChange={(e) => onChangeRow(idx, 'brand', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => onRemoveRow(idx)}>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {items.length === 0 && (
        <div className="text-muted-foreground text-sm italic text-center mt-10">
          No records found. Please upload a file or add records manually.
        </div>
      )}
    </>
  );
};

export default TableEditor;
