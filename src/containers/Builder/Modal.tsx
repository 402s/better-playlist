import { Component, createSignal, Show } from 'solid-js';
import { produce } from 'solid-js/store';
import { Lesson, setStore } from '../../store/store';
export const GroupModal = () => {
  return <div>Modal</div>;
};
export const BuilderModal: Component<{
  type: 'folder' | 'lesson';
  editType: 'add' | 'edit';
  parentId: number;
  id?: string;
  lesson?: Lesson;
  onCloseModal: () => void;
}> = ({ type: _type, parentId, id, editType: _editType, lesson, onCloseModal }) => {
  const [editType, setEditType] = createSignal('lesson');
  const [title, setTitle] = createSignal('');
  const [videoUrl, setVideoUrl] = createSignal('');
  const [type, setType] = createSignal('text');
  const [isVideo, setIsVideo] = createSignal(false);
  const [isLesson, setIsLesson] = createSignal(_type === 'lesson');

  const onSubmit = async () => {
    if (!title()) return;
    if (isVideo() && !videoUrl()) return;

    setStore(
      produce((s) => {
        // const newLessonId = s.nextLessonId + 1;
        const newId = s.nextSubjectNodeId + 1;
        s.nextSubjectNodeId = newId;
        if (isLesson()) {
          s.subjectNode[newId] = {
            type: 'lesson',
            data: {
              title: title(),
              type: 'text',
            },
            children: [],
          };
          s.subjectNode[parentId].children.push(newId);
          return;
        }

        if (!isLesson()) {
          s.subjectNode[newId] = {
            type: 'folder',
            data: {
              title: title(),
            },
            children: [],
          };
          s.subjectNode[parentId].children.push(newId);
          return;
        }
        // s.nextLessonId = newLessonId;
        // s.folders[headerId as any].lessonIds.push(newLessonId);
        // s.lessons[newLessonId] = {
        //   lesson: { title: title(), type: 'text' },
        //   siblingLessonIds: [],
        // };
      }),
    );
    onCloseModal();
  };

  const lessonForm = (
    <div>
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
  );

  return (
    <div class="w-[80vw] p-6 bg-white rounded-xl shadow-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <div class="flex gap-2">
            <button
              class="p-2 border border-gray-200 rounded-md"
              classList={{ 'bg-sky-blue': isLesson() }}
              onClick={() => setIsLesson(true)}
            >
              Lesson
            </button>
            <button
              class="p-2 border border-gray-200 rounded-md"
              classList={{ 'bg-sky-blue': !isLesson() }}
              onClick={() => setIsLesson(false)}
            >
              Folder
            </button>
          </div>
          <input
            data-modal-focus-on-open
            class="border-2 border-gray-50 rounded-lg"
            placeholder="Title ..."
            type="text"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
          <Show when={isLesson()}>{lessonForm}</Show>
        </div>
        <button class="rounded-lg bg-iris text-white px-5 py-2" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
