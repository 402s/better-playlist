import { Component, Match, onMount, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
import Header from './containers/ListView/Header';
import View from './containers/ListView/View';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import createEmbedString from './utils/createEmbedString';
import { store } from './store/store';
import Builder from './containers/Builder/Builder';
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

// https://www.tiktok.com/@javascript_wizz/video/7006233363338038533

const App: Component = () => {
  let embedDiv!: HTMLDivElement;

  onMount(() => {
    // embedDiv.innerHTML = createEmbedString() || '';
  });
  return (
    <div>
      <Header />
      <div class="pt-[60px]">
        <Switch>
          <Match when={store.buildMode}>
            <Builder />
          </Match>
          <Match when={!store.buildMode}>
            <View />
          </Match>
        </Switch>
      </div>
      {/* <VideoPlayer /> */}
      {/* <video
        src="https://v16-web.tiktokcdn-us.com/video/tos/useast2a/tos-useast2a-ve-0068c004/23fa97c05cc1422da18e0cff2ec4514d/?a=1988&amp;br=580&amp;bt=290&amp;cd=0%7C0%7C0%7C0&amp;ch=0&amp;cr=0&amp;cs=0&amp;dr=0&amp;ds=3&amp;er=&amp;expire=1648130214&amp;ft=XO.bw3E7nz7ThZkHJDXq&amp;l=2022032407562501011313514120EC2AEE&amp;lr=tiktok_m&amp;mime_type=video_mp4&amp;net=0&amp;pl=0&amp;policy=3&amp;qs=0&amp;rc=M292cmQ6ZnFsNzMzNzczM0ApOjk2ZDk1N2RpN2g5OjNmZGc2Lm1rcjRvNHFgLS1kMTZzcy1jLzNhXmA0YTQ2XzZeYTY6Yw%3D%3D&amp;signature=c7e85d2f8dfd5370af7e464e1631065e&amp;tk=0&amp;vl=&amp;vr="
        poster="https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/5a06fd1b63744ec1be096405ab436d81?x-expires=1648126800&amp;x-signature=g84tU5iJDEuD0u%2Feqi%2B1X%2BXW5tY%3D"
        controls
        class="jsx-1226050086 _embed_player_video-item"
      ></video> */}
      {/* <video
        src="https://v16-webapp.tiktok.com/121cd7130cf155bba7a14ab89fe8a1f1/623cf252/video/tos/useast2a/tos-useast2a-ve-0068c004/23fa97c05cc1422da18e0cff2ec4514d/?a=1988&br=580&bt=290&cd=0|0|0|0&ch=0&cr=0&cs=0&dr=0&ds=3&er=&ft=XOQ9-3.Gnz7Th_uVJDXq&l=202203241635330102510042021A325E78&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M292cmQ6ZnFsNzMzNzczM0ApOjk2ZDk1N2RpN2g5OjNmZGc2Lm1rcjRvNHFgLS1kMTZzcy1jLzNhXmA0YTQ2XzZeYTY6Yw%3D%3D&vl=&vr="
        controls
      ></video> */}
      {/* <div ref={embedDiv}></div> */}
    </div>
  );
};

export default App;
