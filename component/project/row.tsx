import { PropsWithChildren } from 'react';
import { IProject } from '../../types/IProject';
import { CommonRows } from '../common/CommonRow';
import { IRow } from '../../types/IRow';
import Util from '../common/Util';
import { EmptyRowCol } from '../common';

export default function ProjectRow({ payload }: PropsWithChildren<{ payload: IProject.Payload }>) {
  return (
    <EmptyRowCol>
      {payload.list.map((item, index) => {
        return <CommonRows key={index.toString()} payload={serialize(item)} index={index} />;
      })}
    </EmptyRowCol>
  );
}

function serialize(payload: IProject.Item): IRow.Payload {
  return {
    left: {
      title: Util.formatDateRange(payload.startedAt, payload.endedAt),
    },
    right: {
      title: payload.title,
      subTitle: payload.where,
      descriptions: payload.descriptions,
    },
  };
}
