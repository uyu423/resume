import { PropsWithChildren } from 'react';

import { SkillItem, SkillSubItem } from '../../types/ISkill';
import Util from '../common/Util';
import { useMediaQuery } from '../common/useMediaQuery';

export default function SkillRow({
  skill,
  index,
}: PropsWithChildren<{ skill: SkillItem; index: number }>) {
  const isMobileScreen = !useMediaQuery('(min-width: 768px)');

  return (
    <div>
      {index > 0 ? <hr /> : null}
      <div className="split-row">
        <div className="split-left">
          <h4 className="skill-category">{skill.category}</h4>
        </div>
        <div>{createCalculatedSkillItems(skill.items, isMobileScreen)}</div>
      </div>
    </div>
  );
}

function createCalculatedSkillItems(items: SkillSubItem[], isVerticalScreen: boolean) {
  const log = Util.debug('SkillRow:createCalculatedSkillItems');

  /**
   * @developer_commentary 단을 3단, 4단을 시도해봤지만 생각보다 이쁘게 나오지 않았고, 우선은 3단으로 한다. 만약 이쪽을 발전시킨다면 조금 더 이쁘고 능동적이게 데이터를 쪼갤 수 있는 방법을 찾으면 될 듯..
   */
  const layer = 3;

  const splitPoint = Math.ceil(items.length / layer);

  const list: SkillSubItem[][] = [];

  for (let i = 0, splitAfter = splitPoint; i < layer; i += 1, splitAfter += splitPoint) {
    list.push(items.slice(splitAfter - splitPoint, i === layer - 1 ? undefined : splitAfter));
  }

  log('origin', items, items.length, splitPoint);
  log('list', list);

  if (isVerticalScreen) {
    return (
      <ul>
        {items.map((skill, skillIndex) => {
          return (
            <li key={skillIndex.toString()} className="skill-item">
              <span className="skill-item-title">{skill.title}</span>
              {createDots(skill.level)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="skill-columns">
      {list.map((skills, index) => {
        return (
          <ul key={index.toString()}>
            {skills.map((skill, skillIndex) => {
              return (
                <li key={skillIndex.toString()} className="skill-item">
                  <span className="skill-item-title">{skill.title}</span>
                  {createDots(skill.level)}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export function createDots(level?: number) {
  if (!level) {
    return null;
  }
  const maxLevel = 3;
  return (
    <span className="skill-level-dots" aria-label={`skill level ${level}`}>
      {Array.from({ length: maxLevel }, (_, i) => (
        <span key={i} className={`skill-level-dot ${i < level ? 'is-active' : ''}`} />
      ))}
    </span>
  );
}
