import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CharacterData } from '@/types/character';
import { Brain, Heart, Shield } from 'lucide-react';

type AbilityScoresProps = {
  character: CharacterData;
  updateAbility: (ability: string, value: string | number) => void;
};

export function AbilityScores({ character, updateAbility }: AbilityScoresProps) {
  const [editingAbility, setEditingAbility] = useState<string | null>(null);

  const getAbilityModifier = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  const formatModifier = (mod: number) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const handleAbilityClick = (ability: string) => {
    setEditingAbility(ability);
  };

  const handleBlur = () => {
    setEditingAbility(null);
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Brain className="text-dnd-accent" />
        Ability Scores
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {Object.entries(character.abilityScores).map(([ability, score]) => (
          <div key={ability} className="flex flex-col items-center rounded-lg border bg-white p-3">
            <span className="flex items-center gap-1 text-sm font-bold text-gray-600 uppercase">
              {ability.substring(0, 3)}
            </span>

            {editingAbility === ability ? (
              <Input
                type="number"
                value={score}
                onChange={(e) => updateAbility(ability, e.target.value)}
                onBlur={handleBlur}
                autoFocus
                className="mt-2 w-16 text-center text-lg font-bold"
              />
            ) : (
              <div
                onClick={() => handleAbilityClick(ability)}
                className="mt-2 flex h-10 w-16 cursor-pointer items-center justify-center rounded-md text-lg font-bold hover:bg-gray-100"
              >
                {score}
              </div>
            )}

            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold">
              {formatModifier(getAbilityModifier(score))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
