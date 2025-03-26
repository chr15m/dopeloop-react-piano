import KeyboardShortcuts from './KeyboardShortcuts';

describe('create', () => {
  test('correct configuration', () => {
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: 40,
      lastNote: 50,
      keyboardConfig: [
        {
          natural: 'KeyS',
          flat: 'KeyW',
        },
        {
          natural: 'KeyD',
          flat: 'KeyE',
        },
      ],
    });

    expect(keyboardShortcuts).toEqual([{ code: 'KeyS', midiNumber: 40 }, { code: 'KeyD', midiNumber: 41 }]);
  });
  test('does not create shortcuts exceeding lastNote', () => {
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: 40,
      lastNote: 41,
      keyboardConfig: [
        {
          natural: 'KeyS',
          flat: 'KeyW',
        },
        {
          natural: 'KeyD',
          flat: 'KeyE',
        },
        {
          natural: 'KeyF',
          flat: 'KeyR',
        },
      ],
    });

    expect(keyboardShortcuts).toEqual([{ code: 'KeyS', midiNumber: 40 }, { code: 'KeyD', midiNumber: 41 }]);
  });
});
