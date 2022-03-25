import { Component, For, Match, Switch } from 'solid-js';
import { produce } from 'solid-js/store';
import FileText from '../../components/Icons/FileText';
import Video from '../../components/Icons/Video';
import { HeaderNode, Lesson, setStore, store } from '../../store/store';

const View = () => {
  return (
    <div class="">
      <For each={Object.entries(store.headers)}>
        {([headerId, item]) => {
          return <Group id={headerId} {...item} />;
        }}
      </For>
    </div>
  );
};

const Group: Component<HeaderNode['0'] & { id: string }> = (props) => {
  return (
    <div class="bg-white rounded-md shadow-sm p-5 my-5">
      <h2 class="font-semibold text-black/50">{props.header.title}</h2>
      <div class="">
        <For each={props.lessonIds.map((id) => ({ id, lesson: store.lessons[id].lesson }))}>
          {(item) => {
            return <ViewItem headerId={props.id as any} {...item} />;
          }}
        </For>
      </div>
    </div>
  );
};

const ViewItem: Component<{ id: number; headerId: number; lesson: Lesson }> = (props) => {
  const type = () => props.lesson.type;
  const onClick = () => {
    const { headerId, id: lessonId } = props;
    setStore(
      produce((s) => {
        s.currentSubject = {
          headerId,
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
