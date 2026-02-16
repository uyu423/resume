import ProjectRow from './row';
import { CommonSection } from '../common/CommonSection';
import { ProjectPayload } from '../../types/IProject';
import { Section } from '../common/Section';

type Payload = ProjectPayload;

export function ProjectSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <ProjectContent payload={payload} />
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
