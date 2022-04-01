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
import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'solid-dnd-directive';
import { Accessor } from 'solid-js';
import { Signal } from 'solid-js';
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

  function handleDndEvent(e: any) {
    // let { items: newItems } = e.detail as {
    //   items: { id: number; tempId: number; isDndShadowItem: boolean }[];
    // };
    let { items: newItems } = e.detail;
    // const foundItem = newItems.find((item) => item.isDndShadowItem)!;
    // @ts-ignore
    // newItems = newItems.map(({ id, tempId }) => {
    //   if (id.toString() === SHADOW_PLACEHOLDER_ITEM_ID) return tempId;
    //   return id;
    // });
    console.log('fire!', newItems);

    // setStore(
    //   produce((s) => {
    //     // s.dndTemp.id = foundItem ? foundItem.id : null;
    //     // s.dndTemp.tempId =
    //     //   foundItem && foundItem.id.toString() === SHADOW_PLACEHOLDER_ITEM_ID
    //     //     ? SHADOW_PLACEHOLDER_ITEM_ID
    //     //     : null;
    //     s.subjectNode[parentId].children = newItems as any;
    //   }),
    // );
    setStore('subjectNode', 0 as any, 'children', newItems);
  }

  let el: any;
  // function consider(el: any) {
  //   el.addEventListener('consider', handleDndEvent);
  // }
  // function finalize(el: any) {
  //   el.addEventListener('finalize', handleDndEvent);
  // }
  onMount(() => {
    // if (stop) return;
    if (!el) return;
    console.log('add!!');
    el.addEventListener('consider', handleDndEvent);
    el.addEventListener('finalize', handleDndEvent);
  });

  function _dndzone(el: any, value: any) {
    // dndzone(bar,)
    dndzone(el, value);
    // dndzone(el, value);
  }

  return (
    <div class="">
      <div
        use:_dndzone={{
          items: () => store.subjectNode[0].children,
        }}
        ref={el}
      >
        <For each={store.subjectNode[0].children}>
          {(id) => {
            return <Node id={id._id} parentId={0} />;
          }}
        </For>
      </div>
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
let stop = false;
setTimeout(() => {
  stop = true;
  console.log('stop');
}, 3000);

const Node: Component<{ id: number; parentId: number }> = ({ id, parentId }) => {
  const node = store.subjectNode[id];
  const type = node.type;
  const data = createMemo(() => {
    return (store.subjectNode[id] as any).data as Folder | Lesson;
  });

  function handleDndEvent(e: any) {
    // let { items: newItems } = e.detail as {
    //   items: { id: number; tempId: number; isDndShadowItem: boolean }[];
    // };
    let { items: newItems } = e.detail;
    // const foundItem = newItems.find((item) => item.isDndShadowItem)!;
    // @ts-ignore
    // newItems = newItems.map(({ id, tempId }) => {
    //   if (id.toString() === SHADOW_PLACEHOLDER_ITEM_ID) return tempId;
    //   return id;
    // });
    console.log('fire!', newItems);

    // setStore(
    //   produce((s) => {
    //     // s.dndTemp.id = foundItem ? foundItem.id : null;
    //     // s.dndTemp.tempId =
    //     //   foundItem && foundItem.id.toString() === SHADOW_PLACEHOLDER_ITEM_ID
    //     //     ? SHADOW_PLACEHOLDER_ITEM_ID
    //     //     : null;
    //     s.subjectNode[parentId].children = newItems as any;
    //   }),
    // );
    setStore('subjectNode', id as any, 'children', newItems);
  }

  let el: any;
  // function consider(el: any) {
  //   el.addEventListener('consider', handleDndEvent);
  // }
  // function finalize(el: any) {
  //   el.addEventListener('finalize', handleDndEvent);
  // }
  onMount(() => {
    // if (stop) return;
    if (!el) return;
    console.log('add!!');
    el.addEventListener('consider', handleDndEvent);
    el.addEventListener('finalize', handleDndEvent);
  });

  function _dndzone(el: any, value: any) {
    // dndzone(bar,)
    dndzone(el, value);
    // dndzone(el, value);
  }

  //   const getDraggableChildren = () => {
  //     const { dndTemp } = store;
  //     const result = store.subjectNode[id].children.map((item) => {
  //       if (item === dndTemp.id) {
  //         let id = item;
  //         if (dndTemp.tempId) {
  //           // @ts-ignore
  //           id = dndTemp.tempId;
  //         }
  //
  //         return {
  //           id,
  //           tempId: item,
  //           isDndShadowItem: true,
  //         };
  //       }
  //
  //       return { id: item, tempId: item };
  //     });
  //     console.log(result);
  //     return result;
  //   };
  if (type === 'lesson') {
    return <ViewItem id={id} parentId={parentId} lesson={data() as Lesson} />;
  }

  // const isLesson = !store.subjectNode[id].children.length;
  return (
    <Group title={data().title} parentId={id}>
      <div
        use:_dndzone={{
          items: () => store.subjectNode[id].children,
          type: id,
        }}
        ref={el}
      >
        <For each={store.subjectNode[id].children}>
          {(child) => {
            return <Node id={child._id} parentId={id} />;
          }}
        </For>
      </div>
    </Group>
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
