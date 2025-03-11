import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { CharacterData } from "@/types/character";
import { Brain, Heart, Shield } from "lucide-react";

type AbilityScoresProps = {
  character: CharacterData;
  updateAbility: (ability: string, value: string | number) => void;
};

export function AbilityScores({
  character,
  updateAbility,
}: AbilityScoresProps) {
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
    <div className="border rounded-lg p-4 bg-gray-50">
      <h2 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
        <Brain className="text-dnd-accent" />
        Ability Scores
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {Object.entries(character.abilities).map(([ability, score]) => (
          <div
            key={ability}
            className="border rounded-lg p-3 bg-white flex flex-col items-center"
          >
            <span className="uppercase font-bold text-sm text-gray-600 flex items-center gap-1">
              {ability.substring(0, 3)}
            </span>

            {editingAbility === ability ? (
              <Input
                type="number"
                value={score}
                onChange={(e) => updateAbility(ability, e.target.value)}
                onBlur={handleBlur}
                autoFocus
                className="text-center w-16 font-bold text-lg mt-2"
              />
            ) : (
              <div
                onClick={() => handleAbilityClick(ability)}
                className="w-16 h-10 flex items-center justify-center font-bold text-lg mt-2 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                {score}
              </div>
            )}

            <div className="border-2 rounded-full w-10 h-10 flex items-center justify-center mt-1 font-bold">
              {formatModifier(getAbilityModifier(score))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
