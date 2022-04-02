import Dismiss from 'solid-dismiss';
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  on,
  onCleanup,
  onMount,
  Switch,
} from 'solid-js';
import { produce } from 'solid-js/store';
import Edit from '../../components/Icons/Edit';
import FileText from '../../components/Icons/FileText';
import Plus from '../../components/Icons/Plus';
import Trash from '../../components/Icons/Trash';
import Video from '../../components/Icons/Video';
import { Folder, FolderNode, Lesson, setStore, store } from '../../store/store';
import { BuilderModal } from './Modal';
import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'solid-dnd-directive';
import { Accessor } from 'solid-js';
import { Signal } from 'solid-js';
import Sortable from 'sortablejs';
import JSON_Stringify_Parse from '../../utils/jsonStringifyParse';

const SortableWrapper: Component<{ onEnd?: (event: Sortable.SortableEvent) => void }> = (props) => {
  const { onEnd } = props;
  let sortable: Sortable;
  let el!: HTMLDivElement;

  onMount(() => {
    console.log('mount!!');
    sortable = new Sortable(el, {
      group: 'nested',
      animation: 150,
      swapThreshold: 0.65,
      onEnd,
      onChange: () => {
        console.log('onChange');
      },
    });
  });

  onCleanup(() => {
    console.log('dismount!!');
    sortable.destroy();
  });

  return <div ref={el}>{props.children}</div>;
};
declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      dndzone: any;
      _dndzone: any;
      consider: any;
      finalize: any;
      foo: any;
    }
  }
}

const Builder = () => {
  // createEffect(
  //   on(
  //     () => store.subjectNode,
  //     (_store) => {
  //       console.log(JSON_Stringify_Parse(_store));
  //       // myVideoPlayer.addEventListener('loadedmetadata', function () {
  //       //   console.log(videoPlayer.duration);
  //       // });
  //       // console.log('fire!!!!');
  //       // requestIdleCallback(() => {
  //       //   localStorage.setItem('store', JSON.stringify(store));
  //       // });
  //     },
  //     { defer: true },
  //   ),
  // );
  createEffect(() => {
    console.log(JSON_Stringify_Parse(store.subjectNode));
    requestIdleCallback(() => {
      localStorage.setItem('store', JSON.stringify(store));
    });
    // myVideoPlayer.addEventListener('loadedmetadata', function () {
    //   console.log(videoPlayer.duration);
    // });
    // console.log('fire!!!!');
    // requestIdleCallback(() => {
    //   localStorage.setItem('store', JSON.stringify(store));
    // });
  });
  return <View></View>;
};

const View = () => {
  let button!: HTMLButtonElement;
  const [toggle, setToggle] = createSignal(false);

  return (
    <div class="">
      <SortableWrapper>
        <For each={store.subjectNode[0].children}>
          {(id) => {
            return <Node id={id} parentId={0} />;
          }}
        </For>
      </SortableWrapper>
      {/* <div class="">
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
      </div> */}
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

  if (type === 'lesson') {
    return <ViewItem id={id} parentId={parentId} lesson={data() as Lesson} />;
  }
  // const isLesson = !store.subjectNode[id].children.length;
  if (type === 'folder') {
    return (
      <Group id={id} title={data().title} parentId={id}>
        {id}
        <SortableWrapper
          onEnd={(e) => {
            const parentElement = e.item.parentElement!.closest('.nested');
            const currentId = Number(e.item.getAttribute('data-sortable-id')!);
            const newParentId = Number(parentElement?.getAttribute('data-sortable-id')!);
            const newIndex = e.newIndex!;

            setStore(
              produce((s) => {
                const parentNode = s.subjectNode[id];
                const newParentNode = newParentId === id ? parentNode : s.subjectNode[newParentId];
                const foundIdx = parentNode.children.findIndex((id) => id === currentId)!;
                parentNode.children.splice(foundIdx, 1);
                newParentNode.children.splice(newIndex, 0, currentId);
              }),
            );
          }}
        >
          <For each={store.subjectNode[id].children}>
            {(child) => {
              return <Node id={child} parentId={id} />;
            }}
          </For>
        </SortableWrapper>
      </Group>
    );
  }
};

const Group: Component<Folder & { id: number; parentId: number }> = (props) => {
  let button!: HTMLButtonElement;
  const [toggle, setToggle] = createSignal(false);
  return (
    <div
      data-sortable-id={props.id}
      class="bg-white rounded-md shadow-md shadow-gray-100 p-5 my-5 nested"
    >
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
    <div data-sortable-id={props.id} class="flex items-center py-5 border-b border-gray-100 ">
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
      <div class="mr-4">{props.id}</div>
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
