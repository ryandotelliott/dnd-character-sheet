import React from "react";
import { CharacterData } from "@/types/character";
import { Skull } from "lucide-react";

type DeathSavesProps = {
  character: CharacterData;
  updateCharacter: (
    section: keyof CharacterData,
    field: string | null,
    value: any,
  ) => void;
};

export function DeathSaves({ character, updateCharacter }: DeathSavesProps) {
  // Toggle death save success or failure
  const toggleDeathSave = (type: "successes" | "failures", value: number) => {
    const currentValue = character.deathSaves[type];

    // If clicked on already filled bubble, set to one less
    if (currentValue === value) {
      updateCharacter("deathSaves", type, value - 1);
    }
    // If clicked on empty bubble, fill up to that value
    else {
      updateCharacter("deathSaves", type, value);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="text-center font-bold mb-2 flex items-center justify-center gap-2">
        <Skull className="text-dnd-accent" />
        Death Saves
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Successes
          </label>
          <div className="flex justify-center gap-1 mt-1">
            {[1, 2, 3].map((i) => (
              <button
                key={`success-${i}`}
                className={`w-6 h-6 rounded-full border-2 cursor-pointer ${character.deathSaves.successes >= i ? "bg-green-500 border-green-600" : "border-gray-300 hover:bg-green-100"}`}
                onClick={() => toggleDeathSave("successes", i)}
                aria-label={`Toggle death save success ${i}`}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Failures
          </label>
          <div className="flex justify-center gap-1 mt-1">
            {[1, 2, 3].map((i) => (
              <button
                key={`failure-${i}`}
                className={`w-6 h-6 rounded-full border-2 cursor-pointer ${character.deathSaves.failures >= i ? "bg-red-500 border-red-600" : "border-gray-300 hover:bg-red-100"}`}
                onClick={() => toggleDeathSave("failures", i)}
                aria-label={`Toggle death save failure ${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
