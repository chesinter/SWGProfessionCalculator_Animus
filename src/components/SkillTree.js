import React, { useEffect, useState } from 'react';
import { Container } from '../styled-components';
import {
  ALL_PROFESSIONS,
  SKILL_TITLE,
  SKILLS,
  ALL_SPECIES
} from '../CONSTANTS';
import SkillBranch from './SkillBranch';
import SkillBox from './SkillBox';
import Link from './Link';

function SkillTree({
  playerSkills,
  handleProfessionChange,
  handleActiveSkillChange,
  activeProfession,
  handleSkillChange,
  skillPointWarning,
  handleSpeciesChange
}) {
  const profession = ALL_PROFESSIONS[activeProfession];
  const branches = [
    profession.branch_1,
    profession.branch_2,
    profession.branch_3,
    profession.branch_4
  ].filter(branch => branch); // Filter out undefined branches
  
  const playerSkillPoints = playerSkills
    .map((item) => SKILLS[item].skillPoints)
    .reduce((acc, item) => item + acc, 0);

  const [speciesSelected, setSpeciesSelected] = useState(false);

  useEffect(() => {
    const species = playerSkills
      .map((item) => {
        if (ALL_SPECIES.includes(item)) return item;
        return false;
      })
      .filter((item) => item);
    if (species.length > 0) setSpeciesSelected(species);
  }, [playerSkills]);

  return (
    <Container className='skillTree'>
      <select
        name='species'
        id='species'
        onChange={(e) => {
          handleSpeciesChange(e.target.value);
        }}>
        <option value='' disabled selected={!speciesSelected}>
          Species:
        </option>
        {ALL_SPECIES.map((item) => {
          return (
            <option key={item} value={item} selected={item === speciesSelected}>
              {item === "twilek" ? "Twi'Lek" : item.replace("_"," ")}
            </option>
          );
        })}
      </select>
      <h2>{SKILL_TITLE[activeProfession]}</h2>
      {skillPointWarning ? (
        <div className='skillPointWarning'>NOT ENOUGH SKILLPOINTS</div>
      ) : (
        ''
      )}
      <div className='skillPoints'>
        <div>
          SP:
          <span>{250 - playerSkillPoints}</span>/<span>250</span>
        </div>
        <div>
          <button onClick={() => handleSkillChange({ action: 'reset' })}>
            Reset Char
          </button>
        </div>
      </div>

      <div className='linkContainer'>
        {profession.master_links.map((item) => (
          <Link
            key={item}
            data={item}
            handleProfessionChange={handleProfessionChange}
          />
        ))}
      </div>

      <SkillBox
        data={profession.master}
        isActive={playerSkills.indexOf(profession.master) > -1}
        handleActiveSkillChange={handleActiveSkillChange}
        handleSkillChange={handleSkillChange}
      />

      <div className={`skillBranches ${branches.length === 1 ? 'single-branch' : ''}`}>
        {branches.map((branch, index) => (
          <SkillBranch
            key={index}
            data={branch}
            playerSkills={playerSkills}
            handleProfessionChange={handleProfessionChange}
            handleActiveSkillChange={handleActiveSkillChange}
            handleSkillChange={handleSkillChange}
          />
        ))}
      </div>

      <SkillBox
        data={profession.novice}
        isActive={playerSkills.indexOf(profession.novice) > -1}
        handleActiveSkillChange={handleActiveSkillChange}
        handleSkillChange={handleSkillChange}
      />

      <div className='linkContainer'>
        {profession.novice_links.map((item) => (
          <Link
            key={item}
            data={item}
            handleProfessionChange={handleProfessionChange}
          />
        ))}
      </div>
    </Container>
  );
}

export default SkillTree;

