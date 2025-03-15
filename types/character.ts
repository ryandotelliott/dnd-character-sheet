export type CharacterData = {
  name: string;
  level: number;
  characterClass: string;
  race: string;
  background: string;
  alignment: string;
  experiencePoints: number;

  abilityScores: {
    [key: string]: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  proficiencyBonus: number;

  savingThrows: {
    [key: string]: boolean;
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
  };

  skills: {
    [key: string]: {
      proficient: boolean;
      expertise: boolean;
      ability: string;
    };
    acrobatics: { proficient: boolean; expertise: boolean; ability: string };
    animalHandling: { proficient: boolean; expertise: boolean; ability: string };
    arcana: { proficient: boolean; expertise: boolean; ability: string };
    athletics: { proficient: boolean; expertise: boolean; ability: string };
    deception: { proficient: boolean; expertise: boolean; ability: string };
    history: { proficient: boolean; expertise: boolean; ability: string };
    insight: { proficient: boolean; expertise: boolean; ability: string };
    intimidation: { proficient: boolean; expertise: boolean; ability: string };
    investigation: { proficient: boolean; expertise: boolean; ability: string };
    medicine: { proficient: boolean; expertise: boolean; ability: string };
    nature: { proficient: boolean; expertise: boolean; ability: string };
    perception: { proficient: boolean; expertise: boolean; ability: string };
    performance: { proficient: boolean; expertise: boolean; ability: string };
    persuasion: { proficient: boolean; expertise: boolean; ability: string };
    religion: { proficient: boolean; expertise: boolean; ability: string };
    sleightOfHand: { proficient: boolean; expertise: boolean; ability: string };
    stealth: { proficient: boolean; expertise: boolean; ability: string };
    survival: { proficient: boolean; expertise: boolean; ability: string };
  };

  armorClass: number;
  initiative: number;
  speed: number;
  hitPointsMax: number;
  hitPointsCurrent: number;
  hitDiceTotal: string;
  hitDiceRemaining: string;

  deathSaves: {
    successes: number;
    failures: number;
  };

  superiorityDice: {
    total: number;
    remaining: number;
    diceType: string;
  };

  inventory: Array<{
    name: string;
    quantity: number;
  }>;
  proficiencies: string[];
  features: string[];
  abilities: string[];
  generalNotes: string; // Added general notes field

  campaign: {
    landmarks: string[];
    events: string[];
    people: string[];
    objectives: string[];
  };
};
