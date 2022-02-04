<script lang="ts">
  import type { Note } from '@utils/note'
  import TagView from 'lib/TagView.svelte'
  export let note: Note
  console.log(note)
</script>

<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-margin-auto">
  <TagView tags={note.Tags} viewMode/>
  <h2>{ note.English }</h2>
  <p><button type="button" uk-toggle="target: #detail-japanese" class="uk-button uk-button-default">日本語</button></p>
  <p class="detail" id="detail-japanese" hidden>{ note.Japanese }<p>
  <p><button type="button" uk-toggle="target: #detail-description" class="uk-button uk-button-default">説明</button></p>
  <p class="detail" id="detail-description" hidden>{ note.Description }</p>
  <p><button type="button" uk-toggle="target: #detail-examples" class="uk-button uk-button-default">用例</button></p>
  <p class="detail" id="detail-examples" hidden>{ note.Examples }</p>
  <p><button type="button" uk-toggle="target: #detail-similar" class="uk-button uk-button-default">類似</button></p>
  <p class="detail" id="detail-similar" hidden>{ note.Similar }</p>
  <p><button type="button" uk-toggle="target: .detail" class="uk-button uk-button-default">すべて</button></p>
</div>
