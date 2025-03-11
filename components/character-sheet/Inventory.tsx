import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CharacterData } from '@/types/character';
import { Backpack, Plus } from 'lucide-react';
import EditableTextField from '@/components/ui/editable-text-field';

type InventoryProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

export function Inventory({ character, updateCharacter }: InventoryProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleBlur = () => {
    setEditingIndex(null);
  };

  const handleRemoveItem = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent event bubbling
    const newInventory = character.inventory.filter((_, i) => i !== index);
    updateCharacter('inventory', null, newInventory);
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-2 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Backpack className="text-dnd-accent" />
        Inventory
      </h2>
      <div className="space-y-2">
        {character.inventory.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <EditableTextField
              value={item.name}
              showQuantity={true}
              quantity={item.quantity}
              onChange={(e) => {
                const newInventory = [...character.inventory];
                if (e.target.type === 'number') {
                  newInventory[index] = {
                    ...newInventory[index],
                    quantity: parseInt(e.target.value) || 1,
                  };
                } else {
                  newInventory[index] = {
                    ...newInventory[index],
                    name: e.target.value,
                  };
                }
                updateCharacter('inventory', null, newInventory);
              }}
              onBlur={() => setEditingIndex(null)}
              autoFocus={editingIndex === index}
              className="cursor-text"
              onRemove={() => {
                const newInventory = character.inventory.filter((_, i) => i !== index);
                updateCharacter('inventory', null, newInventory);
              }}
            />
          </div>
        ))}
        <Button
          variant="outline"
          className="mt-2 flex w-full cursor-pointer items-center gap-2"
          onClick={() => {
            updateCharacter('inventory', null, [...character.inventory, { name: '', quantity: 1 }]);
            setEditingIndex(character.inventory.length);
          }}
        >
          <Plus size={14} /> Add Item
        </Button>
      </div>
    </div>
  );
}
