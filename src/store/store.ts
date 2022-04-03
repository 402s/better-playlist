import { createStore } from 'solid-js/store';
import Sortable from 'sortablejs';

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
  [key: number]: { children: { id: number }[] } & (LessonData | FolderData | { type: 'root' });
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
  nextSubjectNodeId: number;
  sortableState: Sortable.SortableOptions;
};

const getLS = (): TStore => {
  try {
    const result = localStorage.getItem('store');
    if (!result) return false as any;
    return JSON.parse(result);
  } catch (err) {
    return false as any;
  }
};

const defaultState: TStore = {
  buildMode: true,
  sortableState: { swapThreshold: 0.1 },
  lessonsIds: [5, 6, 7, 8, 9, 10],
  folderIds: [1, 2, 3, 4],
  title: 'CSS Master Class',
  currentSubject: {
    folderId: 0,
    lessonId: 1,
  },
  nextSubjectNodeId: 51,
  dndTemp: { id: null, tempId: null, isDndShadowItem: true },
  subjectNode: {
    0: {
      type: 'root',
      children: [{ id: 1 }, { id: 2 }],
    },
    1: {
      type: 'folder',
      data: {
        title: 'Beginner',
      },
      // children: [3, 4, 8],
      children: [{ id: 3 }, { id: 4 }, { id: 8 }],
      // children: [{ id: 3 }],
    },
    2: {
      type: 'folder',
      data: {
        title: 'Advanced',
      },
      // children: [9, 10],
      children: [{ id: 9 }, { id: 10 }],
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
      // children: [5, 6],
      // children: [{ id: 5 }, { id: 6 }, { id: 11 }, { id: 12 }],
      children: [{ id: 5 }, { id: 6 }],
    },
    4: {
      type: 'folder',
      data: {
        title: 'Box Model - part 2',
      },
      // children: [7],
      children: [{ id: 7 }],
    },
    5: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'Content',
      },
      children: [],
    },
    6: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'Padding',
      },
      children: [],
    },
    7: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'Margin',
      },
      children: [],
    },
    8: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'Classes',
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
    11: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'Bar',
      },
      children: [],
    },
    12: {
      type: 'lesson',
      data: {
        type: 'text',
        title: 'Foo',
      },
      children: [],
    },
  },
};
export const [store, setStore] = createStore<TStore>(getLS() || defaultState);
