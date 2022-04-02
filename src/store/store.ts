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
  [key: number]: { children: number[] } & (LessonData | FolderData | { type: 'root' });
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

const getLS = () => {
  try {
    const result = localStorage.getItem('store');
    if (!result) return false;
    return JSON.parse(result);
  } catch (err) {
    return false;
  }
};

export const [store, setStore] = createStore<TStore>(
  getLS() || {
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
        children: [1, 2],
      },
      1: {
        type: 'folder',
        data: {
          title: 'Beginner',
        },
        children: [3, 4, 5],
      },
      2: {
        type: 'folder',
        data: {
          title: 'Advanced',
        },
        children: [9, 10],
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
        children: [5, 6],
      },
      4: {
        type: 'folder',
        data: {
          title: 'Box Model - part 2',
        },
        children: [7],
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
  },
);
