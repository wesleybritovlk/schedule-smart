import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
  computed,
  input
} from '@angular/core';
import { RouterLink } from '@angular/router';

type LinkSize = 'sm' | 'md' | 'lg';
type LinkVariant = 'solid' | 'outline' | 'ghost' | 'link';
type LinkColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'neutral' |
 'neutralPrimary' | 'neutralSecondary' | 'neutralSuccess' | 'neutralDanger' | 'neutralWarning';
type IconPosition = 'left' | 'right' | 'only';
type Align = 'left' | 'center' | 'right';
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

@Component({
  selector: 'ui-link',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './ui-link.component.html',
  styleUrl: './ui-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiLinkComponent {
  label = input<string | undefined>();
  icon = input<string | undefined>();
  iconPosition = input<IconPosition>('left');
  align = input<Align>('left');
  size = input<LinkSize>('md');
  variant = input<LinkVariant>('ghost');
  color = input<LinkColor>('primary');
  block = input<boolean>(true);
  display = input<'inline-flex' | 'flex' | 'block' | 'inline-block'>('block');
  width = input<string>('100%');
  height = input<string>('auto');
  routerLink = input<string | any[]>(['/']);
  textSize = input<TextSize | undefined>(undefined);
  fontWeight = input<FontWeight>('medium');

  @ContentChild('icon', { read: TemplateRef }) iconTpl?: TemplateRef<any>;

  classes = computed(() => [
    'rounded-xl transition',
    'focus:outline-none focus-visible:ring-2 ring-offset-2',
    'items-center gap-2',
    this.block() ? 'w-full' : 'w-auto',
    'inline-flex',
    this.paddingBySize[this.size()],
    this.textSizeClasses[this.textSize() ?? this.textDefaultBySize[this.size()]],
    this.weightClasses[this.fontWeight()],
    this.alignClasses[this.align()],
    this.variantColorClasses[this.variant()][this.color()],
    'cursor-pointer'
  ].join(' '));


  private readonly alignClasses: Record<Align, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  private readonly variantColorClasses: Record<LinkVariant, Record<LinkColor, string>> = {
    solid: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400',
      secondary: 'bg-slate-700 text-white hover:bg-slate-800 focus-visible:ring-slate-400',
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400',
      warning: 'bg-amber-500 text-black hover:bg-amber-600 focus-visible:ring-amber-300',
      neutral: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-300',
      neutralPrimary: 'bg-gray-200 text-gray-900 hover:bg-blue-700 focus-visible:ring-blue-400',
      neutralSecondary: 'bg-gray-200 text-gray-900 hover:bg-slate-700 focus-visible:ring-slate-400',
      neutralSuccess: 'bg-gray-200 text-gray-900 hover:bg-emerald-700 focus-visible:ring-emerald-400',
      neutralDanger: 'bg-gray-200 text-gray-900 hover:bg-red-700 focus-visible:ring-red-400',
      neutralWarning: 'bg-gray-200 text-gray-900 hover:bg-amber-600 focus-visible:ring-amber-300',
    },
    outline: {
      primary: 'border border-blue-600 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-400',
      secondary: 'border border-slate-600 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400',
      success: 'border border-emerald-600 text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-400',
      danger: 'border border-red-600 text-red-700 hover:bg-red-50 focus-visible:ring-red-400',
      warning: 'border border-amber-500 text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-300',
      neutral: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300',
      neutralPrimary: 'border border-gray-300 text-gray-700 hover:bg-blue-50 focus-visible:ring-blue-400',
      neutralSecondary: 'border border-gray-300 text-gray-700 hover:bg-slate-50 focus-visible:ring-slate-400',
      neutralSuccess: 'border border-gray-300 text-gray-700 hover:bg-emerald-50 focus-visible:ring-emerald-400',
      neutralDanger: 'border border-gray-300 text-gray-700 hover:bg-red-50 focus-visible:ring-red-400',
      neutralWarning: 'border border-gray-300 text-gray-700 hover:bg-amber-50 focus-visible:ring-amber-300',
    },
    ghost: {
      primary: 'text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300',
      secondary: 'text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300',
      success: 'text-emerald-700 hover:bg-emerald-50 focus-visible:ring-emerald-300',
      danger: 'text-red-700 hover:bg-red-50 focus-visible:ring-red-300',
      warning: 'text-amber-700 hover:bg-amber-50 focus-visible:ring-amber-200',
      neutral: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-200',
      neutralPrimary: 'text-gray-700 hover:bg-blue-50 focus-visible:ring-blue-300',
      neutralSecondary: 'text-gray-700 hover:bg-slate-50 focus-visible:ring-slate-300',
      neutralSuccess: 'text-gray-700 hover:bg-emerald-50 focus-visible:ring-emerald-300',
      neutralDanger: 'text-gray-700 hover:bg-red-50 focus-visible:ring-red-300',
      neutralWarning: 'text-gray-700 hover:bg-amber-50 focus-visible:ring-amber-200',
    },
    link: {
      primary: 'text-blue-700 underline-offset-4 hover:underline focus-visible:ring-blue-300 bg-transparent',
      secondary: 'text-slate-700 underline-offset-4 hover:underline focus-visible:ring-slate-300 bg-transparent',
      success: 'text-emerald-700 underline-offset-4 hover:underline focus-visible:ring-emerald-300 bg-transparent',
      danger: 'text-red-700 underline-offset-4 hover:underline focus-visible:ring-red-300 bg-transparent',
      warning: 'text-amber-700 underline-offset-4 hover:underline focus-visible:ring-amber-200 bg-transparent',
      neutral: 'text-gray-700 underline-offset-4 hover:underline focus-visible:ring-gray-200 bg-transparent',
      neutralPrimary: 'text-gray-700 underline-offset-4 hover:underline focus-visible:ring-blue-300 bg-transparent',
      neutralSecondary: 'text-gray-700 underline-offset-4 hover:underline focus-visible:ring-slate-300 bg-transparent',
      neutralSuccess: 'text-gray-700 underline-offset-4 hover:underline focus-visible:ring-emerald-300 bg-transparent',
      neutralDanger: 'text-gray-700 underline-offset-4 hover:underline focus-visible:ring-red-300 bg-transparent',
      neutralWarning: 'text-gray-700 underline-offset-4 hover:underline focus-visible:ring-amber-200 bg-transparent',
    },
  };

  private readonly paddingBySize: Record<LinkSize, string> = {
    sm: 'px-3 py-2',
    md: 'px-4 py-2.5',
    lg: 'px-5 py-3',
  };

  private readonly textDefaultBySize: Record<LinkSize, TextSize> = {
    sm: 'sm',
    md: 'sm',
    lg: 'base',
  };

  private readonly textSizeClasses: Record<TextSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  private readonly weightClasses: Record<FontWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

}
