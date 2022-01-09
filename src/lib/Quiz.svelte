<script lang="ts">
  import type { TNote } from '../note'
  import TagView from './TagView.svelte'
  export let note: TNote
</script>

<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-margin-auto">
  <TagView tags={note.tags} viewMode/>
  <h2>{ note.english }</h2>
  <p><button type="button" uk-toggle="target: #detail-japanese" class="uk-button uk-button-default">日本語</button></p>
  <p class="detail" id="detail-japanese" hidden>{ note.japanese }<p>
  <p><button type="button" uk-toggle="target: #detail-description" class="uk-button uk-button-default">説明</button></p>
  <p class="detail" id="detail-description" hidden>{ note.description }</p>
  <p><button type="button" uk-toggle="target: #detail-examples" class="uk-button uk-button-default">用例</button></p>
  <p class="detail" id="detail-examples" hidden>{ note.examples }</p>
  <p><button type="button" uk-toggle="target: #detail-similar" class="uk-button uk-button-default">類似</button></p>
  <p class="detail" id="detail-similar" hidden>{ note.similar }</p>
  <p><button type="button" uk-toggle="target: .detail" class="uk-button uk-button-default">すべて</button></p>
</div>
