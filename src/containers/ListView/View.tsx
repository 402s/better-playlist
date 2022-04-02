import { Component, createMemo, For, Match, Switch } from 'solid-js';
import { produce } from 'solid-js/store';
import FileText from '../../components/Icons/FileText';
import Video from '../../components/Icons/Video';
import {
  Folder,
  FolderData,
  FolderNode,
  Lesson,
  LessonData,
  setStore,
  store,
} from '../../store/store';

const View = () => {
  return (
    <div class="">
      <For each={store.subjectNode[0].children}>
        {(id) => {
          return <Node id={id} parentId={0} />;
        }}
      </For>
    </div>
  );
};

const Node: Component<{ id: number; parentId: number }> = ({ id, parentId }) => {
  const node = store.subjectNode[id];
  const type = node.type;
  const data = createMemo(() => {
    return (store.subjectNode[id] as any).data as Folder | Lesson;
  });

  return (
    <>
      <Switch>
        <Match when={type === 'folder'}>
          <Group title={data().title}>
            <For each={store.subjectNode[id].children}>
              {(childId) => {
                return <Node id={childId} parentId={id} />;
              }}
            </For>
          </Group>
        </Match>
        <Match when={type === 'lesson'}>
          <ViewItem id={id} parentId={parentId} lesson={data() as Lesson} />
        </Match>
      </Switch>
    </>
  );
};

const Group: Component<Folder> = (props) => {
  return (
    <div class="bg-white rounded-md shadow-md shadow-gray-100 p-5 my-5">
      <h2 class="font-semibold text-black/50">{props.title}</h2>
      <div class="">{props.children}</div>
    </div>
  );
};

const ViewItem: Component<{ id: number; parentId: number; lesson: Lesson }> = (props) => {
  const type = () => props.lesson.type;
  const onClick = () => {
    const { parentId, id: lessonId } = props;
    setStore(
      produce((s) => {
        s.currentSubject = {
          folderId: parentId,
          lessonId,
        };
      }),
    );
  };
  return (
    <div class="flex items-center my-5 cursor-pointer" onClick={onClick}>
      <div class="mr-5 text-gray-500">
        <Switch>
          <Match when={type() === 'text'}>
            <FileText />
          </Match>
          <Match when={type() === 'video'}>
            <Video />
          </Match>
        </Switch>
      </div>
      <div>{props.lesson.title}</div>
    </div>
  );
};

export default View;
