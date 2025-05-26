import { Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface UploadProps {
  ref?: React.RefObject<HTMLInputElement | null>;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFile = ({ ref, accept, onChange }: UploadProps) => {
  return (
    <Label className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-muted text-sm rounded-md hover:bg-muted/70 w-fit">
      <Upload className="w-4 h-4" />
      Upload file
      <Input ref={ref} type="file" accept={accept} onChange={onChange} className="hidden" />
    </Label>
  );
};

export default UploadFile;
