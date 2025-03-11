import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import { CharacterData } from '@/types/character';

type CharacterHeaderProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

type EditingField =
  | 'name'
  | 'characterClass'
  | 'level'
  | 'race'
  | 'background'
  | 'alignment'
  | 'experiencePoints'
  | null;

export function CharacterHeader({ character, updateCharacter }: CharacterHeaderProps) {
  const [editingField, setEditingField] = useState<EditingField>(null);

  const handleFieldClick = (field: EditingField) => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 border-b p-6 md:grid-cols-12">
      <div className="flex gap-4 md:col-span-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Character Name</label>
          {editingField === 'name' ? (
            <Input
              value={character.name}
              onChange={(e) => updateCharacter('name', null, e.target.value)}
              onBlur={handleBlur}
              autoFocus
              className="font-medium"
            />
          ) : (
            <div
              className="cursor-pointer rounded-md border bg-white px-3 py-2 font-medium"
              onClick={() => handleFieldClick('name')}
            >
              {character.name}
            </div>
          )}
        </div>
      </div>
      {/* Class and Level */}
      <div className="flex gap-4 md:col-span-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Class</label>
          {editingField === 'characterClass' ? (
            <Input
              value={character.characterClass}
              onChange={(e) => updateCharacter('characterClass', null, e.target.value)}
              onBlur={handleBlur}
              autoFocus
              className="font-medium"
            />
          ) : (
            <div
              className="cursor-pointer rounded-md border bg-white px-3 py-2 font-medium"
              onClick={() => handleFieldClick('characterClass')}
            >
              {character.characterClass}
            </div>
          )}
        </div>
        <div className="w-14">
          <label className="block text-sm font-medium text-gray-700">Level</label>
          {editingField === 'level' ? (
            <Input
              type="number"
              value={character.level}
              onChange={(e) => updateCharacter('level', null, Number(e.target.value))}
              onBlur={handleBlur}
              autoFocus
              className="text-center font-medium"
            />
          ) : (
            <div
              className="cursor-pointer rounded-md border bg-white px-3 py-2 text-center font-medium"
              onClick={() => handleFieldClick('level')}
            >
              {character.level}
            </div>
          )}
        </div>
      </div>

      {/* Race */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Race</label>
        {editingField === 'race' ? (
          <Input
            value={character.race}
            onChange={(e) => updateCharacter('race', null, e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="font-medium"
          />
        ) : (
          <div
            className="cursor-pointer rounded-md border bg-white px-3 py-2 font-medium"
            onClick={() => handleFieldClick('race')}
          >
            {character.race}
          </div>
        )}
      </div>

      {/* Background, Alignment */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Background</label>
        {editingField === 'background' ? (
          <Input
            value={character.background}
            onChange={(e) => updateCharacter('background', null, e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="font-medium"
          />
        ) : (
          <div
            className="cursor-pointer rounded-md border bg-white px-3 py-2 font-medium"
            onClick={() => handleFieldClick('background')}
          >
            {character.background}
          </div>
        )}
      </div>

      {/* Alignment */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Alignment</label>
        {editingField === 'alignment' ? (
          <Input
            value={character.alignment}
            onChange={(e) => updateCharacter('alignment', null, e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="font-medium"
          />
        ) : (
          <div
            className="cursor-pointer rounded-md border bg-white px-3 py-2 font-medium"
            onClick={() => handleFieldClick('alignment')}
          >
            {character.alignment}
          </div>
        )}
      </div>
    </div>
  );
}
