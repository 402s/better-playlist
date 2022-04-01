import Dismiss from 'solid-dismiss';
import { Component, createMemo, createSignal, For, Match, onMount, Switch } from 'solid-js';
import { produce } from 'solid-js/store';
import Edit from '../../components/Icons/Edit';
import FileText from '../../components/Icons/FileText';
import Plus from '../../components/Icons/Plus';
import Trash from '../../components/Icons/Trash';
import Video from '../../components/Icons/Video';
import { Folder, FolderNode, Lesson, setStore, store } from '../../store/store';
import { BuilderModal } from './Modal';
import { dndzone } from 'solid-dnd-directive';
import { Accessor } from 'solid-js';
import { Signal } from 'solid-js';
declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      dndzone: any;
      _dndzone: any;
      consider: any;
      foo: any;
    }
  }
}

const Builder = () => {
  onMount(() => {
    // myVideoPlayer.addEventListener('loadedmetadata', function () {
    //   console.log(videoPlayer.duration);
    // });
    // console.log(JSON.parse(JSON.stringify(store.subjectNode)));
  });
  return <View></View>;
};

const View = () => {
  let button!: HTMLButtonElement;
  const [toggle, setToggle] = createSignal(false);

  return (
    <div class="">
      <For each={store.subjectNode[0].children}>
        {(id) => {
          return <Node id={id} parentId={0} />;
        }}
      </For>
      <div class="">
        <button
          class="flex gap-1 rounded-lg bg-iris text-white px-5 py-2"
          ref={button}
          onClick={() => {}}
        >
          <span>
            Add <strong>Folder</strong>
          </span>{' '}
          <Plus />
        </button>
        <Dismiss
          open={toggle}
          setOpen={setToggle}
          focusElementOnOpen={'[data-modal-focus-on-open]'}
          menuButton={button}
          modal
        >
          <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/25 z-50">
            <BuilderModal
              type="folder"
              editType="add"
              parentId={0}
              onCloseModal={() => setToggle(false)}
            />
          </div>
        </Dismiss>
      </div>
    </div>
  );
};
// const View = () => {
//   return (
//     <div class="">
//       <For each={Object.entries(store.folders)}>
//         {([headerId, item]) => {
//           return <Group id={headerId} {...item} />;
//         }}
//       </For>
//     </div>
//   );
// };

const Node: Component<{ id: number; parentId: number }> = ({ id, parentId }) => {
  const node = store.subjectNode[id];
  const type = node.type;
  const data = createMemo(() => {
    return (store.subjectNode[id] as any).data as Folder | Lesson;
  });

  function handleDndEvent(e: any) {
    const { items: newItems } = e.detail;
    console.log('fire!');
    // setStore(
    //   produce((s) => {
    //     s.subjectNode[id].children = newItems;
    //   }),
    // );
  }
  function _dndzone(el: any, value: any) {
    // dndzone(bar,)
    dndzone(el, value);
    // dndzone(el, value);
  }

  return (
    <>
      <Switch>
        <Match when={type === 'folder'}>
          <Group title={data().title} parentId={id}>
            <For each={store.subjectNode[id].children}>
              {(childId) => {
                return (
                  <div
                    use:dndzone={{
                      items: () => store.subjectNode[id].children.map((item) => ({ id: item })),
                    }}
                    use:consider={handleDndEvent}
                    // use:cosider={handleDndEvent}
                  >
                    <Node id={childId} parentId={id} />
                  </div>
                );
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

const Group: Component<Folder & { parentId: number }> = (props) => {
  let button!: HTMLButtonElement;
  const [toggle, setToggle] = createSignal(false);
  return (
    <>
      <div class="bg-white rounded-md shadow-md shadow-gray-100 p-5 my-5">
        <div class="flex justify-between pb-5 border-b border-gray-100">
          <h2 class="font-semibold text-black/50">{props.title}</h2>
          <div class="flex gap-2">
            <button class="p-1 rounded-lg border border-gray-200">
              <Edit />
            </button>
            <button class="p-1 rounded-lg border border-gray-200">
              <Trash />
            </button>
          </div>
        </div>
        <div class="">{props.children}</div>
        <div class="mt-5">
          <button class="flex gap-1 rounded-lg bg-iris text-white px-5 py-2" ref={button}>
            <span>Add</span> <Plus />
          </button>
          <Dismiss
            open={toggle}
            setOpen={setToggle}
            focusElementOnOpen={'[data-modal-focus-on-open]'}
            menuButton={button}
            modal
          >
            <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/25 z-50">
              <BuilderModal
                type="lesson"
                editType="add"
                parentId={props.parentId}
                onCloseModal={() => setToggle(false)}
              />
            </div>
          </Dismiss>
        </div>
      </div>
    </>
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
