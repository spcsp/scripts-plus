class Mouse {
  L_BUTTON = MouseButtons.Left;
  R_BUTTON = MouseButtons.Right;

  defaults = {
    pauseTime: 100,
    subMenuWaitTime: 500,
  };

  hooks = {
    move: {
      before: function () {},
      after: function () {},
    },
    click: {
      before: function () {},
      after: function () {},
    },
  };

  get currentPoint() {
    return sp.GetCurrentMousePoint();
  }

  get X() {
    return this.currentPoint.X;
  }

  get Y() {
    return this.currentPoint.Y;
  }

  constructor() {
    //
  }

  pause(t) {
    sp.Sleep(t || this.defaults.pauseTime);
    return this;
  }

  waitForSubmenu() {
    sp.Sleep(this.defaults.subMenuWaitTime);
    return this;
  }

  G90() {
    this.mode = "G90";
    this.absolute = true;
    this.incremental = false;
    return this;
  }

  G91() {
    this.mode = "G91";
    this.absolute = false;
    this.incremental = true;
    return this;
  }

  absolute(movements = () => []) {
    movements().forEach((coords) => this.xyAbs(coords[0], coords[1]));
    return this;
  }

  incremental(movements = () => []) {
    movements().forEach((coords) => this.xyInc(coords[0], coords[1]));
    return this;
  }

  xyAbs(x = 0, y = 0) {
    this.hooks.move.before();
    sp.MouseMove(new Point(x, y));
    this.hooks.move.after();
    return this;
  }

  xyInc(x = 0, y = 0) {
    const xDest = this.currentPoint.X + x;
    const yDest = this.currentPoint.Y + y;

    this.hooks.move.before();
    sp.MouseMove(new Point(xDest, yDest));
    this.hooks.move.after();
    return this;
  }

  /**
   * Move the mouse to a point
   */
  move(x, y) {
    const prevPoint = this.currentPoint;
    this.hooks.move.before();
    sp.MouseMove(new Point(x, y));
    this.hooks.move.after(prevPoint);
    return this;
  }

  /**
   * Click at a point
   */
  click(x, y) {
    return this.leftClick(x, y);
  }

  leftClick(x, y) {
    let point = this.currentPoint;
    if (typeof x === "number" && typeof y === "number") {
      point = new Point(x, y);
    }
    this.hooks.click.before();
    sp.MouseClick(point, this.L_BUTTON, true, true);
    this.hooks.click.after();
    return this;
  }

  rightClick(x, y) {
    let point = this.currentPoint;
    if (typeof x === "number" && typeof y === "number") {
      point = new Point(x, y);
    }
    this.hooks.click.before();
    sp.MouseClick(point, this.R_BUTTON, true, true);
    this.hooks.click.after();
    return this;
  }
}

module.exports = new Mouse();
