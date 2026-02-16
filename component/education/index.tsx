import { PropsWithChildren } from 'react';
import { CommonSection } from '../common/CommonSection';
import { EmptyRowCol } from '../common';
import { CommonRows } from '../common/CommonRow';
import { EducationPayload, EducationItem } from '../../types/IEducation';
import { RowPayload } from '../../types/IRow';
import Util from '../common/Util';
import { Section } from '../common/Section';

type Payload = EducationPayload;
type Item = EducationItem;

export function EducationSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <EducationContent payload={data} />}
    </Section>
  );
}

function EducationContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="EDUCATION">
      <EducationRow payload={payload} />
    </CommonSection>
  );
}

function EducationRow({ payload }: PropsWithChildren<{ payload: Payload }>) {
  return (
    <EmptyRowCol>
      {payload.list.map((item, index) => {
        return <CommonRows key={index.toString()} payload={serialize(item)} index={index} />;
      })}
    </EmptyRowCol>
  );
}

function serialize(item: Item): RowPayload {
  return {
    left: { title: Util.formatDateRange(item.startedAt, item.endedAt) },
    right: {
      ...item,
    },
  };
}
