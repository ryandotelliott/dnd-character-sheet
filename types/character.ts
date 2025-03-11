export type CharacterData = {
  name: string;
  level: number;
  characterClass: string;
  race: string;
  background: string;
  alignment: string;
  experiencePoints: number;

  abilities: {
    [key: string]: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
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
  generalNotes: string; // Added general notes field

  campaign: {
    landmarks: string[];
    events: string[];
    people: string[];
    objectives: string[];
  };
};
