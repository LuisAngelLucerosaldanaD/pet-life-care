export interface Toast {
  message: string;
  duration: number;
  position: string;
  trigger: string;
  show: boolean;
  positionAnchor?: string;
  color?: string;
}
