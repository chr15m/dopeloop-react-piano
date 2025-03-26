import MidiNumbers from './MidiNumbers';

/**
 * Create keyboard shortcuts based on physical key positions using event.code
 * This makes the piano playable with the same physical key positions
 * regardless of keyboard layout (QWERTY, AZERTY, Dvorak, etc.)
 */
function createKeyboardShortcuts({ firstNote, lastNote, keyboardConfig }) {
  let currentMidiNumber = firstNote;
  let naturalKeyIndex = 0;
  let keyboardShortcuts = [];

  while (
    // There are still keys to be assigned
    naturalKeyIndex < keyboardConfig.length &&
    // Note to be assigned does not surpass range
    currentMidiNumber <= lastNote
  ) {
    const keyCode = keyboardConfig[naturalKeyIndex];
    const { isAccidental } = MidiNumbers.getAttributes(currentMidiNumber);
    if (isAccidental) {
      keyboardShortcuts.push({
        code: keyCode.flat,
        midiNumber: currentMidiNumber,
      });
    } else {
      keyboardShortcuts.push({
        code: keyCode.natural,
        midiNumber: currentMidiNumber,
      });
      naturalKeyIndex += 1;
    }
    currentMidiNumber += 1;
  }
  return keyboardShortcuts;
}

export default {
  create: createKeyboardShortcuts,
  // Preset configurations using KeyboardEvent.code values
  // These represent physical key positions regardless of keyboard layout
  PIANO_LAYOUT: [
    { natural: 'KeyZ', flat: null, sharp: 'KeyS' },
    { natural: 'KeyX', flat: 'KeyS', sharp: 'KeyD' },
    { natural: 'KeyC', flat: 'KeyD', sharp: null },
    { natural: 'KeyV', flat: null, sharp: 'KeyG' },
    { natural: 'KeyB', flat: 'KeyG', sharp: 'KeyH' },
    { natural: 'KeyN', flat: 'KeyH', sharp: 'KeyJ' },
    { natural: 'KeyM', flat: 'KeyJ', sharp: null },
  ],
  BOTTOM_ROW: [
    { natural: 'KeyZ', flat: 'KeyA', sharp: 'KeyS' },
    { natural: 'KeyX', flat: 'KeyS', sharp: 'KeyD' },
    { natural: 'KeyC', flat: 'KeyD', sharp: 'KeyF' },
    { natural: 'KeyV', flat: 'KeyF', sharp: 'KeyG' },
    { natural: 'KeyB', flat: 'KeyG', sharp: 'KeyH' },
    { natural: 'KeyN', flat: 'KeyH', sharp: 'KeyJ' },
    { natural: 'KeyM', flat: 'KeyJ', sharp: 'KeyK' },
    { natural: 'Comma', flat: 'KeyK', sharp: 'KeyL' },
    { natural: 'Period', flat: 'KeyL', sharp: 'Semicolon' },
    { natural: 'Slash', flat: 'Semicolon', sharp: 'Quote' },
  ],
  HOME_ROW: [
    { natural: 'KeyA', flat: 'KeyQ', sharp: 'KeyW' },
    { natural: 'KeyS', flat: 'KeyW', sharp: 'KeyE' },
    { natural: 'KeyD', flat: 'KeyE', sharp: 'KeyR' },
    { natural: 'KeyF', flat: 'KeyR', sharp: 'KeyT' },
    { natural: 'KeyG', flat: 'KeyT', sharp: 'KeyY' },
    { natural: 'KeyH', flat: 'KeyY', sharp: 'KeyU' },
    { natural: 'KeyJ', flat: 'KeyU', sharp: 'KeyI' },
    { natural: 'KeyK', flat: 'KeyI', sharp: 'KeyO' },
    { natural: 'KeyL', flat: 'KeyO', sharp: 'KeyP' },
    { natural: 'Semicolon', flat: 'KeyP', sharp: 'BracketLeft' },
    { natural: 'Quote', flat: 'BracketLeft', sharp: 'BracketRight' },
  ],
  QWERTY_ROW: [
    { natural: 'KeyQ', flat: 'Digit1', sharp: 'Digit2' },
    { natural: 'KeyW', flat: 'Digit2', sharp: 'Digit3' },
    { natural: 'KeyE', flat: 'Digit3', sharp: 'Digit4' },
    { natural: 'KeyR', flat: 'Digit4', sharp: 'Digit5' },
    { natural: 'KeyT', flat: 'Digit5', sharp: 'Digit6' },
    { natural: 'KeyY', flat: 'Digit6', sharp: 'Digit7' },
    { natural: 'KeyU', flat: 'Digit7', sharp: 'Digit8' },
    { natural: 'KeyI', flat: 'Digit8', sharp: 'Digit9' },
    { natural: 'KeyO', flat: 'Digit9', sharp: 'Digit0' },
    { natural: 'KeyP', flat: 'Digit0', sharp: 'Minus' },
    { natural: 'BracketLeft', flat: 'Minus', sharp: 'Equal' },
  ],
};
