import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { CharacterData } from "@/types/character";
import { BookOpen } from "lucide-react";

type GeneralNotesProps = {
  character: CharacterData;
  updateCharacter: (
    section: keyof CharacterData,
    field: string | null,
    value: any,
  ) => void;
};

export function GeneralNotes({
  character,
  updateCharacter,
}: GeneralNotesProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h2 className="font-bold text-lg mb-2 border-b pb-2 flex items-center gap-2">
        <BookOpen className="text-dnd-accent" />
        General Notes
      </h2>
      <Textarea
        className="min-h-[200px] cursor-text"
        placeholder="Add your general notes here..."
        value={character.generalNotes || ""}
        onChange={(e) => updateCharacter("generalNotes", null, e.target.value)}
      />
    </div>
  );
}
