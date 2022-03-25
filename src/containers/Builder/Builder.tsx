import Dismiss from 'solid-dismiss';
import { Component, createSignal, For, Match, onMount, Switch } from 'solid-js';
import { produce } from 'solid-js/store';
import Edit from '../../components/Icons/Edit';
import FileText from '../../components/Icons/FileText';
import Plus from '../../components/Icons/Plus';
import Trash from '../../components/Icons/Trash';
import Video from '../../components/Icons/Video';
import { HeaderNode, Lesson, setStore, store } from '../../store/store';
import { LessonModal } from './Modal';

const Builder = () => {
  onMount(() => {
    // myVideoPlayer.addEventListener('loadedmetadata', function () {
    //   console.log(videoPlayer.duration);
    // });
  });
  return <View></View>;
};

const View = () => {
  return (
    <div class="">
      <For each={Object.entries(store.headers)}>
        {([headerId, item]) => {
          return <Group id={headerId} {...item} />;
        }}
      </For>
      <div>
        <button class="flex gap-1 rounded-lg bg-iris text-white px-5 py-2">
          <span>
            Add <strong>Group</strong>
          </span>{' '}
          <Plus />
        </button>
      </div>
    </div>
  );
};

const Group: Component<HeaderNode['0'] & { id: string }> = (props) => {
  let button!: HTMLButtonElement;
  const [toggle, setToggle] = createSignal(false);
  return (
    <>
      <div class="bg-white rounded-md shadow-sm p-5 my-5">
        <div class="flex justify-between pb-5 border-b border-gray-100">
          <h2 class="font-semibold text-black/50">{props.header.title}</h2>
          <div class="flex gap-2">
            <button class="p-1 rounded-lg border border-gray-200">
              <Edit />
            </button>
            <button class="p-1 rounded-lg border border-gray-200">
              <Trash />
            </button>
          </div>
        </div>
        <div class="">
          <For each={props.lessonIds.map((id) => ({ id, lesson: store.lessons[id].lesson }))}>
            {(item) => {
              return <ViewItem headerId={props.id as any} {...item} />;
            }}
          </For>
        </div>
        <div class="mt-5">
          <button
            class="flex gap-1 rounded-lg bg-iris text-white px-5 py-2"
            ref={button}
            onClick={() => {}}
          >
            <span>
              Add <strong>Lesson</strong>
            </span>{' '}
            <Plus />
          </button>
          <Dismiss
            open={toggle}
            setOpen={setToggle}
            menuButton={button}
            mount="body"
            overlay
            removeScrollbar
          >
            <div
              class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/25 z-50"
              onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                setToggle(false);
              }}
            >
              <LessonModal type="add" headerId={props.id as any} />
            </div>
          </Dismiss>
        </div>
      </div>
    </>
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
    <div class="flex items-center py-5 border-b border-gray-100 ">
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
      <div class="ml-auto flex gap-2">
        <button class="p-1 rounded-lg border border-gray-200">
          <Edit />
        </button>
        <button class="p-1 rounded-lg border border-gray-200">
          <Trash />
        </button>
      </div>
    </div>
  );
};
export default Builder;
