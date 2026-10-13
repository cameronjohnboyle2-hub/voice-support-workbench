window.addEventListener('error', event => {
  if (event.target?.id === 'livekit-widget') {
    document.getElementById('widget-status').textContent = 'The voice widget could not load. Return to the transcript workbench or try later.';
  }
}, true);
