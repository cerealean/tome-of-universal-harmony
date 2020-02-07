import { DigitOnlyDirective } from './digit-only.directive';
import { allowedKeys } from './allowed-keys';

describe('DigitOnlyDirective', () => {
  it('should create an instance', () => {
    const directive = new DigitOnlyDirective();
    expect(directive).toBeTruthy();
  });

  describe('On Keydown', () => {
    let directive: DigitOnlyDirective;

    beforeEach(() => {
      directive = new DigitOnlyDirective();
    });

    allowedKeys.forEach(key => {
      it('should allow key ' + key, () => {
        const event = new KeyboardEvent('keydown', { code: key, metaKey: false, ctrlKey: false, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });
    });

    getAllLetters().forEach(letter => {
      it('should not allow key ' + letter, () => {
        const event = new KeyboardEvent('keydown', { code: 'Key' + letter, metaKey: false, ctrlKey: false, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(true);
      });
    });

    describe('should allow paste', () => {

      it('Windows OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyV', metaKey: false, ctrlKey: true, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

      it('Mac OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyV', metaKey: true, ctrlKey: false, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

    });

    describe('should allow copy', () => {

      it('Windows OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyC', metaKey: false, ctrlKey: true, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

      it('Mac OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyC', metaKey: true, ctrlKey: false, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

    });

    describe('should allow cut', () => {

      it('Windows OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyX', metaKey: false, ctrlKey: true, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

      it('Mac OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyX', metaKey: true, ctrlKey: false, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

    });

    describe('should allow select all', () => {

      it('Windows OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyA', metaKey: false, ctrlKey: true, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

      it('Mac OS', () => {
        const event = new KeyboardEvent('keydown', { code: 'KeyA', metaKey: true, ctrlKey: false, cancelable: true });
        directive.onKeyDown(event);
        expect(event.defaultPrevented).toBe(false);
      });

    });

  });

});

function getAllLetters() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from(letters);
}
