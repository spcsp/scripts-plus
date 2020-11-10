class Formation {
  create() {
    return new forms.System.Windows.Forms.Form();
  }

  button(label) {
    const btn = new forms.System.Windows.Forms.Button();

    btn.Text = label;

    return btn;
  }
}

module.exports = new Formation();