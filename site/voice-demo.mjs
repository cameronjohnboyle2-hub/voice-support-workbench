export function mountVoiceDemo(document, clock = globalThis) {
  const consent = document.getElementById('consent');
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  const host = document.getElementById('widget-host');
  const status = document.getElementById('voice-status');
  let frame = null;
  let deadline = null;

  function stop(message = 'Demo ended. The embedded widget has been unloaded.') {
    if (deadline !== null) clock.clearTimeout(deadline);
    deadline = null;
    if (frame !== null) frame.remove();
    frame = null;
    end.disabled = true;
    start.disabled = !consent.checked;
    status.textContent = message;
  }

  consent.addEventListener('change', () => {
    if (!consent.checked && frame !== null) stop('Consent withdrawn. The embedded widget has been unloaded.');
    start.disabled = !consent.checked || frame !== null;
  });
  start.addEventListener('click', () => {
    if (!consent.checked || frame !== null) return;
    frame = document.createElement('iframe');
    frame.src = 'voice-widget.html';
    frame.title = 'Maple Desk fictional voice demo';
    frame.allow = 'microphone';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    host.append(frame);
    start.disabled = true;
    end.disabled = false;
    status.textContent = 'Open the assistant in the panel below, then choose to start its call. The panel closes after two minutes.';
    deadline = clock.setTimeout(() => stop('Two-minute page limit reached. The embedded widget has been unloaded.'), 120_000);
  });
  end.addEventListener('click', () => stop());
  return { stop };
}

if (typeof document !== 'undefined') {
  const demo = mountVoiceDemo(document);
  window.addEventListener('pagehide', () => demo.stop());
}
