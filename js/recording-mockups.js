/* Visual comparison page for the recording-player directions. */

var PageInit = {
  'recording-mockups': () => {
    const recordings = RecordingPlayer.allRecordings();
    document.querySelectorAll('[data-recording-mockup]').forEach((mount, index) => {
      const recording = recordings[index];
      if (!recording) return;
      mount.innerHTML = RecordingPlayer.render(recording, {
        variant: mount.dataset.recordingVariant || 'compact',
      });
    });
    I18n.apply();
    RecordingPlayer.bind(document);
    I18n.onChange(() => I18n.apply());
  }
};
