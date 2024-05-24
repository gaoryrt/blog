title: 书影音
---

<div class="db--container"></div>
<link rel="stylesheet" type="text/css" href="/css/douban.css">
<script type="text/javascript" charset="utf-8" src="/js/douban.js"></script>
<script>
  new Douban({
    baseAPI: 'https://douban-cf-worker.gaoryrt.workers.dev/',
    container: ".db--container",
    types: ["movie", "book", "game"]
});
</script>
