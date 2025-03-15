'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CharacterData } from '@/types/character';
import { Save } from 'lucide-react';

// Import components
import { CharacterHeader } from '@/components/character-sheet/CharacterHeader';
import { AbilityScores } from '@/components/character-sheet/AbilityScores';
import { CombatStats } from '@/components/character-sheet/CombatStats';
import { DeathSaves } from '@/components/character-sheet/DeathSaves';
import { SuperiorityDice } from '@/components/character-sheet/SuperiorityDice';
import { Proficiencies } from '@/components/character-sheet/Proficiencies';
import { Features } from '@/components/character-sheet/Features';
import { Inventory } from '@/components/character-sheet/Inventory';
import { CampaignNotes } from '@/components/character-sheet/CampaignNotes';
import { GeneralNotes } from '@/components/character-sheet/GeneralNotes';
import { ProficiencyBonus } from '@/components/character-sheet/ProficiencyBonus';
import { SavingThrows } from '@/components/character-sheet/SavingThrows';
import { Skills } from '@/components/character-sheet/Skills';
import { Abilities } from '@/components/character-sheet/Abilities';

export default function CharacterSheet() {
  const [character, setCharacter] = useState<CharacterData>({
    name: 'Tharion Nightblade',
    level: 0,
    characterClass: '',
    race: '',
    background: '',
    alignment: '',
    experiencePoints: 0,

    // Ability scores
    abilityScores: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },

    // Proficiency bonus
    proficiencyBonus: 2,

    // Saving throws
    savingThrows: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    },

    // Skills
    skills: {
      acrobatics: { proficient: false, expertise: false, ability: 'dexterity' },
      animalHandling: { proficient: false, expertise: false, ability: 'wisdom' },
      arcana: { proficient: false, expertise: false, ability: 'intelligence' },
      athletics: { proficient: false, expertise: false, ability: 'strength' },
      deception: { proficient: false, expertise: false, ability: 'charisma' },
      history: { proficient: false, expertise: false, ability: 'intelligence' },
      insight: { proficient: false, expertise: false, ability: 'wisdom' },
      intimidation: { proficient: false, expertise: false, ability: 'charisma' },
      investigation: { proficient: false, expertise: false, ability: 'intelligence' },
      medicine: { proficient: false, expertise: false, ability: 'wisdom' },
      nature: { proficient: false, expertise: false, ability: 'intelligence' },
      perception: { proficient: false, expertise: false, ability: 'wisdom' },
      performance: { proficient: false, expertise: false, ability: 'charisma' },
      persuasion: { proficient: false, expertise: false, ability: 'charisma' },
      religion: { proficient: false, expertise: false, ability: 'intelligence' },
      sleightOfHand: { proficient: false, expertise: false, ability: 'dexterity' },
      stealth: { proficient: false, expertise: false, ability: 'dexterity' },
      survival: { proficient: false, expertise: false, ability: 'wisdom' },
    },

    // Combat stats
    armorClass: 0,
    initiative: 0,
    speed: 0,
    hitPointsMax: 0,
    hitPointsCurrent: 0,
    hitDiceTotal: '0d0',
    hitDiceRemaining: '0d0',

    // Death saves
    deathSaves: {
      successes: 0,
      failures: 0,
    },

    // Class features
    superiorityDice: {
      total: 0,
      remaining: 0,
      diceType: '',
    },

    // Equipment and inventory
    inventory: [],

    // Proficiencies
    proficiencies: [],

    // Features
    features: [],

    // Abilities
    abilities: [],

    // General notes
    generalNotes: '',

    // Campaign notes
    campaign: {
      landmarks: [],
      events: [],
      people: [],
      objectives: [],
    },
  });

  const updateCharacter = (section: keyof CharacterData, field: string | null, value: any) => {
    setCharacter((prev) => {
      if (typeof field === 'string' && field !== null) {
        // Handle nested objects with proper typing
        if (section === 'abilityScores') {
          return {
            ...prev,
            abilityScores: {
              ...prev.abilityScores,
              [field]: value,
            },
          };
        } else if (section === 'deathSaves') {
          return {
            ...prev,
            deathSaves: {
              ...prev.deathSaves,
              [field]: value,
            },
          };
        } else if (section === 'superiorityDice') {
          return {
            ...prev,
            superiorityDice: {
              ...prev.superiorityDice,
              [field]: value,
            },
          };
        } else if (section === 'campaign') {
          return {
            ...prev,
            campaign: {
              ...prev.campaign,
              [field]: value,
            },
          };
        } else {
          // For top-level properties
          return {
            ...prev,
            [section]: value,
          };
        }
      } else {
        // For direct updates to top-level properties
        return {
          ...prev,
          [section]: value,
        };
      }
    });
  };

  const updateAbility = (ability: string, value: string | number) => {
    setCharacter((prev) => ({
      ...prev,
      abilityScores: {
        ...prev.abilityScores,
        [ability]: Number(value),
      },
    }));
  };

  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      try {
        // Merge the saved character with the default state to ensure new fields exist
        const parsedCharacter = JSON.parse(savedCharacter);
        setCharacter((prevChar) => ({
          ...prevChar, // Start with default state
          ...parsedCharacter, // Override with saved values
          // Ensure nested objects are properly merged and not replaced
          abilityScores: {
            ...prevChar.abilityScores,
            ...(parsedCharacter.abilityScores || {}),
          },
          savingThrows: {
            ...prevChar.savingThrows,
            ...(parsedCharacter.savingThrows || {}),
          },
          skills: {
            ...prevChar.skills,
            ...(parsedCharacter.skills || {}),
          },
          deathSaves: {
            ...prevChar.deathSaves,
            ...(parsedCharacter.deathSaves || {}),
          },
          superiorityDice: {
            ...prevChar.superiorityDice,
            ...(parsedCharacter.superiorityDice || {}),
          },
          campaign: {
            ...prevChar.campaign,
            ...(parsedCharacter.campaign || {}),
          },
          // Ensure arrays exist
          inventory: parsedCharacter.inventory || [],
          proficiencies: parsedCharacter.proficiencies || [],
          features: parsedCharacter.features || [],
          abilities: parsedCharacter.abilities || [],
        }));
      } catch (error) {
        console.error('Error parsing saved character:', error);
        // If there's an error, just use the default state
      }
    }
  };

  useEffect(() => {
    loadCharacter();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="bg-dnd-accent text-dnd-accent-foreground p-4">
          <h1 className="text-center text-3xl font-bold">D&D CHARACTER SHEET</h1>
        </div>

        {/* Character Header */}
        <CharacterHeader character={character} updateCharacter={updateCharacter} />

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-12">
          {/* Left Column - Abilities and Combat */}
          <div className="space-y-4 md:col-span-3">
            <AbilityScores character={character} updateAbility={updateAbility} />
            <ProficiencyBonus character={character} updateCharacter={updateCharacter} />
            <SavingThrows character={character} updateCharacter={updateCharacter} />
            <CombatStats character={character} updateCharacter={updateCharacter} />
            <DeathSaves character={character} updateCharacter={updateCharacter} />
            <SuperiorityDice character={character} updateCharacter={updateCharacter} />
          </div>

          {/* Middle Column - Skills, Proficiencies, Features, and General Notes */}
          <div className="space-y-4 md:col-span-5">
            <Skills character={character} updateCharacter={updateCharacter} />
            <Proficiencies character={character} updateCharacter={updateCharacter} />
            <Features character={character} updateCharacter={updateCharacter} />
            <Abilities character={character} updateCharacter={updateCharacter} />
          </div>

          {/* Right Column - Inventory and Campaign Notes */}
          <div className="space-y-4 md:col-span-4">
            <Inventory character={character} updateCharacter={updateCharacter} />
            <CampaignNotes character={character} updateCharacter={updateCharacter} />
            <GeneralNotes character={character} updateCharacter={updateCharacter} />
          </div>
        </div>

        {/* Footer with save button */}
        <div className="flex justify-end border-t bg-gray-50 p-4">
          <Button
            className="bg-dnd-accent flex cursor-pointer items-center gap-2"
            onClick={() => {
              console.log(character);
              localStorage.setItem('character', JSON.stringify(character));
            }}
          >
            <Save size={16} />
            Save Character
          </Button>
        </div>
      </div>
    </div>
  );
}
