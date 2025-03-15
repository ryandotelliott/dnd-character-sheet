import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CharacterData } from '@/types/character';
import { Sparkles, Plus } from 'lucide-react';
import EditableTextField from '@/components/ui/editable-text-field';

type AbilitiesProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

export function Abilities({ character, updateCharacter }: AbilitiesProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-2 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Sparkles className="text-dnd-accent" />
        Abilities
      </h2>
      <div className="space-y-2">
        {character.abilities.map((ability, index) => (
          <div key={index} className="flex items-start gap-2">
            <EditableTextField
              value={ability}
              onChange={(e) => {
                const newAbilities = [...character.abilities];
                newAbilities[index] = e.target.value;
                updateCharacter('abilities', null, newAbilities);
              }}
              onBlur={() => setEditingIndex(null)}
              autoFocus={editingIndex === index}
              className="cursor-text"
              onRemove={() => {
                const newAbilities = character.abilities.filter((_, i) => i !== index);
                updateCharacter('abilities', null, newAbilities);
              }}
            />
          </div>
        ))}
        <Button
          variant="outline"
          className="mt-2 flex w-full cursor-pointer items-center gap-2"
          onClick={() => {
            updateCharacter('abilities', null, [...character.abilities, '']);
            setEditingIndex(character.abilities.length);
          }}
        >
          <Plus size={14} /> Add Ability
        </Button>
      </div>
    </div>
  );
}
