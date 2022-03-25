const createEmbedString = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as any),
  }) as unknown as { video: string };

  const videoUrl = params.video;
  if (!videoUrl) return;

  console.log(videoUrl);

  const videoId = videoUrl.match(/\/([^/]+)$/)![1];

  return `
    <blockquote
      class="tiktok-embed"
      cite="${videoUrl}"
      data-video-id="${videoId}"
      style="max-width: 605px;min-width: 325px;"
    >
      <section></section>
    </blockquote>
  `;
};

export default createEmbedString;
