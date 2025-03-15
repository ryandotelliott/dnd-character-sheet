import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CharacterData } from '@/types/character';
import { Shield } from 'lucide-react';

type SavingThrowsProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

export function SavingThrows({ character, updateCharacter }: SavingThrowsProps) {
  const getAbilityModifier = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  const formatModifier = (mod: number) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const handleToggleProficiency = (ability: string) => {
    const newSavingThrows = {
      ...character.savingThrows,
      [ability]: !character.savingThrows[ability],
    };
    updateCharacter('savingThrows', null, newSavingThrows);
  };

  // Calculate saving throw bonus: ability modifier + proficiency bonus (if proficient)
  const getSavingThrowBonus = (ability: string) => {
    const abilityMod = getAbilityModifier(character.abilityScores[ability]);
    const profBonus = character.savingThrows[ability] ? character.proficiencyBonus : 0;
    return formatModifier(abilityMod + profBonus);
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-2 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Shield className="text-dnd-accent" />
        Saving Throws
      </h2>
      <div className="space-y-2">
        {Object.entries(character.savingThrows).map(([ability, isProficient]) => (
          <div key={ability} className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`save-${ability}`}
                checked={isProficient}
                onCheckedChange={() => handleToggleProficiency(ability)}
              />
              <label htmlFor={`save-${ability}`} className="cursor-pointer capitalize select-none">
                {ability}
              </label>
            </div>
            <div className="font-bold">{getSavingThrowBonus(ability)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
