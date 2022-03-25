import { Component, createSignal, Show } from 'solid-js';
import { Lesson } from '../../store/store';

export const GroupModal = () => {
  return <div>Modal</div>;
};
export const LessonModal: Component<{
  type: 'add' | 'edit';
  headerId: number;
  lessonId?: string;
  lesson?: Lesson;
}> = ({ headerId, lessonId, type: _type, children, lesson }) => {
  // setStore(
  //   produce((s) => {
  //     const newLessonId = s.nextLessonId + 1;
  //     s.nextLessonId = newLessonId;
  //     s.headers[props.id as any].lessonIds.push(newLessonId);
  //     s.lessons[newLessonId] = {
  //       lesson: { title: 'Hiii', type: 'text' },
  //       siblingLessonIds: [],
  //     };
  //   }),
  // );
  const [title, setTitle] = createSignal('');
  const [videoUrl, setVideoUrl] = createSignal('');
  const [type, setType] = createSignal('text');
  const [isVideo, setIsVideo] = createSignal(false);

  return (
    <div class="w-[80vw] p-6 bg-white rounded-xl shadow-md">
      <div>
        <input placeholder="Title ..." type="text" value={title()} onInput={() => {}} />
        <div class="flex gap-2">
          <button
            class="p-2 border border-gray-200 rounded-md"
            classList={{ 'bg-sky-blue': !isVideo() }}
            onClick={() => setIsVideo(false)}
          >
            Text
          </button>
          <button
            class="p-2 border border-gray-200 rounded-md"
            classList={{ 'bg-sky-blue': isVideo() }}
            onClick={() => setIsVideo(true)}
          >
            Video
          </button>
        </div>
        <Show when={isVideo()}>
          <input placeholder="Video URL ..." type="text" value={videoUrl()} onInput={() => {}} />
        </Show>
      </div>
      <button class="rounded-lg bg-iris text-white px-5 py-2">Submit</button>
    </div>
  );
};
