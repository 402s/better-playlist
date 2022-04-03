import { createMemo, Show } from 'solid-js';
import { produce } from 'solid-js/store';
import { setStore, store } from '../../store/store';

const Header = () => {
  // const currentLessonTitle = createMemo(() => {
  //   const { currentSubject, buildMode } = store;
  //   if (!currentSubject || buildMode) return '';
  //   return store.lessons[currentSubject.lessonId].lesson.title;
  // });
  return (
    <div class="fixed top-0 left-0 w-full bg-[#210731] h-[60px] text-white p-1 z-50">
      <div class="flex items-center">
        <div>
          <Show when={!store.buildMode} fallback={'Edit Mode Active'}>
            <div>{store.title}</div>
            {/* <div>{currentLessonTitle()}</div> */}
          </Show>
        </div>
        <button
          onClick={() => {
            setStore(
              produce((s) => {
                s.buildMode = !s.buildMode;
              }),
            );
          }}
          class="ml-auto py-2 px-4 rounded-md bg-white text-black"
        >
          {store.buildMode ? 'Live' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Header;
