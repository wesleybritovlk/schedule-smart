import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true
    }
  ]
})
export class UiInputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() control!: any;
  @Input() inputType: string = 'text';
  @Input() controlType: string = 'input';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() prefix: string = '';
  @Input() small: boolean = false;
  @Input() options: any[] = [];
  @Input() background: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() inputmode: string = 'text';
  @Input() autocomplete: string = 'off';

  required: boolean = false; // Derived from control validators
  instanceId: number = Math.floor(Math.random() * 1000);
  value: string = '';
  onChange: any = () => { };
  onTouch: any = () => { };

  ngOnInit(): void {
    this.writeValue(this.control?.value || '');
    this.required = this.control?.errors?.required || false;
  }

  writeValue(value: string): void {
    this.value = value || '';
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouch();
  }

  getPadding(): string {
    return this.small ? '0.6rem' : '1rem';
  }

  getMargin(): string {
    return this.small ? '0.4rem 0' : '1rem 0';
  }

  getUniqueId(): string {
    return `${this.label.replace(/\s+/g, '-')}-${this.instanceId}`.toLowerCase();
  }
}