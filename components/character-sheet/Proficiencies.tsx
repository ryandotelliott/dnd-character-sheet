import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CharacterData } from '@/types/character';
import { Award, Plus } from 'lucide-react';
import EditableTextField from '@/components/ui/editable-text-field';

type ProficienciesProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

export function Proficiencies({ character, updateCharacter }: ProficienciesProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleProficiencyClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleBlur = () => {
    setEditingIndex(null);
  };

  const handleRemoveProficiency = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent event bubbling
    const newProficiencies = character.proficiencies.filter((_, i) => i !== index);
    updateCharacter('proficiencies', null, newProficiencies);
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-2 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Award className="text-dnd-accent" />
        Proficiencies
      </h2>
      <div className="space-y-2">
        {character.proficiencies.map((proficiency, index) => (
          <div key={index} className="flex items-center gap-2">
            <EditableTextField
              value={proficiency}
              onChange={(e) => {
                const newProficiencies = [...character.proficiencies];
                newProficiencies[index] = e.target.value;
                updateCharacter('proficiencies', null, newProficiencies);
              }}
              onBlur={() => setEditingIndex(null)}
              autoFocus={editingIndex === index}
              className="cursor-text"
              onRemove={() => {
                const newProficiencies = character.proficiencies.filter((_, i) => i !== index);
                updateCharacter('proficiencies', null, newProficiencies);
              }}
            />
          </div>
        ))}
        <Button
          variant="outline"
          className="mt-2 flex w-full cursor-pointer items-center gap-2"
          onClick={() => {
            updateCharacter('proficiencies', null, [...character.proficiencies, '']);
            setEditingIndex(character.proficiencies.length);
          }}
        >
          <Plus size={14} /> Add Proficiency
        </Button>
      </div>
    </div>
  );
}
