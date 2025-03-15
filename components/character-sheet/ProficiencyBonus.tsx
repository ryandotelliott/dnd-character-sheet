import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CharacterData } from '@/types/character';
import { Award } from 'lucide-react';

type ProficiencyBonusProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

export function ProficiencyBonus({ character, updateCharacter }: ProficiencyBonusProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const formatBonus = (bonus: number) => {
    return bonus >= 0 ? `+${bonus}` : `${bonus}`;
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-2 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Award className="text-dnd-accent" />
        Proficiency Bonus
      </h2>

      <div className="flex items-center justify-center">
        {isEditing ? (
          <Input
            type="number"
            value={character.proficiencyBonus}
            onChange={(e) => updateCharacter('proficiencyBonus', null, parseInt(e.target.value) || 0)}
            onBlur={handleBlur}
            autoFocus
            className="w-16 text-center"
          />
        ) : (
          <div
            onClick={handleClick}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 bg-white text-xl font-bold hover:bg-gray-100"
          >
            {formatBonus(character.proficiencyBonus)}
          </div>
        )}
      </div>
    </div>
  );
}
