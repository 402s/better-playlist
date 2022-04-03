import Dismiss from 'solid-dismiss';
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Index,
  Match,
  onCleanup,
  onMount,
  Switch,
  untrack,
} from 'solid-js';
import { produce } from 'solid-js/store';
import Edit from '../../components/Icons/Edit';
import FileText from '../../components/Icons/FileText';
import Plus from '../../components/Icons/Plus';
import Trash from '../../components/Icons/Trash';
import Video from '../../components/Icons/Video';
import { Folder, FolderNode, Lesson, LessonData, setStore, store } from '../../store/store';
import { BuilderModal } from './Modal';
import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from 'solid-dnd-directive';
import { Accessor } from 'solid-js';
import { Signal } from 'solid-js';
import Sortable from 'sortablejs';
import JSON_Stringify_Parse from '../../utils/jsonStringifyParse';
import mapArray from '../../utils/mapArray';
import { indexArray } from '../../utils/indexArray';

const SortableWrapper: Component<{
  onStart?: (event: Sortable.SortableEvent) => void;
  onEnd?: (event: Sortable.SortableEvent) => void;
}> = (props) => {
  const { onEnd, onStart } = props;
  let sortable: Sortable;
  let el!: HTMLDivElement;

  onMount(() => {
    sortable = new Sortable(el, {
      group: {
        name: 'nested',
      },

      animation: 150,
      swapThreshold: 0.2,
      ghostClass: 'opacity-0',
      dragClass: 'opacity-100',
      fallbackOnBody: true,
      scroll: true,
      forceFallback: true,
      onStart: (e) => onStart!(e),
      onEnd,
    });
  });

  createEffect(() => {
    sortable.option('swapThreshold', store.sortableState.swapThreshold);
  });

  onCleanup(() => {
    console.log('dismount!!');
    sortable.destroy();
  });

  return <div ref={el}>{props.children}</div>;
};
const swap = (nodeA: Element, nodeB: Element) => {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  // Move `nodeA` to before the `nodeB`
  // @ts-ignore
  nodeB.parentNode.insertBefore(nodeA, nodeB);

  // Move `nodeB` to before the sibling of `nodeA`
  // @ts-ignore
  parentA.insertBefore(nodeB, siblingA);
};
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
  //   onMount(() => {
  //     const node5 = document.querySelector(`[data-sortable-id="${5}"]`)!;
  //     const node6 = document.querySelector(`[data-sortable-id="${6}"]`)!;
  //     const node9 = document.querySelector(`[data-sortable-id="${9}"]`)!;
  //     node6.remove();
  //     // swap(node5, node6);
  //     // node6.remove();
  //     setTimeout(() => {
  //       node5.insertAdjacentElement('afterend', node6);
  //     }, 1000);
  //
  //     setTimeout(() => {
  //       // mapArray(() =>[], () => {}, {fallback})
  //       setStore(
  //         produce((s) => {
  //           // s.subjectNode[3].children = [{ id: 6 }, { id: 5 }, { id: 11 }, { id: 12 }];
  //           s.subjectNode[3].children = [{ id: 6 }, { id: 5 }];
  //           // s.subjectNode[3].children = [{ id: 5 }, { id: 6 }, { id: 11 }, { id: 12 }];
  //           // s.subjectNode[3].children = [{ id: 7 }, { id: 5 }, { id: 11 }, { id: 12 }];
  //           // s.subjectNode[12].data.title = 'Hello World';
  //         }),
  //       );
  //     }, 3000);
  //   });
  createEffect(() => {
    console.log(JSON_Stringify_Parse(store.subjectNode));
    untrack(() => {
      requestIdleCallback(() => {
        localStorage.setItem('store', JSON.stringify(store));
      });
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
    <div class="nested" data-sortable-id="0">
      <SortableWrapper onStart={onStartSortableHandler} onEnd={onEndSortableHandler({ id: 0 })}>
        <For each={store.subjectNode[0].children}>
          {(id) => {
            return <Node id={id.id} parentId={0} />;
          }}
        </For>
      </SortableWrapper>
      <div class="">
        <button class="flex gap-1 rounded-lg bg-iris text-white px-5 py-2" ref={button}>
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

const onEndSortableHandler = ({ id }: { id: number }) => {
  const run = (e: Sortable.SortableEvent) => {
    const element = e.item;
    const parentElement = element.parentElement!.closest('.nested');
    const currentId = Number(element.getAttribute('data-sortable-id')!);
    const newParentId = Number(parentElement?.getAttribute('data-sortable-id')!);
    const newIndex = e.newIndex!;
    let removedLastItemFromFolder = false;
    element.remove();
    // element.removeAttribute('draggable');
    // element.removeAttribute('style');

    // setTimeout(() => {
    setStore(
      produce((s) => {
        // const copyChildren = JSON_Stringify_Parse(parentNode.children);
        const parentNode = s.subjectNode[id];
        const newParentNode = newParentId === id ? parentNode : s.subjectNode[newParentId];
        const foundIdx = parentNode.children.findIndex((id) => id.id === currentId)!;

        parentNode.children.splice(foundIdx, 1);
        newParentNode.children.splice(newIndex, 0, { id: currentId });
        // copyChildren.splice(foundIdx, 1);
        // copyChildren.splice(newIndex, 0, currentId);
        // parentNode.children = copyChildren;
        // if (!parentNode.children.length) removedLastItemFromFolder = true;
        console.log('onEnd', JSON_Stringify_Parse(parentNode));
        console.log('onEnd', JSON_Stringify_Parse(newParentNode));
        // requestAnimationFrame(() => {
        //   const elements = parentElement?.querySelectorAll(`[data-sortable-id="${currentId}"]`);
        //   elements;
        // });
      }),
    );
    // }, 1000);

    //     if (!removedLastItemFromFolder) return;
    //
    //     requestAnimationFrame(() => {
    //       const nextSibling = e.item.nextElementSibling;
    //       if (
    //         element.getAttribute('data-sortable-id') !== nextSibling?.getAttribute('data-sortable-id')
    //       )
    //         return;
    //       element.remove();
    //     });
  };
  return run;
};

const onStartSortableHandler = (e: Sortable.SortableEvent) => {
  const isLesson = e.item.getAttribute('data-lesson') != null;
  setStore('sortableState', 'swapThreshold', isLesson ? 0.9 : 0.2);
};

const Node: Component<{ id: number; parentId: number }> = (props) => {
  // const node = store.subjectNode[props.id];
  // const type = node.type;
  const data = createMemo(() => {
    return (store.subjectNode[props.id] as any).data as Folder | Lesson;
  });
  const node = createMemo(() => {
    return store.subjectNode[props.id];
  });

  // if (type === 'lesson') {
  // }

  return (
    <Switch>
      <Match when={node().type === 'folder'}>
        <Group
          id={props.id}
          // @ts-ignore
          title={node().data.title}
        >
          <SortableWrapper
            onStart={onStartSortableHandler}
            onEnd={onEndSortableHandler({ id: props.id })}
          >
            {/* {indexArray(
              () => node().children,
              (child) => {
                return <Node id={child().id} parentId={props.id} />;
              },
            )} */}
            {/* <Index each={node().children}>
              {(child) => {
                return <Node id={child().id} parentId={props.id} />;
              }}
            </Index> */}
            <For each={node().children}>
              {(child) => {
                return <Node id={child.id} parentId={props.id} />;
              }}
            </For>
          </SortableWrapper>
        </Group>
      </Match>
      <Match when={node().type === 'lesson'}>
        <ViewItem id={props.id} parentId={props.parentId} lesson={data() as Lesson} />
      </Match>
    </Switch>
  );
};
// border active #e1d7f1
// bg active #f7f4fc
// padding-right 20px width+20px

const Group: Component<Folder & { id: number }> = (props) => {
  let button!: HTMLButtonElement;
  const [toggle, setToggle] = createSignal(false);
  return (
    <div
      data-sortable-id={props.id}
      class="bg-white rounded-md shadow-md shadow-gray-100 border-4 border-[#e1d7f1] p-5 my-5 nested"
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
              parentId={props.id}
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
  onCleanup(() => {
    console.log('ViewItem REMOVED!');
  });
  return (
    <div
      data-sortable-id={props.id}
      data-lesson
      class="flex items-center py-5 border-b border-gray-100 bg-white"
    >
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
      <div class="mr-2">{props.id}</div>
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
