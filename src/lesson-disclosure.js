export class LessonDisclosure {
  constructor(moveIndex = 0) {
    this.moveIndex = moveIndex;
    this.automaticallyOpened = false;
  }

  shouldAutomaticallyOpen(mode, selectedSquare, expectedMove, moveIndex) {
    if (moveIndex !== this.moveIndex) {
      this.reset(moveIndex);
    }
    if (mode !== 'learn' || !expectedMove || selectedSquare !== expectedMove.from || this.automaticallyOpened) {
      return false;
    }
    this.automaticallyOpened = true;
    return true;
  }

  reset(moveIndex = 0) {
    this.moveIndex = moveIndex;
    this.automaticallyOpened = false;
  }
}
