import {animate, group, state, style, transition, trigger} from "@angular/animations";

export const slideInOutAnimation = [
  trigger('slideInOut',[
    state('in',style({
      'max-height':'3000px',
      'visibility':'visible',
      'opacity':'1'
    })),
    state('out',style({
      'max-height':'0px',
      'opacity':'0',
      'visibility':'hidden'})),
    transition('in=>out',[group([
      animate('400ms ease-in-out',style({
        'opacity':'0'
      })),
      animate('200ms ease-in-out',style({
        'max-height':'0px'
      })),
      animate('500ms ease-in-out',style({
        'visibility':'hidden'
      }))
    ])]),
    transition('out=>in',[group([
      animate('400ms ease-in-out',style({
        'opacity':'1'
      })),
      animate('200ms ease-in-out',style({
        'max-height':'500px'
      })),
      animate('500ms ease-in-out',style({
        'visibility':'visible'
      }))
    ])])
  ])


]
