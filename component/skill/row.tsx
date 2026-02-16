import { SkillItem, SkillSubItem } from '../../types/skill';

const MAX_LEVEL = 3;

export default function SkillRow({ skill, index }: { skill: SkillItem; index: number }) {
  return (
    <div>
      {index > 0 ? <hr /> : null}
      <div className="split-row">
        <div className="split-left">
          <h4 className="skill-category">{skill.category}</h4>
        </div>
        <div>
          <ul className="skill-chip-list">
            {skill.items.map((item, skillIndex) => (
              <li key={skillIndex.toString()} className="skill-chip-item">
                <span className="skill-chip-title">{item.title}</span>
                {item.level ? <SkillDots level={item.level} /> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SkillDots({ level }: { level: NonNullable<SkillSubItem['level']> }) {
  return (
    <span className="skill-dots" aria-label={`Level ${level} of ${MAX_LEVEL}`}>
      {Array.from({ length: MAX_LEVEL }, (_, i) => (
        <span
          key={i}
          className={`skill-dot ${i < level ? 'skill-dot--filled' : 'skill-dot--empty'}`}
        />
      ))}
    </span>
  );
}
