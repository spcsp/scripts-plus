class Dialog {
  constructor() {
    const {
      AnchorStyles,
      Button,
      DialogResult,
      Form,
      Label,
      TextBox
    } = forms.System.Windows.Forms;
    
    this.OK = DialogResult.OK; 
    this.CANCEL = DialogResult.Cancel; 
    this.ANCHOR = {
      RIGHT: AnchorStyles.Right,
      BOTTOM: AnchorStyles.Bottom
    };
    
    this.form = new Form();
    this.label = new Label();
    this.textBox = new TextBox();
    
    this.buttonOk = new Button();
    this.buttonOk.Text = "OK";
    this.buttonOk.DialogResult = this.OK;
    
    this.buttonCancel = new Button();
    this.buttonCancel.Text = "Cancel";
    this.buttonCancel.DialogResult = this.CANCEL; 
  }
  
  create(inputLabel = "Input:", title = "ScriptyStrokes Dialog") {
    this.form.Text = title;
    this.label.Text = inputLabel;
    
    this.buttonOk.Location = new Point (10, 10);
    this.buttonCancel.Location = new Point(
      this.buttonOk.Left,
      this.buttonOk.Height + this.buttonOk.Top + 10
    );

    this.label.SetBounds(9, 20, 372, 13);
    this.textBox.SetBounds(12, 36, 372, 20);
    this.buttonOk.SetBounds(228, 72, 75, 23);
    this.buttonCancel.SetBounds(309, 72, 75, 23);

    this.label.AutoSize = true;
    this.textBox.Anchor = this.textBox.Anchor | this.ANCHOR.RIGHT;
    this.buttonOk.Anchor = this.ANCHOR.BOTTOM | this.ANCHOR.RIGHT;
    this.buttonCancel.Anchor = this.ANCHOR.BOTTOM | this.ANCHOR.RIGHT;

    this.form.AcceptButton = this.buttonOk;
    this.form.CancelButton = this.buttonCancel;
    this.form.ClientSize = new Size(396, 107);

    //var controls = formation.control([ label, textBox, buttonOk, buttonCancel ]);

    //var controls = formation.control(label);
    //form.Controls.AddRange(controls);
    //form.ClientSize = new Size(Math.Max(300, label.Right + 10), form.ClientSize.Height);
    this.form.Controls.Add(this.label);  
    this.form.Controls.Add(this.textBox);  
    this.form.Controls.Add(this.buttonOk);
    this.form.Controls.Add(this.buttonCancel);
    
    return this;
  }
    
  show(onSubmit) {
    if (typeof onSubmit !== "function") {
      throw Error("the input for dialog.show() must be a function");
    }
    
    if (this.form.ShowDialog() == this.OK) {
      onSubmit(this.textBox.Text);
    }
  }
}

module.exports = new Dialog(stdlib);