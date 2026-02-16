import ProjectRow from './row';
import { CommonSection } from '../common/CommonSection';
import { IProject } from '../../types/IProject';
import { Section } from '../common/Section';

type Payload = IProject.Payload;

export function ProjectSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <ProjectContent payload={data} />}
    </Section>
  );
}

function ProjectContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="PROJECT">
      <ProjectRow payload={payload} />
    </CommonSection>
  );
}
