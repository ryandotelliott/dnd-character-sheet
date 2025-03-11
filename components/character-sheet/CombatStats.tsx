import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { CharacterData } from "@/types/character";
import { Shield, Heart } from "lucide-react";

type CombatStatsProps = {
  character: CharacterData;
  updateCharacter: (
    section: keyof CharacterData,
    field: string | null,
    value: any,
  ) => void;
};

type EditingField =
  | "armorClass"
  | "initiative"
  | "speed"
  | "hitPointsCurrent"
  | "hitPointsMax"
  | "hitDiceTotal"
  | "hitDiceRemaining"
  | null;

export function CombatStats({ character, updateCharacter }: CombatStatsProps) {
  const [editingField, setEditingField] = useState<EditingField>(null);

  const handleFieldClick = (field: EditingField) => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h2 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
        <Shield className="text-dnd-accent" />
        Combat
      </h2>

      <div className="grid grid-cols-3 gap-2 text-center mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center justify-center gap-1">
            AC
          </label>
          {editingField === "armorClass" ? (
            <Input
              type="number"
              value={character.armorClass}
              onChange={(e) =>
                updateCharacter("armorClass", null, Number(e.target.value))
              }
              onBlur={handleBlur}
              autoFocus
              className="text-center font-bold cursor-text"
            />
          ) : (
            <div
              className="w-full bg-white rounded-md py-2 px-3 border text-center font-bold cursor-pointer"
              onClick={() => handleFieldClick("armorClass")}
            >
              {character.armorClass}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center justify-center gap-1">
            Initiative
          </label>
          {editingField === "initiative" ? (
            <Input
              type="number"
              value={character.initiative}
              onChange={(e) =>
                updateCharacter("initiative", null, Number(e.target.value))
              }
              onBlur={handleBlur}
              autoFocus
              className="text-center font-bold cursor-text"
            />
          ) : (
            <div
              className="w-full bg-white rounded-md py-2 px-3 border text-center font-bold cursor-pointer"
              onClick={() => handleFieldClick("initiative")}
            >
              {character.initiative}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center justify-center gap-1">
            Speed
          </label>
          {editingField === "speed" ? (
            <Input
              type="number"
              value={character.speed}
              onChange={(e) =>
                updateCharacter("speed", null, Number(e.target.value))
              }
              onBlur={handleBlur}
              autoFocus
              className="text-center font-bold cursor-text"
            />
          ) : (
            <div
              className="w-full bg-white rounded-md py-2 px-3 border text-center font-bold cursor-pointer"
              onClick={() => handleFieldClick("speed")}
            >
              {character.speed}
            </div>
          )}
        </div>
      </div>

      {/* Hit Points */}
      <div className="border rounded-lg p-3 bg-white mt-4">
        <div className="text-center mb-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center justify-center gap-1">
            <Heart size={16} className="text-dnd-accent" />
            Hit Points
          </label>
          <div className="flex items-center justify-center gap-2 mt-1">
            {editingField === "hitPointsCurrent" ? (
              <Input
                type="number"
                value={character.hitPointsCurrent}
                onChange={(e) =>
                  updateCharacter(
                    "hitPointsCurrent",
                    null,
                    Number(e.target.value),
                  )
                }
                onBlur={handleBlur}
                autoFocus
                className="text-center font-bold w-20 cursor-text"
              />
            ) : (
              <div
                className="w-20 bg-white border rounded-md py-2 px-3 text-center font-bold cursor-pointer"
                onClick={() => handleFieldClick("hitPointsCurrent")}
              >
                {character.hitPointsCurrent}
              </div>
            )}
            <span className="text-lg">/</span>
            {editingField === "hitPointsMax" ? (
              <Input
                type="number"
                value={character.hitPointsMax}
                onChange={(e) =>
                  updateCharacter("hitPointsMax", null, Number(e.target.value))
                }
                onBlur={handleBlur}
                autoFocus
                className="text-center font-bold w-20 cursor-text"
              />
            ) : (
              <div
                className="w-20 bg-white border rounded-md py-2 px-3 text-center font-bold cursor-pointer"
                onClick={() => handleFieldClick("hitPointsMax")}
              >
                {character.hitPointsMax}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total
            </label>
            {editingField === "hitDiceTotal" ? (
              <Input
                value={character.hitDiceTotal}
                onChange={(e) =>
                  updateCharacter("hitDiceTotal", null, e.target.value)
                }
                onBlur={handleBlur}
                autoFocus
                className="text-center cursor-text"
              />
            ) : (
              <div
                className="w-full bg-white rounded-md py-2 px-3 border text-center cursor-pointer"
                onClick={() => handleFieldClick("hitDiceTotal")}
              >
                {character.hitDiceTotal}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remaining
            </label>
            {editingField === "hitDiceRemaining" ? (
              <Input
                value={character.hitDiceRemaining}
                onChange={(e) =>
                  updateCharacter("hitDiceRemaining", null, e.target.value)
                }
                onBlur={handleBlur}
                autoFocus
                className="text-center cursor-text"
              />
            ) : (
              <div
                className="w-full bg-white rounded-md py-2 px-3 border text-center cursor-pointer"
                onClick={() => handleFieldClick("hitDiceRemaining")}
              >
                {character.hitDiceRemaining}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
