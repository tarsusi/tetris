export interface IKeyboardManagerProps {
  onKeysChanged(keys: String[]): void;
  pressedKeys: String[];
}
