import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  input,
  output,
  TemplateRef
} from '@angular/core';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'neutral';
type IconPosition = 'left' | 'right' | 'only';
type Align = 'left' | 'center' | 'right';

@Component({
  selector: 'ui-button',
  imports: [
    NgTemplateOutlet,
  ],
  templateUrl: './ui-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  label = input<string | undefined>();
  icon = input<string | undefined>();
  iconPosition = input<IconPosition>('left');
  align = input<Align>('center');
  size = input<ButtonSize>('md');
  variant = input<ButtonVariant>('solid');
  color = input<ButtonColor>('primary');
  block = input(false);
  disabled = input(false);
  loading = input(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  ariaLabel = input<string | undefined>();

  btnClick = output<MouseEvent>();

  @ContentChild('icon', { read: TemplateRef }) iconTpl?: TemplateRef<any>;

  classes = computed(() => {
    const disabledOrLoading = this.disabled() || this.loading();
    return [
      'inline-flex items-center gap-2 rounded-xl font-medium transition',
      'focus:outline-none focus-visible:ring-2 ring-offset-2',
      this.block() ? 'w-full' : 'w-auto',
      this.sizeClasses[this.size()],
      this.alignClasses[this.align()],
      this.variantColorClasses[this.variant()][this.color()],
      disabledOrLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    ].join(' ');
  });

  spinnerClasses = computed(() => ({
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-6 w-6 border-2',
  }[this.size()]));

  onClick(ev: MouseEvent) {
    if (this.disabled() || this.loading()) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return;
    }
    this.btnClick.emit(ev);
  }

  private readonly sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-5 py-3',
  };

  private readonly alignClasses: Record<Align, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  private readonly variantColorClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
    solid: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400',
      secondary: 'bg-slate-700 text-white hover:bg-slate-800 focus-visible:ring-slate-400',
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400',
      warning: 'bg-amber-500 text-black hover:bg-amber-600 focus-visible:ring-amber-300',
      neutral: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-300',
    },
    outline: {
      primary: 'border border-blue-600 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-400',
      secondary: 'border border-slate-600 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400',
      success: 'border border-emerald-600 text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-400',
      danger: 'border border-red-600 text-red-700 hover:bg-red-50 focus-visible:ring-red-400',
      warning: 'border border-amber-500 text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-300',
      neutral: 'border border-gray-300 text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
    },
    ghost: {
      primary: 'text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300',
      secondary: 'text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300',
      success: 'text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-300',
      danger: 'text-red-700 hover:bg-red-50 focus-visible:ring-red-300',
      warning: 'text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-200',
      neutral: 'text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-200',
    },
    link: {
      primary: 'text-blue-700 underline-offset-4 hover:underline focus-visible:ring-blue-300 bg-transparent',
      secondary: 'text-slate-700 underline-offset-4 hover:underline focus-visible:ring-slate-300 bg-transparent',
      success: 'text-emerald-700 underline-offset-4 hover:underline focus-visible:ring-emerald-300 bg-transparent',
      danger: 'text-red-700 underline-offset-4 hover:underline focus-visible:ring-red-300 bg-transparent',
      warning: 'text-amber-700 underline-offset-4 hover:underline focus-visible:ring-amber-200 bg-transparent',
      neutral: 'text-gray-800 underline-offset-4 hover:underline focus-visible:ring-gray-200 bg-transparent',
    },
  };
}
