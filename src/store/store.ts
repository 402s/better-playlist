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

type SubjectNode = {
  [key: number]: {
    type: 'lesson' | 'folder';
    data: Lesson | Folder;
  };
};

type Folder = {
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
    headerId: number;
  } | null;
  title: string;
  lessons: LessonNode;
  folders: FolderNode;
  buildMode: boolean;
  nextHeaderId: number;
  nextLessonId: number;
};

export const [store, setStore] = createStore<TStore>({
  buildMode: false,
  title: 'CSS Master Class',
  currentSubject: {
    headerId: 0,
    lessonId: 1,
  },
  nextHeaderId: 2,
  nextLessonId: 4,
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
