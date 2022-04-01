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
  title: string;
  lessons: LessonNode;
  folders: FolderNode;
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
      children: [3, 4, 8],
    },
    2: {
      type: 'folder',
      data: {
        title: 'Advanced',
      },
      children: [9, 10],
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
  lessons: {
    0: {
      lesson: {
        title: 'Box Model',
        type: 'text',
      },
      siblingLessonIds: [],
    },
    1: {
      lesson: {
        title: 'Classes',
        type: 'text',
      },
      siblingLessonIds: [],
    },
    2: {
      lesson: {
        title: 'Flex box',
        type: 'video',
        metaData: {
          provider: 'tiktok',
          videoURL:
            'https://v16m-webapp.tiktokcdn-us.com/015345f5e89fa815fc84b6605e0ea94d/623cfc81/video/tos/useast2a/tos-useast2a-ve-0068c004/23fa97c05cc1422da18e0cff2ec4514d/?a=1988&br=580&bt=290&cd=0%7C0%7C0%7C0&ch=0&cr=0&cs=0&dr=0&ds=3&er=&ft=XY53A3E7nz7ThjfjJDXq&l=202203241719000101130062180F1E7DBE&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M292cmQ6ZnFsNzMzNzczM0ApOjk2ZDk1N2RpN2g5OjNmZGc2Lm1rcjRvNHFgLS1kMTZzcy1jLzNhXmA0YTQ2XzZeYTY6Yw%3D%3D&vl=&vr=',
          duration: 30,
        },
      },
      siblingLessonIds: [],
    },
    3: {
      lesson: {
        title: 'Stacking Context',
        type: 'text',
      },
      siblingLessonIds: [],
    },
  },
  folders: {
    0: {
      folder: {
        title: 'Beginner',
      },
      lessonIds: [0, 1],
    },
    1: {
      folder: {
        title: 'Advanced',
      },
      lessonIds: [2, 3],
    },
  },
});
