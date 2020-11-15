import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent {

  // mensaje de error
  @Input() errorMsg: string;
  // Hay un error?
  @Input() displayError: boolean;

}
