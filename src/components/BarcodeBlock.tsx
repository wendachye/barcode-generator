'use client';

import JsBarcode from 'jsbarcode';
import { useEffect, useRef } from 'react';

interface Props {
  value: string;
}

export default function BarcodeBlock({ value }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current && value) {
      JsBarcode(ref.current, `${value}`, {
        format: 'CODE39',
        displayValue: true,
        fontSize: 12,
        height: 50,
        width: 1.2,
      });
    }
  }, [value]);

  if (!value) return null;

  return <svg ref={ref}></svg>;
}
