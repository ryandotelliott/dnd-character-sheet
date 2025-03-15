import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CharacterData } from '@/types/character';
import { Sparkles, Plus } from 'lucide-react';
import EditableTextField from '@/components/ui/editable-text-field';

type FeaturesProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

export function Features({ character, updateCharacter }: FeaturesProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-2 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Sparkles className="text-dnd-accent" />
        Features
      </h2>
      <div className="space-y-2">
        {character.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <EditableTextField
              value={feature}
              onChange={(e) => {
                const newFeatures = [...character.features];
                newFeatures[index] = e.target.value;
                updateCharacter('features', null, newFeatures);
              }}
              onBlur={() => setEditingIndex(null)}
              autoFocus={editingIndex === index}
              className="cursor-text"
              onRemove={() => {
                const newFeatures = character.features.filter((_, i) => i !== index);
                updateCharacter('features', null, newFeatures);
              }}
            />
          </div>
        ))}
        <Button
          variant="outline"
          className="mt-2 flex w-full cursor-pointer items-center gap-2"
          onClick={() => {
            updateCharacter('features', null, [...character.features, '']);
            setEditingIndex(character.features.length);
          }}
        >
          <Plus size={14} /> Add Feature
        </Button>
      </div>
    </div>
  );
}
