'use client';

import React from 'react';
import { Folder } from './file/Folder';
import { CodeEditor } from './file/CodeEdit';
import { useDispatch, useSelector } from 'react-redux';
import { GetFolder } from '@/app/ReduxToolkit/ReduxSlice/User.Slice';

export default function Page({ params }) {
  const repo = React.use(params);
  const dispatch = useDispatch();
  const { activity } = useSelector((state) => state.User.user);

  React.useEffect(() => {
    dispatch(GetFolder({ prefix: `${repo.username}/${repo.repo}` }));
  }, [repo?.repo]);

  return <div><Folder repoName={`${repo.username}/${repo.repo}`} /></div>;
}
