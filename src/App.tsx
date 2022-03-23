import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
// High Level Solution
// An app that shows you all of your content and lets you organize it and share those organizations.
//   Folders
//    Simple collections of content, modeled after YouTube playlists.
//    Order isn’t important
//    Can have a folder description
//  Paths / “Content Rolls”
//    Orders videos into progressions.
//    Can have splits in the path
//    Can have labeled sections
//    Can include text content as nodes in the path
// Pages
//    Contain folders, paths, and videos. This is the “traditional CMS” part of the app, and it gives you a website to present your content. This doesn’t have to be part of the MVP; each folder/path is sharable on its own, and see #3 below.

// first have a playlist builder
// drag and drop

const [store, setStore] = createStore({
  folders: {},
  paths: {},
  pages: {},
});

// https://www.tiktok.com/@javascript_wizz/video/7006233363338038533

const App: Component = () => {
  return (
    <div>
      <video
        src="https://v16-web.tiktokcdn-us.com/video/tos/useast2a/tos-useast2a-pve-0068/396f06870f3041559b61ffea084af887/?a=1988&br=2004&bt=1002&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1648083380&ft=XO.bw3E7nz7Th1JeMDXq&l=20220323185611010113135043195551A4&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=3&qs=0&rc=ang6NTM6ZnNuOzMzNzczM0ApOmkzODNlN2Q8Nzg2PDc3OmdjLy1ycjRvNGtgLS1kMTZzczM1YDA2Ni1fMmBhYzBhYDU6Yw%3D%3D&signature=af20bc4a583bc2a8ed08bec67922cf56&tk=0&vl=&vr="
        controls
      ></video>
      {/* <blockquote
        class="tiktok-embed"
        cite="https://www.tiktok.com/@codebytes._/video/7074948327552470277"
        data-video-id="7074948327552470277"
        style="max-width: 605px;min-width: 325px;"
      >
        <section>
          <a
            target="_blank"
            title="♬ original sound - nolanomura"
            href="https://www.tiktok.com/music/original-sound-7050605379411299118"
          >
            ♬ original sound - nolanomura
          </a>{' '}
        </section>{' '}
      </blockquote>{' '} */}
    </div>
  );
};

export default App;
