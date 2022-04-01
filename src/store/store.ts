import { createStore } from 'solid-js/store';

type TTree = {
  [key: number]: {
    id: number;
    counter: number;
    childIds: number[];
  };
};

export type Lesson = {
  type: 'video' | 'text';
  title: string;
  description?: string;
  tags?: string[];
  metaData?: {
    provider: 'instagram' | 'tiktok' | 'youtube' | 'vimeo';
    videoURL: string;
    duration: number;
    thumbnail?: string;
  };
};

export type FolderData = {
  type: 'folder';
  data: Folder;
};
export type LessonData = {
  type: 'lesson';
  data: Lesson;
};

type SubjectNode = {
  [key: number]: { children: { _id: number; id: number }[] } & (
    | LessonData
    | FolderData
    | { type: 'root' }
  );
};

export type Folder = {
  title: string;
};

export type FolderNode = {
  [key: number]: {
    folder: Folder;
    lessonIds: number[];
  };
};

type LessonNode = {
  [key: number]: {
    lesson: Lesson;
    siblingLessonIds: number[];
  };
};

type TStore = {
  currentSubject: {
    lessonId: number;
    folderId: number;
  } | null;
  dndTemp: {
    tempId: string | null;
    id: number | null;
    isDndShadowItem: boolean;
  };
  title: string;
  lessonsIds: number[];
  folderIds: number[];
  subjectNode: SubjectNode;
  buildMode: boolean;
  nextFolderId: number;
  nextLessonId: number;
  nextSubjectNodeId: number;
};

export const [store, setStore] = createStore<TStore>({
  buildMode: false,
  lessonsIds: [5, 6, 7, 8, 9, 10],
  folderIds: [1, 2, 3, 4],
  title: 'CSS Master Class',
  currentSubject: {
    folderId: 0,
    lessonId: 1,
  },
  nextFolderId: 4,
  nextLessonId: 4,
  nextSubjectNodeId: 11,
  dndTemp: { id: null, tempId: null, isDndShadowItem: true },
  subjectNode: {
    0: {
      type: 'root',
      children: [
        { _id: 1, id: 1 },
        { _id: 2, id: 2 },
        // { _id: 20, id: 20 },
      ],
    },
    1: {
      type: 'folder',
      data: {
        title: 'Beginner',
      },
      children: [
        { _id: 3, id: 3 },
        { _id: 4, id: 4 },
        { _id: 8, id: 8 },
      ],
    },
    2: {
      type: 'folder',
      data: {
        title: 'Advanced',
      },
      children: [
        { _id: 9, id: 9 },
        { _id: 10, id: 10 },
      ],
    },
    20: {
      type: 'folder',
      data: {
        title: 'Ultra!!!',
      },
      children: [
        // { _id: 9, id: 9 },
        // { _id: 10, id: 10 },
      ],
    },
    3: {
      type: 'folder',
      data: {
        title: 'Box Model - part 1',
      },
      children: [
        { _id: 5, id: 5 },
        { _id: 6, id: 6 },
      ],
    },
    4: {
      type: 'folder',
      data: {
        title: 'Box Model - part 2',
      },
      children: [{ _id: 7, id: 7 }],
    },
    5: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'content',
      },
      children: [],
    },
    6: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'padding',
      },
      children: [],
    },
    7: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'margin',
      },
      children: [],
    },
    8: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'classes',
      },
      children: [],
    },
    9: {
      type: 'lesson',
      data: {
        type: 'video',
        title: 'Flex Box',
      },
      children: [],
    },
    10: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'Stacking Context',
      },
      children: [],
    },
  },
});
