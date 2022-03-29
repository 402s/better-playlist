import { Component, createSignal, Show } from 'solid-js';
import { produce } from 'solid-js/store';
import { Lesson, setStore } from '../../store/store';

export const GroupModal = () => {
  return <div>Modal</div>;
};
export const LessonModal: Component<{
  type: 'add' | 'edit';
  headerId: number;
  lessonId?: string;
  lesson?: Lesson;
  onCloseModal: () => void;
}> = ({ headerId, lessonId, type: _type, children, lesson, onCloseModal }) => {
  const [title, setTitle] = createSignal('');
  const [videoUrl, setVideoUrl] = createSignal('');
  const [type, setType] = createSignal('text');
  const [isVideo, setIsVideo] = createSignal(false);

  const onSubmit = async () => {
    if (!title()) return;
    if (videoUrl()) {
    }

    setStore(
      produce((s) => {
        const newLessonId = s.nextLessonId + 1;
        s.nextLessonId = newLessonId;
        s.folders[headerId as any].lessonIds.push(newLessonId);
        s.lessons[newLessonId] = {
          lesson: { title: title(), type: 'text' },
          siblingLessonIds: [],
        };
      }),
    );
    onCloseModal();
  };

  return (
    <div class="w-[80vw] p-6 bg-white rounded-xl shadow-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <input
            data-modal-focus-on-open
            class="border-2 border-gray-50 rounded-lg"
            placeholder="Title ..."
            type="text"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <div class="flex gap-2">
            <button
              class="p-2 border border-gray-200 rounded-md"
              classList={{ 'bg-sky-blue': !isVideo() }}
              onClick={() => setIsVideo(false) && setType('text')}
            >
              Text
            </button>
            <button
              class="p-2 border border-gray-200 rounded-md"
              classList={{ 'bg-sky-blue': isVideo() }}
              onClick={() => setIsVideo(true) && setType('video')}
            >
              Video
            </button>
          </div>
          <Show when={isVideo()}>
            <input placeholder="Video URL ..." type="text" value={videoUrl()} onInput={() => {}} />
          </Show>
        </div>
        <button class="rounded-lg bg-iris text-white px-5 py-2" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
