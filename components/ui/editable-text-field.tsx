import React, { useState } from 'react';
import { Input } from './input';
import { Button } from './button';
import { X } from 'lucide-react';
import { useClickAway } from '@uidotdev/usehooks';
import { cn } from '@/lib/utils';

type Props = {
  value: string;
  showQuantity?: boolean;
  quantity?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  autoFocus: boolean;
  className: string;
  onRemove: () => void;
};

export default function EditableTextField({
  value,
  showQuantity,
  quantity,
  onChange,
  onBlur,
  autoFocus,
  className,
  onRemove,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const clickOutside = useClickAway(() => {
    setIsEditing(false);
    onBlur();
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up
    onRemove();
  };

  return isEditing ? (
    <div
      ref={clickOutside as React.RefObject<HTMLDivElement>}
      className={cn('flex w-full items-center gap-2', className)}
    >
      <Input value={value} onChange={onChange} autoFocus={autoFocus} className="flex-1 basis-3/5" />
      {showQuantity && (
        <Input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => {
            onChange(e);
          }}
          className="flex-1 cursor-text text-center"
        />
      )}
      <Button variant="outline" size="icon" className="cursor-pointer" onClick={handleRemove} aria-label="Remove item">
        <X size={14} />
      </Button>
    </div>
  ) : (
    <div className="flex w-full items-center rounded-md border bg-white px-3 py-2" onClick={() => setIsEditing(true)}>
      <div className="flex-grow">{value}</div>
      {showQuantity && <div className="min-w-10 text-center">{quantity}</div>}
    </div>
  );
}
