import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CharacterData } from '@/types/character';
import { Brain } from 'lucide-react';

type SkillsProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

export function Skills({ character, updateCharacter }: SkillsProps) {
  const getAbilityModifier = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  const formatModifier = (mod: number) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const handleToggleProficiency = (skill: string) => {
    const newSkills = {
      ...character.skills,
      [skill]: {
        ...character.skills[skill],
        proficient: !character.skills[skill].proficient,
      },
    };
    updateCharacter('skills', null, newSkills);
  };

  const handleToggleExpertise = (skill: string) => {
    const newSkills = {
      ...character.skills,
      [skill]: {
        ...character.skills[skill],
        expertise: !character.skills[skill].expertise,
      },
    };
    updateCharacter('skills', null, newSkills);
  };

  // Format skill name for display (e.g., animalHandling -> Animal Handling)
  const formatSkillName = (name: string) => {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  // Calculate skill bonus: ability modifier + proficiency bonus (if proficient) + proficiency bonus (if expertise)
  const getSkillBonus = (skill: string) => {
    const skillInfo = character.skills[skill];
    const abilityMod = getAbilityModifier(character.abilityScores[skillInfo.ability]);
    let bonus = abilityMod;

    if (skillInfo.proficient) {
      bonus += character.proficiencyBonus;
    }

    if (skillInfo.expertise) {
      bonus += character.proficiencyBonus;
    }

    return formatModifier(bonus);
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-2 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Brain className="text-dnd-accent" />
        Skills
      </h2>
      <div className="space-y-2">
        {Object.entries(character.skills).map(([skill, info]) => (
          <div key={skill} className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={info.proficient}
                  onCheckedChange={() => handleToggleProficiency(skill)}
                  className="mr-1"
                />
                <Checkbox
                  id={`skill-${skill}-expertise`}
                  checked={info.expertise}
                  onCheckedChange={() => handleToggleExpertise(skill)}
                  className="mr-2"
                  disabled={!info.proficient}
                />
              </div>
              <label htmlFor={`skill-${skill}`} className="cursor-pointer select-none">
                {formatSkillName(skill)} <span className="text-xs text-gray-500">({info.ability.substring(0, 3)})</span>
              </label>
            </div>
            <div className="font-bold">{getSkillBonus(skill)}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 border-t pt-2 text-xs">
        <div className="mb-1 flex items-center">
          <div className="mr-1 flex h-4 w-4 items-center justify-center border">✓</div>
          <span>= Proficiency</span>
        </div>
        <div className="flex items-center">
          <div className="mr-1 flex h-4 w-6 items-center justify-center border">✓✓</div>
          <span>= Expertise (double proficiency)</span>
        </div>
      </div>
    </div>
  );
}
