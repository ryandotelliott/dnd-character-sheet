import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CharacterData } from '@/types/character';
import { Map, Plus } from 'lucide-react';
import EditableTextField from '@/components/ui/editable-text-field';

type CampaignNotesProps = {
  character: CharacterData;
  updateCharacter: (section: keyof CharacterData, field: string | null, value: any) => void;
};

type EditingState = {
  section: string;
  index: number;
} | null;

type CampaignSection = 'landmarks' | 'events' | 'people' | 'objectives';

export function CampaignNotes({ character, updateCharacter }: CampaignNotesProps) {
  const [editingState, setEditingState] = useState<EditingState>(null);

  const handleBlur = () => {
    setEditingState(null);
  };

  const isEditing = (section: string, index: number) => {
    return editingState?.section === section && editingState?.index === index;
  };

  const handleRemoveItem = (e: React.MouseEvent, section: CampaignSection, index: number) => {
    e.stopPropagation(); // Prevent event bubbling

    const newItems = [...character.campaign[section]].filter((_, i) => i !== index);
    updateCharacter('campaign', section, newItems);
  };

  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h2 className="mb-1 flex items-center gap-2 border-b pb-2 text-lg font-bold">
        <Map className="text-dnd-accent" />
        Campaign Notes
      </h2>

      {/* Landmarks */}
      <div className="mb-4">
        <h3 className="text-md mb-1 flex items-center gap-1 font-semibold">Landmarks</h3>
        <div className="space-y-2">
          {character.campaign.landmarks.map((landmark, index) => (
            <div key={index} className="flex items-center gap-2">
              <EditableTextField
                value={landmark}
                onChange={(e) => {
                  const newLandmarks = [...character.campaign.landmarks];
                  newLandmarks[index] = e.target.value;
                  updateCharacter('campaign', 'landmarks', newLandmarks);
                }}
                onBlur={handleBlur}
                autoFocus={isEditing('landmarks', index)}
                className="cursor-text"
                onRemove={() => {
                  const newLandmarks = [...character.campaign.landmarks].filter((_, i) => i !== index);
                  updateCharacter('campaign', 'landmarks', newLandmarks);
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              updateCharacter('campaign', 'landmarks', [...character.campaign.landmarks, '']);
              setEditingState({
                section: 'landmarks',
                index: character.campaign.landmarks.length,
              });
            }}
          >
            <Plus size={14} /> Add Landmark
          </Button>
        </div>
      </div>

      {/* Events */}
      <div className="mb-4">
        <h3 className="text-md mb-1 flex items-center gap-1 font-semibold">Events</h3>
        <div className="space-y-2">
          {character.campaign.events.map((event, index) => (
            <div key={index} className="flex items-center gap-2">
              <EditableTextField
                value={event}
                onChange={(e) => {
                  const newEvents = [...character.campaign.events];
                  newEvents[index] = e.target.value;
                  updateCharacter('campaign', 'events', newEvents);
                }}
                onBlur={handleBlur}
                autoFocus={isEditing('events', index)}
                className="cursor-text"
                onRemove={() => {
                  const newEvents = [...character.campaign.events].filter((_, i) => i !== index);
                  updateCharacter('campaign', 'events', newEvents);
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              updateCharacter('campaign', 'events', [...character.campaign.events, '']);
              setEditingState({
                section: 'events',
                index: character.campaign.events.length,
              });
            }}
          >
            <Plus size={14} /> Add Event
          </Button>
        </div>
      </div>

      {/* People */}
      <div className="mb-4">
        <h3 className="text-md mb-1 flex items-center gap-1 font-semibold">People</h3>
        <div className="space-y-2">
          {character.campaign.people.map((person, index) => (
            <div key={index} className="flex items-center gap-2">
              <EditableTextField
                value={person}
                onChange={(e) => {
                  const newPeople = [...character.campaign.people];
                  newPeople[index] = e.target.value;
                  updateCharacter('campaign', 'people', newPeople);
                }}
                onBlur={handleBlur}
                autoFocus={isEditing('people', index)}
                className="cursor-text"
                onRemove={() => {
                  const newPeople = [...character.campaign.people].filter((_, i) => i !== index);
                  updateCharacter('campaign', 'people', newPeople);
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              updateCharacter('campaign', 'people', [...character.campaign.people, '']);
              setEditingState({
                section: 'people',
                index: character.campaign.people.length,
              });
            }}
          >
            <Plus size={14} /> Add Person
          </Button>
        </div>
      </div>

      {/* Objectives */}
      <div className="mb-4">
        <h3 className="text-md mb-1 flex items-center gap-1 font-semibold">Objectives</h3>
        <div className="space-y-2">
          {character.campaign.objectives.map((objective, index) => (
            <div key={index} className="flex items-center gap-2">
              <EditableTextField
                value={objective}
                onChange={(e) => {
                  const newObjectives = [...character.campaign.objectives];
                  newObjectives[index] = e.target.value;
                  updateCharacter('campaign', 'objectives', newObjectives);
                }}
                onBlur={handleBlur}
                autoFocus={isEditing('objectives', index)}
                className="cursor-text"
                onRemove={() => {
                  const newObjectives = [...character.campaign.objectives].filter((_, i) => i !== index);
                  updateCharacter('campaign', 'objectives', newObjectives);
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              updateCharacter('campaign', 'objectives', [...character.campaign.objectives, '']);
              setEditingState({
                section: 'objectives',
                index: character.campaign.objectives.length,
              });
            }}
          >
            <Plus size={14} /> Add Objective
          </Button>
        </div>
      </div>
    </div>
  );
}
