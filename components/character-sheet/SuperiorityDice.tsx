import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { CharacterData } from "@/types/character";
import { Dices } from "lucide-react";

type SuperiorityDiceProps = {
  character: CharacterData;
  updateCharacter: (
    section: keyof CharacterData,
    field: string | null,
    value: any,
  ) => void;
};

type EditingField = "total" | "remaining" | "diceType" | null;

export function SuperiorityDice({
  character,
  updateCharacter,
}: SuperiorityDiceProps) {
  const [editingField, setEditingField] = useState<EditingField>(null);

  if (character.characterClass.toLowerCase() !== "fighter") {
    return null;
  }

  const handleFieldClick = (field: EditingField) => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="text-center font-bold mb-2 flex items-center justify-center gap-2">
        <Dices className="text-dnd-accent" />
        Superiority Dice
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total
          </label>
          {editingField === "total" ? (
            <Input
              type="number"
              value={character.superiorityDice.total}
              onChange={(e) =>
                updateCharacter(
                  "superiorityDice",
                  "total",
                  Number(e.target.value),
                )
              }
              onBlur={handleBlur}
              autoFocus
              className="text-center cursor-text"
            />
          ) : (
            <div
              className="w-full bg-white rounded-md py-2 px-3 border text-center cursor-pointer"
              onClick={() => handleFieldClick("total")}
            >
              {character.superiorityDice.total}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Remaining
          </label>
          {editingField === "remaining" ? (
            <Input
              type="number"
              value={character.superiorityDice.remaining}
              onChange={(e) =>
                updateCharacter(
                  "superiorityDice",
                  "remaining",
                  Number(e.target.value),
                )
              }
              onBlur={handleBlur}
              autoFocus
              className="text-center cursor-text"
            />
          ) : (
            <div
              className="w-full bg-white rounded-md py-2 px-3 border text-center cursor-pointer"
              onClick={() => handleFieldClick("remaining")}
            >
              {character.superiorityDice.remaining}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dice Type
          </label>
          {editingField === "diceType" ? (
            <Input
              value={character.superiorityDice.diceType}
              onChange={(e) =>
                updateCharacter("superiorityDice", "diceType", e.target.value)
              }
              onBlur={handleBlur}
              autoFocus
              className="text-center cursor-text"
            />
          ) : (
            <div
              className="w-full bg-white rounded-md py-2 px-3 border text-center cursor-pointer"
              onClick={() => handleFieldClick("diceType")}
            >
              {character.superiorityDice.diceType}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
