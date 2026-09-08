/*
 * Shared recording player
 *
 * Keeps the player markup and interaction identical in the catalogue, work
 * detail pages, and the visual mockup page. Waveform amplitudes are stored in
 * each recording as lightweight precomputed samples from the audio file.
 */

const RecordingPlayer = (() => {
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function findRecording(id) {
    if (typeof WORKS === 'undefined') return null;
    for (const category of WORKS) {
      for (const work of category.works || []) {
        const recording = (work.recordings || []).find(item => item.id === id);
        if (recording) return recording;
        for (const part of work.parts || []) {
          const partRecording = (part.recordings || []).find(item => item.id === id);
          if (partRecording) return partRecording;
        }
      }
    }
    return null;
  }

  function allRecordings() {
    if (typeof WORKS === 'undefined') return [];
    const recordings = [];
    WORKS.forEach(category => {
      (category.works || []).forEach(work => {
        recordings.push(...(work.recordings || []));
        (work.parts || []).forEach(part => recordings.push(...(part.recordings || [])));
      });
    });
    return recordings;
  }

  function render(recording, options = {}) {
    if (!recording || !recording.src) return '';

    const variant = options.variant || 'compact';
    const title = escapeHtml(I18n.loc(recording.title));
    const composer = escapeHtml(I18n.loc(recording.composer));
    const performer = escapeHtml(I18n.loc(recording.performer));
    const duration = escapeHtml(recording.duration || '—');
    const sourceUrl = recording.sourceUrl ? escapeHtml(recording.sourceUrl) : '';
    const waveform = Array.isArray(recording.waveform) && recording.waveform.length
      ? recording.waveform
      : new Array(48).fill(0.35);
    const numericWaveform = waveform.map(value => Math.max(0.12, Math.min(1, Number(value) || 0.12)));
    const minimum = Math.min(...numericWaveform);
    const maximum = Math.max(...numericWaveform);
    const bars = numericWaveform.map((value, index) => {
      const relative = maximum > minimum ? (value - minimum) / (maximum - minimum) : 0.5;
      const height = Math.round((0.16 + relative * 0.74) * 100);
      return `<span class="recording-wave-bar" style="--bar-height:${height}%;--bar-index:${index}" aria-hidden="true"></span>`;
    }).join('');
    const playLabel = escapeHtml(I18n.t('recording.play'));
    const seekLabel = escapeHtml(I18n.t('recording.seek'));

    return `
      <section class="recording-player recording-player--${escapeHtml(variant)}" data-recording-player data-recording-id="${escapeHtml(recording.id || '')}">
        <div class="recording-player-topline">
          <span class="recording-kicker" data-i18n="recording.label">${escapeHtml(I18n.t('recording.label'))}</span>
          <span class="recording-example" data-i18n="recording.example">${escapeHtml(I18n.t('recording.example'))}</span>
        </div>
        <div class="recording-player-main">
          <button class="recording-play" type="button" aria-label="${playLabel}" data-play-label="${playLabel}" data-pause-label="${escapeHtml(I18n.t('recording.pause'))}">
            <span class="recording-play-icon" aria-hidden="true">▶</span>
          </button>
          <div class="recording-copy">
            <h4 class="recording-title">${title}</h4>
            <p class="recording-meta">${composer}<span aria-hidden="true"> · </span>${performer}</p>
          </div>
          <span class="recording-time recording-time-total">${duration}</span>
        </div>
        <div class="recording-player-panel">
          <button class="recording-waveform" type="button" aria-label="${seekLabel}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0:00" role="slider">
            <span class="recording-wave-bars">${bars}</span>
            <span class="recording-wave-progress" aria-hidden="true"></span>
          </button>
          <div class="recording-player-bottomline">
            <span class="recording-time recording-time-current">0:00</span>
            <span class="recording-rule" aria-hidden="true"></span>
            ${sourceUrl ? `<a class="recording-source" href="${sourceUrl}" target="_blank" rel="noopener" data-i18n="recording.source">${escapeHtml(I18n.t('recording.source'))}</a>` : ''}
            <a class="recording-download" href="${escapeHtml(recording.src)}" download data-i18n="recording.download">${escapeHtml(I18n.t('recording.download'))}</a>
          </div>
          <audio class="recording-audio" preload="metadata" src="${escapeHtml(recording.src)}"></audio>
        </div>
      </section>`;
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainder}`;
  }

  function update(player, audio) {
    const current = player.querySelector('.recording-time-current');
    const total = player.querySelector('.recording-time-total');
    const waveform = player.querySelector('.recording-waveform');
    const progress = player.querySelector('.recording-wave-progress');
    const bars = [...player.querySelectorAll('.recording-wave-bar')];
    const ratio = audio.duration ? Math.min(1, audio.currentTime / audio.duration) : 0;
    const currentLabel = formatTime(audio.currentTime);

    if (current) current.textContent = currentLabel;
    if (total && Number.isFinite(audio.duration)) total.textContent = formatTime(audio.duration);
    if (progress) progress.style.width = `${ratio * 100}%`;
    bars.forEach((bar, index) => bar.classList.toggle('is-played', index / bars.length <= ratio));
    if (waveform) {
      waveform.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
      waveform.setAttribute('aria-valuetext', currentLabel);
    }
  }

  function setPlayingState(player, playing) {
    const button = player.querySelector('.recording-play');
    const icon = player.querySelector('.recording-play-icon');
    player.classList.toggle('is-playing', playing);
    player.setAttribute('data-recording-playing', String(playing));
    if (button) button.setAttribute('aria-label', playing ? button.dataset.pauseLabel : button.dataset.playLabel);
    if (icon) icon.textContent = playing ? 'Ⅱ' : '▶';
  }

  function bind(root = document) {
    root.querySelectorAll('[data-recording-player]').forEach(player => {
      if (player.dataset.recordingBound === 'true') return;
      player.dataset.recordingBound = 'true';

      const audio = player.querySelector('.recording-audio');
      const playButton = player.querySelector('.recording-play');
      const waveform = player.querySelector('.recording-waveform');
      if (!audio || !playButton || !waveform) return;

      playButton.addEventListener('click', () => {
        if (audio.paused) {
          document.querySelectorAll('[data-recording-player] audio').forEach(other => {
            if (other !== audio) other.pause();
          });
          audio.play().catch(() => setPlayingState(player, false));
        } else {
          audio.pause();
        }
      });

      const seek = (event) => {
        if (!Number.isFinite(audio.duration)) return;
        const rect = waveform.getBoundingClientRect();
        const point = event.clientX == null ? 0 : event.clientX - rect.left;
        audio.currentTime = Math.max(0, Math.min(1, point / rect.width)) * audio.duration;
        update(player, audio);
      };

      waveform.addEventListener('click', seek);
      waveform.addEventListener('keydown', (event) => {
        if (!Number.isFinite(audio.duration)) return;
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'Home') audio.currentTime = 0;
        else if (event.key === 'End') audio.currentTime = audio.duration;
        else audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + (event.key === 'ArrowRight' ? 5 : -5)));
        update(player, audio);
      });

      audio.addEventListener('loadedmetadata', () => update(player, audio));
      audio.addEventListener('timeupdate', () => update(player, audio));
      audio.addEventListener('play', () => setPlayingState(player, true));
      audio.addEventListener('pause', () => setPlayingState(player, false));
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        update(player, audio);
        setPlayingState(player, false);
      });
    });
  }

  return { allRecordings, bind, findRecording, render };
})();
